// pages/yuandanproject4/pingdan/pingdan.js
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
    this.qrid = options.qrid;
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
    let that = this;
    return {
      title: '3人成团广电节目包优惠购，快来参与把',
      path: 'pages/yuandanproject4/mypingdan/mypingdan?qrid' + this.qrid,
      success: function (res) {
        // 转发成功
        wx.navigateTo({
          url: '../pingdansuccess/pingdansuccess?qrid=' + that.qrid,
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  share: function(){
    wx.showShareMenu({
      withShareTicket: true
    })
  }
})