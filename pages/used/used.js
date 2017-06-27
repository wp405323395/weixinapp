// used.js
const requestUrl = require('../../config').requestUrl
const duration = 2000
var common = require('../common/loadProduct.js')
var url = "http://cccm";
var page = 1;
var that;

var loadding;
var currentTypeId;

var GetList = function (that,typeId) {
  if(currentTypeId != typeId) {
    page = 1;
  }
  currentTypeId = typeId;
  if (loadding) {
    return;
  }
  loadding = true;
  var a = common.getProducts()[0];
  that.setData({
    foot_loading: false
  });
  wx.request({
    url: url,
    data: {
      pageSize: 10,
      pageNo: page,
      typeId:typeId
    },
    success: function (res) {
      var l = that.data.list
      for (var i = 0; i < res.data.length; i++) {
        //l.push(res.data[i])
        l.push(a);
      }
      that.setData({
        list: l
      });
      page++;
      that.setData({
        foot_loading: true
      });
      loadding = false;
      wx.hideToast();
    },
    fail: function ({errMsg}) {
      var l = that.data.list
      var lis = common.getProductsByTypeId(1);
      l = l.concat(lis);
      that.setData({
        list: l,
        foot_loading: true
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
    userInfo: {},
    foot_loading: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0,
    status_menu: ["menu_focus", "menu_unfocus", "menu_unfocus"]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 10000
    })
    GetList(this);
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  bindDownLoad: function () {
    console.log("bindDownLoad");
    GetList(this);
  },
  scroll: function (event) {
    //console.log("scroll");
    // this.setData({
    //   scrollTop: event.detail.scrollTop
    // });
  },
  refresh: function (event) {
    console.log("refresh");
    // page = 1;
    // this.setData({
    //   list: [],
    //   scrollTop: 0
    // });
    // GetList(this)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  /**
   * 加载商品
   */
  loadProduct: function () {
    var self = this
    wx.showNavigationBarLoading();
    wx.request({
      url: requestUrl,
      data: {
        noncestr: Date.now()
      },
      success: function (result) {
        wx.hideNavigationBarLoading();
        wx.showToast({
          title: '请求成功',
          icon: 'success',
          mask: true,
          duration: duration
        })
        self.setData({
          list: common.getProducts()
        })
      },

      fail: function ({errMsg}) {
        wx.hideNavigationBarLoading();
        self.setData({
          list: common.getProducts()
        })
      }
    })
  },
  onClick: function (event) {
    var menuId = event.currentTarget.dataset.name;
    var length = this.data.status_menu.length;
    var classs = this.data.status_menu;
    for (var i = 0; i < length; i++) {
      if (i == menuId) {
        classs[menuId] = "menu_focus";
      } else {
        classs[i] = "menu_unfocus";
      }
    }
    that.setData({
      status_menu: classs
    });
    GetList(that, menuId);
    
  }

})