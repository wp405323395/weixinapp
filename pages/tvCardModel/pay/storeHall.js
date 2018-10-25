// pay.js
var util = require('../../../utils/util.js');
var netData = require('../requestUtil/netData.js')
var appInstance = getApp()
let that;
let countDown = 0;
var qrid
Page({
  data: {
    recommendProduct: null,
    recommendPackage: null,
    isBasePackSelect: true,
    packageSelectIndex: 0,
    toastType: -1,
    cardNumberSelectHidden: true,
    cardsSelectIndex: -1,
    tvCardAnimationData: {},
    packages: null,
    currentPackageTotalMoney: 0,
    currentPackageInfo: null,
    formatTime: ''
  },

  onLoad: function(options) {
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
      city: options.city
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
    this.loadData();
  },
  loadData: function() {
    if (util.textIsNull(this.cardInfo.tvCardNum)) {
      this.loadCards();
    } else {
      that.loadPackage().then(value => {
        that.loadCurrentPackageInfo();
      })
      
    }
  },
  // 推荐产品,推荐套餐
  loadPackage: function() {
    return netData.loadPackage(this.cardInfo).then(value => {
      try {
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
            recommendPackage: value.salesList.splice(1),
            packages: value.salesList,
          });

          wx.setStorage({
            key: 'packages',
            data: JSON.stringify(value.salesList),
          })

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
  loadCards: function() {
    return netData.loadCards(this.cardInfo.custid).then(cardsNumber => {
      if (cardsNumber.length > 0) {
        this.data.cardsSelectIndex = 0;
        this.cardInfo.tvCardNum = cardsNumber[0];
      }
      wx.setStorage({
        key: 'cardInfo',
        data: JSON.stringify(this.cardInfo)
      })
      this.setData({
        allCards: cardsNumber,
        cardsSelectIndex: this.data.cardsSelectIndex
      });
      if (this.cardInfo.tvCardNum) {
        return this.loadPackage();
      }
    }).then(value => {})

  },

  onShow: function() {
    if (util.textIsNotNull(qrid)) {
      this.loadToast(qrid);
    }
    
    appInstance.currentPackageInfo = null
    appInstance.package1 = null
    appInstance.package2 = null
    appInstance.cardInfo = null
  },
  loadToast: function(qrid) {
    netData.loadToast(qrid, this.cardInfo.city).then(success => {
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
  // 当前产品
  loadCurrentPackageInfo: function() {
    netData.loadCurrentPackageInfo(this.cardInfo).then(success => {
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
  select: function(event) {
    let index = event.currentTarget.dataset.itemselect 
    this.setData({
        packageSelectIndex: (this.data.packageSelectIndex != index ? index : -1)
    });
  },
  select1: function(event) {
    this.setData({
      isBasePackSelect: !this.data.isBasePackSelect
    })
  },

  onCardNumberSelectOptionClick: function(e) {
    let id = parseInt(e.currentTarget.id);
    this.cardInfo.tvCardNum = this.data.allCards[id];
    this.animation.rotate(0).step();
    this.setData({
      cardsSelectIndex: id,
      cardNumberSelectHidden: !this.data.cardNumberSelectHidden,
      tvCardAnimationData: this.animation.export()
    });
    wx.setStorage({
      key: 'cardInfo',
      data: JSON.stringify(this.cardInfo)
    })
    this.loadPackage();

  },
  onSelectCard: function() {
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
  ensureClick: function(e) {
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
    if (!this.data.packages) {
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
    if (this.cardInfo) {
      appInstance.cardInfo = this.cardInfo;
    }
    
    wx.navigateTo({
      url: 'payMoney/pay',
    })
  },

  onHide: function() {
    countDown = 0;
  },
  gotoCharge: function () {
    wx.navigateTo({
      url: '../charge/charge',
    })
  },

  showFeedbackPaper(event) {
    console.log('target ', event.target.id)
    wx.navigateTo({
      url: '../feedback/feedback?feedBackType=' + event.target.id,
    })

  },
})