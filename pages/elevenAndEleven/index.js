// pages/elevenAndEleven/index.js
var queryCouponsStatus = require('requestUtil/coupNet.js')
var appInstance = getApp()
Page({ 

  /**
   * 页面的初始数据
   */
  data: {
    inputPhone:null,
    inputName:null,
    isShowPop: false,
    coupList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initTime();
    this.initCoupList();
  },
  gotostoreHall(){
    wx.navigateTo({
      url: '/pages/tvCardModel/pay/storeHall',
    })
  },
  initCoupList(){
    queryCouponsStatus.queryCouponsStatus(appInstance.cardInfo,success=>{
      this.setData({
        coupList: success
      })
    }, faildCallback=>{})
  },
  initTime(){
    setTimeout(()=>{
      let date = new Date(2018, 10, 11);
      let dateNow = new Date();
      let mss = date.getTime() - dateNow.getTime();
      var days = parseInt(mss / (1000 * 60 * 60 * 24));
      var  hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var  minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = parseInt((mss % (1000 * 60)) / 1000);
      hours = hours + days * 24
      this.setData({
        hours: hours<10?'0'+hours:hours,
        minutes:minutes<10?'0'+minutes:minutes,
        seconds:seconds<10?'0'+seconds:seconds
      })
      this.initTime()
    },1000);
  },
  noteMeClick:function(){
    this.setData({
      isShowPop: true
    });
  },
  closePop:function(){
    this.setData({
      isShowPop: false
    });
  },
  submitUserInfo:function(){
    
  },
  bindNameInput: function (e) {
    this.setData({
      inputName: e.detail.value
    })
  },
  bindPhoneInput: function (e) {
    this.setData({
      inputPhone: e.detail.value
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