// pages/tvCardModel/charge/charge.js
var charge = require('../requestUtil/charge.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totlaMoney:0,
    cardInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cardInfo = JSON.parse(wx.getStorageSync('cardInfo'))
    this.setData({
      cardInfo: cardInfo
    })
  },
  charge:function(){
    if (this.data.totlaMoney>0) {
      let fees = this.data.totlaMoney
      charge.charge(this.data.cardInfo, fees,success=>{
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
    this.setData({
      totlaMoney: target.currentTarget.dataset.money
    })
  },
  inputMoney:function(target) {
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