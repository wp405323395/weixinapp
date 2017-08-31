// me.js
//获取应用实例
import RequestEngine from '../../netApi/requestEngine.js';
var Promise = require('../../libs/es6-promise.js').Promise;
var config = require('../../config.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  onClick:function(e){
    switch (e.currentTarget.id) {
      case "my_coup":
        wx.navigateTo({
          url: '../mycoup/mycoup',
        })
        break;
      case "my_red_package":
        wx.navigateTo({
          url: '../myRedPackage/myRedPackage',
        })
        break;
      case "my_order":
        wx.navigateTo({
          url: '../myOrder/myOrder',
        })
        break;
      case "my_store":
        this.validateBusiness();
       
        break;
    }

  },

  validateBusinessStep1: function (userInfo) {
    var that = this;
    new Promise((resolve, reject) => {
      new RequestEngine().request(config.queMercSettled, { formData: JSON.stringify(userInfo) }, { callBy: that, method: that.validateBusinessStep1, params: [userInfo] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    }).then(value => {
      if (value.id == null) {
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.userLocation']) {
              wx.authorize({
                scope: 'scope.userLocation',
                success() {
                  wx.navigateTo({
                    url: '../business/businessAuthor/business',
                  })
                },
                fail() {
                  wx.openSetting({
                    success: (res) => {
                    }
                  })
                }
              })
            } else {
              wx.navigateTo({
                url: '../business/businessAuthor/business',
              })
            }
          }
        })
        
      } else if (value.retData.storeStatus == '0') {
        wx.setStorageSync('checkingStore', value.retData);
        wx.navigateTo({
          url: '../business/businessChecking/businessChecking',
        })
      } else if (value.retData.storeStatus == '2') {
        wx.setStorageSync("rejectReason", { rejectReason: value.retData.reason, rejectStoreId: value.retData.id});
        wx.navigateTo({
          url: '../business/businessCheckReject/reject',
        })
      } else if (value.retData.storeStatus == '1') {
        wx.navigateTo({
          url: '../business/index/index',
        })
      }
      if (!value.retData || !value.retData.assisttype) {
        return;
      }
      let assisttype = value.retData.assisttype;
      //0:店长 1：店员 2：普通用户
      wx.setStorage({
        key: 'assisttype',
        data: assisttype
      })
    },
      err => { });
  },
  validateBusiness:function() {
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
            },
            fail(){
              wx.openSetting({
                success: (res) => {
                }
              })
            }
          })
        }
      }
    })
    let that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        that.validateBusinessStep1(res);
      }
    })
    
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
  
  },
  onTestClick:function(e){
    switch (e.currentTarget.dataset.id) {
      case '0':
        wx.navigateTo({
          url: '../business/index/index',
        });
        break;
      case '1':
        wx.navigateTo({
          url: '../detail/storeDetail/storeDetail',
        });
        break;
      case '2':
        wx.navigateTo({
          url: '../tvCardModel/tvCardIndex/tvcard',
        });
        break;
      case '3':
        wx.navigateTo({
          url: '../redPackage/red',
        })
        break;
      case '4':
        wx.navigateTo({
          url: '../business/businessChecking/businessChecking',
        })
        break;
      case '5':
        wx.navigateTo({
          url: '../qrPage/payCoupon/scanPayer',
        })
        break;
      case '6':
        wx.navigateTo({
          url: '../qrPage/storeOwnerAddPerson/addPersonScan',
        })
        break;
    }
  }
})