// pages/yuandanproject5/coupon/coupon.js
import RequestEngine from '../../../netApi/requestEngine.js';
var config = require('../../../config.js');
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contributionImgList: [
      'https://www.maywidehb.com/yuandanproject/coupon_1.png',
      'https://www.maywidehb.com/yuandanproject/coupon_2.png',
      'https://www.maywidehb.com/yuandanproject/coupon_3.png'
    ],
    ishiddenToast: true,
    isDisable: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let scene = util.getScene(options);
    var relation = scene.split('~')[1];
    var qrid = scene.split('~')[2];
    this.relation = relation;
    this.qrid = qrid;
    // this.qrid = 325;
    setTimeout(() => {
      this.setData({
        ishiddenToast: false,
        isDisable: false
      });
      setTimeout(() => {
        this.setData({
          ishiddenToast: true,
          isDisable: false
        })
      }, 4000);

    }, 3000);
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
  
  },

  gotoseeTv: function () {
    let that = this;
    wx.navigateTo({
      url: '../../yuandanproject/freewatchtv/freewatchtv?qrid=' + that.qrid,
    })
  },
  gotocoupon : function () {
    let that = this;
    wx.navigateTo({
      url: '../couponsuccess/couponsuccess?qrid=' + that.qrid,
    })
  }
})