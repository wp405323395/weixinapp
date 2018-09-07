import RequestEngine from '../../../netApi/requestEngine.js';
var Promise = require('../../../libs/es6-promise.js').Promise;
var config = require('../../../config.js');
var feedback = {
  /**
   * paperId: 'package,pay-canceled'
   */
  getFeedbackPaper(context,paperId){ 
    new RequestEngine().request(config.getFeedbackPaper, { id: paperId }, { callBy: context, method: context.getPayFaildFeedbackPaper, params: [paperId] }, (success) => {
      context.setData({
        feedbackData: success
      })
    }, (faild) => {
    });

  },
  setPkgFeedbackPaper(context, paperId, selectedStr, answer) {
    new RequestEngine().request(config.setFeedbackPaper, { surveyId: paperId, selected: selectedStr, answer: answer }, { callBy: context, method: context.getPayFaildFeedbackPaper, params: [paperId, selectedStr, answer] }, (success) => {

    }, (faild) => {
    });
  },
  setAppFeedbackPaper(context, content, contact){
    new RequestEngine().request(config.saveFeedback, { content: content, contact: contact }, { callBy: context, method: context.setAppFeedbackPaper, params: [context, content, contact] }, (success) => {
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