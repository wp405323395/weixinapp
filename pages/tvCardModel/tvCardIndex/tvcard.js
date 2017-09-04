// tvcard.js
import RequestEngine from '../../../netApi/requestEngine.js';
var Promise = require('../../../libs/es6-promise.js').Promise;
var config = require('../../../config.js');
var util = require('../../../utils/util.js');
Page({

  data: {
    hidd0:false,
    hidd1:true
  },

  onLoad: function (options) {
    var scene = decodeURIComponent(options.scene);
     //scene = '20~219~8270102533142253';
     //scene = '21~1110~8270102533395091';
    this.getCardInfo(scene);
    if (util.textIsNotNull(this.tvCardNum)) {
      setTimeout(() => {
        this.loadTvCardInfo(this.tvCardNum);
      }, 500);
    } else {
      this.setData({
        hidd0:true,
        hidd1:false
      });
    }
  }, 
  getCardInfo: function (tvCardInfo) {
    if (util.textIsNull(tvCardInfo)) {
      return null;
    }
    let prarams = tvCardInfo.split("~");
    if (prarams == null || prarams.length != 3) {
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
      var param = {
        tvCardNumber: that.tvCardNum,
        serviceID: that.serviceID,
        qrKind: that.qrKind
      };
      new RequestEngine().request(config.queryCustInfo, param, { callBy: that, method: that.loadTvCardInfo, params: [cardNum] }, (success) => {
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
    if (util.textIsNull(this.data.cardInfo.custid)) {
      wx.showModal({
        title: "获取用户信息失败，尝试下拉刷新页面获取信息",
        showCancel: false,
        confirmText: "确定"
      })
      return;
    }
    let url = '../pay/pay?tvCardNum=' + this.tvCardNum + '&custid=' + this.data.cardInfo.custid + '&serviceID=' + this.serviceID + "&qrKind=" + this.qrKind;
    wx.navigateTo({
      url: url
    })
  },

  onShareAppMessage: function () {
  },
  onPullDownRefresh: function () {
    
    if (util.textIsNull(this.tvCardNum)) {
      wx.stopPullDownRefresh();
    } else {
      this.loadTvCardInfo(this.tvCardNum);
    }
    wx.stopPullDownRefresh()
  }
})