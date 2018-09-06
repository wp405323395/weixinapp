import RequestEngine from '../../../netApi/requestEngine.js';
var Promise = require('../../../libs/es6-promise.js').Promise;
var config = require('../../../config.js');
var feedback = {
  getPayFaildFeedbackPaper(context){
    new RequestEngine().request(config.getPayFaildFeedbackPaper, { id: 'pay-canceled' }, { callBy: context, method: context.getPayFaildFeedbackPaper, params: [{ id: 'pay-canceled' }] }, (success) => {
      
    }, (faild) => {
    });
    getPayFaildFeedbackPaper
  },
  payFaildFeedback(){

  }
}