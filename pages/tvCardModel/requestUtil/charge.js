import RequestEngine from '../../../netApi/requestEngine.js';
var Promise = require('../../../libs/es6-promise.js').Promise;
var config = require('../../../config.js');
var charge = function (cardInfo, fees,successCallback,faildCallback){
  let city = cardInfo.city 
  let custid = cardInfo.custid
  let tvCardNumber = cardInfo.tvCardNum
  let serviceID = cardInfo.serviceID
  let qrKind = cardInfo.qrKind
  new RequestEngine().request(config.doBossBizCharging, { city, custid, tvCardNumber, serviceID, qrKind, fees }, { callBy: this, method: this.charge, params: [cardInfo, fees, successCallback, faildCallback] }, (success) => {
    successCallback(success)
    }, (faild) => {
      faildCallback(faild)
    });
    
  }
module.exports.charge= charge;