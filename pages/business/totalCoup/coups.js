// coups.js
var config = require('../../../config.js');
var requestEngin = require('../../../netApi/requestModle.js');
var coups = [{
  id: 100,
  storeName: '小店',
  couponDescrip: '特价水果8.8折',
  useCondition: '全场通用',
  totalCount: 99,
  usedCount: 10,
  receiveCount: 55,
  imgUrl: '../../../img/product5.png',
  coupStatus:0
}, {
  id: 100,
  storeName: '小店',
  couponDescrip: '特价水果8.8折',
  useCondition: '全场通用',
  totalCount: 99,
  usedCount: 10,
  receiveCount: 55,
  imgUrl: '../../../img/product5.png',
  coupStatus: 1
}]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coups: coups
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadAllCoup();
  },
  loadAllCoup:function(e){
    let that = this;
    new Promise((resolve, reject) => {
      requestEngin.request(config.loadAllCoup, null, that.loadAllCoup, (success) => {
        resolve(JSON.parse(success.data).retData);
      }, (faild) => {
        console.log(faild);
      });
    }).then((value) => {
      console.log(value);
    }, (err) => {

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
  
  },
  onCoupClick:function(e) {
    console.log(e);
    wx.navigateTo({
      url: '../coupReview/coupReview?id=' + e.currentTarget.dataset.id,
    })
  }
})