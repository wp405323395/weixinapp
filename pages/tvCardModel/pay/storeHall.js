// pay.js
var util = require('../../../utils/util.js');
var netData = require('../requestUtil/netData.js')
var appInstance = getApp()
let that;
let countDown = 0;
var qrid
Page({
  data: {
    isBizEndTime:false,
    recommendProduct: null,
    recommendPackage: null,
    isBasePackSelect: true,
    packageSelectIndex: -1,
    toastType: -1,
    cardNumberSelectHidden: true,
    cardsSelectIndex: -1,
    tvCardAnimationData: {},
    currentPackageTotalMoney: 0,
    currentPackageInfo: null,
    formatTime: ''
  },

  onLoad: function(options) {
    that = this;
    qrid = options.qrid;
    appInstance.cardInfo = {
      custid: options.custid,
      tvCardNum: options.tvCardNum,
      serviceID: (options.serviceID == undefined ? 'undefined' : options.serviceID),
      custname: options.custname,
      addr: options.addr,
      qrKind: (options.qrKind == undefined ? 'undefined' : options.qrKind),
      mobile: options.mobile,
      city: options.city
    }
    this.setData({
      scanCardInfo: appInstance.cardInfo
    });
    this.animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    this.animation.rotate(90).step();
    this.loadData();
  },
  loadData: function() {
    if (util.textIsNull(appInstance.cardInfo.tvCardNum)) {
      this.loadCards();
    } else {
      that.loadPackage().then(value => {
        that.loadCurrentPackageInfo();
      })
      
    }
  },
  // 推荐产品,推荐套餐
  loadPackage: function() {
    return netData.loadPackage(appInstance.cardInfo).then(value => {
      try {
        appInstance.packages = value.salesList
        if (value.salesList && value.salesList.length != 0) {
          for (let item of value.salesList) {
            let intro = JSON.parse(item.salesintro)
            let a = []
            for (let i in intro) {
              a.push({
                key: i,
                value: intro[i]
              })
            }
            item.salesintro = a
          }
          that.setData({
            recommendProduct: value.salesList[0],
            recommendPackage: value.salesList.splice(1)
          });
          
        }
      } catch(err){
        setTimeout(()=>{
          wx.showToast({
            icon:'none',
            title: '产品介绍数据有误',
          });
        },1000)

      };

    }).catch(err => {})

  },
  // 当前产品
  loadCurrentPackageInfo: function () {
    netData.loadCurrentPackageInfo(appInstance.cardInfo).then(success => {
      let money1 = 0;
      let money2 = 0;
      if (success.prodsbo) {
        money1 = parseFloat(success.prodsbo.price)
      }
      if (success.salespkgbo) {
        money2 = parseFloat(success.salespkgbo.fees)
      }
      that.setData({
        currentPackageTotalMoney: money1 + money2,
        currentPackageInfo: success
      });
    })
  },
  //当前所有卡号
  loadCards: function() {
    return netData.loadCards(appInstance.cardInfo.custid).then(cardsNumber => {
      if (cardsNumber.length > 0) {
        this.data.cardsSelectIndex = 0;
        appInstance.cardInfo.tvCardNum = cardsNumber[0];
      }
      this.setData({
        allCards: cardsNumber,
        cardsSelectIndex: this.data.cardsSelectIndex
      });
      if (appInstance.cardInfo.tvCardNum) {
        return this.loadPackage();
      }
    }).then(value => {})

  },
  //试看请求
  baseTrySee: function (qrid) {
    netData.baseTrySee(qrid, appInstance.cardInfo.city).then(success => {
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
  // 快到期的催费。
  queryServstEtime(){
    netData.queryServstEtime(appInstance.cardInfo.custid, appInstance.cardInfo.tvCardNum).then(success=>{

      let times = success.map(item=>{
        return new Date(item.value.replace(/-/g, '/')).getTime();
      })
      let minTime = Math.min(...times)
      let disTime = minTime - new Date().getTime();
      var days = Math.floor(disTime / (24 * 3600 * 1000))
      console.log('差值日期是：', days)
      if(days<30) {
        this.setData({
          deadline: days,
          isBizEndTime:true
        })
      } else {
        this.setData({
          deadline: days,
          isBizEndTime: false
        })
      }
    })
  },

  onShow: function() {
    if (util.textIsNotNull(qrid)) {
      this.baseTrySee(qrid);
    }
    this.queryServstEtime()
    // 充值下单数据
    appInstance.currentPackageInfo = null
    appInstance.package1 = null
    appInstance.package2 = null
  },
  //试看倒计时
  refreshCountDown: function() {
    setTimeout(() => {
      let time = util.formatDuring(countDown);
      this.setData({
        formatTime: time
      });
      if (countDown < 1000) {
        if (countDown == 0) {
          this.setData({
            formatTime: ''
          });
        }
        return;
      }
      countDown -= 1000;
      that.refreshCountDown();
    }, 1000);
  },
  //基本包的选择
  select: function(event) {
    let index = event.currentTarget.dataset.itemselect 
    this.setData({
        packageSelectIndex: (this.data.packageSelectIndex != index ? index : -1)
    });
  },
  //推荐套餐的选择
  select1: function(event) {
    this.setData({
      isBasePackSelect: !this.data.isBasePackSelect
    })
  },
  //选择卡号。
  onCardNumberSelectOptionClick: function(e) {
    let id = parseInt(e.currentTarget.id);
    appInstance.cardInfo.tvCardNum = this.data.allCards[id];
    this.animation.rotate(0).step();
    this.setData({
      cardsSelectIndex: id,
      cardNumberSelectHidden: !this.data.cardNumberSelectHidden,
      tvCardAnimationData: this.animation.export()
    });
    this.loadPackage();

  },
  //点击选卡后的动画
  onSelectCard: function() {
    if (appInstance.cardInfo.tvCardNum) {
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
  //确定要下单的事件
  ensureClick: function(e) {
    if (!util.textIsNotNull(appInstance.cardInfo.tvCardNum)) {
      wx.showModal({
        title: "请您先选择智能卡号",
        showCancel: false,
        confirmText: "确定"
      })
      return;
    } else if (!util.textIsNotNull(appInstance.cardInfo.custid)) {
      return;
    }
    if (!appInstance.packages) {
      return;
    } else if (!this.data.isBasePackSelect && this.data.packageSelectIndex == -1) {
      return;
    }
    if (this.data.currentPackageInfo) {
      appInstance.currentPackageInfo = this.data.currentPackageInfo
    } else {
      return;
    }
    if (this.data.isBasePackSelect) {
      appInstance.package1 = this.data.recommendProduct
    }
    if (this.data.packageSelectIndex>-1) {
      appInstance.package2 = this.data.recommendPackage[this.data.packageSelectIndex]
    }
    
    wx.navigateTo({
      url: 'payMoney/pay',
    })
  },

  onHide: function() {
    //试看倒计时重置
    countDown = 0;
  },
  //跳转到充值界面
  gotoCharge: function () {
    wx.navigateTo({
      url: '../charge/charge',
    })
  },
  //跳转到反馈界面
  showFeedbackPaper(event) {
    console.log('target ', event.target.id)
    wx.navigateTo({
      url: '../feedback/feedback?feedBackType=' + event.target.id,
    })

  },
})