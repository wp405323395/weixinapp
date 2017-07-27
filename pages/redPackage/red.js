// red.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animation:'',
    animationContent:'',
    ishid_red_package_content:true,
    red_content_txt_front:'',
    isHidden_bt:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.animationContent = wx.createAnimation({
      duration: 200, timingFunction: 'ease-out', delay: (2000+100+30+150+100)
    });
    this.animation = wx.createAnimation({
      transformOrigin: '50% 50% 0',
      success: function (res) {
        console.log(res)
      }
    })
  },
  onGetRedPackageClick:function(e) {
    wx.navigateTo({
      url: '../choosePackages/choosePackages',
    })
  },
  coinClick:function(e){
    this.animation.rotateY(360*1).step({ duration: 2000, timingFunction: 'ease-out', delay: 100})
    this.animation.opacity(0).step({ duration: 30, delay: 150, timingFunction:'ease-in' })
    this.setData({
      ishid_red_package_content:false,
      animation: this.animation.export()
    })
    let distance = -e.currentTarget.offsetTop *1.444444;
    this.animationContent.translateY(distance).step();
    this.setData({
      animationContent: this.animationContent.export()
    })
    let that = this;
    setTimeout(() => {
      that.setData({
        isHidden_bt: false,
        red_content_txt_front: 'red_content_txt_front'
      })
    }, 2000 + 100 + 30 + 150 + 100 + 200 +100)
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