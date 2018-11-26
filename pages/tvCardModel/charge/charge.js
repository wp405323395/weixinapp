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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.params = options.params
    if (!this.params) {
      return;
    } else {
      this.params = JSON.parse(decodeURIComponent(this.params))
    }
    this.charge()
//    this.queryActivityImageUrl();
  },

  // queryActivityImageUrl(){
  //   netData.queryActivityImageUrl(appInstance.cardInfo).then(value =>{
  //     console.log('得到的返回结果是：',value)
  //     this.setData({
  //       coupBanner: conf.srcUrl + value
  //     })
      
  //   })
  // },
  //加在优惠券
  
  charge:function(){
    charge.charge(this.params,success=>{
        wx.requestPayment({
          timeStamp: success.timeStamp,
          nonceStr: success.nonceStr,
          package: success.package,
          signType: success.signType,
          paySign: success.paySign,
          success(res) { 
            wx.showModal({
              title: '提示',
              content: '充值成功',
              showCancel:false,
              success(res) {
                if (res.confirm) {
                  wx.navigateBack({
                    
                  })
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
                  wx.navigateBack({
                    
                  })
                }
              }
            })
          }
        })

      },faild=>{});
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