//index.js
const requestUrl = require('../../config').requestUrl
const duration = 2000
var common = require('../common/loadProduct.js')
//获取应用实例
var app = getApp()
Page({
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
  
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    this.loadProduct();
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

  loadMore:function(){
    console.log("加载更多");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

/**
 * 加载商品
 */
  loadProduct: function () {
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
  },

})





















