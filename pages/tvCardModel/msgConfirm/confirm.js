// confirm.js
import RequestEngine from '../../../netApi/requestEngine.js';
var Promise = require('../../../libs/es6-promise.js').Promise;
var config = require('../../../config.js');
var util = require('../../../utils/util.js');
Page({

  data: {
    isHasdate:true,
    isCannotinput:false
  },

  onLoad: function (options) {

  },
  onSearchClick: function (event) {
    let inputValue = event.detail.value;
    if (util.textIsNotNull(inputValue)) {
      this.serchUser(inputValue);
    }
  },
  onScanClick: function () {
    let that = this;
    wx.scanCode({
      success: (res) => {
        let cardNumber = res.result;
        that.serchUser(cardNumber);
        that.setData({
          inputValue: cardNumber
        })
        console.log(cardNumber)
        console.log(res)
      }
    })

  },
  onSelected: function (e) {
    let item = e.currentTarget.dataset.id
    let uploadNetApi = require('../requestUtil/uploadNetApi.js')
    uploadNetApi.savePageLog('pay', 'confirm', 0)
    wx.navigateTo({
      url: '../pay/pay?custid=' + item.custid + "&tvCardNum=" + item.tvCardNumber + "&addr=" + item.addr + "&custname=" + item.custname + "&mobile=" + item.mobile + "&city=" + item.city
    })
  },
  isCannotinput(isCannoteInput){
    this.setData({
      isCannotinput: isCannoteInput
    });
  },
  serchUser: function (inputValue) {
    this.isCannotinput(true);
    var that = this;
    new Promise((resolve, reject) => {
      wx.showLoading({
        title: '正在定位中',
      })
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
          var speed = res.speed
          var accuracy = res.accuracy
          resolve(latitude + '-' + longitude);
          wx.hideLoading();
        },
        fail: function (err) {
          resolve('');
          wx.hideLoading();
        }
      })
    }).then(value => {
      return new Promise((resolve, reject) => {
        new RequestEngine().request(config.queryCustInfo, { querparam: inputValue + '|' + value }, { callBy: that, method: that.serchUser, params: [inputValue] }, (success) => {
          resolve(success);
        }, (faild) => {
          reject(faild);
        });
      });
    }).then(value => {
      let custList = null;
      if (value) {
        custList = value.custList;
        if (custList && custList.length > 0) {
          this.setData({
            isHasdate: true
          });
        } 
      } else {
        this.setData({
          isHasdate:false
        })
      }
      this.setData({
        custList: custList,
        isCannotinput:false
      });
    }).catch(err => {
      this.isCannotinput(false);
    });

  },

  onCancleClick: function () {
    this.setData({
      inputValue: '',
      custList: null
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