// storeDetail.js
var config = require('../../../config.js');
var requestEngin = require('../../../netApi/requestModle.js');
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
      iconPath: '../../../img/go_in.png'
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
    console.log(options.storeId);
    this.data.storeId = options.storeId;
    this.loadStoreDetail();
    
    
  },
  loadStoreDetail:function(e){
    var param = { id: this.data.storeId };
    
    new Promise((resolve, reject) => {
      requestEngin.request(config.queMercDetail, param, this.loadStoreDetail, (success) => {
        resolve(JSON.parse(success.data).retData);
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
    wx.makePhoneCall({
      phoneNumber: '1340000' //仅为示例，并非真实的电话号码
    })
  }
})