// product_detail.js
var loadProductHelper = require('../../netApi/loadProduct.js')
const config = require('../../config');
const requestModle = require('../../netApi/requestModle.js');
var productId;
var that;
var mta = require('../../utils/mta_analysis.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView: 'green',
    background: ['../../image/product1.jpg', '../../image/product2.jpg', '../../image/product3.jpg'],
    vertical: false,
    autoplay: true,
    indicatorDots: true,
    interval: 2000,
    duration: 500,
    product:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    mta.Page.init();
    that = this;
    //调用应用实例的方法获取全局数据
    var srcUrl = config.srcUrl;
    that.setData({
      srcUrl: srcUrl
    });
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          bannerHeight: res.windowHeight * 0.3
        });
      }
    });
    productId = options.id;
    var product = loadProductHelper.getProductById(productId);
    ///////
    var self = this
    wx.showNavigationBarLoading();
    requestModle.request(config.queryWxUserCouponDetail, { id: productId }, self.onLoad, (result) => {
      var responseObj = JSON.parse(result.data);
      var product = responseObj.retData;
      var btnText;
      if (product.isUsed) {
        product.btnText = "已使用";
      } else {
        if (product.isReceive) {
          product.btnText = "立即使用";
        } else {
          product.btnText = "立即领取"
        }
      }
      this.setData(
        { product: product }
      );

      wx.hideNavigationBarLoading();
      wx.hideToast();
    }, (errorMsg) => {
      
      wx.hideNavigationBarLoading();
      wx.hideToast();
    }, () => { });
    ///////
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '人气小店',
      desc: '最具人气的小店!',
      path: "../pages/index/index"
    }
  },
  consumIt: function (id) {
    //console.log("立即消费:" + id);
    wx.showModal({
      title: "确认消费？",
      content: "",
      showCancel: true,
      confirmText: "确定",
      success:function(res) {
        if(res.confirm) {
          console.log('确认消费了。。。。。');
          wx.showToast({
            title: "消费成功"
          });
          that.deleteItem();
        }
      }
    })
  },
  receiveIt: function (id) {
    mta.Event.stat("tickit_receive", { 'tickittype': this.data.product.typeName, 'storename': this.data.product.storeName});
    wx.showToast({
      title: "领取失败"
    });
  },
  btn_click:function() {
    if (this.data.product.isUsed) {
    } else {
      if (this.data.product.isReceive) {
        this.consumIt(this.data.product.id);
      } else {
        this.receiveIt(this.data.product.id);
      }
    }
  },
  btn_delete_click:function() {
    this.deleteItem();
    wx.navigateBack(1);
  },

  deleteItem:function() {
    try {
      wx.setStorageSync('isUsedNeedRefresh', 'need');
      wx.setStorageSync('isIndexNeedRefresh', 'need');
    } catch (e) {
    }
  }
 
})