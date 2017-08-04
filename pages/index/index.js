var bannerHeight;
var config = require('../../config.js');
var requestEngin = require('../../netApi/requestModle.js');

var data0;
var data1;
var data2;
var data3;
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
    page0: { products: data0},
    page1: { products: data1 },
    page2: { products: data2 },
    page3: { products: data3 },
    hasData0:true,
    hasData1:true,
    hasData2:true,
    hasData3:true
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
    this.loadData(0);
  }, 
  navbarTap: function (e) {
    var typeId = e.currentTarget.dataset.idx;
    this.setData({
      currentTab: typeId,
    });
    switch (typeId) {
      case 0:
        if (data0 != null && data0.length != 0) {
          return;
        }
        break;
      case 1:
        if (data1 != null && data1.length != 0) {
          return;
        }
        break;
      case 2:
        if (data2 != null && data2.length != 0) {
          return;
        }
        break;
      case 3:
        if (data3 != null && data3.length != 0) {
          return;
        }
        break;
    }
    this.loadData(typeId);
  },

  loadData: function (typeId){
    
    //url, data,reqMethod, requestSuccess, requestFail, requestComplete
    var url = config.discoverUrl;
    var self = this;
    new Promise(function (resolve, reject) {
      requestEngin.request(url, { type: typeId }, self.loadData, (success) => {
        //success
        console.log(success);
        resolve(JSON.parse(success.data).retData);
      }, (faild) => {
        //faild
        console.log(faild);
        reject(faild);
      });
    }).then((value)=>{
      switch (typeId) {
        case 0:
          data0 = value;
          if (data0 == null || data0.length == 0){
            this.setData({
              currentTab: 0,
              hasData0: false
            });
            break;
          }
          this.setData({
            page0: { products: data0 },
            currentTab: 0,
            hasData0: true
          });
          break;
        case 1:
          data1 = value;
          if (data1 == null || data1.length == 0) { 
            this.setData({
              currentTab: 1,
              hasData1: false
            });
            break;
          } 
          this.setData({
            page1: { products: data1 },
            currentTab: 1,
            hasData1: true
          });
          break;
        case 2:
          data2 = value;
          if (data2 == null || data2.length == 0){
            this.setData({
              currentTab: 2,
              hasData2: false
            });
            break;
          }
          this.setData({
            page2: { products: data2 },
            currentTab: 2,
            hasData2: true
          });
          break;
        case 3:
          data3 = value;
          if (data3 == null || data3.length == 0){
            this.setData({
              currentTab: 3,
              hasData3: false
            });
            break;
          }
          this.setData({
            page3: { products: data3 },
            currentTab: 3,
            hasData3: true
          });
          break;
      }
    },
    (err)=>{});
    

  }
})
