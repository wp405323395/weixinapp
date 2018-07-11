// pages/topic/topicdetail/topicdetail.js
import videoController from '../../../template/video.js';
import { wxRequest, netApi } from '../../../netapi.js'
let pageNum = 1;
let context;
let topicId;
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
    pageNum = 1;
    topicId = options.topicId;
    console.log('接受过来的topicid = ' + topicId);
    this.loadTopicDetail();
    this.loadItems();
    
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
    this.loadItems();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    return videoController.share(e, this);
  },
  loadTopicDetail: function (){
    wxRequest.request(netApi.topicById, { id: topicId }, successed => {
      if (successed) {
        context.setData({
          topicDetail: successed
        });
      }

    }, failed => {
      console.log(failed);
    });
  },
  loadItems: function (){
    if(pageNum == -1) {
      return ;
    }
    wxRequest.request(netApi.topicDetail, { current: pageNum, topicId: topicId }, successed => {
      if (successed) {
        pageNum++;
        if (successed.length == 0) {
          pageNum = -1;
        }
        context.setData({
          items: context.data.items.concat(successed)
        });
      }

    }, failed => {
      console.log(failed);
    });
  }
})