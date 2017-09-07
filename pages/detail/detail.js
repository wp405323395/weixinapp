// detail.js
var config = require('../../config.js');
import RequestEngine from '../../netApi/requestEngine.js';
var Promise = require('../../libs/es6-promise.js').Promise;
var util = require('../../utils/util.js');
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
    qrImgUrl: "https://www.maywidehb.com/banner/loading.gif",
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
    let relaId_from_share = options.shareCoup_coupId
    this.relaId_from_share = relaId_from_share;
    if (util.textIsNotNull(relaId_from_share)) {
      idMap = ['id', options.id];
    } else {
      var scene = decodeURIComponent(options.q);
      if (util.textIsNull(scene)) {
        var scene = decodeURIComponent(options.scene);
      } else {
        scene = scene.split("scene=")[1];
      }
      if (!util.textIsNull(scene)) {
        this.qrInfo = util.splice(scene);
        setTimeout(() => {
          this.uploadQrInfo(scene);
        }, 500);
      }
      if (this.qrInfo && this.qrInfo.couponId) {
        idMap = ['id', this.qrInfo.couponId];
      } else {
        //'id-','relaId-'
        idMap = options.id.split('-');
      }
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
   
    setTimeout(() => {
      this.loadProduct();
    }, 500);

  },
  getShareCoupon: function (relaId_from_share){
    let that = this;
    new Promise((resolve,reject)=>{
      new RequestEngine().request(config.gainGiveAwayCoupon, { relaId: relaId_from_share}, { callBy: that, method: that.getShareCoupon, params: [relaId_from_share] }, (success) => {
        resolve(success);
      }, (faild) => {
      });
    }).then(value=>{
      wx.showToast({
        icon: "success",
        title: "领取成功",
        mask: true
      })
      setTimeout(() => {
        wx.switchTab({
          url: '../index/index'
        })
      }, 2000);
    }).catch(err=>{
      wx.showToast({
        icon: "fail",
        title: err,
        mask: true
      })
    })
  },
  onPhoneCall: function (e) {
    let phoneNumber = e.currentTarget.dataset.phonenumber;
    wx.makePhoneCall({
      phoneNumber: phoneNumber //仅为示例，并非真实的电话号码
    })
  },
  onClose: function () {
    this.setData({
      isHidden: true
    });
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
        resolve(success);
      }, (faild) => {
      });
    }).then((value) => {
      if (value.relaReceiveFlag == '0') {
        value.receiveMemo = '立即使用';
      }
      that.setData({
        product: value,
      });
      wx.setNavigationBarTitle({
        title: value.storeName
      })
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
  //       util.showToast({
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
  showQr: function (qrUrl) {
    this.setData({
      isHidden: false,
      qrImgUrl: qrUrl
    });

  },
  click: function (e) {
    //领取赠送优惠券
    if (util.textIsNotNull(this.relaId_from_share)) {
      this.getShareCoupon(this.relaId_from_share);
    } else {
      var key = idMap[0];
      var value = idMap[1];
      var that = this;

      if (key == 'relaId') {
        new Promise((resolve, reject) => {
          new RequestEngine().request(config.useCouponByWxCode, { relaId: value }, { callBy: that, method: that.click, params: [] }, (success) => {
            resolve(success);
          }, (faild) => {
          });
        })
          .then((value) => {
            let qrUrl = value.wxcodeurl;
            this.showQr(qrUrl);
          })
          .then(value => {
            try {
              wx.setStorageSync('needRefreshData', true)
            } catch (e) {
            }
          }).catch(err => { });
      } else if (key == 'id') {
        receiveParam = {};
        receiveParam.id = value;
        this.receiveCoup();
      }
    }
    

  },
  onGotoDetail: function (e) {
    wx.navigateTo({
      url: './storeDetail/storeDetail?storeId=' + this.data.product.storeId,
    })
  },
  receiveCoup: function () {
    var that = this;
    new Promise((resolve, reject) => {
      new RequestEngine().request(config.receiveCoup, receiveParam, { callBy: that, method: that.receiveCoup, params: [] }, (success) => {
        resolve(success);
      }, (faild) => {
      });
    }).then(value => {
      wx.showToast({
        icon: "success",
        title: "领取成功",
        mask: true
      })
      setTimeout(() => {
        wx.switchTab({
          url: '../index/index'
        })
      }, 1500);
      //  if (value.relaReceiveFlag == '0') {
      //    //这里依旧显示是因为服务端返回的是--已领取
      //    value.receiveMemo = '立即领取';
      //  }
      // idMap = ['relaId', value.relaId];
      // that.setData({
      //   product: value
      // });
    }, err => {
    })
  },
  // useCoup: function () {
  //   var that = this;
  //   return new Promise((resolve, reject) => {
  //     new RequestEngine().request(config.useCoup, useCoupParam, { callBy: that, method: that.useCoup, params: [] }, (success) => {
  //       if (!success) {
  //         resolve(success.retMsg);
  //         return;
  //       }
  //       resolve(success);
  //     }, (faild) => {
  //     });
  //   })
  // },

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
  deleteCoup: function (e) {
    var deleteCoupParam = {};
    var key = idMap[0];
    var val = idMap[1];
    deleteCoupParam.relaId = val;
    var that = this;
    new Promise((resolve, reject) => {
      new RequestEngine().request(config.deleteCoup, deleteCoupParam, { callBy: that, method: that.deleteCoup, params: [] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    }).then(value => {
      try {
        wx.setStorageSync('needRefreshData', true)
      } catch (e) {
      }
      wx.navigateBack({

      })
    }).catch(err=>{});
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
  onShareAppMessage: function (res) {
    let that = this;
    if (res.from === 'button') {
      new Promise((resolve,reject)=>{
        new RequestEngine().request(config.giveAwayCoupon, { relaId: that.data.product.relaId}, { callBy: that, method: that.onShareAppMessage, params: [res] }, (success) => {
          resolve(success);
        }, (faild) => {
          reject(faild);
        });
      }).then(value=>{
        
      }).catch(err=>{

      })
      // 来自页面内转发按钮
      // console.log(res.target);
      
    }
    return {
          title: '送你一张优惠券，快来领取',
          path: 'pages/detail/detail?shareCoup_coupId=' + that.data.product.relaId + "&id=" + that.data.product.id,
          imageUrl: 'https://www.maywidehb.com/banner/complimentary.png',
          success: function (res) {
            try {
              wx.setStorageSync('needRefreshData', true)
            } catch (e) {
            }
            wx.navigateBack({

            })
          },
          fail: function (res) {
            // 转发失败
          }
        }
    
  }
  
})