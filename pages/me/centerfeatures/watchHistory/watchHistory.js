// pages/me/centerfeatures/watchHistory/watchHistory.js
import { netApi, wxRequest } from '../../../../netapi.js'
let context;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isliving:true,
    videos:[],
    channels:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    context = this;
    this.videos();
    this.channels();
  },
  channels:function(){
    wxRequest.request(netApi.watchChannelHistory, null, success => {
      for (let time of success) {
        time.timeRecord = context.formatDuring(time.endTime - time.startTime);
        time.timebefore = context.formatDuring2(new Date().getTime() - time.lastWatchTime);
      }
      context.setData({
        channels: success
      });
    }, faild => { });
  },
  videos:function(){
    wxRequest.request(netApi.watchVideoHistory,null,success=>{
      for(let time of success) {
        time.timeRecord  = context.formatDuring(time.endTime - time.startTime);
        time.timebefore = context.formatDuring2(new Date().getTime() - time.lastWatchTime);
      }
      context.setData({
        videos: success
      });
    },faild=>{});
  },
  formatDuring:function(mss){
    var hours = parseInt(mss / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = (mss % (1000 * 60)) / 1000;
    return  hours + ":" + minutes + ":"+seconds;
  },
  formatDuring2:function(mss){
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = (mss % (1000 * 60)) / 1000;
    if(days) {
      return days + "天"
    } else if (hours) {
      return hours + "小时"
    } else if(minutes) {
      return minutes + "分钟";
    }
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
  toggleTap:function(){
    this.setData({
      isliving: !this.data.isliving
    });
  }
})