// pay.js
import RequestEngine from '../../../netApi/requestEngine.js';
var Promise = require('../../../libs/es6-promise').Promise;
var config = require('../../../config.js');
var util = require('../../../utils/util.js');

Page({
  data: {
    isWeiXin: true,
    num: 1,
    minusStatus: 'disabled',
    cardNumberSelectHidden: true,
    cardNumberSelect: -1,
    tvCardAnimationData: {}
  },
  onWeixinClick: function (e) {

    this.setData({
      isWeiXin: !this.data.isWeiXin,
      isBookPayment:false
    });
  },
  onBookPaymentClick:function(e) {

    this.setData({
      isBookPayment: !this.data.isBookPayment,
      isWeiXin:false
    });
  },
  onChoocePackage: function () {
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
    console.log(options);
    let custid = options.custid;
    let tvCardNum = options.tvCardNum;
    let serviceID = options.serviceID;
    let qrKind = options.qrKind;
    this.setData({
      scanCardInfo: {
        custid: custid, tvCardNum: tvCardNum, serviceID: serviceID
      }
    });
    this.animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    this.animation.rotate(90).step();

    if (util.textIsNull(tvCardNum)) {
      setTimeout(() => {
        this.loadCards(custid, tvCardNum, serviceID);
      }, 500)
    }
    this.tvCardNum = tvCardNum;
    this.custid = custid;
    this.serviceID = serviceID;
    this.qrKind = qrKind;
  },
  onShow: function () {
    let that = this;
    wx.getStorage({
      key: 'packageDetail',
      success: function (res) {
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
    new Promise((resolve, reject) => {
      let formData = JSON.stringify({
        custid: custid
      });
      new RequestEngine().request(config.queryOrderKeyno, { formData: formData }, { callBy: that, method: that.loadCards, params: [custid, tvCardNum, serviceID] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    }).then(value => {
      let cardsNumber = value.retData;
      if (cardsNumber.length > 0) {
        this.data.cardNumberSelect = 0;
        this.tvCardNum = cardsNumber[0];
      }
      
      this.setData({
        searchPerson: {
          cardsNumber: cardsNumber,
        },
        cardNumberSelect: this.data.cardNumberSelect
      });

    }).catch(err => {

    });

  },
  onCardNumberSelectOptionClick: function (e) {
    let id = parseInt(e.currentTarget.id);
    this.tvCardNum = this.data.searchPerson.cardsNumber[id];
    this.animation.rotate(0).step();
    this.setData({
      cardNumberSelect: id,
      cardNumberSelectHidden: !this.data.cardNumberSelectHidden,
      tvCardAnimationData: this.animation.export()
    });

  },
  onSelectCard: function () {
    if (this.data.scanCardInfo.tvCardNum) {
      return;
    }
    if (this.data.cardNumberSelectHidden) {
      this.animation.rotate(90).step();
    } else {
      this.animation.rotate(0).step();
    }

    this.setData({
      cardNumberSelectHidden: !this.data.cardNumberSelectHidden,
      tvCardAnimationData: this.animation.export()

    });

  },
  payClick: function (e) {
    let that = this;
    if (!util.textIsNotNull(that.tvCardNum)) {
      wx.showModal({
        title: "请您先选择智能卡号",
        showCancel: false,
        confirmText: "确定"
      })
      return;
    } else if (!util.textIsNotNull(that.custid)) {

      return;
    } else if (!util.textIsNotNull(that.data.selectPackage.salescode)){
      wx.showModal({
        title: "请您先选择套餐",
        showCancel: false,
        confirmText: "确定"
      })
      return;
    }

    this.pay();
  },
  pay: function () {
    let that = this;
    new Promise((resolve, reject) => {
      
      if(!that.data.selectPackage) {
        return ;
      }
      let formData = JSON.stringify({
        custid: that.custid,
        tvCardNumber: that.tvCardNum,
        salestype: that.data.selectPackage.salestype,//类型 0订购产品;1营销方案订购
        salescode: that.data.selectPackage.salescode,//产品编码
        count: that.data.selectPackage.count,//套餐倍数
        unit: that.data.selectPackage.unit,//订购单位 0：天；1：月；2：年
      });
      new RequestEngine().request(config.doOrder, { formData: formData }, { callBy: that, method: that.pay, params: [] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    }).then(value=>{
      wx.navigateTo({
        url: 'success/paySuccess',
      })
    }).catch(err=>{
      wx.showModal({
        title: "支付失败",
        showCancel: false,
        confirmText: "取消"
      })
    });
    
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