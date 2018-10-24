// pages/tvCardModel/pay/payMoney/pay.js
var netData = require('../../requestUtil/netData.js')
var appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    package1:null,
    package2:null,
    totalMoney:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.package1 = appInstance.package1
    this.package2 = appInstance.package2
    this.cardInfo = appInstance.cardInfo
    this.currentPackageInfo = appInstance.currentPackageInfo;
    this.freshUi();
    
  },
  freshUi(){
    let money1 = 0;
    let money2 = 0;
    if (this.package1) {
      money1 = parseFloat(this.package1.price)
    }
    if(this.package2) {
      money2 = parseFloat(this.package2.price)
    }
    this.setData({
      package1: this.package1,
      package2: this.package2,
      currentPackageInfo:this.currentPackageInfo,
      totalMoney: money1 + money2
    })
  },
  pay: function () {
    let that = this;
    if (that.isPaying) {
      return;
    }
    that.isPaying = true;
    let currentIndex = that.data.packageSelectIndex
    let param = {
      custid: this.cardInfo.custid,
      tvCardNumber: this.cardInfo.tvCardNum,
      addr: this.cardInfo.addr,
      custname: this.cardInfo.custname,
      mobile: this.cardInfo.mobile,
      city: this.cardInfo.city,
      serviceid: this.cardInfo.serviceID,
      custfess: that.data.currentPackageInfo.charge,
      unit: this.initUnit(),//订购单位 0：天；1：月；2：年
      salestype: this.initSalestype(), //类型 0订购产品;1营销方案订购
      salescode: this.initSalescode()//产品编码
    };
    netData.pay(param).then(value => {
      wx.requestPayment({
        'timeStamp': value.timeStamp,
        'nonceStr': value.nonceStr,
        'package': value.package,
        'signType': value.signType,
        'paySign': value.paySign,
        'success': function (res) {
          that.isPaying = false;
          console.log('支付结果', res);
          wx.redirectTo({
            url: 'success/paySuccess',
          })
        },
        'fail': function (res) {
          that.isPaying = false;
          ///// 记录错误日志
          that.showFeedbackPaper({
            target: {
              id: 'pay-canceled'
            }
          })
          let uploadNetApi = require('../../requestUtil/uploadNetApi.js')
          uploadNetApi.payFaild(res.errMsg, this.cardInfo.city, this.cardInfo.custid, this.cardInfo.tvCardNum, this.cardInfo.serviceID, this.cardInfo.qrKind, that.data.packages[currentIndex].salescode)
          //////
        }
      })
    }).catch(err => {
      that.isPaying = false;
      wx.showModal({
        title: "支付失败,如有疑问请拨打客服电话96516",
        showCancel: false,
        confirmText: "取消"
      })
      ///// 记录错误日志
      let uploadNetApi = require('../../requestUtil/uploadNetApi.js')
      uploadNetApi.payFaild(err, this.cardInfo.city, this.cardInfo.custid, this.cardInfo.tvCardNum, this.cardInfo.serviceID, this.cardInfo.qrKind, that.data.packages[currentIndex].salescode)
      //////
    });

  },
  initUnit() {
    let u = '';
    if (this.package1) {
      u = u + this.package1.unit
    }
    if (this.package2) {
      u = u + ',' + this.package2.unit
    }
    return u;
  },
  initSalestype() {
    let u = '';
    if (this.package1) {
      u = u + this.package1.salestype
    }
    if (this.package2) {
      u = u + ',' + this.package2.salestype
    }
    return u;
  },
  initSalescode() {
    let u = '';
    if (this.package1) {
      u = u + this.package1.salescode
    }
    if (this.package2) {
      u = u + ',' + this.package2.salescode
    }
    return u;
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