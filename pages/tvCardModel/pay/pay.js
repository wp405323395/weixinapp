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
    cardNumberSelectHidden:true,
    cardNumberSelect:-1,
    tvCardAnimationData: {},
  },
  onWeixinClick:function(e) {
    isWeiXin = !isWeiXin;
    this.setData({
      isWeiXin:isWeiXin
    });
  },
  onChoocePackage:function(){
    if (util.textIsNotNull(this.tvCardNum) || this.data.cardNumberSelect != -1) {
      let that = this;
      wx.navigateTo({
        url: `../choosePackages/choosePackages?custid=${that.custid}&tvCardNumber=${that.tvCardNum}&serviceID=${that.serviceID}&qrKind=${that.qrKind}`,
      })
    } else {
      wx.showModal({
        title: "请您先选择智能卡号",
        showCancel: false,
        confirmText: "确定"
      })

    }
    
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
    this.animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    this.animation.rotate(90).step();

    if (!util.textIsNotNull(tvCardNum)) {
      setTimeout(() => {
        this.loadCards(custid, tvCardNum, serviceID);
      }, 500)
    }
    this.tvCardNum = tvCardNum;
    this.custid = custid;
    this.serviceID = serviceID;
    
  },
  onShow: function () {
    let that = this;
    wx.getStorage({
      key: 'packageDetail',
      success: function(res) {
        that.setData({
          selectPackage: res.data
        });
        wx.setStorage({
          key: 'packageDetail',
          data: '',
        })
      },
    })
  },
  loadCards: function (custid, tvCardNum, serviceID) {
    let that = this;
    new Promise ((resolve , reject)=> {
      let formData = JSON.stringify({
        custid: custid 
      });
      new RequestEngine().request(config.queryOrderKeyno, { formData: formData }, { callBy: that, method: that.loadCards, params: [custid, tvCardNum, serviceID] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    }).then(value=>{
      let cardsNumber = value.retData;
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
    this.tvCardNum = this.data.searchPerson.cardsNumber[id];
    this.animation.rotate(0).step();
    this.setData({
      cardNumberSelect:id,
      cardNumberSelectHidden: !this.data.cardNumberSelectHidden,
      tvCardAnimationData: this.animation.export()
    });
    
  },
  onSelectCard:function(){
    if (this.data.scanCardInfo.tvCardNum) {
        return ;
    }
    if(this.data.cardNumberSelectHidden) {
      this.animation.rotate(90).step();
    } else {
      this.animation.rotate(0).step();
    }
    
    this.setData({
      cardNumberSelectHidden: !this.data.cardNumberSelectHidden,
      tvCardAnimationData: this.animation.export()

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