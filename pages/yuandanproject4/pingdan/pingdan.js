// pages/yuandanproject4/pingdan/pingdan.js
import RequestEngine from '../../../netApi/requestEngine.js';
var config = require('../../../config.js');
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avctor:[],
    mergeOrder:{},
    minutes: '00',
    seconds: '00',
    hours:'00'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.qrid = options.qrid;
    this.productId = options.productId;
    console.log("productId->", this.productId);
    this.loadDate(this.productId);
    this.leftTime = 85000400;
    this.countTime();

  },
  countTime:function(){
    setTimeout(() => {
      this.leftTime -= 1000;
      var days = parseInt(this.leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数 
      var hours = parseInt(this.leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 
      var minutes = parseInt(this.leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
      var seconds = parseInt(this.leftTime / 1000 % 60, 10);//计算剩余的秒数 
      this.countTime();

      this.setData({
        minutes: minutes,
        seconds: seconds,
        hours: hours
      });
    }, 1000);
  },
  loadDate: function (productId) {
    let that = this;
    new Promise((resolve,reject)=>{
      resolve();
    }).then(value=>{
      return that.loadWxInfo();
    }).then(value=>{
      return that.loadMergeOrderByProductId(productId);
    }).then(value=>{
      that.setData({
        mergeOrder: value
      });
      return that.loadPersons(value.id);
    }).then(value=>{
      that.refreshUserHeader(value);
    })
    .catch(err=>{

    })
  },
  refreshUserHeader: function (value){
    this.setData({
      avctor: value
    });
  },
  loadWxInfo:function(){
    let that = this;
    return new Promise((resolve,reject)=>{
      wx.getUserInfo({
        success: function (res) {
          let userInfo = res;
          new RequestEngine().request(config.queMercSettled, userInfo, { callBy: that, method: that.loadWxInfo, params: [userInfo] }, (success) => {
            resolve(success);
          }, (faild) => {
            reject(faild);
          });
        }
      })
    });
    
  },
  loadMergeOrderByProductId: function (productId){
    return new Promise((resolve,reject)=>{
      new RequestEngine().request(config.queryMergeOrderByProductId, { productid: productId }, { callBy: this, method: this.loadMergeOrderByProductId, params: [productId] }, (success) => {
        if (success) {
          resolve(success);
        }
      }, (faild) => {
        reject(faild);
      }, (requestComplete) => {
      });
    });
  },
  loadPersons:function(mergeOrderid){
   return new Promise((resolve,reject)=>{
     new RequestEngine().request(config.queryMergeOrderMembers, { id: mergeOrderid }, { callBy: this, method: this.loadPersons, params: [mergeOrderid] }, (success) => {
        if (success) {
          resolve(success);
        }
      }, (faild) => {
        reject(faild);
      }, (requestComplete) => {
      });
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
    let that = this;
    new RequestEngine().request(config.queryMergeOrderMembers, { id: this.data.mergeOrder.id }, { callBy: this, method: this.onPullDownRefresh, params: [] }, (success) => {
      that.setData({
        avctor:success
      });
    }, (faild) => {
      
    }, (requestComplete) => {
      wx.stopPullDownRefresh();
    });

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
    let that = this;
    return {
      title: '3人成团广电节目包优惠购，快来参与把',
      path: 'pages/yuandanproject4/mypingdan/mypingdan?qrid' + this.qrid + "&orderid=" + that.data.mergeOrder.id,
      success: function (res) {
        // // 转发成功
        
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  share: function(){
    let that = this;
    if (this.data.avctor.length == 3) {
      wx.navigateTo({
                url: '../pingdansuccess/pingdansuccess?qrid=' + that.qrid,
              })
    } else {
      wx.showShareMenu({
        withShareTicket: true
      })
    }

  }
})