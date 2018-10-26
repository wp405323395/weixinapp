// pages/tvCardModel/feedback/packageFeedback.js
var appInstance = getApp()
var currentPaperType;
var vm;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHiddenToast: true,
    feedbackData: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    currentPaperType = options.feedBackType
    this.showFeedbackPaper()
    wx.getStorage({
      key: 'packages',
      success: function(res) {
        console.log(res)
        vm.packages = JSON.parse(res.data)
        
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

  },
  //套餐de反馈 package,pay-canceled，app-feedback
  showFeedbackPaper() {
    switch (currentPaperType) {
      case 'package':
      case 'pay-canceled':
        let feedback = require('../requestUtil/feedback.js')
        feedback.getFeedbackPaper(this, currentPaperType)
        break;
    }

  },
  //提交问卷
  paperSubmit() {
    let feedback = require('../requestUtil/feedback.js')
    switch (currentPaperType) {
      case 'package':
      case 'pay-canceled':
        feedback.setPkgFeedbackPaper(this, currentPaperType, this.paper, appInstance.cardInfo, vm.packages)
        break;
        break;
    }
  },

  paper: {
    selected: '',
    answer: '',
    contact:''
  },

  paperInputContact(event) {
    this.paper.contact = event.detail.value;
  },
  checkboxChanged(event) {
    this.paper.selected = event.detail.value.join(',');
  },
  paperTextChanged(event) {
    this.paper.answer = event.detail.value;
  }
})