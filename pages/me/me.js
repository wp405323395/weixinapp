// me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['未使用', '已使用', '已过期'],
    currentTab: 0,
    products: ['1', '', '', '', '', '', '', '', '', '', '', '', '', '']
  },
  navbarTap: function (e) {
    var typeId = e.currentTarget.dataset.idx;
    this.setData({
      currentTab: typeId,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

})