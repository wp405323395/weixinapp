// pages/tvCardModel/webview/webview.js
var dataUtil = require('../requestUtil/buriedPoint.js')
var config = require('../../../config.js')
var appInstance = getApp()
Page({

  /**
   * http://localhost:8081/#/?qrid=1
   * 页面的初始数据
   */
  data: {
    url:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let qrid = options.qrid;
    let scene = options.scene;
    let custid = options.custid;
    let url;
    //custid=${item.custid}&tvCardNum=${item.tvCardNum}&addr=${item.addr}&city=${item.city}&custname=${item.custname}&mobile=${item.mobile}
    if (qrid || scene) {
      url = `${config.schema}://${config.host}/s/?qrid=${qrid}&scene=${scene}`;
    } else if(custid) {
      options.addr = encodeURIComponent(options.addr)
      options.custname = encodeURIComponent(options.custname)
      url = `${config.schema}://${config.host}/s/?custid=${options.custid}&tvCardNum=${options.tvCardNum}&addr=${options.addr}&city=${options.city}&custname=${options.custname}&mobile=${options.mobile}`;
    }
    let date = new Date().getSeconds();
    url = url + `&sid=${appInstance.sid}&date=${date}&mod=miniapp`
    console.log('网页fff：',url)
    this.setData({
      url: url
    })
    dataUtil.buriedPoint2({
      sid: appInstance.sid,
      url: 'page/webview',
      app: 'qrcode',
      time: new Date().getTime(),
      type: "page_view",
      uid: '',
      mod: 'miniapp',
      args: options
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