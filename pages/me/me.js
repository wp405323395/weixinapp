// me.js
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  onClick:function(e){
    switch (e.currentTarget.id) {
      case "my_coup":
        wx.navigateTo({
          url: '../mycoup/mycoup',
        })
        break;
      case "my_red_package":
        wx.navigateTo({
          url: '../myRedPackage/myRedPackage',
        })
        break;
      case "my_order":
        wx.navigateTo({
          url: '../myOrder/myOrder',
        })
        break;
      case "my_store":
        wx.navigateTo({
          url: '../business/businessAuthor/business',
        })
        break;
    }

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
  
  },
  sendCoup:function(e){
    wx.navigateTo({
      url: '../business/index/index',
    })
  },
  storeDetail:function(e){
    wx.navigateTo({
      url: '../detail/storeDetail/storeDetail',
    })
  },
  goTestModle:function(e){
    console.log(e);
    switch (e.currentTarget.id){
      case '2':
        wx.navigateTo({
          url: '../tvCard/tvcard',
        });
      break;
      case '3':
        wx.navigateTo({
          url: '../redPackage/red',
        })
      break;
    }
    
  }
})