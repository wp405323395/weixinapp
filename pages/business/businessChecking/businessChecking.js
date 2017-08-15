// businessChecking.js
var businessData = {
  storeName:'一个小店',
  addr:'武汉市桥口区，长风乡，五大队',
  connectPerson:'路人',
  phoneNum:'18544332211'
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    businessData: businessData
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'checkingStore',
      success: function(res) {
        that.setData({
          businessData:{
            storeName: res.data.storeName,
            addr: res.data.addr,
            connectPerson: res.data.storePersonName,
            phoneNum: res.data.phone
          }
        });
      },
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