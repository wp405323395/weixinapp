// scanPayer.js
import RequestEngine from '../../../netApi/requestEngine.js';
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
        new RequestEngine().request(config.mercSureUseCoup, { scene: scene }, { callBy: that, method: that.loadScanQr, params: [scene] }, (success) => {
          resolve(success);
        }, (faild) => {
          reject(faild);
        })
      }).then(value => {
        this.setData({
          isHidden: false
        });
          this.setData({
            shoped_faild: false
          });
      }).catch(err => {
        this.setData({
          shoped_faild: true
        });
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
    // var scene = decodeURIComponent(options.q);
    // if (util.textIsNull(scene)) {
    //   var scene = decodeURIComponent(options.scene);
    // } else {
    //   scene = scene.split("scene=")[1];
    // }
    var scene = util.getScene(options)

    if (util.textIsNull(scene)) {
      wx.showModal({
        title: '二维码信息有误',
        showCancel: false
      })
      this.setData({
        isHidden: false,
        shoped_faild: true
      });
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