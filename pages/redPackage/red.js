// red.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animation:'',
    animation_pc1:'',
    animation_pc2: '',
    animation_pc3: '',
    animation_pc4: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.animation_pc1 = wx.createAnimation({
      duration: 200, timingFunction: 'ease-out', delay: 100
    });
      this.animation_pc2 = wx.createAnimation({
        duration: 200, timingFunction: 'ease-out', delay: 100
      });
    this.animation_pc3 = wx.createAnimation({
      duration: 200, timingFunction: 'ease-out', delay: 100
    });
    this.animation_pc4 = wx.createAnimation({
      duration: 200, timingFunction: 'ease-out', delay: 100
    });
    this.animation = wx.createAnimation({
      transformOrigin: 'left top 0',
      success: function (res) {
        console.log(res)
      }
    })
  },
  coinClick:function(e){
    this.animation.translateY(-45).step({ duration: 200, timingFunction: 'ease-out', delay: 100})
    this.animation.translateY(400).step({ duration: 400, delay: 150, timingFunction:'ease-in' })
    this.setData({
      animation: this.animation.export()
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
    this.animation_pc1.translateY(400).step({ duration: 200, timingFunction: 'ease-out', delay: 1000 });
    this.animation_pc2.translateY(400).step({ duration: 400, timingFunction: 'ease-in', delay: 3000, });
    this.animation_pc3.translateY(400).step({ duration: 200, timingFunction: 'ease-out', delay: 4000 });
    this.animation_pc4.translateY(400).step({ duration: 400, timingFunction: 'ease-in', delay: 500, });
    this.setData({
      animation_pc1: this.animation_pc1.export(),
      animation_pc2: this.animation_pc2.export(),
      animation_pc3: this.animation_pc3.export(),
      animation_pc4: this.animation_pc4.export(),
    })
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