// paySuccess.js
var dataUtil = require('../../requestUtil/buriedPoint.js')
var appInstance = getApp()
var config = require('../../../../config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url: config.schema + '://' + config.host + '/s/paysuccess'
    })
    dataUtil.buriedPoint2({
      sid: appInstance.sid, 
      url: 'page/paysuccess', 
      app: 'qrcode',
      time: new Date().getTime(), 
      type: "page_view", 
      uid: '', 
      mod: 'miniapp',
      args: options
    })
  },

  onClickOk:function(e) {
    wx.navigateBack({
      delta: 2
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