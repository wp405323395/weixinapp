// pages/vote/vote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitEnable:false,
    inputTxt:'',
    clearChecked:false,
    animationData: {},
    focusIndex:0,
    persons: [{id:'bb',url:'https://www.maywidehb.com/banner/reject.png'},
      { id: '12333', url: 'https://www.maywidehb.com/banner/reject.png' },
      { id: '12333', url: 'https://www.maywidehb.com/banner/reject.png' }],
    questionList: [
      { questionId: '1', question: '表现如何', answers: [{ answerId: 'A', answer_text: '优秀' }, { answerId: 'B', answer_text: '优秀' }, { answerId: 'C', answer_text: '优秀' }, { answerId: 'D',answer_text: '优秀' }]},
    ]
  },
  onNextClick:function(){
    if (this.answers == undefined || this.answers.size != this.data.questionList.length) {
      wx.showModal({
        title: "有未完成的选题",
        showCancel: false,
        confirmText: "确定"
      });
      return ;
    }

    let personId = this.data.persons[this.data.focusIndex].id;
    let answerArray = [...this.answers];
    let answersObj = new Array();
    for (let answer of answerArray) {
      answersObj.push({ questionId: answer[0], answerId: answer[1]});
    }
    let submitObj = { personId: personId, answers: answersObj, comment: this.commons};
    console.log(submitObj);
    

    //------------------------
    //发起网络请求,暂时还没写。假数据在日志中可以看见，就是 submitObj
    //------------------------
    if (this.data.focusIndex+1 ==  this.data.persons.length) {
      //答题结束
      wx.showModal({
        title: "投票结束",
        showCancel: false,
        confirmText: "确定",
        success: function(){
          wx.navigateBack({
          })
        }
      });
      this.setData({
        submitEnable: true
      });
      return;
    }
    if (this.answers != undefined) {
      this.answers.clear()
    }
    this.commons = undefined;
    this.animation.translate(-50 * (this.data.focusIndex+1), 0).step();
    this.setData({
      focusIndex: this.data.focusIndex + 1,
      clearChecked: false,
      inputTxt: '',
      animationData: this.animation.export()
    });
  },
  radioChange: function(e) {
    let checked = e.detail.value;
    console.log('radio发生change事件，携带value值为：', checked);
    let detail = checked.split('-');
    if (this.answers == undefined || this.answers.size == 0) {
      this.answers = new Map();
    }
    this.answers.set(detail[0],detail[1]);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  commonInput:function(e) {
    this.commons = e.detail.value;
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
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation;
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
    return {
      title: '自定义转发标题',
      path: '/pages/vote/vote',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})