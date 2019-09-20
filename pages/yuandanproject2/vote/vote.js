// pages/yuandanproject/contribution/contribution.js
import RequestEngine from '../../../netApi/requestEngine.js';
var config = require('../../../config.js');
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '1', value: '特别关注' },
      { name: '2', value: '一般关注' },
      { name: '3', value: '不关注' },
    ],
    items2: [
      { name: '1', value: '就业' },
      { name: '2', value: '教育' },
      { name: '3', value: '社保' },
    ],
    items3: [
      { name: '1', value: '非常好' },
      { name: '2', value: '一般' },
      { name: '3', value: '较差' },
    ],
    items4: [
      { name: '1', value: '非常好' },
      { name: '2', value: '一般' },
      { name: '3', value: '较差' },
    ],
    items5: [
      { name: '1', value: '行政法规、政策、决策文件类' },
      { name: '2', value: '国民经济和社会发展、专项规划类' },
      { name: '3', value: '财政预算决算、“三公”经费类' },
    ],
    items6: [
      { name: '1', value: '了解办事流程' },
      { name: '2', value: '下载相关资料' },
      { name: '3', value: '办理具体业务不关注' },
    ],
    ishiddenToast: true,
    isDisable: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.isclick = 1;
    var qrid = decodeURIComponent(options.q);
    if (util.textIsNull(qrid)) {
      var qrid = decodeURIComponent(options.qrid);
    } else {
      qrid = qrid.split("qrid=")[1];
    }
    this.qrid = qrid;
    // setTimeout(() => {
    //   this.setData({
    //     ishiddenToast: false,
    //     isDisable: false
    //   });
    //   setTimeout(() => {
    //     this.setData({
    //       ishiddenToast: true,
    //       isDisable: false
    //     })
    //   }, 4000);

    // }, 3000);
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
    // wx.navigateTo({
    //   url: '../postCoup/postCoup',
    // })
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

  },
  gotoseeTv: function () {
    if (this.isclick){
      new RequestEngine().request(config.canTrySee, { qrid: this.qrid, optype: 1 }, { callBy: this, method: this.gotoseeTv, params: [] }, (success) => {
        wx.showToast({
          title: '成功',
          icon: 'succes',
          duration: 2000,
          mask: true
        })
      }, (faild) => {

      }, (requestComplete) => {

      });
      this.isclick = 0;
    }
  },

  gotocontribution: function () {
    let that = this;
    wx.navigateTo({
      url: '../votesuccess/votesuccess?qrid=' + that.qrid,
    })
  }
})