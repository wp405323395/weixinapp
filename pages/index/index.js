//index.js
const requestUrl = require('../../config').requestUrl
const duration = 2000
var common = require('../common/loadProduct.js')
//获取应用实例
var app = getApp()
var firstLoad;
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

  onShow: function () {
    this.loadProduct();
  },

  onLoad: function () {
    firstLoad = true;
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
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

    if (this.data.deleteItem) {
      this.setData({
        deleteItem: false
      });

    } else {
      if (!firstLoad) {
        return;
      }

    }
    firstLoad = false;
    wx.showNavigationBarLoading();

    wx.request({
      url: requestUrl,
      data: {
        noncestr: Date.now()
      },
      success: function (result) {
        wx.hideNavigationBarLoading();
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
        wx.hideNavigationBarLoading();
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
  productClick: function (event) {
    var product = event.currentTarget.dataset.name;
    console.log("点击了+" + product.id);
    wx.navigateTo({
      url: '../product_detail/product_detail?id=' + product.id,
    });
  },
  onPullDownRefresh: function () {
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    })
    console.log('onPullDownRefresh', new Date())
  },
  stopPullDownRefresh: function () {
    wx.stopPullDownRefresh({
      complete: function (res) {
        wx.hideToast()
        console.log(res, new Date())
      }
    })
  }
})





















