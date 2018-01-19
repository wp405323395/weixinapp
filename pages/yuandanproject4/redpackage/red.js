// pages/yuandanproject4/redpackage/red.js
import RequestEngine from '../../../netApi/requestEngine.js';
var config = require('../../../config.js');
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isClose:false,
    prod1:false,
    prod2:false,
    prod3:false,
    productIds:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let scene = util.getScene(options);
    var relation = scene.split('~')[1];
    var qrid = scene.split('~')[2];
    this.relation = relation;
    this.qrid = qrid;
    // this.qrid = 213;
    //this.loadDate();
  },
  loadDate: function (){
    let that = this;
    new RequestEngine().request(config.queryProduct, {}, { callBy: this, method: this.loadDate, params: [] }, (success) => {
      if (success) {
        let productIds = [];
        for (let obj of success) {
          productIds.push(obj.productid);
        }
        console.log(productIds);
        console.log('kdkdk->', (productIds.indexOf(2) != -1) ? 'pingdaning' : '');
        for (let i = 0; i < productIds.length; i++) {
          switch (productIds[i]) {
            case 1:
              that.data.prod1 = true;
            break;
            case 2:
              that.data.prod2 = true;
            break;
            case 3:
              that.data.prod3 = true;
              break;
          }
        }
        that.setData({
          prod1: that.data.prod1,
          prod2: that.data.prod2,
          prod3: that.data.prod3,
          productIds: productIds
        });

      }
      
      
    }, (faild) => {

    }, (requestComplete) => {

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
  buy: function() {
    let that = this;
    wx.navigateTo({
      url: '../paySuccess/paySuccess?qrid=' + this.qrid,
    })
  },
  ping: function(e){
    let that = this;
    this.setData({
      isClose: true
    });
    // let productId = e.currentTarget.dataset.name;
    // if (this.data.productIds.indexOf(productId) != -1) {
    //   wx.navigateTo({
    //     url: '../mypingdan/mypingdan?qrid=' + this.qrid + "&productId=" + e.currentTarget.dataset.name,
    //   })
    // } else {
      wx.navigateTo({
        url: '../pingdan/pingdan?qrid=' + this.qrid + "&productId=" + e.currentTarget.dataset.name,
      })
    // }

  },
  jiarupingdan : function (){
    wx.navigateTo({
      url: '../mypindan2/mypindan?qrid=' + this.qrid,
    })
    // }
  },
  onShareAppMessage: function () {
    let that = this;
    return {
      title: '我刚抢了一个红包，你也来试下吧',
      path: 'pages/yuandanproject4/redpackage/red?qrid' + this.qrid +"&productId=" + 1,
      success: function (res) {
        // 转发成功
        that.close();
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  share: function () {
    this.setData({
      isClose: true
    });
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  close:function(){
    this.setData({
      isClose:true
    });
  }
})