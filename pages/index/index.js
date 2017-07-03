//index.js
const requestUrl = require('../../config').requestUrl
const duration = 2000
var common = require('../common/loadProduct.js')
//获取应用实例
var app = getApp()
var firstLoad;
var scrollHeight;
var that;
Page({
  data: {
    toView: 'green',
    userInfo: {},
    products: {},
    background: ['../../image/banner.png', '../../image/banner.png', '../../image/banner.png'],
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    foot_loading:true
  },

  onShow: function () {
    this.loadProduct();
  },

  onLoad: function () {
    wx.clearStorageSync();
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 10000
    });
    firstLoad = true;
    that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });
      wx.getSystemInfo({
        success: function (res) {
          console.info(res.windowHeight);
          that.setData({
            bannerHeight: res.windowHeight*0.3,
            tickit_width: res.windowWidth*0.35,
            tickit_height: res.windowHeight * 0.13
          });
        }
      });
      
  },

  /**
   * 加载商品
   */
  loadProduct: function () {
    var self = this

    self.setData({
      loading: true
    })
    try {
      var value = wx.getStorageSync('isIndexNeedRefresh');
      if ('need' === value) {
        try {
          wx.setStorageSync('isIndexNeedRefresh', 'unneed');
        } catch (e) {
        }
        wx.showToast({
          title: "loading",
          icon: "loading",
          duration: 10000
        });
      } else {
        if (!firstLoad) {
          return;
        }

      }
    } catch (e) {
      // Do something when catch error
    }
    firstLoad = false;
    wx.showNavigationBarLoading();

    wx.request({
      url: requestUrl,
      data: {
        noncestr: Date.now()
      },
      success: function (result) {
        self.setData({
          loading: false
        })
        self.setData({
          products: common.getProducts()
        })
        wx.hideNavigationBarLoading();
        wx.hideToast();

      },

      fail: function ({errMsg}) {
        self.setData({
          loading: false
        })
        self.setData({
          products: common.getProducts()
        })

        wx.hideNavigationBarLoading();
        wx.hideToast();
      }
    })
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





















