// tvcard.js
import { RequestEngine } from '../../../netApi/requestEngine.js';
var config = require('../../../config.js');
var util = require('../../../utils/util.js');
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var scene = decodeURIComponent(options.scene)
    if (scene == undefined) {
      scene = '没有码信息'
    }
    wx.showModal({
      title: '扫码信息',
      content: scene,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
    let tvCardNum = this.getCardInfo(scene);
    if (util.textIsNotNull(tvCardNum)) {
      setTimeout(() => {
        this.loadTvCardInfo(tvCardNum);
      }, 500);
    }
    
  }, 
  getCardInfo: function (tvCardInfo) {
    if (!util.textIsNotNull(tvCardInfo)) {
      this.setData({
        cardInfo:{
          tvCardNumber:'当前信息为空',
          custname: '当前信息为空',
          addr:'当前信息为空'
        }
      });
      return null;
    }
    let prarams = tvCardInfo.split("~");
    if (prarams == null || prarams.length != 3) {
      this.setData({
        cardInfo: {
          tvCardNumber: '当前信息为空',
          custname: '当前信息为空',
          addr: '当前信息为空'
        }
      });
      return null;
    }
    let tvCardNum = prarams[2];
    let qrKind = prarams[0];
    let serviceID = prarams[1];
    this.setData({
      tvCardNum: tvCardNum,
      qrKind: qrKind,
      serviceID: serviceID
    });
    return tvCardNum;
  },
  loadTvCardInfo:function(cardNum) {
    var that = this;
    new Promise((resolve, reject) => {
      var param = JSON.stringify({
        tvCardNumber: this.setData.tvCardNum,
        serviceID: this.setData.serviceID,
        qrKind: this.setData.qrKind
      })
      new RequestEngine().request(config.queryCustInfo, { formData: param }, { callBy: that, method: that.loadTvCardInfo, params: [cardNum] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    }).then(value=>{
      let cardInfo = value.custList[0];
      this.setData({
        cardInfo: cardInfo
      });
    }).catch(err=>{

    });
  },
  onMsgConfirm:function(e){
    wx.navigateTo({
      url: '../msgConfirm/confirm',
    })
  },
  click:function(e){
    let tvCardNum = this.data.tvCardNum;
    let custid = this.data.custid;
    let serviceID = this.data.serviceID;
    wx.navigateTo({
      url: '../pay/pay?tvCardNum=' + tvCardNum + '&custid=' + custid + '&serviceID=' + serviceID
    })
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