// coupReview.js
var utils = require('../../../utils/util.js');
var config = require('../../../config.js');
import RequestEngine from '../../../netApi/requestEngine.js';
// var product = {
//   storeImgList:['../../../img/banner.png'],
//   storeIntro:'神奇的小店',
//   couponIntro:'真的是买一送一',
//   endTime:'2019-01-1',
//   storeAddr:'武汉寺门口',
//   storePhone:'18283838484'
// }
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
    let coupId = options.id;
    setTimeout(()=>{
      this.loadCoupById(coupId);
    },500)
  },
  loadCoupById:function(id){
    var that = this;
    let param = {};
    param.id = id;
    
    new Promise((resolve, reject) => {
      new RequestEngine().request(config.loadProduct, param, { callBy: that, method: that.loadCoupById, params: [id] }, (success) => {
        resolve(success.retData);
      }, (faild) => {
      });
    }).then(value=>{
      this.setData({
        product: value
      });
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