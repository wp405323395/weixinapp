// used.js
 const requestUrl = require('../../config').requestUrl
 const duration = 2000
var common = require('../common/loadProduct.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView: 'green',

    userInfo: {},
    products: {},
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadProduct();
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

  upper: function (e) {
    //console.log(e)
  },
  lower: function (e) {
    // console.log(e)
  },
  scroll: function (e) {
    // console.log(e)
  },

  loadMore: function () {
    console.log("加载更多");
  },

  /**
   * 加载商品
   */
   loadProduct :function() {
    var self = this

  self.setData({
      loading: true
    })

  wx.request({
      url: requestUrl,
      data: {
        noncestr: Date.now()
      },
      success: function (result) {
        wx.showToast({
          title: '请求成功',
          icon: 'success',
          mask: true,
          duration: duration
        })
        self.setData({
          loading: false
        })
        //////

        self.setData({
          products: common.getProducts()
        })
        //////
        console.log('request success', result)
      },

      fail: function ({errMsg}) {
        console.log('request fail', errMsg)
        self.setData({
          loading: false
        })
        //////

        self.setData({
          products: common.getProducts()
        })
        //////
      }
    })
  }

})