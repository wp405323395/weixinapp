
var bannerHeight;
Page({
  data: {
    imgUrls: [
      '../../img/banner.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],

    navbar: ['限时秒杀', '智能推荐', '500米商圈','品牌入驻'],
    currentTab: 0,
    indicatorDots: true,
    autoplay: true,
    unShow:true,
    interval: 5000,
    duration: 1000,
    hidIt:true,
    products:['1','','','','','','','','','','','','','']
  },
  onLoad:function(options) {
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
    var products = this.loadData(0);
  }, 
  navbarTap: function (e) {
    var typeId = e.currentTarget.dataset.idx;
    this.setData({
      currentTab: typeId,
    });
    this.loadData(typeId);
  },
  scroll:function(e){
    var scrollTop = e.detail.scrollTop;
    if (scrollTop > (bannerHeight + 12)) {
      this.setData({
        hidIt: false
      });
    } else if (scrollTop < (bannerHeight + 12 + 70)) {
      this.setData({
        hidIt: true
      });
    }
  },
  loadData: function (typeId){
    var prod;
    switch (typeId) {
      case 0:
        prod = ['1', '', '', ''];
        this.setData({
          products: prod,
          currentTab : 0,
          hasData:true
        });
        break;
      case 1:
        prod = ['1', '',];
        this.setData({
          products: prod,
          currentTab : 1,
          hasData: true
        });
        break;
      case 2:
        prod = ['1', '', '', '', ''];
        this.setData({
          products: prod,
          currentTab : 2,
          hasData: true
        });
        break;
      case 2:
        prod = ['1', '', ''];
        this.setData({
          products: prod,
          currentTab : 3,
          hasData: true
        });
        break;
    }

  }
})
