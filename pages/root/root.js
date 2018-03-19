// pages/root/root.js
// confirm.js
import RequestEngine from '../../netApi/requestEngine.js';
var Promise = require('../../libs/es6-promise.js').Promise;
var config = require('../../config.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHiddenRoot:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let qrid = options.qrid;
    qrid = '4';
    this.loadQrInfo(qrid);
    
  },
  loadQrInfo: function (qrid){
    let that = this;
    new RequestEngine().request(config.qrDetail+"?qrid="+qrid, { qrid: qrid }, { callBy: that, method: that.loadQrInfo, params: [qrid] }, (success) => {
      that.callBackUrl = encodeURIComponent(JSON.parse(success).callBackUrl);
      this.getRoot();
    }, (faild) => {
      
    });
  },
  getRoot: function(){
    let that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              wx.navigateTo({
                url: "../index/index?callBackUrl=" + that.callBackUrl,
              })
            },
            fail() {
              wx.openSetting({
                success: (res) => {
                }
              })
            }
          })
        }
      }
    });

    wx.getUserInfo({
      success: function (res) {
        wx.navigateTo({
          url: "../index/index?callBackUrl=" + that.callBackUrl,
        })
      },
      fail: function (res) {
        that.setData({
          isHiddenRoot:false
        });
      }
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