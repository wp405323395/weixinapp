// pages/channelcenter/channelcenter.js
import { wxRequest, netApi } from '../../netapi.js'
var context;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    channelGroups:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    context = this;
    context.queChannelListByTag();
  },
  queChannelListByTag:function(){
    wxRequest.request(netApi.queChannelListByTag,null, success=>{
      context.setData({
        channelGroups: success
      });
    },faild=>{});
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
  addChannel:function(e){
    let channelid = e.target.dataset.channelid;
    console.log("添加电视台channelid = " + channelid);
    //todo： 添加电视台。
    
    wxRequest.request(netApi.addUserFavoriteChannel, { channelId: channelid},success=>{
      context.queChannelListByTag();
    },faild=>{

    });
  }
})