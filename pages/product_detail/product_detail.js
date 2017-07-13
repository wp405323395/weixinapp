// product_detail.js
var loadProductHelper = require('../../netApi/loadProduct.js')
const config = require('../../config');
const requestModle = require('../../netApi/requestModle.js');
var productId;
var that;
var product;
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
    product: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    mta.Page.init();
    wx.setNavigationBarTitle({
      title: '详情'
    });
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
    ///////
    var self = this
    requestModle.request(config.queryWxUserCouponDetail, { id: productId }, self.onLoad, (result) => {
      var responseObj = JSON.parse(result.data);
      product = responseObj.retData;
      //0未使用 1已使用 2已删除 3已过期
      //couponstatus;//优惠券状态
      var btnText;
      let unclick;
      if (product.couponstatus == '1') {
        product.btnText = "已使用";
        unclick = true;
      } else if (product.couponstatus == '0') {
        product.btnText = "立即使用";
        unclick = false;
      } else if (product.couponstatus == '-1') {
        product.btnText = "立即领取"
        unclick = false;
      } else if (product.couponstatus == '3') {
        product.btnText = "已过期"
        unclick = true;
      }

      this.setData(
        { product: product ,unclick: unclick}
      );
    }, (errorMsg) => {
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
      path: "../index/index"
    }
  },
  consumIt: function (id) {
    //console.log("立即使用:" + id);
    wx.showModal({
      title: "确认使用？",
      content: "",
      showCancel: true,
      confirmText: "确定",
      success: function (res) {
        if (res.confirm) {
          requestModle.request(config.useCoupon, { id: id }, null, (result) => {
            var responseObj = JSON.parse(result.data);
            if (responseObj.retCode == '0') {
              product.btnText = '已使用'
              let unclick = true;
              that.setData(
                { product: product, unclick: unclick }
              );
              setTimeout(() => {
                wx.showToast({
                  title: "使用成功"
                })
              }, 500);
              
              try {
                wx.setStorageSync('isUsedNeedRefresh', 'need');
                wx.setStorageSync('isIndexNeedRefresh', 'need');
              } catch (e) {
              }
            }

          }, (errorMsg) => {
            setTimeout(() => {
              wx.showToast({
                title: "使用失败"
              })
            }, 500);

          }, () => { });
          that.deleteItem();
        }
      }
    })
  },
  receiveIt: function (id) {
    mta.Event.stat("tickit_receive", { 'tickittype': this.data.product.typeName, 'storename': this.data.product.storeName });
    setTimeout(() => {
      wx.showToast({
        title: "领取失败"
      })
    }, 500);
    
  },
  btn_click: function () {
    if (product.couponstatus == '1') {
      //"已使用";
    } else if (product.couponstatus == '0') {
      //"立即使用";
      this.consumIt(this.data.product.id);
    } else if (product.couponstatus == '-1') {
      //"立即领取"
      this.receiveIt(this.data.product.id);
    } else if (product.couponstatus == '3') {
      //"已过期"
    }
  },
  btn_delete_click: function () {
    this.deleteItem();
    wx.navigateBack(1);
  },

  deleteItem: function () {
    try {
      wx.setStorageSync('isUsedNeedRefresh', 'need');
      wx.setStorageSync('isIndexNeedRefresh', 'need');
    } catch (e) {
    }
  }

})