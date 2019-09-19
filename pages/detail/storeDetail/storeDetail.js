// storeDetail.js
var config = require('../../../config.js');
import RequestEngine from '../../../netApi/requestEngine.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    storeId:'',
    storeDetail:{},
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园'
    }],
    covers: [{
      latitude: 23.099994,
      longitude: 113.344520,
      iconPath: ''
    }, {
      latitude: 23.099994,
      longitude: 113.304520,
      iconPath: '/image/location.png'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.storeId = options.storeId;
    this.loadStoreDetail();

  },
  onShowImg:function(events){
    let imgSrc = events.currentTarget.dataset.src;
    wx.previewImage({
      current: imgSrc, // 当前显示图片的http链接
      urls: this.data.storeDetail.storeImgList // 需要预览的图片http链接列表
    })
  },
  loadStoreDetail:function(e){
    var param = { id: this.data.storeId };
    var that = this;
    new Promise((resolve, reject) => {
      new RequestEngine().request(config.queMercDetail, param, { callBy: that, method: that.loadStoreDetail, params: [] }, (success) => {
        resolve(success);
      }, (faild) => {
      });
    }).then((value) => {
      this.setData({
        storeDetail: value,
        markers: [{
          latitude: value.latitude,
          longitude: value.longitude,
          name: 'T.I.T 创意园'
        }],
      });
    }, (err) => {

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
  onPhoneCallClick:function(e) {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.storeDetail.phone //仅为示例，并非真实的电话号码
    })
  }
})