// pay.js
import RequestEngine from '../../../netApi/requestEngine.js';
var Promise = require('../../../libs/es6-promise.js').Promise;
var config = require('../../../config.js');
var util = require('../../../utils/util.js');
const itemList = ['请选择订购份数','1', '3', '6', '12'];
let  that;
Page({
  data: {
    isUserInfoHidden:false,
    isPruductInfoHidden:true,
    cardNumberSelectHidden: true,
    cardNumberSelect: -1,
    tvCardAnimationData: {},
    packages:[],
    coupQuantity:12,
    currentPackageSelect:undefined,
    isHiddenToast: true,
    currentPackageInfo:null
  },

  onLoad: function (options) {
    that = this;
    console.log(options);
    let custid = options.custid;
    let tvCardNum = options.tvCardNum;
    let serviceID = options.serviceID;
    let qrKind = options.qrKind;
    //--------------------
    this.addr = options.addr;
    this.custname = options.custname;
    this.mobile = options.mobile;
    this.city = options.city;
    //--------------------
    this.setData({
      scanCardInfo: {
        custid: custid,
        tvCardNum: tvCardNum,
        serviceID: serviceID,
        custname: options.custname,
        addr: options.addr
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
    this.serviceID = (serviceID == undefined ? 'undefined' : serviceID);
    this.qrKind = (qrKind == undefined ? 'undefined' : qrKind) ;
    if (!util.textIsNull(tvCardNum)) {
      setTimeout(() => {
        
        that.loadPackage(this.custid, this.tvCardNum, this.serviceID, this.qrKind, this.city).then(value=>{
          return that.loadCurrentPackageInfo(this.custid, this.tvCardNum, this.serviceID, this.qrKind, this.city);
        }).then(value=>{});
      }, 500);
    }
  },
  loadPackage: function (custid, tvCardNumber, serviceID, qrKind,city) {
    return new Promise((resolve, reject) => {
      new RequestEngine().request(config.querySalesList, { city,custid, tvCardNumber, serviceID, qrKind }, { callBy: that, method: that.loadPackage, params: [custid, tvCardNumber, serviceID, qrKind] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    }).then(value => {
      if (value.salesList && value.salesList.length != 0)  {
        if (value.salesList[0].salestype == '1') {
          that.setData({
            coupQuantity:1
          })
        }
        that.setData({
          packages: value.salesList,
          currentPackageSelect: value.salesList[0]
        });

      }
     
    }).catch(err => { })

  },
  loadCurrentPackageInfo: function (custid, tvCardNumber, serviceID, qrKind, city){
      return new Promise((resolve,reject)=>{
        new RequestEngine().request(config.doQueServSalesPkgInfo, { city, custid, tvCardNumber, serviceID, qrKind }, { callBy: that, method: that.doQueServSalesPkgInfo, params: [custid, tvCardNumber, serviceID, qrKind] }, (success) => {
          resolve(success);
          console.log('下来的请求',success);
          that.setData({
            currentPackageInfo: success
          });
        }, (faild) => {
          reject(faild);
        });
      })
  },
  select:function(event){
    let itemselect = event.currentTarget.dataset.itemselect
    console.log('当前点击的套餐是  ', itemselect);
      this.setData({
        currentPackageSelect: itemselect
      });
  },
  loadCards: function (custid, tvCardNum, serviceID) {
    new Promise((resolve, reject) => {
      new RequestEngine().request(config.queryOrderKeyno, { custid: custid }, { callBy: that, method: that.loadCards, params: [custid, tvCardNum, serviceID] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    }).then(value => {
      let cardsNumber = value;
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
      this.loadPackage(this.custid, this.tvCardNum, this.serviceID, this.qrKind,this.city);

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
    this.loadPackage(this.custid, this.tvCardNum, this.serviceID, this.qrKind,this.city);

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
    if (!util.textIsNotNull(that.tvCardNum)) {
      wx.showModal({
        title: "请您先选择智能卡号",
        showCancel: false,
        confirmText: "确定"
      })
      return;
    } else if (!util.textIsNotNull(that.custid)) {

      return;
    } else if (!that.data.currentPackageSelect) {
      wx.showModal({
        title: "请您先选择套餐",
        showCancel: false,
        confirmText: "确定"
      })
      return;
    } else if (!util.textIsNotNull(that.data.currentPackageSelect.salescode)){
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
    if (that.isPaying) {
      return;
    }
    that.isPaying = true;
    let reqUrl = config.wxPay
    new Promise((resolve, reject) => {
      let param = {
        custid: that.custid,
        tvCardNumber: that.tvCardNum,
        salestype: that.data.currentPackageSelect.salestype,//类型 0订购产品;1营销方案订购
        salescode: that.data.currentPackageSelect.salescode,//产品编码
        count: that.data.coupQuantity,//套餐倍数
        unit: that.data.currentPackageSelect.unit,//订购单位 0：天；1：月；2：年
        addr : this.addr,
        custname : this.custname,
        mobile : this.mobile,
        city:this.city,
        serviceid: this.serviceID
      };
      new RequestEngine().request(reqUrl, param, { callBy: that, method: that.pay, params: [] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    }).then(value=>{
        wx.requestPayment({
          'timeStamp': value.timeStamp,
          'nonceStr': value.nonceStr,
          'package': value.package,
          'signType': value.signType,
          'paySign': value.paySign,
          'success': function (res) {
            that.isPaying = false;
            console.log('支付结果',res);
            wx.navigateTo({
              url: 'success/paySuccess',
            })
          },
          'fail': function (res) {
            that.isPaying = false;
            ///// 记录错误日志
            let param = {
              errMsg: res.errMsg
            }
            new RequestEngine().request(config.recordPayFaild, param, { callBy: that, method: '', params: [] }, (success) => {
              console.log(success);
            }, (faild) => {
              console.log(faild)
            });
            //////
          }
        })
    }).catch(err=>{
      that.isPaying = false;
      wx.showModal({
        title: "支付失败,如有疑问请拨打客服电话96516",
        showCancel: false,
        confirmText: "取消"
      })
      ///// 记录错误日志
      let param = {
        errMsg: err
      }
      new RequestEngine().request(config.recordPayFaild, param, { callBy: that, method: '', params: [] }, (success) => {
        console.log(success);
      }, (faild) => {
        console.log(faild)
      });
  //////
    });
    
  },
  
  closeToast(){
    this.setData({
      isHiddenToast: true
    });
  },
  switchUserInfo:function(){
    this.setData({
      isUserInfoHidden: !this.data.isUserInfoHidden
    })
  },
  switchPruductInfo:function(){
    this.setData({
      isPruductInfoHidden: !this.data.isPruductInfoHidden
    })
  },
  chooseProductCount:function(){
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        if (res.tapIndex == 0) {return;}
        that.setData({
          coupQuantity: itemList[res.tapIndex]
        });
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  }
  
})