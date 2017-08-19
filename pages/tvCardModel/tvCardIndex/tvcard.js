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
    var scene = decodeURIComponent(options.scene);
    this.getCardInfo(scene);
    if (util.textIsNotNull(this.tvCardNum)) {
      setTimeout(() => {
        this.loadTvCardInfo(this.tvCardNum);
      }, 500);
    }
    
  }, 
  getCardInfo: function (tvCardInfo) {
    if (util.textIsNull(tvCardInfo)) {
      this.setData({
        cardInfo:{
          tvCardNumber:'无此信息',
          custname: '无此信息',
          addr:'无此信息'
        }
      });
      return null;
    }
    let prarams = tvCardInfo.split("~");
    if (prarams == null || prarams.length != 3) {
      this.setData({
        cardInfo: {
          tvCardNumber: '无此信息',
          custname: '无此信息',
          addr: '无此信息'
        }
      });
      return null;
    }
    this.tvCardNum = prarams[2];
    this.qrKind = prarams[0];
    this.serviceID = prarams[1];
    return this.tvCardNum;
  },
  loadTvCardInfo:function(cardNum) {
    var that = this;
    new Promise((resolve, reject) => {
      var param = JSON.stringify({
        tvCardNumber: that.tvCardNum,
        serviceID: that.serviceID,
        qrKind: that.qrKind
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
    let custid = this.data.cardInfo.custid;
    let serviceID = this.data.serviceID;
    if (util.textIsNull(custid)) {
      wx.showModal({
        title: "获取用户信息失败，尝试下拉刷新页面获取信息",
        showCancel: false,
        confirmText: "确定"
      })
      return;
    }
    let url = '../pay/pay?tvCardNum=' + tvCardNum + '&custid=' + custid + '&serviceID=' + serviceID;
    console.log("page_url:::::::", url)
    wx.navigateTo({
      url: url
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
  
  },
  onPullDownRefresh: function () {
    
    if (util.textIsNull(this.tvCardNum)) {
      wx.stopPullDownRefresh();
    } else {
      this.loadTvCardInfo(tvCardNum);
    }
    wx.stopPullDownRefresh()
  }
})