// pages/search/search.js
import { wxRequest, netApi } from '../../netapi.js'
let context;
let videoListAll;
let searchHistory;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotSearchItems:[],
    showRecomend:true,
    channelList:[],
    videoList:[],
    historys:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    context = this;
    this.loadHotSearch();
    wx.getStorage({
      key: 'searchs',
      success: function(res) {
        searchHistory = res.data;
        let historys = searchHistory.split('||-||');
        context.setData({
          historys: historys
        });
      },
    })
  },
  loadHotSearch:function(){
    wxRequest.request(netApi.loadHotSearch,null,success=>{
      context.setData({
        hotSearchItems:success
      });
    },faild=>{

    });   
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
  searchVideo:function(e){
    //todo: 搜索事件
    context.setData({
      showRecomend:false
    });
    wxRequest.request(netApi.search, { key: e.detail.value,'from':'index'}, success=>{
      videoListAll = success.videoList;
      context.setData({
        videoCount: success.videoList.length,
        channelList: success.channelList.splice(0,3),
        videoList: success.videoList.splice(0, 3)
      });
      context.insertStorage(e.detail.value);
    }, failed=>{

    });
  },
  cancleSearch:function(){
    this.setData({
      searchinput:''
    });
  },
  voiceBtn:function(){
    wx.navigateTo({
      url: '../search/voiceSearch/voiceSearch',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  loadMore:function(){
    context.setData({
      videoCount:-1,
      videoList: videoListAll
    });
  },
  insertStorage:function(text) {
    searchHistory = wx.getStorageSync("searchs");
    if (searchHistory) {
      if (searchHistory.indexOf(text) != -1) {
        return ;
      }
      searchHistory = text + "||-||" + searchHistory;
      let historyArr = searchHistory.split('||-||');
      searchHistory = historyArr.splice(0,4).join('||-||');
    } else {
      searchHistory = text;
    }
    wx.setStorage({
      key: 'searchs',
      data: searchHistory
    })
  },
  deleteAllHistory:function(){
    wx.clearStorage();
    searchHistory= '';
    context.setData({
      historys: []
    });
  },
  deleteHistory:function(e){
    console.log(searchHistory);
    let arr = searchHistory.split('||-||');
    arr.splice(e.currentTarget.dataset.index, 1);
    let historys = arr;
    context.setData({
      historys: historys
    });
    searchHistory = historys.join('||-||')
    wx.setStorageSync('searchs', searchHistory);
  }
  
})