// pages/topic/topicdetail/topicdetail.js
import videoController from '../../../template/video.js';
import { wxRequest, netApi } from '../../../netapi.js'
let pageNum = 0;
let context;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[],
    topicDetail:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    context = this;
    this.loadTopicDetail(options);
    this.loadItems(options);
    
    //todo ： 加载专区信息
  },
  like: function (e) {
    videoController.like(e, this);
  },
  msg: function (e) {
    videoController.msg(e, this)
  },
  star: function (e) {
    videoController.star(e, this);
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
  onShareAppMessage: function (e) {
    return videoController.share(e, this);
  },
  loadTopicDetail: function (options){
    let topicId = options.topicId;
    console.log("专区id = " + topicId);
    wxRequest.restfulRequest(netApi.topicById, { id: topicId }, successed => {
      if (successed) {
        context.setData({
          topicDetail: successed
        });
      }

    }, failed => {
      console.log(failed);
    });
  },
  loadItems: function (options){
    let topicId = options.topicId;
    console.log("专区id = " + topicId);
    wxRequest.request(netApi.topicDetail, { current: pageNum, topicId: topicId }, successed => {
      pageNum++;
      if (successed) {
        context.setData({
          items: context.data.items.concat(successed)
        });
      }

    }, failed => {
      console.log(failed);
    });
  }
})