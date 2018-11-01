// tvcard.js
var util = require('../../../utils/util.js');
var tvCardNet = require('../requestUtil/tvCardNet.js')
var appInstance = getApp()
var myOptions
Page({

  data: {
    custList:null,
  },

  /*qrid查询*/
  onLoad: function (options) {
    myOptions = options;
    this.loadData();
  },
  loadData(){
    let that = this;
    util.getScene(myOptions, function (scene, qrid) {
      if (scene.failed) {
        setTimeout(() => {
          tvCardNet.loadRecordHistory(that)
        }, 500);
      } else {
        that.qrid = qrid;
        that.getQrInfo(scene);
        setTimeout(() => {
          if (util.textIsNotNull(that.tvCardNum)) { //进入产品列表
            tvCardNet.loadTvCardInfo(that, that.tvCardNum, that.qrid);
          } else {
            tvCardNet.loadRecordHistory(that) //进入充值历史记录
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
    let that =this;
    let item = e.currentTarget.dataset.id
    appInstance.cardInfo = {
      custid: item.custid,
      tvCardNum: item.tvCardNumber,
      serviceID: "undefined",
      custname: item.custname,
      addr: item.addr,
      qrKind: "undefined",
      mobile: item.mobile,
      city: item.city
    }
    wx.navigateTo({
      url: `../pay/storeHall`
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
  },
  
  onMsgConfirm:function(e){
    wx.navigateTo({
      url: '../msgConfirm/confirm',
    })
  },

  onPullDownRefresh: function () {
    this.loadData();
    wx.stopPullDownRefresh()
  }
})