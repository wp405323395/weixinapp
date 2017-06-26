// product_detail.js
var loadProductHelper = require('../common/loadProduct.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    product:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var productId = options.id;
    var product = loadProductHelper.getProductById(productId);
    var btnText;
    if (product.isUsed) {
      product.btnText = "已使用";
    } else {
      if (product.isReceive) {
        product.btnText = "立即消费";
      } else {
        product.btnText = "立即领取"
      }

    }
    this.setData(
      { product: product }
    );

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
  consumIt: function (id) {
    console.log("立即消费:" + id);
  },
  receiveIt: function (id) {
    console.log("立即领取+" + id);
  },
  btn_click:function() {
    if (this.data.product.isUsed) {
    } else {
      if (this.data.product.isReceive) {
        this.consumIt(this.data.product.id);
      } else {
        this.receiveIt(this.data.product.id);
      }
    }
  }
 
})