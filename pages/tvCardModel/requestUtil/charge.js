import RequestEngine from '../../../netApi/requestEngine.js';
var Promise = require('../../../libs/es6-promise.js').Promise;
var config = require('../../../config.js');
var charge = function (params,successCallback,faildCallback){
  new RequestEngine().request(config.doBossBizCharging, { ...params }, { callBy: this, method: this.charge, params: [params, successCallback, faildCallback] }, (success) => {
    successCallback(success)
    }, (faild) => {
      faildCallback(faild)
    });
    
  }
module.exports.charge= charge;