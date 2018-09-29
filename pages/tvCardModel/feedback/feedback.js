// pages/tvCardModel/feedback/packageFeedback.js
var currentPaperType;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHiddenToast: true,
    isHiddenToast2: true,
    feedbackData: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options.feedBackType = ', options.feedBackType)
    currentPaperType = options.feedBackType
    this.showFeedbackPaper()
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
      case 'app-feedback':
        this.setData({
          isHiddenToast2: false
        })
        break;
    }

  },
  //提交问卷
  paperSubmit() {
    let feedback = require('../requestUtil/feedback.js')
    switch (currentPaperType) {
      case 'package':
      case 'pay-canceled':
        feedback.setPkgFeedbackPaper(this, currentPaperType, this.paper.selected, this.paper.answer)
        break;
      case 'app-feedback':
        feedback.setAppFeedbackPaper(this, this.paper1.content, this.paper1.contact)
        break;
    }
  },

  paper: {
    selected: '',
    answer: ''
  },
  paper1: {
    content: '',
    contact: ''
  },
  paper2InputContent(event) {
    this.paper1.content = event.detail.value;
  },
  paper2InputContact(event) {
    this.paper1.contact = event.detail.value;
  },
  checkboxChanged(event) {
    this.paper.selected = event.detail.value.join(',');
  },
  paperTextChanged(event) {
    this.paper.answer = event.detail.value;
  }
})