// persons.js
var util = require('../../../utils/util.js')
var config = require('../../../config.js');
import RequestEngine from '../../../netApi/requestEngine.js';  
var Promise = require('../../../libs/es6-promise.js').Promise;
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
  
  },
  loadPersons:function(){
    var that = this;
    new Promise((resolve,reject)=>{ 
      new RequestEngine().request(config.queMercAssistListByStoreid, { }, { callBy: that, method: that.loadPersons, params: [] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      })
    }).then(value => {
      let list = value.retData;
    }).catch(err => { });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadPersons();
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