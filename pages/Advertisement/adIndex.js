// pages/Advertisement/adIndex.js
import RequestEngine from '../../netApi/requestEngine.js';
var config = require('../../config.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    downTime:'',
    click_btn_color:'',
    text_color:'',
    timend:false,
    adImgUrl:'',
    seetime:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var relation = '41';
    // var qrid = '43';
    let scene = util.getScene(options);
    var relation = scene.split('~')[1];
    var qrid = scene.split('~')[2];
    this.relation = relation;
    this.qrid = qrid;
    this.loadPage(relation);
  },
  loadPage(relation){
    let that = this;
    new RequestEngine().request(config.gainADInfo, { relation: relation }, { callBy: that, method: that.loadPage, params: [relation] }, (success) => {
      that.data.downTime = success.addviewtime;
      that.adtype = success.adtype;
      that.adcontext = success.adcontext;
      let timeId = setInterval(() => {
        if (this.data.downTime > 1) {
          this.setData({
            downTime: this.data.downTime - 1,
            adImgUrl: success.adurl,
            seetime: success.seetime
          });
        } else {
          clearInterval(timeId);
          this.setData({
            downTime: '0',
            click_btn_color: '#ef743e',
            text_color: '#ffffff',
            timend: true
          });
        }
      }, 1000);
    }, (faild) => {
     
    });
    
  },
  btnClick:function(){
    let that = this;
    if (!this.data.timend) {
      return;
    }
    if (this.requesting) {
      return;
    }
    this.requesting = true;
    new RequestEngine().request(config.canTrySee, { qrid: this.qrid }, { callBy: this, method: this.btnClick, params: [] }, (success) => {
      
    }, (faild) => {

    }, (requestComplete) =>{
      let ul = '';
      switch(this.adtype){
        case '1':
          ul  = `../detail/detail?id=id-${that.adcontext}`;
          break;
        case '2':
          ul = `./thirdStore/webStore?url=${that.adcontext}`;
          break;
      }
      wx.redirectTo({
        url: ul
      })
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
  
  }
})