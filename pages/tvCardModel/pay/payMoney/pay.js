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
    totalMoney:0,
    usedCoup: { discountPrice:0}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.package1 = appInstance.package1
    this.package2 = appInstance.package2
    appInstance.cardInfo
    this.currentPackageInfo = appInstance.currentPackageInfo;
    this.freshUi();
    this.loadCoup()
  },
  //加在优惠券
  loadCoup(){
    let that = this;
    netData.queryUsrCanUseCoupons(appInstance.cardInfo).then(value=>{
      let coups = value;
      coups.sort(function (m, n) {
        return n.discountPrice - m.discountPrice
      })
      console.log('可用优惠券，倒序：',coups)
      for (let item of coups) {
        if (this.data.currentPackageInfo.feesums < 0) {
          if (item.fullPrice <= this.data.totalMoney - this.data.currentPackageInfo.feesums) {
            that.setData({
              usedCoup: item
            })
            return
          }
        } else {
          if (item.fullPrice <= this.data.totalMoney) {
            that.setData({
              usedCoup: item
            })
            return
          }
        }
        
      }
    })  
  },
  freshUi(){
    let money1 = 0;
    let money2 = 0;
    if (this.package1 && this.package2.prdType == 'a104') {
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
      wx.showToast({
        title: '正在支付',
      })
      return;
    }
    that.isPaying = true;
    let currentIndex = that.data.packageSelectIndex
    let param = {
      custid: appInstance.cardInfo.custid,
      tvCardNumber: appInstance.cardInfo.tvCardNum,
      addr: appInstance.cardInfo.addr,
      custname: appInstance.cardInfo.custname,
      mobile: appInstance.cardInfo.mobile,
      city: appInstance.cardInfo.city,
      serviceid: appInstance.cardInfo.serviceID,
      custfess: this.currentPackageInfo.feesums,
      unit: this.initUnit(),//订购单位 0：天；1：月；2：年
      salestype: this.initSalestype(), //类型 0订购产品;1营销方案订购
      salescode: this.initSalescode(),//产品编码
      userCouponId: this.data.usedCoup.userCouponId //优惠券
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
          wx.redirectTo({
            url: '../success/paySuccess',
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
          uploadNetApi.payFaild(res.errMsg, appInstance.cardInfo.city, appInstance.cardInfo.custid, appInstance.cardInfo.tvCardNum, appInstance.cardInfo.serviceID, appInstance.cardInfo.qrKind, that.package1.salescode)
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
      uploadNetApi.payFaild(err, appInstance.cardInfo.city, appInstance.cardInfo.custid, appInstance.cardInfo.tvCardNum, appInstance.cardInfo.serviceID, appInstance.cardInfo.qrKind, that.data.packages[currentIndex].salescode)
      //////
    });

  },
  initUnit() {
    let u1 = '';
    let u2 = '';
    if (this.package1 && this.package2.prdType == 'a104') {
      u1 = this.package1.unit
    }
    if (this.package2) {
      u2 = this.package2.unit
    }
    let total='';
    if(u1&&u2) {
      total = u1 + ',' + u2;
    } else if(u1) {
      total = u1;
    } else if(u2) {
      total = u2;
    }
    
    return total;
  },
  initSalestype() {
    let u1 = '';
    let u2 = '';
    if (this.package1 && this.package2.prdType == 'a104') {
      u1 = this.package1.salestype
    }
    if (this.package2) {
      u2 = this.package2.salestype
    }
    let total = '';
    if (u1 && u2) {
      total = u1 + ',' + u2;
    } else if (u1) {
      total = u1;
    } else if (u2) {
      total = u2;
    }
    return total;
  },
  initSalescode() {
    let u1 = '';
    let u2 = '';
    if (this.package1 && this.package2.prdType == 'a104') {
      u1 = this.package1.salescode
    }
    if (this.package2) {
      u2 = this.package2.salescode
    }
    let total = '';
    if (u1 && u2) {
      total = u1 + ',' + u2;
    } else if (u1) {
      total = u1;
    } else if (u2) {
      total = u2;
    }
    return total;

  },
  //跳转到反馈界面
  showFeedbackPaper(event) {
    wx.navigateTo({
      url: '../../feedback/feedback?feedBackType=' + event.target.id,
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
    this.isPaying = false
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