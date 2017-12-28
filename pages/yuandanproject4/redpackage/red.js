// pages/yuandanproject4/redpackage/red.js
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isClose:false
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
  buy: function() {
    wx.navigateTo({
      url: '../paySuccess/paySuccess?qrid=' + this.qrid,
    })
  },
  ping: function(){
    this.setData({
      isClose: true
    });
    wx.navigateTo({
      url: '../pingdan/pingdan?qrid=' + this.qrid,
    })
  },
  onShareAppMessage: function () {
    return {
      title: '拼单',
      path: 'pages/yuandanproject4/mypingdan/mypingdan?qrid' + this.qrid,
      success: function (res) {
        // 转发成功
        wx.navigateTo({
          url: '../pingdansuccess/pingdansuccess?qrid=' + this.qrid,
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  share: function () {
    this.setData({
      isClose: true
    });
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  close:function(){
    this.setData({
      isClose:true
    });
  }
})