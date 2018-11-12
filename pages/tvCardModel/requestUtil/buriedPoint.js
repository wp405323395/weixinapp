import RequestEngine from '../../../netApi/requestEngine.js';
var Promise = require('../../../libs/es6-promise.js').Promise;
var config = require('../../../config.js');
var buriedPoint = function (pagename,cardInfo) {
  let city = cardInfo.city
  let custid = cardInfo.custid
  let tvCardNumber = cardInfo.tvCardNum
  new RequestEngine(false).request(config.doBuriedPoint, { pagename, tvCardNumber }, { callBy: this, method: this.buriedPoint, params: [pagename,cardInfo] }, (success) => {
  
  }, (faild) => {
   
  });

}
module.exports.buriedPoint = buriedPoint;