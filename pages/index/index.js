//index.js
const requestUrl = require('../../config').requestUrl
const duration = 2000
var common = require('../../netApi/loadProduct.js');
var mta = require('../../utils/mta_analysis.js');
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
    foot_loading:false
  },

  onShow: function () {
    this.loadProduct();
  },

  onLoad: function (options) {
    mta.Page.init();
    var scene = options.scene;
    //scene = '../product_detail/product_detail?id=10001';
    if(scene != undefined) {
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

      wx.getSystemInfo({
        success: function (res) {
          console.info(res.windowHeight);
          tickit_width = res.windowWidth * 0.35;
          tickit_height = res.windowHeight * 0.13;
          that.setData({
            bannerHeight: res.windowHeight*0.3,
            tickit_width: res.windowWidth*0.35,
            tickit_height: res.windowHeight * 0.13
          });
        }
      });
      try {
        wx.setStorageSync('isUsedNeedRefresh', 'unneed');
        wx.setStorageSync('isIndexNeedRefresh', 'unneed');
        wx.setStorage({
          key:'tickit_height',
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
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
         testStr:'abbdbdbbd'
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





















