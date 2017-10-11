import RequestEngine from '../../netApi/requestEngine.js';
var Promise = require('../../libs/es6-promise.js').Promise;
var config = require('../../config.js');
var util = require('../../utils/util.js');
// pages/vote/vote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nexBtnText: '下一位',
    submitEnable:false,
    inputTxt:'',
    clearChecked:false,
    animationData: {},
    focusIndex:0,
    persons: []
  },
  onLoad: function (options) {
    this.votting = false;
    this.ablevote =  options.ablevote;
    if (!isNaN(this.ablevote)) {
      if (this.ablevote == 1) {
        this.projectedId = options.projectedId;
      } else if (this.ablevote == 0) {
        wx.showModal({
            title: "此群组不可投票",
            showCancel: false,
            confirmText: "确定",
          });
      return ;
      }
    } else {
      this.scene = decodeURIComponent(options.q);
      if (util.textIsNull(this.scene)) {
        this.scene = decodeURIComponent(options.scene);
      } else {
        this.scene = this.scene.split("scene=")[1];
      }
       //this.scene = '60~60'
      this.sceneArr = this.scene.split('~');
      if (this.sceneArr.length == 2) {
        this.projectedId = this.sceneArr[1];
        this.qrcode = this.sceneArr[0];
      }
    }
    this.loadData();
    
  },
  loadData:function(){
    new Promise((resolve,reject)=>{
      new RequestEngine().request(config.isHadVot, { id: this.projectedId }, { callBy: this, method: this.loadData, params: [this.projectedId] }, (success) => {
        if (success == '0') {
          resolve(success);
        } else if (success == '1'){
          //已经评论了
          reject('您已经投过票了');
        }
      }, (faild) => {
        reject(faild);
      });
    }).then(value=>{
      this.loadPerson(this.projectedId);
      this.loadQuestions(this.projectedId);
    }).catch(err=>{
      wx.showModal({
        title: err,
        showCancel: false,
        confirmText: "确定",
      });
    });
  },
  doVote: function (submitObj) {
    this.votting = true;
    new RequestEngine().request(config.doVot, { doVotInfo: submitObj, userInfo: this.userInfo}, { callBy: this, method: this.loadQuestions, params: [ submitObj] }, (success) => {
      if (this.data.focusIndex + 1 == this.data.persons.length) {
        //答题结束
        wx.showModal({
          title: "投票结束",
          showCancel: false,
          confirmText: "确定",
          success: function () {
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
      this.animation.translate(-58 * (this.data.focusIndex + 1), 0).step();
      this.setData({
        focusIndex: this.data.focusIndex + 1,
        clearChecked: false,
        inputTxt: '',
        animationData: this.animation.export()
      });
      if (this.data.persons.length - this.data.focusIndex == 1) {
        this.setData({
          nexBtnText: '提交'
        });
      }
      this.votting = false;
    }, (faild) => {
      this.votting = false;
    });
  },
  loadQuestions: function (projectedId) {
    new RequestEngine().request(config.listWxQuestion, { id: projectedId }, { callBy: this, method: this.loadQuestions, params: [projectedId] }, (success) => {
      this.setData({
        questionList: success
      });
    }, (faild) => {

    });
  },
  onNextClick:function(){
    if (this.ablevote == 0) {
      wx.showModal({
        title: "此群组不可投票",
        showCancel: false,
        confirmText: "确定"
      });
      return;
    }
    
    if (this.answers == undefined || this.data.questionList == undefined || this.answers.size != this.data.questionList.questionList.length) {
      wx.showModal({
        title: "有未完成的选题",
        showCancel: false,
        confirmText: "确定"
      });
      return ;
    }
    if(this.votting) {
      return ;
    }

    //candidateId:给谁发起投票的personId
    let personId = this.data.persons[this.data.focusIndex].id;
    let answerArray = [...this.answers];
    let answersObj = new Array();
    for (let answer of answerArray) {
      answersObj.push({ topicId: answer[0], optionId: answer[1]});
    }
    let submitObj = { candidateId: personId, doVotTopicList: answersObj, commentText: this.commons, projectedId: this.projectedId};
    console.log(submitObj);

    //------------------------
    //发起网络请求,暂时还没写。假数据在日志中可以看见，就是 submitObj
    let that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
            },
            fail() {
              wx.openSetting({
                success: (res) => {
                  res.authSetting = {
                    "scope.userInfo": true
                  }
                }
              })
            }
          })
        } else {
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              that.userInfo = userInfo;
              that.doVote(submitObj);
            }
          })
          
        }
      }
    })
    
    //------------------------
    
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
  loadPerson: function (projectedId){
    new RequestEngine().request(config.listCandidate, { id: projectedId }, { callBy: this, method: this.loadPerson, params: [projectedId] }, (success) => {
      let nexBtnText = '下一位';
      if (success.votEmployees.length == 1) {
        nexBtnText = '提交';
      }
      this.setData({
        nexBtnText: nexBtnText,
        persons: success.votEmployees
      });
    }, (faild) => {
      
    });
  },
  commonInput:function(e) {
    this.commons = e.detail.value;
  },

  onReady: function () {
  
  },

  onShow: function () {
    this.animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
  },

  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
    let ablevote = 1;
    if (util.textIsNull(this.qrcode)) {
      ablevote = 0;
    }
    return {
      title: '广电投票平台',
      path: '/pages/vote/vote?ablevote=' + ablevote + '&projectedId=' + this.projectedId,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})