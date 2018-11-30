// tvcard.js
var util = require('../../../utils/util.js');
var tvCardNet = require('../requestUtil/tvCardNet.js')
var dataUtil = require('../requestUtil/buriedPoint.js')
var appInstance = getApp()
var myOptions
Page({

  data: {
    custList: null,
  },

  /*qrid查询*/
  onLoad: function(options) {
    myOptions = options;

    let q = decodeURIComponent(options.q);
    let qrid
    let scene
    if (util.textIsNull(q)) {
      qrid = options.qrid;
      scene = options.scene;
    } else {
      qrid = this.getQueryString(q, 'qrid');
      scene = this.getQueryString(q, 'scene');
    }
    this.qrid = qrid ? qrid : ''
    this.scene = scene ? scene : ''
    if (this.qrid || this.scene) {} else {
      setTimeout(() => {
        tvCardNet.loadRecordHistory(this)
      }, 500);
    }
    dataUtil.buriedPoint2({
      sid: appInstance.sid,
      url: 'page/tvCards',
      time: new Date().getTime(),
      type: "page_view",
      uid: '',
      mod: 'miniApp',
      info: {
        qrid: qrid,
        scene: scene
      }
    })
  },
  onShow: function() {
    if (this.qrid || this.scene) {
      wx.navigateTo({
        url: `/pages/tvCardModel/webview/webview?qrid=${this.qrid}&scene=${this.scene}`,
      })
    }
  },
  getQueryString: function(url, name) {
    var p0 = url.split('?')
    if (p0.length > 1) {
      var paramStr = p0[1]
      var params = paramStr.split('&')
      for (var param of params) {
        if (param.indexOf(name) > -1) {
          return param.split('=')[1]
        }
      }
    }
  },
  onSearchMore: function() {
    wx.navigateTo({
      url: '../msgConfirm/confirm',
    })
  },
  onSelected: function(e) {
    let that = this;
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
      url: `/pages/tvCardModel/webview/webview?custid=${item.custid}&tvCardNum=${item.tvCardNumber}&addr=${item.addr}&city=${item.city}&custname=${item.custname}&mobile=${item.mobile}`
    })
    // wx.navigateTo({
    //   url: `../pay/storeHall`
    // })
  },

  getQrInfo: function(tvCardInfo) {
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

  onMsgConfirm: function(e) {
    wx.navigateTo({
      url: '../msgConfirm/confirm',
    })
  },

  onPullDownRefresh: function() {
    wx.stopPullDownRefresh()
  }
})