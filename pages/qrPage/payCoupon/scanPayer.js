// scanPayer.js
import RequestEngine from '../../../netApi/requestEngine.js';
var Promise = require('../../../libs/es6-promise.js').Promise;
var config = require('../../../config.js');
var util = require('../../../utils/util.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHidden:true
  },
  loadScanQr: function (scene) {
    var that = this;
      new Promise((resolve,reject)=>{
        var param = JSON.stringify({
          scene: scene
        })
        new RequestEngine().request(config.mercSureUseCoup, { formData: param }, { callBy: that, method: that.loadScanQr, params: [scene] }, (success) => {
          resolve(success);
        }, (faild) => {
          reject(faild);
        })
      }).then(value => {
        this.setData({
          isHidden: false
        });
        
        if (value.retCode == '0') {
          this.setData({
            shoped_faild: false
          });
        } else {
          this.setData({
            shoped_faild: true
          });
        }
      }).catch(err => {
        wx.showModal({
          title: '提示',
          content: err,
          showCancel: false
        })
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var scene = decodeURIComponent(options.scene);
    scene = "ssssss";
    if (util.textIsNull(scene)) {
      wx.showModal({
        title: '提示',
        content: '二维码信息有误',
        showCancel:false
      })
    } else {
      this.loadScanQr(scene);
    }
    
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