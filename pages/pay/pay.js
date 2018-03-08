// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let encodeMsg = options.encodeMsg;
    // console.log(decodeURIComponent(encodeMsg));
    console.log(options);
    let appId = options.appId;
    let timeStamp = options.timeStamp;
    let nonceStr = options.nonceStr;
    let packages = decodeURIComponent(options.package);
    let paySign = options.paySign;
    let pathback = options.pathback;
    let orderId = options.orderId;
    console.log("后台返回数据" + appId + " timeStamp" + timeStamp + " nonceStr" + nonceStr + " package" + packages + " paySign" + paySign);
    wx.requestPayment({
      'timeStamp': timeStamp,
      'nonceStr': nonceStr,
      'package': packages,
      'signType': "MD5",
      'paySign': paySign,
      'success': function (res) {
        // that.isPaying = false;
        console.log('支付结果', res);
        //http://localhost:8025
        //定义小程序集合页
        var pages = getCurrentPages(); 
        //当前页面 (wxpay page)
        var currPage = pages[pages.length - 1];
        //上一个页面 （index page） 
        var prevPage = pages[pages.length - 2];
        //通过page.setData方法使index的webview 重新加载url  有点类似于后台刷新页面
        //此处有点类似小程序通过加载URL的方式回调通知后端 该订单支付成功。后端逻辑不做赘述。
        prevPage.setData({
          url: "http://localhost:8025" + pathback + "/paysucccesswx.htm",
        }),
          //小程序主动返回到上一个页面。即从wxpay page到index page。此时index page的webview已经重新加载了url 了
          //微信小程序的page 也有栈的概念navigateBack 相当于页面出栈的操作
          wx.navigateBack();
          wx.setStorageSync("status", 1);
      },
      'fail': function (res) {
        // that.isPaying = false;
        // wx.navigateBack();
        console.log('支付失败', res);
        var pages = getCurrentPages();
        console.log(pages);
        var currPage = pages[pages.length - 1];
        console.log("currPage---->");
        console.log(currPage);
        var prevPage = pages[pages.length - 2];
        console.log("prevPage---->");
        console.log(prevPage);
        console.log("准备修改数据");
        console.log("http://localhost:8025" + pathback + "/customer/detail-" + orderId + ".html");
        prevPage.setData({
          url: "http://localhost:8025" + pathback + "/customer/detail-"+orderId+".html",
        }),
        console.log("准备结束页面")
        wx.navigateBack(); 
        wx.setStorageSync("status", 2);

      }
    })
    // setTimeout(()=>{
    //   wx.navigateBack({
        
    //   });
    // },2000);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})