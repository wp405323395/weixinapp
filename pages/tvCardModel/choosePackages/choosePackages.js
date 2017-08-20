// choosePackages.js
import RequestEngine from '../../../netApi/requestEngine.js';
var config = require('../../../config.js');
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHasMore:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let custid = options.custid;
    let tvCardNumber = options.tvCardNumber;
    let serviceID = options.serviceID;
    let qrKind = options.qrKind;
    let ifif = 'asdfasdfasdf'.substring(0,10);
    setTimeout(() => {
      this.loadPackage(custid, tvCardNumber, serviceID, qrKind);
    }, 500);
  },
  showMore:function(e){
    let id = parseInt(e.currentTarget.id);
    this.data.salesList[id].isShowMore = !this.data.salesList[id].isShowMore;
    this.setData({
      salesList: this.data.salesList
    });
  },
  loadPackage: function (custid, tvCardNumber, serviceID, qrKind) {
    let that = this;
    new Promise((resolve, reject)=>{
      let formData = JSON.stringify({
        custid, tvCardNumber, serviceID, qrKind
      });
      new RequestEngine().request(config.querySalesList, { formData: formData }, { callBy: that, method: that.loadPackage, params: [custid, tvCardNumber, serviceID, qrKind] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    }).then(value=>{
      id: 11001,
      this.setData({ 
        salesList: value.retData.salesList
        });
    }).catch(err=>{})
   
  },
  onChoocePackage:function(e){
    let id = parseInt(e.currentTarget.id);
    let packageDetail = this.data.salesList[id];
    wx.setStorageSync("packageDetail", packageDetail);
    wx.navigateBack({
    });
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