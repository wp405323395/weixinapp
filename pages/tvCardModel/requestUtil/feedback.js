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
  setPkgFeedbackPaper(context, paperId, paper, cardInfo,packages) {
    new RequestEngine().request(config.setFeedbackPaper, { surveyId: paperId, selected: paper.selected, answer: paper.answer, contact:paper.contact, cardInfo: cardInfo, packages: packages }, { callBy: this, method: this.setPkgFeedbackPaper, params: [context, paperId, paper, cardInfo, packages] }, (success) => {
      wx.showToast({
        title: '反馈提交成功',
        icon: 'success',
        duration: 2000
      })
      setTimeout(()=>{
        wx.navigateBack({
          
        })
      },2000)

    }, (faild) => {
    });
  }
  
}

module.exports = feedback