// pages/me/centerfeatures/feedback/feedback.js
import {netApi, wxRequest} from '../../../../netapi.js';
import util from '../../../../utils/util.js'
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
  submit:function(e){
    let isPhone = util.isPoneAvailable(e.detail.value.number);
    let contentLength = e.detail.value.textarea.length;
    if (!isPhone) {
      this.setData({
        isNotPhone:true
      });
      return ;
    } else if (contentLength == 0) {
      this.setData({
        isContentEmpty: true
      });
      return ;
    }

      let data = {
        contact: e.detail.value.number,
        description: e.detail.value.textarea
      }
      wxRequest.request(netApi.feedback, data, success => {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        });
      }, fail => {
      });
    },
  inputFocus:function(){
    this.setData({
      isContentEmpty: false,
      isNotPhone: false
    });
  }
    
})