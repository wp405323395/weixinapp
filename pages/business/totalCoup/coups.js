// coups.js
var config = require('../../../config.js');
import RequestEngine from '../../../netApi/requestEngine.js';
// var coups = [{
//   id: 100,
//   coupName: '小店',
//   couponDescrip: '特价水果8.8折',
//   useCondition: '全场通用',
//   totalCount: 99,
//   usedCount: 10,
//   receiveCount: 55,
//   imgUrl: '../../../img/product5.png',
//   coupStatus:0
// }, {
//   id: 100,
//      coupName:
//   couponDescrip: '特价水果8.8折',
//   useCondition: '全场通用',
//   totalCount: 99,
//   usedCount: 10,
//   receiveCount: 55,
//   imgUrl: '../../../img/product5.png',
//   coupStatus: 1
// }]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coups: null,
    hasData: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(()=>{
      this.loadAllCoup();
    },500)
    
  },
  loadAllCoup:function(e){
    let that = this;
    new Promise((resolve, reject) => {
      new RequestEngine().request(config.loadAllCoup, {}, { callBy: that, method: that.loadAllCoup, params: [] }, (success) => {
        resolve(success.retData);
      }, (faild) => {

      });
    }).then((value) => {
       if(value == null || value == undefined || value.length == 0) {
         this.setData({
           hasData:false
         });
         return ;
       }
        let coups = new Array;
        for (var coup of value) {
          
          let { 
            id: id, 
            couponName: coupName, 
            useCondition: useCondition, 
            issueNum: totalCount, 
            usedNum: usedCount, 
            receivedNum: receiveCount, 
            imgurl: imgUrl, 
            couponStatus: coupStatus,
          } = coup;
          let cp = {
            id,
            coupName, 
            useCondition, 
            totalCount, 
            usedCount, 
            receiveCount, 
            imgUrl,
            coupStatus, };
          coups.push(cp);
        }
        this.setData({
          coups: coups
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
  onCoupClick:function(e) {
    wx.navigateTo({
      url: '../coupReview/coupReview?id=' + e.currentTarget.dataset.id,
    })
  }
})