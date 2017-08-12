// me.js
var da = require('../../data/data.js').data;
var requestEngin = require('../../netApi/requestModle.js');
var config = require('../../config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['未使用', '已使用', '已过期'],
    currentTab: 0,
    data0:null,
    data1:null,
    data2:null,
    page0: { products: null },
    page1: { products: null },
    page2: { products: null },
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
      requestEngin.request(config.mycoup, { type: typeId }, { callBy: that, method: that.loadData, params: [typeId] }, (success) => {
        resolve(success.retData);
      }, (faild) => {
        reject(faild);
      })
    }).then((value)=>{
      switch (typeId) {
        case 0:
          this.data.data0 = value;
          if (this.data.data0 == null || this.data.data0.length == 0) {
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
          if (this.data.data2 == null || this.data.data2.length == 0) {
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
      }
    },
    (err)=>{

    })
    
   
  }


})