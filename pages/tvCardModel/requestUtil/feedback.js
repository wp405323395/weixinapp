import RequestEngine from '../../../netApi/requestEngine.js';
var Promise = require('../../../libs/es6-promise.js').Promise;
var config = require('../../../config.js');
var feedback = {
  /**
   * paperId: 'package,pay-canceled'
   */
  getFeedbackPaper(context,paperId){ 
    new RequestEngine().request(config.getFeedbackPaper, { id: paperId }, { callBy: this, method: this.getFeedbackPaper, params: [context,paperId] }, (success) => {
      context.setData({
        feedbackData: success,
        isHiddenToast: false
      })
    }, (faild) => {
    });

  },
  setPkgFeedbackPaper(context, paperId, selectedStr, answer, packages) {
    new RequestEngine().request(config.setFeedbackPaper, { surveyId: paperId, selected: selectedStr, answer: answer, packages: packages }, { callBy: this, method: this.setPkgFeedbackPaper, params: [context, paperId, selectedStr, answer, packages] }, (success) => {
      wx.showToast({
        title: '反馈提交成功',
        icon: 'success',
        duration: 2000
      })
      context.closeToast();
    }, (faild) => {
    });
  },
  setAppFeedbackPaper(context, content, contact, packages){
    new RequestEngine().request(config.saveFeedback, { content: content, contact: contact, packages: packages }, { callBy: this, method: this.setAppFeedbackPaper, params: [context, content, contact, packages] }, (success) => {
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