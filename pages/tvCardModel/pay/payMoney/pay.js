// pages/tvCardModel/pay/payMoney/pay.js
var netData = require('../../requestUtil/netData.js')
var dataUtil = require('../../requestUtil/buriedPoint.js')
var appInstance = getApp()
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
    this.params = options.params
    
    if(!this.params) {
      return;
    } else {
      this.params = JSON.parse(decodeURIComponent(this.params))
    }
    this.pay()
  },
  
  pay: function () {
    let that = this;
    if (that.isPaying) {
      wx.showToast({
        title: '正在支付',
      })
      return;
    }
    dataUtil.buriedPoint("订单支付页,立即支付", appInstance.cardInfo);
    that.isPaying = true;
    netData.pay(this.params).then(value => {
      wx.requestPayment({
        'timeStamp': value.timeStamp,
        'nonceStr': value.nonceStr,
        'package': value.package,
        'signType': value.signType,
        'paySign': value.paySign,
        'success': function (res) {
          that.isPaying = false;
          wx.redirectTo({
            url: '../success/paySuccess',
          })
        },
        'fail': function (res) {
          that.isPaying = false;
          wx.navigateBack({})
        }
      })
    }).catch(err => {
      that.isPaying = false;
      wx.showModal({
        title: "支付失败,如有疑问请拨打客服电话96516",
        showCancel: false,
        confirmText: "取消",
        success(res) {
          if (res.confirm) {
            wx.navigateBack({}) 
          }
        }
      })
      ///// 记录错误日志
      let uploadNetApi = require('../../requestUtil/uploadNetApi.js')
      uploadNetApi.payFaild(err, this.params.city, this.params.custid, this.params.tvCardNumber, this.params.serviceID, this.params.qrKind, this.params.salescode)
      //////
    });

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
    this.isPaying = false
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