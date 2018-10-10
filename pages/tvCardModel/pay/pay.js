// pay.js
var util = require('../../../utils/util.js');
var netData = require('../requestUtil/netData.js')
const itemList = ['请选择订购份数','1', '2', '3', '4'];// 套餐数量的可选范围
const itemList2 = ['请选择订购份数', '3', '6', '12', '24'];// 基本包的可选范围。
let  that;
let countDown = 0;
var qrid
Page({
  data: {
    isListFold:true,
    toastType:-1,
    isUserInfoHidden:true,
    isPruductInfoHidden:false,
    cardNumberSelectHidden: true,
    cardsSelectIndex: -1,
    tvCardAnimationData: {},
    packages:null,
    currentPackageSelect:0,
    feedbackData:null,
    currentPackageInfo:null,
    formatTime:''
  },

  onLoad: function (options) {
    that = this;
    qrid = options.qrid;

    let cardInfo = {
      custid: options.custid,
      tvCardNum: options.tvCardNum,
      serviceID: (options.serviceID == undefined ? 'undefined' : options.serviceID),
      custname: options.custname,
      addr: options.addr,
      qrKind: (options.qrKind == undefined ? 'undefined' : options.qrKind),
      mobile: options.mobile,
      city : options.city
    }
    this.cardInfo = cardInfo
    this.setData({
      scanCardInfo: cardInfo
    });
    wx.setStorage({
      key: 'cardInfo',
      data: JSON.stringify(cardInfo)
    })
    this.animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    this.animation.rotate(90).step();
    setTimeout(() => {
      this.loadData();
    }, 500)
  },
  loadData: function () {
    if (util.textIsNull(this.cardInfo.tvCardNum)) {
      this.loadCards();
    } else {
      that.loadPackage().then(value => {
        return that.loadCurrentPackageInfo();
      }).then(value => { });
    }
  },
  loadPackage: function () {
    return netData.loadPackage(this.cardInfo.city, this.cardInfo.custid, this.cardInfo.tvCardNum, this.cardInfo.serviceID, this.cardInfo.qrKind).then(value => {
      if (value.salesList && value.salesList.length != 0) {
        that.setData({
          packages: value.salesList,
        });
        wx.setStorage({
          key: 'packages',
          data: JSON.stringify(value.salesList),
        })

      }

    }).catch(err => { })

  },
  loadCards:  function () {
    return netData.loadCards(this.cardInfo.custid).then(cardsNumber=>{
      if (cardsNumber.length > 0) {
        this.data.cardsSelectIndex = 0;
        this.cardInfo.tvCardNum = cardsNumber[0];
      }
      this.setData({
        allCards: cardsNumber,
        cardsSelectIndex: this.data.cardsSelectIndex
      });
      if (this.cardInfo.tvCardNum) {
      return this.loadPackage();
      }
    }).then(value=>{
    })
    
  },

  onShow:function(){
    if (util.textIsNotNull(qrid)) {
      this.loadToast(qrid);
    }
  },
  loadToast: function (qrid) {
    netData.loadToast(qrid, this.cardInfo.city).then(success=>{
      if (countDown == 0) {
        countDown = success.time;
        that.setData({
          toastType: success.type,
        });
        if (success.type == '1') {
          that.refreshCountDown();
        } 
      }
    })
  },
  refreshCountDown: function(){
    setTimeout(()=>{
      let time = util.formatDuring(countDown);
      this.setData({
        formatTime:time
      });
      if (countDown<1000) {
        if(countDown == 0) {
          this.setData({
            formatTime: ''
          });
        }
        return;
      }
      countDown -= 1000;
      that.refreshCountDown();
    },1000);
  },
  
  loadCurrentPackageInfo: function (){
    netData.loadCurrentPackageInfo(this.cardInfo.city, this.cardInfo.custid, this.cardInfo.tvCardNum, this.cardInfo.serviceID, this.cardInfo.qrKind).then(success=>{
      that.setData({
        currentPackageInfo: success
      });
    })
  },
  select:function(event){
    let index = event.currentTarget.dataset.itemselect
      this.setData({
        currentPackageSelect: index
      });
  },
  
  onCardNumberSelectOptionClick: function (e) {
    let id = parseInt(e.currentTarget.id);
    this.cardInfo.tvCardNum = this.data.allCards[id];
    this.animation.rotate(0).step();
    this.setData({
      cardsSelectIndex: id,
      cardNumberSelectHidden: !this.data.cardNumberSelectHidden,
      tvCardAnimationData: this.animation.export()
    });
    this.loadPackage();

  },
  onSelectCard: function () {
    if (this.cardInfo.tvCardNum) {
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
    if (!util.textIsNotNull(this.cardInfo.tvCardNum)) {
      wx.showModal({
        title: "请您先选择智能卡号",
        showCancel: false,
        confirmText: "确定"
      })
      return;
    } else if (!util.textIsNotNull(this.cardInfo.custid)) {

      return;
    }

    this.pay();
  },
  pay: function () {
    if (that.isPaying) {
      return;
    }
    that.isPaying = true;
    let currentIndex = that.data.currentPackageSelect
    let param = {
      custid: this.cardInfo.custid,
      tvCardNumber: this.cardInfo.tvCardNum,
      salestype: that.data.packages[currentIndex].salestype,//类型 0订购产品;1营销方案订购
      salescode: that.data.packages[currentIndex].salescode,//产品编码
      count: that.data.packages[currentIndex].count,//套餐倍数
      unit: that.data.packages[currentIndex].unit,//订购单位 0：天；1：月；2：年
      addr: this.cardInfo.addr,
      custname: this.cardInfo.custname,
      mobile: this.cardInfo.mobile,
      city: this.cardInfo.city,
      serviceid: this.cardInfo.serviceID,
      custfess: that.data.currentPackageInfo.charge
    };
    netData.pay(param).then(value=>{
        wx.requestPayment({
          'timeStamp': value.timeStamp,
          'nonceStr': value.nonceStr,
          'package': value.package,
          'signType': value.signType,
          'paySign': value.paySign,
          'success': function (res) {
            that.isPaying = false;
            console.log('支付结果',res);
            wx.redirectTo({
              url: 'success/paySuccess',
            })
          },
          'fail': function (res) {
            that.isPaying = false;
            ///// 记录错误日志
            that.showFeedbackPaper({ target: { id: 'pay-canceled' } })
            let uploadNetApi = require('../requestUtil/uploadNetApi.js')
            uploadNetApi.payFaild(res.errMsg, this.cardInfo.city, this.cardInfo.custid, this.cardInfo.tvCardNum, this.cardInfo.serviceID, this.cardInfo.qrKind, that.data.packages[currentIndex].salescode)
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
      let uploadNetApi = require('../requestUtil/uploadNetApi.js')
      uploadNetApi.payFaild(err, this.cardInfo.city, this.cardInfo.custid, this.cardInfo.tvCardNum, this.cardInfo.serviceID, this.cardInfo.qrKind, that.data.packages[currentIndex].salescode)
      //////
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
  switchList:function(){
    let delItem = this.data.packages[this.data.currentPackageSelect]
    this.data.packages.splice(this.data.currentPackageSelect, 1)
    this.data.packages.unshift(delItem)
    this.setData({
      packages: this.data.packages,
      currentPackageSelect:0,
      isListFold: !this.data.isListFold  
    })


  },
  onHide: function(){
    countDown = 0;
  },
  chooseProductCount: function (target){
    let index = target.currentTarget.dataset.packageitem
    let currentItemList = that.data.packages[index].salestype.indexOf('1') > -1 ? itemList : itemList2;
    wx.showActionSheet({
      itemList: currentItemList,
      success: function (res) {
        if (res.tapIndex == 0) {return;}
        console.log('index:',index)
        that.data.packages[index].count = currentItemList[res.tapIndex]
        that.setData({
          packages: that.data.packages
        });
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  showFeedbackPaper(event) {
    console.log('target ', event.target.id)
    wx.navigateTo({
      url: '../feedback/feedback?feedBackType=' + event.target.id,
    })

  },
})