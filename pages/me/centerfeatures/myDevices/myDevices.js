// pages/me/centerfeatures/myDevices/myDevices.js
import { netApi, wxRequest } from '../../../../netapi.js'
let context;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    devices:[],
    isSubmitShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    context = this;
    wxRequest.request(netApi.device,null,success=>{
      this.setData({
        devices: success
      });
    }, faild=>{});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  nameInput:function(e){
    let index = e.currentTarget.dataset.index;
    let inputName = e.detail.value
    context.data.devices[index].name = inputName; 
  },
  radioChange:function(e){
    if (!e.detail.value) {
      context.setData({
        devices: context.data.devices
      });
      return ;
    }
    context.setData({
      isSubmitShow:true
    });
    let index = e.currentTarget.dataset.index;
    let value = e.detail.value;
    for (let i = 0; i < context.data.devices.length; i++) {
      context.data.devices[i].default = false;
      if (i == index) {
        context.data.devices[i].default = value;
      }
    }
    context.setData({
      devices: context.data.devices
    });
  },
  modifyName:function(e) {
    context.setData({
      isSubmitShow: true
    });
    let index = e.currentTarget.dataset.index;
    context.data.devices[index].isModifing = true;
    context.setData({
      devices: context.data.devices
    });
  },
  unbind:function(e){
    let index = e.currentTarget.dataset.index;
    let cardId = context.data.devices[index].cardId;
    wx.showModal({
      title: '提示',
      content: `确认要解绑${cardId}这张卡吗？`  ,
      success: function (res) {
        if (res.confirm) {
          wxRequest.request(netApi.unbind, { cardId: cardId}, success => {
            context.data.devices.splice(index,1);
            context.setData({
              devices:context.data.devices
            })
          }, faild => {
          });
        } else if (res.cancel) {
         
        }
      }
    })
  },
  submit:function(e){
    console.log(context.data.devices);
    wxRequest.request(netApi.modifyDevices, context.data.devices,success=>{
      for (let device of context.data.devices) {
        device.isModifing = false;
      }

      context.setData({
        devices: context.data.devices,
        isSubmitShow:false
      })
    },faild=>{
    });
  }
})