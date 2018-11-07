// pages/tvCardModel/charge/charge.js
var charge = require('../requestUtil/charge.js');
var netData = require('../requestUtil/netData.js')
var appInstance = getApp()
var conf = require('../../../config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totlaMoney:0,
    cardInfo:null,
    canUseCoup:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cardInfo: appInstance.cardInfo
    })
    
    this.queryActivityImageUrl();
  },

  queryActivityImageUrl(){
    netData.queryActivityImageUrl(appInstance.cardInfo).then(value =>{
      console.log('得到的返回结果是：',value)
      this.setData({
        coupBanner: conf.srcUrl + value
      })
      
    })
  },
  //加在优惠券
  loadCoup() {
    let that = this;
    netData.queryUsrCanUseCoupons(appInstance.cardInfo).then(value => {
      this.coups = value;
      this.coups.sort(function (m, n) {
        return n.discountPrice - m.discountPrice
      })
      let coup = that.getCanUsedCoup(that.data.totlaMoney);
      this.setData({
        canUseCoup: coup
      })
      console.log('可用优惠券，倒序：', this.coups)
    })
    
    
  },
  getCanUsedCoup(price) {
    for (let item of this.coups) {
      if (item.fullPrice <= price) {
        return item
      }
    }
    return null;
  },
  charge:function(){
    if (this.data.totlaMoney>0) {
      let fees = this.data.totlaMoney
      charge.charge(appInstance.cardInfo, this.data.canUseCoup, fees,success=>{
        wx.requestPayment({
          timeStamp: success.timeStamp,
          nonceStr: success.nonceStr,
          package: success.package,
          signType: success.signType,
          paySign: success.paySign,
          success(res) { 
            netData.loadCurrentPackageInfo(appInstance.cardInfo).then(success => {
              appInstance.currentPackageInfo = success
            })
            wx.showModal({
              title: '提示',
              content: '充值成功',
              showCancel:false,
              success(res) {
                if (res.confirm) {
                  
                }
              }})
          },
          fail(res) { 
            wx.showModal({
              title: '提示',
              content: '充值失败',
              showCancel: false,
              success(res) {
                if (res.confirm) {
                  
                }
              }
            })
          }
        })

      },faild=>{});
    } else {
      wx.showToast({ title: '请输入金额', icon:'none'})
    }

  },
  choice:function(target) {
    let coup = this.getCanUsedCoup(target.currentTarget.dataset.money)
    this.setData({
      canUseCoup: coup,
      totlaMoney: target.currentTarget.dataset.money
    })
  },
  gotoCoup:function(){
    wx.navigateTo({
      url: '/pages/elevenAndEleven/index',
    })
  },
  inputMoney:function(target) {
    let coup = this.getCanUsedCoup(target.detail.value);
    this.setData({
      canUseCoup: coup,   
      totlaMoney: target.detail.value
    })
  },
  inputMoneyFocus:function(target){
    this.setData({
      totlaMoney: target.detail.value
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
    this.loadCoup()
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