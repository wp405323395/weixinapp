// pay.js
var util = require('../../../utils/util.js');
var netData = require('../requestUtil/netData.js')
var coupNet = require('../../elevenAndEleven/requestUtil/coupNet.js')
var appInstance = getApp()
let that;
let countDown = 0;
Page({
  data: {
    isFestival: false,
    isBizEndTime: false,
    recommendProduct: null,
    recommendPackage: null,
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
    this.setData({
      isFestival: appInstance.initIsFestival(8),
      scanCardInfo: appInstance.cardInfo
    });
    this.animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    this.animation.rotate(90).step();
    if (this.data.isFestival) {
      coupNet.queryCouponsStatus(appInstance.cardInfo, value => {
        let coups = value;
        coups.sort(function(m, n) {
          return n.discountPrice - m.discountPrice
        })
        that.coups = coups;

        this.loadData();
      }, faildCallback => {

      })
    } else {
      this.loadData();
    }
  },
  onShow: function() {
    if (util.textIsNotNull(appInstance.qrid)) {
      this.baseTrySee(); // 头部黄色提示-试看
    } 
    // else if (util.textIsNotNull(appInstance.scene)) {
    //   this.offlineBaseTrySee(); // 头部黄色提示-试看
    // }
    console.log('卡信息是：', appInstance.cardInfo)
    this.queryServstEtime() // 头部黄色提示-距离多少天到期
    //appInstance.currentPackageInfo = null
    appInstance.package1 = null
    appInstance.package2 = null
  },
  getCanUsedCoup(price) {
    for (let item of this.coups) {
      if (item.fullPrice < price) {
        return item
      }
    }
    return null;
  },
  loadData: function() {
    if (util.textIsNull(appInstance.cardInfo.tvCardNum)) {
      this.loadCards().then(value => {
        that.loadCurrentPackageInfo();
      });
    } else {
      that.loadPackage().then(value => {
        that.loadCurrentPackageInfo();
      })

    }
  },
  gotoFestival: function() {
    wx.navigateTo({
      url: '/pages/elevenAndEleven/index',
    })
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
            item.price = parseFloat(item.price)
            if (item.prdType == 'a104') {
              item.totalPrice = parseFloat(item.price) + parseFloat(value.salesList[0].price)
              item.totalSalesname = `${item.salesname}+${value.salesList[0].salesname}`
            } else {
              item.totalPrice = parseFloat(item.price)
              item.totalSalesname = item.salesname
            }
            if (this.coups) {
              item.coupItem = this.getCanUsedCoup(item.totalPrice)
            }
          }
          that.setData({
            recommendProduct: value.salesList[0],
            recommendPackage: value.salesList.splice(1)
          });
        }
      } catch (err) {
        setTimeout(() => {
          wx.showToast({
            icon: 'none',
            title: '产品介绍数据有误',
          });
        }, 1000)

      };

    }).catch(err => {
      console.log('******************',err)
    })

  },
  // 当前产品
  loadCurrentPackageInfo: function() {
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
      appInstance.currentPackageInfo = success
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
  baseTrySee: function() {
    netData.baseTrySee(appInstance.qrid, appInstance.cardInfo.city).then(success => {
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
  //试看请求
  offlineBaseTrySee: function() {
    netData.offlineBaseTrySee(appInstance.scene, appInstance.cardInfo.city).then(success => {
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
  queryServstEtime() {
    netData.queryServstEtime(appInstance.cardInfo.custid, appInstance.cardInfo.tvCardNum).then(success => {

      let times = success.map(item => {
        return new Date(item.value.replace(/-/g, '/')).getTime();
      })
      let minTime = Math.min(...times)
      let disTime = minTime - new Date().getTime();
      var days = Math.floor(disTime / (24 * 3600 * 1000))
      console.log('差值日期是：', days)
      if (days < 30) {
        this.setData({
          deadline: days,
          isBizEndTime: true
        })
      } else {
        this.setData({
          deadline: days,
          isBizEndTime: false
        })
      }
    })
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
      wx.showModal({
        title: "custid为空,不可订购",
        showCancel: false,
        confirmText: "确定"
      })
      return;
    }
    if (!appInstance.packages) {
      wx.showModal({
        title: "订购包为空,不可订购",
        showCancel: false,
        confirmText: "确定"
      })
      return;
    } else if (this.data.packageSelectIndex == -1) {
      wx.showModal({
        title: "至少选择一个产品下单",
        showCancel: false,
        confirmText: "确定"
      })
      return;
    }
    if (!this.data.currentPackageInfo) {
      wx.showModal({
        title: "因为您的当前产品未被查询到，导致您订购失败",
        showCancel: false,
        confirmText: "确定"
      })
      return
    }
    appInstance.package1 = this.data.recommendProduct
    appInstance.package2 = this.data.recommendPackage[this.data.packageSelectIndex]

    wx.navigateTo({
      url: 'payMoney/pay',
    })
  },

  onHide: function() {
    //试看倒计时重置
    countDown = 0;
  },
  //跳转到充值界面
  gotoCharge: function() {
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