// notice.js
//var time1 = new Date().format("yyyy-MM-dd HH:mm:ss");   
var noticeList = [{
  id: '100',
  submitTime: '2017-8-10  15:32:34',
  coupName: '新鲜水果',
  noticeStr: '已经成功发布，正在审核中',
  coupStatus: '0',//0:审核中，1:审核通过,2:未通过,3:过期.
  isHasRead:false
},{
  id:'100',
  submitTime:'2017-01-20  02:32:34',
  coupName:'新鲜水果',
  noticeStr:'已经成功发布，正在审核中',
  coupStatus:'0',//0:审核中，1:审核通过,2:未通过,3:过期.
  isHasRead: true
},{
    id: '100',
    submitTime: '2017-01-20 12:32:20',
    coupName: '新鲜水果',
    noticeStr: '已经成功审核',
    coupStatus: '1',
    isHasRead: false
  }, {
    id: '100',
    submitTime: '2017-01-16 22:32:16',
    coupName: '新鲜水果',
    noticeStr: '未通过审核',
    coupStatus: '2',
    isHasRead: false
}, {
    id: '100',
  submitTime: '2017-01-2 18:32:49',
  coupName: '新鲜水果',
  noticeStr: '已过期',
  coupStatus: '3',
  isHasRead: false
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
    let tileLine = [];
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
        var date = new Date(value.submitTime);
        value.minuteTime = date.getHours()+":"+date.getMinutes();
        var strDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        value.yymmdd = strDate;
        tileLine.push(strDate);
        value.isHiddenYYMMDD = true;
        if(index >0) {
          if (strDate != tileLine[index - 1]) {
            value.isHiddenYYMMDD = false;
          } else {
            value.isHiddenYYMMDD = true;
          }
        } else {
          var newDate = new Date();
          var strnewDate = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
          if (strnewDate != strDate) {
            value.isHiddenYYMMDD = false;
          } else {
            value.isHiddenYYMMDD = true;
          }
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
    let index = e.currentTarget.dataset.index;
    noticeList[index].isHasRead = true;
    this.setData({
      noticeList: noticeList
    });
    wx.navigateTo({
      url: '../coupReview/coupReview?id='+coupId,
    })
  }
})