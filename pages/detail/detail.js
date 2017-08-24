// detail.js
var config = require('../../config.js');
import RequestEngine from '../../netApi/requestEngine.js';
var Promise = require('../../libs/es6-promise.js').Promise;
var utils = require('../../utils/util.js');
import Header from '../../netApi/Header.js'  
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
  uploadQrInfo: function (scene) {
    var header = new Header('application/x-www-form-urlencoded').getHeader();
    let ur = config.uploadQrInfo + scene;
    console.log('上传二维码信息：：url:' + ur);
    wx.request({
      header: header,
      url: ur
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    utils.getAuther('scope.writePhotosAlbum');
    var scene = decodeURIComponent(options.scene);
    if (!utils.textIsNull(scene)) {
      this.qrInfo = utils.splice(scene);
      setTimeout(() => {
        this.uploadQrInfo(scene);
      }, 500);
    }
  
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
    if (this.qrInfo && this.qrInfo.couponId) {
      idMap = ['id', this.qrInfo.couponId];
    } else {
      //'id-','relaId-'
      idMap = options.id.split('-');
    }
    setTimeout(()=>{
      this.loadProduct();
    },500);
    
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
      new RequestEngine().request(config.loadProduct, param, { callBy: that, method: that.loadProduct, params: [] }, (success) => {
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
  //按照200米范围是否能消费的逻辑。
  // click: function (e) {
  //   var key = idMap[0];
  //   var value = idMap[1];
  //   let param = {};
  //   if (key == 'relaId') {
  //     new Promise((resolve, reject) => {
  //       utils.showToast({
  //         title: "获取位置中...",
  //         icon: "loading"
  //       });
  //       wx.getLocation({
  //         type: 'wgs84',
  //         success: function (res) {
  //           wx.hideToast(); 
  //           resolve(res);
  //         },
  //         fail: function (err) {
  //           wx.hideToast();
  //           reject(err);
  //         }
  //       })
  //     })
  //       .then((value) => {
  //         var key = idMap[0];
  //         var val = idMap[1];
  //         useCoupParam = {};
  //         useCoupParam.relaId = val;
  //         useCoupParam.latitude = value.latitude;
  //         useCoupParam.longitude = value.longitude;
  //         return this.useCoup();
  //       }, (err) => { })
  //       .then(value => {
  //         //>>>>>>>>>>>超出200米
  //         if (!value.relaReceiveFlag) {
  //           wx.showModal({
  //             content: value,
  //             confirmText: "确定",
  //             cancelText: "取消"
  //           })
  //           return;
  //         }
  //         //<<<<<<<<<<超出200米
  //         wx.showToast({
  //           icon: "success",
  //           title: "成功使用",
  //           mask: true
  //         })
  //         idMap = ['relaId', value.relaId];
  //         this.setData({
  //           product: value
  //         });
  //         try {
  //           wx.setStorageSync('needRefreshData', true)
  //         } catch (e) {
  //         }
          
  //       }, err => {
  //       });
  //   } else if (key == 'id') {
  //     receiveParam = {};
  //     receiveParam.id = value;
  //     this.receiveCoup();
  //   }
  //   return;

  //   autoflag = !autoflag;
  //   if (autoflag) {
  //     this.setData({
  //       isHidden: false,
  //       isHidden2: false
  //     });
  //   } else {
  //     this.setData({
  //       isHidden: false,
  //       isHidden1: false
  //     });
  //   }

  // },
 
  click: function (e) {
    var key = idMap[0];
    var value = idMap[1];
    var that = this;
    let subObj = {};
    subObj.relaId = value;
    let param = {};
    param.formData = JSON.stringify(subObj);

    if (key == 'relaId') {
      new Promise((resolve, reject) => {
        new RequestEngine().request(config.useCouponByWxCode, param, { callBy: that, method: that.click, params: [] }, (success) => {
          resolve(success.retData);
        }, (faild) => {
        });
      })
        .then((value) => {
         
        }, (err) => { })
        .then(value => {
          if (value.retCode == '0') {
            wx.showToast({
              icon: "success",
              title: "成功使用",
              mask: true
            })
          } 
         
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

  },
  onGotoDetail:function(e){
    wx.navigateTo({
      url: './storeDetail/storeDetail?storeId=' + this.data.product.storeId,
    })
  },
  receiveCoup: function () {
    var that = this;
    new Promise((resolve, reject) => {
      new RequestEngine().request(config.receiveCoup, receiveParam, { callBy: that, method: that.receiveCoup, params: [] }, (success) => {
        resolve(success.retData);
      }, (faild) => {
      });
    }).then(value => {
      wx.showToast({
          icon: "success",
          title: "领取成功",
          mask:true
       })
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
      new RequestEngine().request(config.useCoup, useCoupParam, { callBy: that, method: that.useCoup, params: [] }, (success) => {
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
      new RequestEngine().request(config.deleteCoup, deleteCoupParam, { callBy: that, method: that.deleteCoup, params: [] }, (success) => {
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