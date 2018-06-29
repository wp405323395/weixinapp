// pages/topic/topicdetail/topicdetail.js
import videoController from '../../../template/video.js';
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
    let topicId = options.topicId;
    console.log("专区id = "+ topicId);
    
    //todo ： 加载专区信息
  },
  like: videoController.like,
  msg: videoController.msg,
  star: videoController.star,
  share: videoController.share, 
  play: videoController.play,
  showOnTv: videoController.showOnTv,
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