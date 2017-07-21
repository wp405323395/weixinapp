// detail.js
var da = require('../../data/data.js').data;
var product = da.productDetail;
var autoflag ;  
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
    isHidden:true,
    isHidden1:true,
    isHidden2:true,
    imgUrls: [
      '../../img/banner.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    product: product
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var productId = options.id;
    console.log(productId);
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
  },
  onClickRedpackage:function(e) {
    wx.navigateTo({
      url: '../redPackage/red',
    })
  },

  click:function(e) {
    autoflag = !autoflag;
    if(autoflag) {
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
  tvclick:function(e) {
    wx.navigateTo({
      url: '../tvCard/tvcard',
    });
  },
  onclick_use_it:function(e){
    this.setData({
      isHidden1:true,
      isHidden2:true,
      isHidden:true
    });
  },
  onclick_continue_get:function(e){
    wx.navigateBack({
      
    });
    this.setData({
      isHidden: true,
      isHidden1: true,
      isHidden2: true
    });
  },
  onclick_hide_dialog:function(e){
    this.setData({
      isHidden:true,
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