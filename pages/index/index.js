var bannerHeight;
var da = require('../../data/data.js').data;
var data0 = da.xianshimiaosha;
var data1 = da.zhinengtuijian;
var data2 = da.wubaimishangquan;
var data3 = da.pingpairuzhu;
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
    page3: { products: data3 }
  },
  onLoad:function(options) {
    var scene = decodeURIComponent(options.scene);
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
    this.loadData(typeId);
  },

  loadData: function (typeId){
    switch (typeId) {
      case 0:
        if (data0 == null || data0.length  == 0) break;
        this.setData({
          page0: { products: data0},
          currentTab : 0,
          hasData:true
        });
        break;
      case 1:
        if (data1 == null || data1.length == 0) break;
        this.setData({
          page1: { products: data1 },
          currentTab : 1,
          hasData: true
        });
        break;
      case 2:
        if (data2 == null || data2.length == 0) break;
        this.setData({
          page2: { products: data2 },
          currentTab : 2,
          hasData: true
        });
        break;
      case 3:
        if (data3 == null || data3.length == 0) break;
        this.setData({
          page3: { products: data3 },
          currentTab : 3,
          hasData: true
        });
        break;
    }
  },
  clickItem:function(e) {
    var id = e.target.id;
  }
})
