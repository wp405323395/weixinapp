// pages/videodetail/detail/detail.js
import videoController from '../../../template/video.js'
import { netApi, wxRequest } from '../../../netapi.js';

import util from '../../../utils/util.js';
let pageNum;
let videoId;
let recomendVideoAll;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{}],
    hidecontroller: true,
    recomendVideo: [],
    commentVideo: []

  },
  like: function (e) {
    // //通过点赞状态增加或减少点赞量
    let item = this.data.items[0];
    this.data.items[0].likeCount = item.isLike ? item.likeCount - 1 : item.likeCount + 1;
    videoController.like(e, this);
  },
  msg: function (e) {
    videoController.msg(e, this);
  },
  star: function (e) {
    // //通过收藏状态增加或减少收藏量
    let item = this.data.items[0];
    this.data.items[0].favoriteCount = item.isFavorite ? item.favoriteCount - 1 : item.favoriteCount + 1;
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
  zan: function (e) {
    console.log(e.currentTarget.dataset.index);
  },
  openVideo: function (e) {
    wx.navigateTo({
      url: '/pages/videodetail/detail/detail?videoId=' +
      e.currentTarget.dataset.videoid,
    })
  },
  //查询视频评论
  commentPage: function () {
    if (pageNum == -1) {
      return;
    }
    wxRequest.request(netApi.comment, { current: pageNum, videoId: videoId }, successed => {
      if (successed) {
        for (let item of successed) {
          item.createAt = util.formatDate(item.createAt,'Y-M-D');
        }
        this.setData({
          commentVideo: pageNum == 1 ? successed :
            this.data.commentVideo.concat(successed)
        });
        pageNum++;
        if (successed.length == 0) {
          pageNum = -1;
        }
      }
    }, failed => { });

  },
  addComment: function (e) {
    let data = {
      videoId: videoId,
      comment: e.detail.value
    }
    wxRequest.request(netApi.addComment, data, successed => { }, failed => { });
    pageNum = 1;
    this.commentPage();
  },
  loadMore: function () {
    this.setData({
      recomendVideoCount: -1,
      recomendVideo: recomendVideoAll
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.netApi = netApi;
    this.wxRequest = wxRequest;
    videoId = options.videoId;
    pageNum = 1;  //视频评论需要分页
    wxRequest.request(netApi.videoDetail, { videoId: videoId }, success => {
      this.data.items[0] = success
      this.data.items[0].duration = util.formartTime(success.duration);
      this.setData({
        items: this.data.items
      });
    }, faild => { });
    wxRequest.request(netApi.recommendListVido, { videoId: videoId }, success => {
      for (let item of success) {
        item.duration = util.formartTime(item.duration);
      }
      recomendVideoAll = success;
      this.setData({
        recomendVideo: success.slice(0, 3),
        recomendVideoCount: success.length
      });
      console.log(this.data.recomendVideoCount + this.data.recomendVideo);
    }, failed => { });
    this.commentPage();
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
    this.commentPage();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    return videoController.share(e, this, this.callback);
  },
  callback:function(){
    this.data.items[0].shareCount = parseInt(this.data.items[0].shareCount) + 1;
    this.setData({ items: this.data.items })
  }
})