// detail.js
var config = require('../../config.js');
var requestEngin = require('../../netApi/requestModle.js');
var utils = require('../../utils/util.js');
var product
var autoflag;
var idMap;
var useCoupParam;
var receiveParam;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unShow: true,
    isHidden: true,
    isHidden1: true,
    isHidden2: true,
    product: product,
    btnStr: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    utils.getAuther('scope.writePhotosAlbum');
    var scene = decodeURIComponent(options.scene);
    var page = decodeURIComponent(options.page);
    console.log('scene::' + scene);
    console.log('page::' + page);
    wx.setNavigationBarTitle({
      title: scene
    })
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var bannerHeight = res.screenHeight * 0.25;
        that.setData({
          bannerHeight: bannerHeight,
          scrollViewHeight: res.screenHeight
        });
      }
    });
    //'id-','relaId-'
    idMap = options.id.split('-');
    this.loadProduct();
  },
  onPhoneCall: function (e) {
    let phoneNumber = e.currentTarget.dataset.phonenumber;
    wx.makePhoneCall({
      phoneNumber: phoneNumber //仅为示例，并非真实的电话号码
    })
  },
  loadProduct: function () {
    var that = this;
    var key = idMap[0];
    var value = idMap[1];
    let param = {};
    if (key == 'id') {
      param.id = value;
    } else if (key == 'relaId') {
      param.relaId = value;
    }
    new Promise((resolve, reject) => {
      requestEngin.request(config.loadProduct, param, { callBy: that, method: that.loadProduct, params: [] }, (success) => {
        resolve(success.retData);
      }, (faild) => {
      });
    }).then((value) => {
      if (value.relaReceiveFlag == '0') {
        value.receiveMemo = '立即使用';
      }
      that.setData({
        product: value,
      });
    }, (err) => {

    });
  },

  click: function (e) {
    var key = idMap[0];
    var value = idMap[1];
    let param = {};
    if (key == 'relaId') {
      new Promise((resolve, reject) => {
        wx.showToast({
          title: "获取位置中...",
          icon: "loading",
          duration: 30000
        });
        wx.getLocation({
          type: 'wgs84',
          success: function (res) {
            wx.hideToast(); 
            resolve(res);
          },
          fail: function (err) {
            wx.hideToast();
            reject(err);
          }
        })
      })
        .then((value) => {
          var key = idMap[0];
          var val = idMap[1];
          useCoupParam = {};
          useCoupParam.relaId = val;
          useCoupParam.latitude = value.latitude;
          useCoupParam.longitude = value.longitude;
          return this.useCoup();
        }, (err) => { })
        .then(value => {
          //>>>>>>>>>>>超出200米
          if (!value.relaReceiveFlag) {
            wx.showModal({
              content: value,
              confirmText: "确定",
              cancelText: "取消"
            })
            return;
          }
          if (value.relaReceiveFlag == '0') {
            value.receiveMemo = '立即使用';
          }
          //<<<<<<<<<<超出200米
          idMap = ['relaId', value.relaId];
          this.setData({
            product: value
          });
          try {
            wx.setStorageSync('needRefreshData', true)
          } catch (e) {
          }
          
        }, err => {
        });
    } else if (key == 'id') {
      receiveParam = {};
      receiveParam.id = value;
      this.receiveCoup();
    }
    return;

    autoflag = !autoflag;
    if (autoflag) {
      this.setData({
        isHidden: false,
        isHidden2: false
      });
    } else {
      this.setData({
        isHidden: false,
        isHidden1: false
      });
    }

  },
  onGotoDetail:function(e){
    wx.navigateTo({
      url: './storeDetail/storeDetail?storeId=' + this.data.product.storeId,
    })
  },
  receiveCoup: function () {
    var that = this;
    new Promise((resolve, reject) => {
      requestEngin.request(config.receiveCoup, receiveParam, { callBy: that, method: that.receiveCoup, params: [] }, (success) => {
        resolve(success.retData);
      }, (faild) => {
      });
    }).then(value => {
      if (value.relaReceiveFlag == '0') {
        value.receiveMemo = '立即使用';
      }
      idMap = ['relaId', value.relaId];
      that.setData({
        product: value
      });
    }, err => {
    })
  },
  useCoup: function () {
    var that = this;
    return new Promise((resolve, reject) => {
      requestEngin.request(config.useCoup, useCoupParam, { callBy: that, method: that.useCoup, params: [] }, (success) => {
        if (!success.retData) {
          resolve(success.retMsg);
          return;
        }
        resolve(success.retData);
      }, (faild) => {
      });
    })
  },

  onclick_use_it: function (e) {
    this.setData({
      isHidden1: true,
      isHidden2: true,
      isHidden: true
    });
  },
  onclick_continue_get: function (e) {
    wx.navigateBack({

    });
    this.setData({
      isHidden: true,
      isHidden1: true,
      isHidden2: true
    });
  },
  onclick_hide_dialog: function (e) {
    this.setData({
      isHidden: true,
      isHidden1: true,
      isHidden2: true,
    });
  },
  deleteCoup:function(e){
    var deleteCoupParam = {};
    var key = idMap[0];
    var val = idMap[1];
    deleteCoupParam.relaId = val;
    var that = this;
    new Promise((resolve, reject) => {
      requestEngin.request(config.deleteCoup, deleteCoupParam, { callBy: that, method: that.deleteCoup, params: [] }, (success) => {
        if (!success.retData) {
          resolve(success.retMsg);
          return;
        }
        resolve(success.retData);
      }, (faild) => {
      });
    }).then(value=>{
      try {
        wx.setStorageSync('needRefreshData', true)
      } catch (e) {
      }
      wx.navigateBack({
        
      })
    },
    err=>{

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