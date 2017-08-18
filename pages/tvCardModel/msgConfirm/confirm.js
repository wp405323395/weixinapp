// confirm.js
import { RequestEngine } from '../../../netApi/requestEngine.js';
var config = require('../../../config.js');
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  onSearchClick:function() {
    let inputValue = this.data.inputValue;
    if (util.textIsNotNull(inputValue)) {
      this.serchUser(inputValue);
    }
    
    
  },
  onScanClick:function() {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })

  },
  onSelected:function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../pay/pay?custid=' + id
    })
  },
  serchUser:function(inputValue) {
    var that = this;
    new Promise((resolve, reject) => {
      resolve();
      // wx.getLocation({
      //   type: 'wgs84',
      //   success: function (res) {
      //     var latitude = res.latitude
      //     var longitude = res.longitude
      //     var speed = res.speed
      //     var accuracy = res.accuracy
      //     resolve();
      //   }
      // })
    }).then(value=>{
      // var param = JSON.stringify({
      //   querparam: inputValue
      // })
      var param = JSON.stringify({
        querparam: '8270104048104497'
      })
      return new Promise((resolve, reject) => {
        new RequestEngine().request(config.queryCustInfo, { formData: param }, { callBy: that, method: that.serchUser, params: [inputValue] }, (success) => {
          resolve(success);
        }, (faild) => {
          reject(faild);
        });
      });
    }).then(value => {
      let custList = value.retData.custList;
      this.setData({
        custList: custList
      });
     }).catch(err => {
       
      });
    
  },
  onValueEvent: function (e){
    this.setData({
      inputValue: e.detail.value
    })
  },
  onCancleClick:function(){
    this.setData({
      inputValue: '',
      custList:null
    })
    
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
  
  }
})