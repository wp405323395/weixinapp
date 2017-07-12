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
var firstPageHasNext = true;
var secondPageHasNext = true;
var thirdPageHasNext = true;
var tickit_width ;
var tickit_height;
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
  
  try {
    var value = wx.getStorageSync('isUsedNeedRefresh');

    if ('need' === value) {
      try {
        wx.setStorageSync('isUsedNeedRefresh', 'unneed');
      } catch (e) {
      }

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
      if (!firstPageHasNext) {
        return ;
      }
      break;
    case 1:
      page = secondFragPage;
      if (!secondPageHasNext) {
        return;
      }
      break;
    case 2:
      page = thirdFragPage;
      if (!thirdPageHasNext) {
        return;
      }
      break;
  }
  if (page == undefined) {
    page = 1;
    switch (typeId) {
      case 0:
        firstFragPage = 1;
        break;
      case 1:
        secondFragPage = 1;
        break;
      case 2:
        thirdFragPage = 1;
        break;
    }
  } else if (isLoadMore) { }
  else {
    loadingModle[typeId] = { typeId: typeId, loadding: false };
    return;
  }
  loadingModle[typeId] = { typeId: typeId, loadding: true };
  that.setData({
    foot_loading: true
  });
  /////////////////////////////////////
  requestModle.request(config.used_tickit_url, { type: typeId, pageNo: page, pageSize:20}, GetList, (result) => {
    var data = result.data;
    var retData = JSON.parse(data).retData;
    var pds = retData.result;
    let current;
    switch (typeId) {
      case 0:
        firstPageHasNext = retData.hasNext;
        firstPageList = firstPageList.concat(pds);
        current = { typeId: 0, typeName: '餐饮美食', products: firstPageList };
        firstFragPage = (firstFragPage == undefined) ? 0 : firstFragPage;
        firstFragPage++;
        that.setData({
          first_page: {
            item: current,
          }
        });
        break;
      case 1:
        secondPageHasNext = retData.hasNext;
        secondPageList = secondPageList.concat(pds);
        current = { typeId: 0, typeName: '生鲜超市', products: secondPageList };
        secondFragPage = (secondFragPage == undefined) ? 0 : secondFragPage;
        secondFragPage++;
        that.setData({
          second_page: {
            item: current,
          }
        });
        break;
      case 2:
        thirdPageHasNext = retData.hasNext;
        thirdPageList = thirdPageList.concat(pds);
        current = { typeId: 0, typeName: '休闲娱乐', products: thirdPageList };
        thirdFragPage = (thirdFragPage == undefined) ? 0 : thirdFragPage;
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
  }, (errorMsg) => {
    that.setData({
      hasData: false,
      noteNoData: '检查您的网络',
      no_data_image_height: tickit_height * 1.1,
      no_data_image_width: tickit_width * 1.1
    });
    }, (res) => {
    if (res.statusCode == 503) {
      that.setData({
        hasData: false,
        noteNoData: '检查您的网络',
        no_data_image_height: tickit_height * 1.1,
        no_data_image_width: tickit_width * 1.1
      });
    }
  });
    that.setData({
      foot_loading: false
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
    hasData: true,
    first_page: {
      item: { typeId: 0, typeName: '餐饮美食', products: firstPageList},
    }
  },
  onLoad: function (options) {
    mta.Page.init();
    that = this;

    let srcUrl = config.srcUrl;
    that.setData({
      srcUrl: srcUrl
    });

    tickit_width = wx.getStorageSync('tickit_width');
    tickit_height = wx.getStorageSync('tickit_height');
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
          tickit_width = res.screenWidth * 0.38;
          tickit_height = res.screenHeight * 0.115;
          that.setData({
            tickit_width: tickit_width,
            tickit_height: tickit_height,
          });
        }
      });
    }

    GetList(this, 0);
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
    GetList(this,id,true);
  },
})
function switchNavbar(navbarTabXid) {
  that.setData({
    foot_loading: false
  });

  switch (navbarTabXid) {
    case 0:
      break;
    case 1:
      if (secondFragPage == undefined) {
        GetList(that,1);
      }
      break;
    case 2:
      if(thirdFragPage == undefined) {
        GetList(that, 2);
      }
      break;
  }
  
}