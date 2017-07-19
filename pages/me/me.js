// me.js
var da = require('../../data/data.js').data;
var data0 = da.xianshimiaosha;
var data1 = da.zhinengtuijian;
var data2 = da.wubaimishangquan;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['未使用', '已使用', '已过期'],
    currentTab: 0,
    page0: { products: data0 },
    page1: { products: data1 },
    page2: { products: data2 }
  },
  navbarTap: function (e) {
    var typeId = e.currentTarget.dataset.idx;
    this.setData({
      currentTab: typeId,
    });
    this.loadData(typeId);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData(0);
  },
  loadData: function (typeId) {
    switch (typeId) {
      case 0:
        this.setData({
          page0: { products: data0 },
          currentTab: 0,
          hasData: true
        });
        break;
      case 1:
        this.setData({
          page1: { products: data1 },
          currentTab: 1,
          hasData: true
        });
        break;
      case 2:
        this.setData({
          page2: { products: data2 },
          currentTab: 2,
          hasData: true
        });
        break;

    }
  }


})