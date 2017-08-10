// notice.js
var noticeList = [{
  id:'100',
  submitTime:'2017-01-20  12:32',
  coupName:'新鲜水果',
  noticeStr:'已经成功发布，正在审核中',
  coupStatus:'0'//0:审核中，1:审核通过,2:未通过,3:过期.
},{
    id: '100',
    submitTime: '2017-01-20  12:32',
    coupName: '新鲜水果',
    noticeStr: '已经成功审核',
    coupStatus: '1'
  }, {
    id: '100',
    submitTime: '2017-01-20  12:32',
    coupName: '新鲜水果',
    noticeStr: '未通过审核',
    coupStatus: '2'
}, {
    id: '100',
  submitTime: '2017-01-20  12:32',
  coupName: '新鲜水果',
  noticeStr: '已过期',
  coupStatus: '3'
}]
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
    noticeList.map(function(value,index,array){

        switch (value.coupStatus) {
          case '0':
            value.statusIcon = '../../../img/coup_status_going.png';
            break;
          case '1':
            value.statusIcon = '../../../img/coup_status_ok.png';
            break;
          case '2':
            value.statusIcon = '../../../img/coup_status_fail.png';
            break;
          case '3':
            value.statusIcon = '../../../img/coup_status_timeout.png';
            break;
        }

    })
    
    this.setData({
      noticeList: noticeList
    });

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
  
  },
  onItemClick:function(e){
    let coupId = e.currentTarget.dataset.coupId;
    wx.navigateTo({
      url: '../coupReview/coupReview?id='+coupId,
    })
  }
})