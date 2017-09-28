// pages/vote/vote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {},
    focusIndex:0,
    persons: [{id:'bb',url:'https://www.maywidehb.com/banner/reject.png'},
      { id: 'ccc', url: 'https://www.maywidehb.com/banner/reject.png' },
      { id: '123qw33', url: 'https://www.maywidehb.com/banner/reject.png' },
      { id: '12er333', url: 'https://www.maywidehb.com/banner/reject.png' },
      { id: '1233r3', url: 'https://www.maywidehb.com/banner/reject.png' },
      { id: '123t33', url: 'https://www.maywidehb.com/banner/reject.png' },
      { id: '12t333', url: 'https://www.maywidehb.com/banner/reject.png' },
      { id: '12333', url: 'https://www.maywidehb.com/banner/reject.png' },
      { id: '12333', url: 'https://www.maywidehb.com/banner/reject.png' },
      { id: '12333', url: 'https://www.maywidehb.com/banner/reject.png' }],
    questionList: [
      {questionId: '1', question: '表现如何', answers: [{ id: 'A', answer_text: '优秀' }, { id: 'B', answer_text: '优秀' }, { id: 'C', answer_text: '优秀' }, { id: 'D',answer_text: '优秀' }]},
      { questionId: '2', question: '表现如何', answers: [{ id: 'A', answer_text: '优秀' }, { id: 'B', answer_text: '优秀' }, { id: 'C', answer_text: '优秀' }, { id: 'D', answer_text: '优秀' }] },
      { questionId: '3', question: '表现如何', answers: [{ id: 'A', answer_text: '优秀' }, { id: 'B', answer_text: '优秀' }, { id: 'C', answer_text: '优秀' }, { id: 'D', answer_text: '优秀' }] },
      { questionId: '4', question: '表现如何', answers: [{ id: 'A', answer_text: '优秀' }, { id: 'B', answer_text: '优秀' }, { id: 'C', answer_text: '优秀' }, { id: 'D', answer_text: '优秀' }] },
      { questionId: '5', question: '表现如何', answers: [{ id: 'A', answer_text: '优秀' }, { id: 'B', answer_text: '优秀' }, { id: 'C', answer_text: '优秀' }, { id: 'D', answer_text: '优秀' }] },
    ]
  },
  onNextClick:function(){
    console.log(this.answers);
    if (this.answers == undefined || this.answers.size == 0) {
      wx.showModal({
        title: "请答完题",
        showCancel: false,
        confirmText: "确定"
      });
      return ;
    }
    let personId = this.data.persons[this.data.focusIndex].id;
    let submitObj = { personId: personId , answers: [...this.answers] };
    console.log(submitObj);
    if (this.answers != undefined) {
      this.answers.clear()
    }
    //------------------------
    //发起网络请求
    //------------------------

    this.data.focusIndex++;
    if (this.data.persons.length-1 < this.data.focusIndex) {
      return ;
    }
    this.setData({
      focusIndex: this.data.focusIndex
    });
    this.animation.translate(-55 * this.data.focusIndex, 0).step();
    this.setData({
      animationData: this.animation.export()
    })
   

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
    console.log(e.detail.value);
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