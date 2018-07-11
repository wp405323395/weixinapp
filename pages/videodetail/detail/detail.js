// pages/videodetail/detail/detail.js
import videoController from '../../../template/video.js'
import { netApi, wxRequest } from '../../../netapi.js';
import util from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[{}],
    hidecontroller:true,
    recomendVideo:[],
    comments:[]
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
    let videoId = options.videoId;
    new Promise((resolve,reject)=>{
      wxRequest.request(netApi.videoDetail, { videoId: videoId }, success => {
        this.data.items[0] = success
        for (let item of this.data.items) {
          item.duration = util.formartTime(item.duration);
        }
        this.setData({
          items: this.data.items
        });
        resolve();
      }, faild => {
        resolve();
       });
    }).then(value=>{
      return new Promise((resolve, reject) => {
        wxRequest.request(netApi.recommendListVido, { videoId: videoId }, success => {
          for (let item of success) {
            item.duration = util.formartTime(item.duration);
          }
          this.setData({
            recomendVideo: success
          });
          resolve();
        }, failed => {
          resolve();
        });
      });
    }).then(value=>{
      return new Promise((resolve, reject) => {
        wxRequest.request(netApi.comment, { videoId: videoId }, success => {
          for (let item of success) {
            item.updateAt = util.formartTime1(item.updateAt);
          }
          this.setData({
            comments: success
          });
          resolve();
        }, failed => {
          resolve();
        });
      });
    }).then(value=>{}).catch(err=>{});
    
    
    
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
  }
})