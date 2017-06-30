// product_detail.js
var loadProductHelper = require('../common/loadProduct.js')
var productId;
var that;
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
    that = this;
    productId = options.id;
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
  navigateBackFunc: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '人气小店',
      desc: '最具人气的小店!',
      path: "../pages/index/index"
    }
  },
  consumIt: function (id) {
    //console.log("立即消费:" + id);
    wx.showModal({
      title: "确认消费？",
      content: "",
      showCancel: true,
      confirmText: "确定",
      success:function(res) {
        if(res.confirm) {
          console.log('确认消费了。。。。。');
          wx.showToast({
            title: "消费成功"
          });
          that.deleteItem();
        }
      }
    })
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
  },
  btn_delete_click:function() {
    this.deleteItem();
    wx.navigateBack(1);
  },

  deleteItem:function() {
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 1]  //当前界面
    var prevPage = pages[pages.length - 2]  //上一个页面
    prevPage.setData({
      refresh_receive: true,
      refresh_used:true
    })
  }
 
})