// used.js
var common = require('../common/loadProduct.js')
var url = "http://cccm";
var page = 1;
var firstFragPage;
var secondFragPage;
var thirdFragPage;
var that;

var loadding;

var firstPageList = [];
var secondPageList = [];
var thirdPageList = [];
var scrollHeight;
var firstLoad = true;
var GetList = function (that, typeId,isLoadMore) {
  try {
    var value = wx.getStorageSync('isUsedNeedRefresh');

    if ('need' === value) {
      try {
        wx.setStorageSync('isUsedNeedRefresh', 'unneed');
      } catch (e) {
      }
      wx.showToast({
        title: "loading",
        icon: "loading",
        duration: 30000
      });

      firstFragPage = 0;
      secondFragPage = 0;
      thirdFragPage = 0;
      firstPageList = [];
      secondPageList = [];
      thirdPageList = [];
    } else {
      if (firstLoad) {
        firstLoad = false;
      } else if (isLoadMore) { } else {
        return;
      }

    }
  } catch (e) {
    // Do something when catch error
  }
 
  if (loadding) {
    return;
  }
  loadding = true;
  var a = common.getProducts()[0];
  
  switch (typeId) {
    case 0:
      page = firstFragPage;
      break;
    case 1:
      page = secondFragPage;
      break;
    case 2:
      page = thirdFragPage;
      break;
  }
  wx.request({
    url: url,
    data: {
      pageSize: 10,
      pageNo: page,
      typeId: typeId
    },
    success: function (res) {
      for (var i = 0; i < res.data.length; i++) {
        //l.push(res.data[i])
        var current;
        switch (typeId) {
          case 0:
            firstPageList.push(a);
            current = firstPageList;
            firstFragPage++;
            break;
          case 1:
            secondPageList.push(a);
            current = secondPageList;
            secondFragPage++;
            break;
          case 2:
            thirdPageList.push(a);
            current = thirdPageList;
            thirdFragPage++;
            break;
        }

      }
      that.setData({
        foot_loading: true
      });
      that.setData({
        first_page: {
          bindDownLoad: GetList,
          list: current,
        }
      });

      loadding = false;
      wx.hideToast();
    },
    fail: function ({errMsg}) {
      var lis = common.getProductsByTypeId(1);
      let current;
      switch (typeId) {
        case 0:
          firstPageList = firstPageList.concat(lis);
          current = { typeId: 0, typeName:'餐饮美食', products:firstPageList};
          firstFragPage++;
          break;
        case 1:
          secondPageList = secondPageList.concat(lis);
          current = { typeId: 0, typeName: '生鲜超市', products: secondPageList };
          secondFragPage++;
          break;
        case 2:
          thirdPageList = thirdPageList.concat(lis);
          current = { typeId: 0, typeName: '休闲娱乐', products: thirdPageList };
          thirdFragPage++;
          break;
      }
      that.setData({
        foot_loading: false
      });
      that.setData({
        first_page: {
          bindDownLoad: GetList,
          item: current,
        }
      });
      loadding = false;
      wx.hideToast();
    }
  });
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['餐饮美食', '生鲜超市', '休闲娱乐'],
    currentTab: 0,
    scrollTop: 0,
    scrollHeight: 0,
    foot_loading: true,
    first_page: {
      bindDownLoad: GetList,
      item: { typeId: 0, typeName: '餐饮美食', products: firstPageList},
    }
  },
  onLoad: function (options) {
    that = this;
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 30000
    })

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight,
          tickit_width: res.windowWidth * 0.35,
          tickit_height: res.windowHeight * 0.13

        });
      }
    });
  }, 
  onShow: function () {
    GetList(this,0);
  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  bindDownLoad: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log("bindDownLoad");
    GetList(this,id,true);
  },
})