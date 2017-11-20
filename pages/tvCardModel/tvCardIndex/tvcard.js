// tvcard.js
import RequestEngine from '../../../netApi/requestEngine.js';
var Promise = require('../../../libs/es6-promise.js').Promise;
var config = require('../../../config.js');
var util = require('../../../utils/util.js');
Page({

  data: {
    hidd0:false,
    hidd1:true,
    hidd2:true,
  },

  onLoad: function (options) {
    // var scene = decodeURIComponent(options.q);
    // if(util.textIsNull(scene)) {
    //   var scene = decodeURIComponent(options.scene);
    // } else {
    //   scene = scene.split("scene=")[1];
    // }
    var scene = util.getScene(options)

     //scene = '20~219~8270102533142253';
     //scene = '21~1110~8270102533395091';
    this.getCardInfo(scene);
    setTimeout(() => {
        if (util.textIsNotNull(this.tvCardNum)) {
          this.loadTvCardInfo(this.tvCardNum);
        } else {
          this.loadRecordHistory();
        }
    }, 500);
    
  }, 
  onSearchMore:function(){
    wx.navigateTo({
      url: '../msgConfirm/confirm',
    })
  },
  onSelected: function (e) {
    let item = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../pay/pay?custid=' + item.custid + "&tvCardNum=" + item.tvCardNumber + "&addr=" + item.addr + "&custname=" + item.custname + "&mobile=" + item.mobile
    })
  },
  loadRecordHistory:function(){
    let that = this;
    new Promise((resolve, reject) => {
      new RequestEngine().request(config.queCustInfoByOpenid, {}, { callBy: that, method: that.loadRecordHistory, params: [] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    }).then(value => {
      let hidd0 = true;
      let hidd1 = false;
      let hidd2 = true;
      if(value != null) {
        let cardList = value.custInfolist;
        if(cardList.length == 0) {
          hidd0 = true; hidd1 = false; hidd2 = true;
        } else {
          hidd0 = true; hidd1 = true; hidd2 = false;
        }
      } else {
        hidd0 = true; hidd1 = false; hidd2 = true;
      }
      this.setData({
        hidd0: hidd0,
        hidd1: hidd1,
        hidd2: hidd2
      });
    }).catch(err => { 
      this.setData({
        hidd0: true,
        hidd1: false,
        hidd2: true
      });
    })
    
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
    let url = '../pay/pay?tvCardNum=' + this.tvCardNum + '&custid=' + this.data.cardInfo.custid + '&serviceID=' + this.serviceID + "&qrKind=" + this.qrKind + "&addr=" + this.data.cardInfo.addr + "&custname=" + this.data.cardInfo.custname + "&mobile=" + this.data.cardInfo.mobile;
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