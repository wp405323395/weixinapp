import RequestEngine from '../../../netApi/requestEngine.js';
var Promise = require('../../../libs/es6-promise.js').Promise;
var config = require('../../../config.js');
var feedback = {
  /**
   * paperId: 'package,pay-canceled'
   */
  getFeedbackPaper(context,paperId){ 
    new RequestEngine().request(config.getFeedbackPaper, { id: paperId }, { callBy: this, method: this.getFeedbackPaper, params: [paperId] }, (success) => {
      context.setData({
        feedbackData: success
      })
    }, (faild) => {
    });

  },
  setPkgFeedbackPaper(context, paperId, selectedStr, answer) {
    new RequestEngine().request(config.setFeedbackPaper, { surveyId: paperId, selected: selectedStr, answer: answer }, { callBy: this, method: this.setPkgFeedbackPaper, params: [paperId, selectedStr, answer] }, (success) => {
      wx.showToast({
        title: '反馈提交成功',
        icon: 'success',
        duration: 2000
      })
      context.closeToast();
    }, (faild) => {
    });
  },
  setAppFeedbackPaper(context, content, contact){
    new RequestEngine().request(config.saveFeedback, { content: content, contact: contact }, { callBy: this, method: this.setAppFeedbackPaper, params: [context, content, contact] }, (success) => {
      wx.showToast({
        title: '反馈提交成功',
        icon: 'success',
        duration: 2000
      })
      context.closeToast();
    }, (faild) => {
    });
  }
  
}

module.exports = feedback