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
var foot_loading;
var scrollHeight;

var GetList = function (that, typeId) {
  if (loadding) {
    return;
  }
  loadding = true;
  var a = common.getProducts()[0];
  that.setData({
    foot_loading: false
  });
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
        first_page: {
          scrollHeight: scrollHeight,
          bindDownLoad: GetList,
          list: current,
          foot_loading: false,
          page_id:0
        }
      });


      that.setData({
        foot_loading: true
      });
      loadding = false;
      wx.hideToast();
    },
    fail: function ({errMsg}) {
      var lis = common.getProductsByTypeId(1);
      var current;
      switch (typeId) {
        case 0:
          firstPageList = firstPageList.concat(lis);
          current = firstPageList;
          firstFragPage++;
          break;
        case 1:
          secondPageList = secondPageList.concat(lis);
          current = secondPageList;
          secondFragPage++;
          break;
        case 2:
          thirdPageList = thirdPageList.concat(lis);
          current = thirdPageList;
          thirdFragPage++;
          break;
      }

      that.setData({
        foot_loading: true
      });

      that.setData({
        first_page: {
          scrollHeight: scrollHeight,
          bindDownLoad: GetList,
          list: current,
          foot_loading: false,
          page_id : 0
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
    navbar: ['首页', '搜索', '我'],
    currentTab: 0,
    scrollTop: 0,
    scrollHeight: 0,
    first_page: {
      scrollHeight: scrollHeight,
      bindDownLoad: GetList,
      list: firstPageList,
      foot_loading: false,
      page_id: 0
    }
  },
  onLoad: function (options) {
    that = this;
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 10000
    })
    GetList(this, 0);
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        scrollHeight = res.windowHeight;
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  bindDownLoad: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log("bindDownLoad");
    GetList(this,id);
  },
})