// pay.js
import { RequestEngine } from '../../../netApi/requestEngine.js';
var config = require('../../../config.js');
var util = require('../../../utils/util.js');
var isWeiXin = true;
Page({

  data: {
    isWeiXin: isWeiXin,
    num: 1,
    minusStatus: 'disabled',
    payInfo:null,
    cardNumberSelectHidden:true,
    cardNumberSelect:-1,
  },
  onWeixinClick:function(e) {
    isWeiXin = !isWeiXin;
    this.setData({
      isWeiXin:isWeiXin
    });
  },
  onChoocePackage:function(){
    wx.navigateTo({
      url: '../choosePackages/choosePackages',
    })
  },

  onLoad: function (options) {
    let custid = options.custid;
    let tvCardNum = options.tvCardNum;
    let serviceID = options.serviceID;
    this.setData({
      scanCardInfo:{
        custid: custid, tvCardNum: tvCardNum, serviceID: serviceID
      }
    });
    if (!util.textIsNotNull(tvCardNum)) {
      setTimeout(() => {
        this.loadCards(custid, tvCardNum, serviceID);
      }, 500)
    }
    
  },
  loadCards: function (custid, tvCardNum, serviceID) {
    let that = this;
    new Promise ((resolve , reject)=> {
      let formData = JSON.stringify({
        querparam: custid 
      });
      new RequestEngine().request(config.queryOrderKeyno, { formData: formData }, { callBy: that, method: that.loadCards, params: [custid, tvCardNum, serviceID] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    }).then(value=>{
      let cardsNumber = value.tvCardNumber;
      this.setData({
        searchPerson:{
          cardsNumber
        }
      });
      
    }).catch(err=>{

    });
    
  },
  onCardNumberSelectOptionClick:function(e) {
    let id = parseInt(e.currentTarget.id);
    this.setData({
      cardNumberSelect:id,
      cardNumberSelectHidden: !this.data.cardNumberSelectHidden
    });
    
  },
  onSelectCard:function(){
    if (this.data.scanCardInfo.tvCardNum) {

        return ;

    }

    this.setData({
      cardNumberSelectHidden: !this.data.cardNumberSelectHidden
    });
    
  },
  payClick:function(e){
    wx.navigateTo({
      url: 'success/paySuccess',
    })
  }, 

  bindMinus: function () {
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },

  bindPlus: function () {
    var num = this.data.num;
    num++;
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },

  bindManual: function (e) {
    var num = e.detail.value;

    this.setData({
      num: num
    });
  }  
})