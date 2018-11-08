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
      console.log('链接中携带的信息-》scene：',scene)
      if (scene.failed) {
        setTimeout(() => {
          tvCardNet.loadRecordHistory(that)
        }, 500);
      } else {
        appInstance.qrid = qrid;
        appInstance.scene = scene;
        that.getQrInfo(scene);
        setTimeout(() => {
          if (util.textIsNotNull(appInstance.qrInfo.tvCardNum)) { //进入产品列表
            tvCardNet.loadTvCardInfo(that);
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
      tvCardNum: item.tvCardNumber,
      serviceID: "undefined",
      qrKind: "undefined",
      qrid: '',
      custid: item.custid,
      custname: item.custname,
      addr: item.addr,
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
    appInstance.qrInfo.tvCardNum = prarams[2];
    appInstance.qrInfo.qrKind = prarams[0];
    appInstance.qrInfo.serviceID = prarams[1];
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