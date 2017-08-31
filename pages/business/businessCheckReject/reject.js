// reject.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    reject:{
      reason:'店铺信息不能通过审核'
    }
  },
  onCheckAgain:function(e){
    wx.navigateTo({
      url: '../businessAuthor/business?rejectStoreId=' + this.data.reject.rejectStoreId
    })
    wx.setStorage({
      key: 'rejectReason',
      data: '',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
  },
  loadData:function(){
    let that  = this;
    wx.getStorage({
      key: 'rejectReason',
      success: function(res) {
        that.setData({
          reject: {
            reason: res.data.rejectReason,
            rejectStoreId: res.data.rejectStoreId
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