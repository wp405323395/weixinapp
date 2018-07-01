// pages/videodetail/detail/detail.js
import videoController from '../../../template/video.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[{}],
    hidecontroller:true
  },
  like: function (e) {
    videoController.like(e, this);
  },
  msg: function (e) {
    videoController.msg(e, this);
  },
  star: function (e) {
    videoController.star(e, this);
  },
  share: function (e) {
    videoController.share(e, this);
  },
  play: function (e) {
    videoController.play(e, this);
  },
  showOnTv: function (e) {
    videoController.showOnTv(e, this);
  },
  onVideoEnd: function (e) {
    videoController.onVideoEnd(e, this);
  },
  zan:function(e){
    console.log(e.currentTarget.dataset.index);
  },
  openVideo:function(e){
    console.log(e.currentTarget.dataset.index);
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let videoid = options.videoid;
    console.log(videoid);
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