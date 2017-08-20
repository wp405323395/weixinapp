// me.js
//获取应用实例
import RequestEngine from '../../netApi/requestEngine.js';
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
  validateBusiness:function() {
    var that = this;
    new Promise((resolve, reject) => {
      new RequestEngine().request(config.queMercSettled, {}, { callBy: that, method: that.validateBusiness, params: [] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    }).then(value=>{
      if(value.id == null) {
        wx.navigateTo({
          url: '../business/businessAuthor/business',
        })
      } else if (value.retData.storeStatus == '0') {
        wx.setStorageSync('checkingStore', value.retData);
        wx.navigateTo({
          url: '../business/businessChecking/businessChecking',
        })
      } else if (value.retData.storeStatus == '2'){
        wx.setStorageSync("rejectReason", value.retData.reason);
        wx.navigateTo({
          url: '../business/businessCheckReject/reject',
        })
      } else if(value.retData.storeStatus == '1') {
        wx.navigateTo({
          url: '../business/index/index',
        })
      }
    },
    err=>{});
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
    }
  }
})