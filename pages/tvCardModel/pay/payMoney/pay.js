// pages/tvCardModel/pay/payMoney/pay.js
var netData = require('../../requestUtil/netData.js')
var dataUtil = require('../../requestUtil/buriedPoint.js')
import RequestEngine from '../../../../netApi/requestEngine.js';
var Promise = require('../../../../libs/es6-promise.js').Promise;
var config = require('../../../../config.js');
var appInstance = getApp()
let vm
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.params = options.params
    vm = this;
    if (!this.params) {
      return;
    } else {
      this.params = JSON.parse(decodeURIComponent(this.params))
    }
    console.log('ddd', this.params)
    this.pay()
  },
  boosFaild: function() {

    return new Promise((resolve, reject) => {
      vm.isPaying = false;
      wx.showModal({
        content:'当前产品无法订购，建议您订购其他推荐产品或去营业厅订购',
        showCancel: false,
        confirmText: "取消",
        success(res) {
          if (res.confirm) {
            wx.navigateBack({})
          }
        }
      })
      dataUtil.buriedPoint2({
        sid: appInstance.sid,
        url: 'page/pay',
        app: 'qrcode',
        time: new Date().getTime(),
        type: "pay_faild",
        uid: '',
        mod: 'miniapp',
        info: {
          param: vm.params,
          errMsg: err
        }
      })
      ///// 记录错误日志
      let uploadNetApi = require('../../requestUtil/uploadNetApi.js')
      uploadNetApi.payFaild(err, this.params.city, this.params.custid, this.params.tvCardNumber, this.params.serviceID, this.params.qrKind, this.params.salescode)
      //////
    })
  },
  payBywx: function(value) {
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        'timeStamp': value.timeStamp,
        'nonceStr': value.nonceStr,
        'package': value.package,
        'signType': value.signType,
        'paySign': value.paySign,
        'success': function(res) {
          vm.isPaying = false;
          dataUtil.buriedPoint2({
            sid: appInstance.sid,
            url: 'page/pay',
            app: 'qrcode',
            time: new Date().getTime(),
            type: "pay_success",
            uid: '',
            mod: 'miniapp',
            info: {
              param: vm.params,
            }
          })
          wx.redirectTo({
            url: '../success/paySuccess',
          })
        },
        'fail': function(res) {
          vm.isPaying = false;
          wx.navigateBack({})
          dataUtil.buriedPoint2({
            sid: appInstance.sid,
            url: 'page/pay',
            app: 'qrcode',
            time: new Date().getTime(),
            type: "pay_cancle",
            uid: '',
            mod: 'miniapp',
            info: {
              param: vm.params,
              errMsg: '用户取消支付'
            }
          })
        }
      })
    })
  },
  pay: function() {
    let that = this;
    if (vm.isPaying) {
      wx.showToast({
        title: '正在支付',
      })
      return;
    }
    dataUtil.buriedPoint("订单支付页,立即支付", appInstance.cardInfo);
    vm.isPaying = true;


    new Promise((resolve, reject) => {
      new RequestEngine().request(config.wxPay, that.params, {
        callBy: that,
        method: that.pay,
        params: [that.params]
      }, (value) => {
        resolve(value);
      }, (err) => {
        reject(err);
      });
    }).then(value => {
      return this.payBywx(value)
    }).catch(err => {
      return this.boosFaild()
    })

  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    vm.isPaying = false
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})