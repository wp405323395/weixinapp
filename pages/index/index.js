// pages/index/index.js
import videoController from '../../template/video.js'
let topicComponent;
let liveChannelComponent;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    topicComponent = this.selectComponent("#topic");
    liveChannelComponent = this.selectComponent("#liveChannel");
  },
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    });
  },
  gotoSearch: function () {
    wx.navigateTo({
      url: '../search/search',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
    switch (e.target.dataset.current) {
      case '0':

        break;
      case '1':
        liveChannelComponent.__proto__.onLoadData();
        break;
      case '2':
        topicComponent.__proto__.onLoadData();
        break;
    }
  },
  voicebtn: function (event) {
    wx.navigateTo({
      url: '../search/voiceSearch/voiceSearch'
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
    if (this.data.currentData == 1) {
      liveChannelComponent.__proto__.initData();
      wx.stopPullDownRefresh();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log();
    if (this.data.currentData == 2) {
      topicComponent.__proto__.initData();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    return videoController.share(e,this);
  },
  
    

})