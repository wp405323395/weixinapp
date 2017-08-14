var bannerHeight;
var config = require('../../config.js');
import { RequestEngine } from '../../netApi/requestEngine.js' ;   //引入类
Page({
  data: {
    imgUrls: [
      '../../img/banner2.jpg',
      '../../img/banner.jpg'
    ],
    navbar: [{ img: '../../img/index_nav_time.png', img_li:'../../img/index_nav_time_li.png', text: '限时秒杀' }, 
      { img: '../../img/index_nav_good.png', img_li: '../../img/index_nav_good_li.png', text: '每日优选' }, 
      { img: '../../img/index_nav_circle.png', img_li: '../../img/index_nav_circle_li.png',  text: '500米商圈' }, 
      { img: '../../img/index_nav_brand.png', img_li: '../../img/index_nav_brand_li.png',text: '品牌入驻' }],
    currentTab: 0,
    indicatorDots: true,
    autoplay: true,
    unShow:true,
    interval: 5000,
    duration: 1000,
    data0:null,
    data1:null,
    data2:null,
    data3:null,
    page0: { products: null},
    page1: { products: null },
    page2: { products: null },
    page3: { products: null },
    hasData0:true,
    hasData1:true,
    hasData2:true,
    hasData3:true
  },
  onPullDownRefresh: function(){
    this.loadData(this.data.currentTab);
    wx.stopPullDownRefresh()
  },
  onLoad:function(options) {
    var scene = decodeURIComponent(options.scene);
    wx.setNavigationBarTitle({
      title: scene
    })
    console.log("ww----"+scene);
    //scene = '../redPackage/red';
    if (scene != undefined && scene != 'undefined' && scene != '') {
      if (scene.indexOf("detail") >0){
        scene = '../detail/detail';
      } else if (scene.indexOf("tvCard") > 0) {
        scene = '../tvCard/tvcard';
      } else if (scene.indexOf("redPackage") > 0) {
        scene = '../redPackage/red';
      }
      wx.showToast({
        title: scene
      })
      wx.navigateTo({
        url: scene,
      })
    }
   
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        bannerHeight = res.screenHeight * 0.25;
        that.setData({
          bannerHeight: bannerHeight,
          scrollViewHeight: res.screenHeight
        });
      }
    });
    setTimeout(()=>{
      this.loadData(0);
    },500);
    this.refreshSecond();
  }, 
  navbarTap: function (e) {
    var typeId = e.currentTarget.dataset.idx;
    this.setData({
      currentTab: typeId,
    });
    switch (typeId) {
      case 0:
        if (this.data.data0 != null && this.data.data0.length != 0) {
          return;
        }
        break;
      case 1:
        if (this.data.data1 != null && this.data.data1.length != 0) {
          return;
        }
        break;
      case 2:
        if (this.data.data2 != null && this.data.data2.length != 0) {
          return;
        }
        break;
      case 3:
        if (this.data.data3 != null && this.data.data3.length != 0) {
          return;
        }
        break;
    }
    this.loadData(typeId);
    
  },
  refreshSecond:function(){
    setTimeout(() => {
      let products = this.data.page0.products;
      if(products != null) {
        for (let product of products) {
          if (isNaN(product.timeLeft)) {
            product.timeLeft = parseInt(product.timeLeft);
          }
          product.timeLeft = product.timeLeft-1000;
          product.timeLeftSecond = this.formatDuring(product.timeLeft);
        }
        this.setData({
          page0: this.data.page0
        });
      }
      
      this.refreshSecond();
    },1000);
  },
  formatDuring:function(mss) {
    let days = parseInt(mss / (1000 * 60 * 60 * 24));
    let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = parseInt((mss % (1000 * 60)) / 1000);
    let time = (days*24 + hours) + ":" + minutes + ":" + seconds;
    return time;
  },

  loadData: function (typeId){
    
    //url, data,reqMethod, requestSuccess, requestFail, requestComplete
    var url = config.discoverUrl;
    var self = this;
    new Promise(function (resolve, reject) {
      new RequestEngine().request(url, { type: typeId }, { callBy: self, method: self.loadData, params: [typeId] }, (success) => {
        //success
        resolve(success.retData);
      }, (faild) => {
        //faild
        reject(faild);
      });
    }).then((value)=>{
      switch (typeId) {
        case 0:
          this.data.data0 = value;
          if (this.data.data0 == null || this.data.data0.length == 0){
            this.setData({
              page0: { products: this.data.data0 },
              currentTab: 0,
              hasData0: false
            });
            break;
          }
          this.setData({
            page0: { products: this.data.data0 },
            currentTab: 0,
            hasData0: true
          });
          break;
        case 1:
          this.data.data1 = value;
          if (this.data.data1 == null || this.data.data1.length == 0) { 
            this.setData({
              page1: { products: this.data.data1 },
              currentTab: 1,
              hasData1: false
            });
            break;
          } 
          this.setData({
            page1: { products: this.data.data1 },
            currentTab: 1,
            hasData1: true
          });
          break;
        case 2:
          this.data.data2 = value;
          if (this.data.data2 == null || this.data.data2.length == 0){
            this.setData({
              page2: { products: this.data.data2 },
              currentTab: 2,
              hasData2: false
            });
            break;
          }
          this.setData({
            page2: { products: this.data.data2 },
            currentTab: 2,
            hasData2: true
          });
          break;
        case 3:
          this.data.data3 = value;
          if (this.data.data3 == null || this.data.data3.length == 0){
            this.setData({
              page3: { products: this.data.data3 },
              currentTab: 3,
              hasData3: false
            });
            break;
          }
          this.setData({
            page3: { products: this.data.data3 },
            currentTab: 3,
            hasData3: true
          });
          break;
      }
    },
    (err)=>{});
    

  }
})
