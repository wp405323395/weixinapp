// tvcard.js
import RequestEngine from '../../../netApi/requestEngine.js';
var Promise = require('../../../libs/es6-promise.js').Promise;
var config = require('../../../config.js');
var util = require('../../../utils/util.js');
var qrid
Page({

  data: {

    hidd1:true,
    hidd2:true,
  },

  /*qrid查询*/
  onLoad: function (options) {
    let that=this;
    qrid = util.getScene(options, function (scene){
      if (scene.failed) {
        setTimeout(() => {
          that.loadRecordHistory();
        }, 500);
      } else {
        that.getQrInfo(scene);
        setTimeout(() => {
          if (util.textIsNotNull(that.tvCardNum)) {
            that.loadTvCardInfo(that.tvCardNum);
          } else {
            that.loadRecordHistory();
          }

        }, 500);
      }
      
    })
  },
  onSearchMore:function(){
    wx.navigateTo({
      url: '../msgConfirm/confirm',
    })
  },
  onSelected: function (e) {
    let uploadNetApi = require('../requestUtil/uploadNetApi.js')
    uploadNetApi.savePageLog('pay', 'tvcard', 0)
    let item = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../pay/pay?qrid=${qrid}&custid=${item.custid}&tvCardNum=${item.tvCardNumber}&addr=${item.addr}&custname=${item.custname}&mobile=${item.mobile}&city=${item.city}`
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

      let hidd1 = false;
      let hidd2 = true;
      if(value != null) {
        let cardList = value.custInfolist;
        if(cardList.length == 0) {
          hidd1 = false; hidd2 = true;
        } else {
          hidd1 = true; hidd2 = false;
        }
      } else {
        hidd1 = false; hidd2 = true;
      }
      this.setData({
        hidd1: hidd1,
        hidd2: hidd2,
        custList: value.custInfolist
      });
    }).catch(err => { 
      this.setData({
        hidd1: false,
        hidd2: true
      });
    })
    
  },
  getQrInfo: function (tvCardInfo) {
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
    //-------------------------------------------------------------------

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
      let uploadNetApi = require('../requestUtil/uploadNetApi.js')
      uploadNetApi.savePageLog('pay', 'tvcard', 1)
      let cardInfo = value.custList[0];
      let url = `../pay/pay?qrid=${qrid}&tvCardNum=${this.tvCardNum}&custid=${cardInfo.custid}&serviceID=${this.serviceID}&qrKind=${this.qrKind}&addr=${cardInfo.addr}&custname=${cardInfo.custname}&mobile=${cardInfo.mobile}&city=${cardInfo.city}`;
      wx.redirectTo({
        url: url
      })
    }).catch(err=>{
        wx.showModal({
          title: "获取用户信息失败，尝试下拉刷新页面获取信息",
          showCancel: false,
          confirmText: "确定"
        })
        return;
    });
  },
  onMsgConfirm:function(e){
    wx.navigateTo({
      url: '../msgConfirm/confirm',
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