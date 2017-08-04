// detail.js
var config = require('../../config.js');
var requestEngin = require('../../netApi/requestModle.js');
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
    indicatorDots: true,
    autoplay: true,
    unShow: true,
    interval: 5000,
    duration: 1000,
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
      requestEngin.request(config.loadProduct, param, that.loadProduct, (success) => {
        console.log(success);
        resolve(JSON.parse(success.data).retData);
      }, (faild) => {
        console.log(faild);
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
  onClickRedpackage: function (e) {
    wx.navigateTo({
      url: '../redPackage/red',
    })
  },

  click: function (e) {
    console.log(this.data.product);
    var key = idMap[0];
    var value = idMap[1];
    let param = {};
    if (key == 'relaId') {
      new Promise((resolve, reject) => {
        wx.getLocation({
          type: 'wgs84',
          success: function (res) {
            resolve(res);
          },
          fail: function (err) {
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
          idMap = ['relaId', value.relaId];
          this.setData({
            product: value
          });
          console.log(value);
        }, err => {
          console.log(err);
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
  receiveCoup: function () {
    var that = this;
    new Promise((resolve, reject) => {
      requestEngin.request(config.receiveCoup, receiveParam, that.receiveCoup, (success) => {
        console.log(success);
        resolve(JSON.parse(success.data).retData);
      }, (faild) => {
        console.log(faild);
      });
    }).then(value => {
      console.log(value);
      if (value.relaReceiveFlag == '0') {
        value.receiveMemo = '立即使用';
      }
      idMap = ['relaId', value.relaId];
      that.setData({
        product: value
      });
    }, err => {
      console.log(err);
    })
  },
  useCoup: function () {
    var that = this;
    return new Promise((resolve, reject) => {
      requestEngin.request(config.useCoup, useCoupParam, that.useCoup, (success) => {
        console.log(success);
        if (!JSON.parse(success.data).retData) {
          resolve(JSON.parse(success.data).retMsg);
          return;
        }
        resolve(JSON.parse(success.data).retData);
      }, (faild) => {
        console.log(faild);
      });
    })
  },
  tvclick: function (e) {
    wx.navigateTo({
      url: '../tvCard/tvcard',
    });
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