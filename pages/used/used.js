// used.js
var common = require('../../netApi/loadProduct.js')
var util = require('../../utils/util.js');
var mta = require('../../utils/mta_analysis.js');
const config = require('../../config');
const requestModle = require('../../netApi/requestModle.js');
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
var loadingModle = [{
  typeId:0,
  loadding:false
}, {
  typeId: 0,
  loadding: false
}, {
  typeId: 0,
  loadding: false
}];
var GetList = function (that, typeId,isLoadMore) {
  if (loadingModle[typeId].loadding) {
    return ;
  }
  loadingModle[typeId] = { typeId: typeId,loadding: true};
  that.setData({
    foot_loading: true
  });
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
    }
  } catch (e) {
    // Do something when catch error
  }

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
  if (page == undefined) {
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 30000
    });
  } else if (isLoadMore) { }
  else {
    loadingModle[typeId] = { typeId: typeId, loadding: false };
    return;
  }
  /////////////////////////////////////
  requestModle.request(config.used_tickit_url, { type: typeId, pageNo: page, pageSize:20}, GetList, (result) => {
    var data = result.data;
    var retData = JSON.parse(data).retData;
    var pds = retData.result;
    let current;
    switch (typeId) {
      case 0:
        firstPageList = firstPageList.concat(pds);
        current = { typeId: 0, typeName: '餐饮美食', products: firstPageList };
        firstFragPage++;
        that.setData({
          first_page: {
            item: current,
          }
        });
        break;
      case 1:
        secondPageList = secondPageList.concat(pds);
        current = { typeId: 0, typeName: '生鲜超市', products: secondPageList };
        secondFragPage++;
        that.setData({
          second_page: {
            item: current,
          }
        });
        break;
      case 2:
        thirdPageList = thirdPageList.concat(pds);
        current = { typeId: 0, typeName: '休闲娱乐', products: thirdPageList };
        thirdFragPage++;
        that.setData({
          third_page: {
            item: current,
          }
        });
        break;
    }
    that.setData({
      foot_loading: false
    });

    loadingModle[typeId] = { typeId: typeId, loadding: false };
    wx.hideToast();
  }, (errorMsg) => {
    
    wx.hideNavigationBarLoading();
    wx.hideToast();
  }, () => { });
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
      item: { typeId: 0, typeName: '餐饮美食', products: firstPageList},
    }
  },
  onLoad: function (options) {
    mta.Page.init();
    that = this;
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 30000
    })

    let srcUrl = config.srcUrl;
    that.setData({
      srcUrl: srcUrl
    });

    var tickit_width = wx.getStorageSync('tickit_width');
    var tickit_height = wx.getStorageSync('tickit_height');
    if (util.textIsNotNull(tickit_width) && util.textIsNotNull(tickit_height)) {
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            scrollHeight: res.windowHeight,
            tickit_width: tickit_width,
            tickit_height: tickit_height

          });
        }
      });
    } else {
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            scrollHeight: res.windowHeight,
            tickit_width: res.windowWidth * 0.35,
            tickit_height: res.windowHeight * 0.13

          });
        }
      });
    }

    GetList(this, 0);
  }, 
  onShow: function () {
  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    });
    var navbarTabXid =  e.currentTarget.dataset.idx;
    switchNavbar(navbarTabXid);
  },

  bindDownLoad: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log("bindDownLoad");
    GetList(this,id,true);
  },
})
function switchNavbar(navbarTabXid) {
  that.setData({
    foot_loading: false
  });

  let current;
  switch (navbarTabXid) {
    case 0:
      //current = { typeId: 0, typeName: '餐饮美食', products: firstPageList };
      break;
    case 1:
      if (secondFragPage == undefined) {
        GetList(that,1);
      }
      //current = { typeId: 0, typeName: '生鲜超市', products: secondPageList };
      break;
    case 2:
      if(thirdFragPage == undefined) {
        GetList(that, 2);
      }
      //current = { typeId: 0, typeName: '休闲娱乐', products: thirdPageList };
      break;
  }
  
}