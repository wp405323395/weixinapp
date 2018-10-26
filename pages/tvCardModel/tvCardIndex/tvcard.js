// tvcard.js
var util = require('../../../utils/util.js');
var tvCardNet = require('../requestUtil/tvCardNet.js')
Page({

  data: {
    custList:null,
  },

  /*qrid查询*/
  onLoad: function (options) {
    let that=this;
    util.getScene(options, function (scene, qrid){
      if (scene.failed) {
        setTimeout(() => {
          tvCardNet.loadRecordHistory(that)
        }, 500);
      } else {
        that.qrid = qrid;
        that.getQrInfo(scene);
        setTimeout(() => {
          if (util.textIsNotNull(that.tvCardNum)) {
            tvCardNet.loadTvCardInfo(that, that.tvCardNum, that.qrid);
          } else {
            tvCardNet.loadRecordHistory(that)
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
    wx.navigateTo({
      url: `../pay/storeHall?qrid=${that.qrid}&custid=${item.custid}&tvCardNum=${item.tvCardNumber}&addr=${item.addr}&custname=${item.custname}&mobile=${item.mobile}&city=${item.city}`
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
    
    if (util.textIsNull(this.tvCardNum)) {
      wx.stopPullDownRefresh();
    } else {
      tvCardNet.loadTvCardInfo(this,this.tvCardNum,this.qrid);
    }
    wx.stopPullDownRefresh()
  }
})