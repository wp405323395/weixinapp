//index.js
const config = require('../../config');
const loginJs = require('../../netApi/login.js');
var common = require('../../netApi/loadProduct.js');
var mta = require('../../utils/mta_analysis.js');
var util = require('../../utils/util.js');
const requestModle = require('../../netApi/requestModle.js');
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
    foot_loading: false
  },

  onShow: function () {
    this.loadProduct();
  },

  onLoad: function (options) {
    mta.Page.init();
    var scene = options.scene;
    //scene = '../product_detail/product_detail?id=10001';
    if (util.textIsNotNull(scene)) {
      wx.navigateTo({
        url: scene
      })
    }
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 10000
    });
    firstLoad = true;
    that = this
    //调用应用实例的方法获取全局数据
    let tickit_width;
    let tickit_height;
    let srcUrl = config.srcUrl;
    that.setData({
      srcUrl: srcUrl
    });
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        tickit_width = res.windowWidth * 0.35;
        tickit_height = res.windowHeight * 0.13;
        that.setData({
          bannerHeight: res.windowHeight * 0.3,
          tickit_width: res.windowWidth * 0.35,
          tickit_height: res.windowHeight * 0.13,
        });
      }
    });
    try {
      wx.setStorageSync('isUsedNeedRefresh', 'unneed');
      wx.setStorageSync('isIndexNeedRefresh', 'unneed');
      wx.setStorage({
        key: 'tickit_height',
        data: tickit_height,
      });
      wx.setStorage({
        key: 'tickit_width',
        data: tickit_width,
      });

    } catch (e) {
    }

  },

  /**
   * 加载商品
   */
  loadProduct: function () {
    this.setData({
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
    this.loadDate();
  },
  loadDate: function () {
    var self = this
    wx.showNavigationBarLoading();
    requestModle.request(config.received_tickit_url, {}, self.loadDate, (result) => {
      var responseObj = JSON.parse(result.data);
      var products = responseObj.retData;
      let cookie = result.header['Set-Cookie'];
      var sortedProducts = common.getProducts(products);
      self.setData({
        loading: false, 
        products: sortedProducts
      })
      wx.hideNavigationBarLoading();
      wx.hideToast();
      firstLoad = false;
    }, (errorMsg) => {
      self.setData({
        loading: false,
        products: common.getProducts()
      })
      wx.hideNavigationBarLoading();
      wx.hideToast();
    }, ()=>{});
  }
})





















