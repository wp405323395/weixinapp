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
    isUserInfoHidden:false,
    isPruductInfoHidden:false,
    cardNumberSelectHidden: true,
    cardsSelectIndex: -1,
    tvCardAnimationData: {},
    packages:null,
    currentPackageSelect:0,
    isHiddenToast: true,
    isHiddenToast2: true,
    feedbackData:null,
    currentPackageInfo:null,
    formatTime:''
  },

  onLoad: function (options) {
    that = this;
    qrid = options.qrid;
    let serviceID = options.serviceID;
    this.serviceID = (serviceID == undefined ? 'undefined' : serviceID);
    let qrKind = options.qrKind;
    this.qrKind = (qrKind == undefined ? 'undefined' : qrKind);
    this.custid = options.custid;
    this.tvCardNum = options.tvCardNum;
    this.addr = options.addr;
    this.custname = options.custname;
    this.mobile = options.mobile;
    this.city = options.city;
    //--------------------
    this.setData({
      scanCardInfo: {
        custid: that.custid,
        tvCardNum: that.tvCardNum,
        serviceID: that.serviceID,
        custname: that.custname,
        addr: that.addr
      }
    });
    this.animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    this.animation.rotate(90).step();
    setTimeout(() => {
      this.loadData();
    }, 500)
  },
  loadPackage: function () {
    return netData.loadPackage(this.city, this.custid, this.tvCardNum, this.serviceID, this.qrKind).then(value => {
      if (value.salesList && value.salesList.length != 0) {
        that.setData({
          packages: value.salesList,
        });

      }

    }).catch(err => { })

  },
  loadCards:  function (custid) {
    return netData.loadCards(custid).then(cardsNumber=>{
      if (cardsNumber.length > 0) {
        this.data.cardsSelectIndex = 0;
        this.tvCardNum = cardsNumber[0];
      }
      this.setData({
        allCards: cardsNumber,
        cardsSelectIndex: this.data.cardsSelectIndex
      });
      if (this.tvCardNum) {
      return this.loadPackage();
      }
    }).then(value=>{
    })
    
  },
  loadData:function(){
    if (util.textIsNull(this.tvCardNum)) {
      this.loadCards(this.custid);
    } else {
      that.loadPackage().then(value => {
          return that.loadCurrentPackageInfo();
        }).then(value => { });
    }
  },
  onShow:function(){
    if (util.textIsNotNull(qrid)) {
      this.loadToast(qrid);
    }
  },
  loadToast: function (qrid) {
    netData.loadToast(qrid, this.city).then(success=>{
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
    netData.loadCurrentPackageInfo(this.city, this.custid, this.tvCardNum, this.serviceID, this.qrKind).then(success=>{
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
    this.tvCardNum = this.data.allCards[id];
    this.animation.rotate(0).step();
    this.setData({
      cardsSelectIndex: id,
      cardNumberSelectHidden: !this.data.cardNumberSelectHidden,
      tvCardAnimationData: this.animation.export()
    });
    this.loadPackage();

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
      custid: that.custid,
      tvCardNumber: that.tvCardNum,
      salestype: that.data.packages[currentIndex].salestype,//类型 0订购产品;1营销方案订购
      salescode: that.data.packages[currentIndex].salescode,//产品编码
      count: that.data.packages[currentIndex].count,//套餐倍数
      unit: that.data.packages[currentIndex].unit,//订购单位 0：天；1：月；2：年
      addr: this.addr,
      custname: this.custname,
      mobile: this.mobile,
      city: this.city,
      serviceid: this.serviceID
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
            uploadNetApi.payFaild(res.errMsg, that.city, that.custid, that.tvCardNum, that.serviceID, that.qrKind, that.data.packages[currentIndex].salescode)
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
      uploadNetApi.payFaild(err, that.city, that.custid, that.tvCardNum, that.serviceID, that.qrKind, that.data.packages[currentIndex].salescode)
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



  //套餐de反馈 package,pay-canceled，app-feedback
  showFeedbackPaper(e) {
    this.currentPaperType = e.target.id
    switch (this.currentPaperType) {
      case 'package':
      case 'pay-canceled':
        let feedback = require('../requestUtil/feedback.js')
        feedback.getFeedbackPaper(this, this.currentPaperType)
        break;
      case 'app-feedback':
        this.setData({
          isHiddenToast2: false
        })
        break;
    }

  },
  //提交问卷
  paperSubmit() {
    let feedback = require('../requestUtil/feedback.js')
    switch (this.currentPaperType) {
      case 'package':
      case 'pay-canceled':
        feedback.setPkgFeedbackPaper(this, this.currentPaperType, this.paper.selected, this.paper.answer)
      break;
      case 'app-feedback':
        feedback.setAppFeedbackPaper(this, this.paper1.content, this.paper1.contact)
      break;
    }
  },

  closeToast() {
    this.setData({
      isHiddenToast: true,
      isHiddenToast2: true
    });
  },
  paper:{
    selected:'',
    answer:''
  },
  paper1:{
    content:'',
    contact:''
  },
  paper2InputContent(event){
    this.paper1.content = event.detail.value;
  },
  paper2InputContact(event){
    this.paper1.contact = event.detail.value;
  },
  checkboxChanged(event) {
    this.paper.selected = event.detail.value.join(',');
  },
  paperTextChanged(event) {
    this.paper.answer = event.detail.value;
  }
  
})