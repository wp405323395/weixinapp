// detail.js
var config = require('../../config.js');
var requestEngin = require('../../netApi/requestModle.js');
var product
var autoflag ; 
var idMap; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    unShow: true,
    interval: 5000,
    duration: 1000,
    isHidden:true,
    isHidden1:true,
    isHidden2:true,
    product: product,
    btnStr:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var bannerHeight = res.screenHeight * 0.25;
        that.setData({
          bannerHeight: bannerHeight,
          scrollViewHeight: res.screenHeight
        });
      }
    });
        //'id-','relaId-'
    idMap = options.id.split('-');
    this.loadProduct();
  },
  loadProduct: function (){
    var that = this;
    var key = idMap[0];
    var value = idMap[1];
    let param={};
    if(key == 'id') {
      param.id = value;
    } else if (key == 'relaId') {
      param.relaId = value;
    }
    new Promise((resolve, reject) => {
      requestEngin.request(config.loadProduct, param, that.loadProduct, (success) => {
        console.log(success);
        resolve(JSON.parse(success.data).retData);
      }, (faild) => {
        console.log(faild);
      });
    }).then((value)=>{
      let btnStr;
      if (key == 'id') {
        switch (parseInt(value.receiveFlag)){
          case 0:
            btnStr='不可领取';
          break;
          case 1:
            btnStr='立即领取';
          break;
        }
      } else if (key == 'relaId') {
        switch (parseInt(value.relaReceiveFlag)){
          case 0:
            btnStr = '立即使用'; 
          break;
          case 1:
            btnStr = '已使用';
          break;
          case 2:
            btnStr = '已过期'; 
          break;
        }
      }
      that.setData({
        product: value,
        btnStr: btnStr
      });
    },(err)=>{

    });
  },
  onClickRedpackage:function(e) {
    wx.navigateTo({
      url: '../redPackage/red',
    })
  },

  click:function(e) {
    autoflag = !autoflag;
    if(autoflag) {
      this.setData({
        isHidden: false,
        isHidden2: false
      });
    } else {
      this.setData({
        isHidden: false,
        isHidden1: false
      });
    }
    
  },
  tvclick:function(e) {
    wx.navigateTo({
      url: '../tvCard/tvcard',
    });
  },
  onclick_use_it:function(e){
    this.setData({
      isHidden1:true,
      isHidden2:true,
      isHidden:true
    });
  },
  onclick_continue_get:function(e){
    wx.navigateBack({
      
    });
    this.setData({
      isHidden: true,
      isHidden1: true,
      isHidden2: true
    });
  },
  onclick_hide_dialog:function(e){
    this.setData({
      isHidden:true,
      isHidden1: true,
      isHidden2: true,
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