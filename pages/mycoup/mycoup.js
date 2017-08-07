// me.js
var da = require('../../data/data.js').data;
var requestEngin = require('../../netApi/requestModle.js');
var config = require('../../config.js');
var data0;
var data1;
var data2;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['未使用', '已使用', '已过期'],
    currentTab: 0,

    page0: { products: data0 },
    page1: { products: data1 },
    page2: { products: data2 },
    hasData0:true,
    hasData1:true,
    hasData2:true
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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData(0);
  },
  onShow:function(options) {
    var that = this;
    wx.getStorage({
      key: 'needRefreshData',
      success: function (res) {
        console.log(res.data)
        if(res.data === true){
          that.loadData(that.data.currentTab);
          wx.setStorage({
            key: "needRefreshData",
            data: false
          })
        }
        
      }
    })
  },
  loadData: function (typeId) {
    var that = this;
    new Promise((resolve,reject)=>{
      requestEngin.request(config.mycoup, { type: typeId }, that.loadData, (success) => {
        resolve(JSON.parse(success.data).retData);
      }, (faild) => {
        reject(faild);
      })
    }).then((value)=>{
      switch (typeId) {
        case 0:
          data0 = value;
          if (data0 == null || data0.length == 0) {
            this.setData({
              currentTab: 0,
              hasData0: false
            });
            break;
          } 
          this.setData({
            page0: { products: data0 },
            currentTab: 0,
            hasData: true
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
            hasData: true
          });
          break;
        case 2:
          data2 = value;
          if (data2 == null || data2.length == 0) {
            this.setData({
              currentTab: 2,
              hasData2: false
            });
            break;
          } 
          this.setData({
            page2: { products: data2 },
            currentTab: 2,
            hasData: true
          });
          break;
      }
    },
    (err)=>{

    })
    
   
  }


})