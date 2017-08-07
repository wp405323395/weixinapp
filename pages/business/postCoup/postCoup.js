// postCoup.js
var util = require('../../../utils/util.js');
var sourceType = [['camera'], ['album'], ['camera', 'album']]
var sizeType = [['compressed'], ['original'], ['compressed', 'original']]
var longClick;
var longClick2;
var longClick22;
storeImgs: ['', '', '']
var imgList;
var subObj = {
  couponName: '',
  couponDescrip:'',
  useCondition: '',
  coupQuantity: 0,
  deadline:''
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    imageList2:[],
    countIndex: 0,
    countIndex2:2,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    isHidden_delete: true,
    isHidden_delete2:true,
    coupQuantity:0,
    deadline: util.formatDay(new Date()),
    time: '12:01'
  },
  bindInput_coupName:function(e){
    subObj.couponName = e.detail.value;
  },
  bindInput_couponDescrip:function(e){
    subObj.couponDescrip = e.detail.value;
  },
  bindInput_useCondition: function (e) {
    subObj.useCondition = e.detail.value;
  },

  bindDateChange: function (e) {
    this.setData({
      deadline: e.detail.value
    })
  },
  onDataPickerClick:function(e){
    
  },
  onSubClick: function (e) {
    if (this.data.coupQuantity > 0) {
      this.setData({
        coupQuantity: --this.data.coupQuantity
      });
    }

  },
  onPlusClick:function(e){
    if (this.data.coupQuantity<9999)
    this.setData({
      coupQuantity: ++this.data.coupQuantity
    });
  },
  bindKeyInput: function (e) {
    this.setData({
      coupQuantity: e.detail.value
    })
  },
  submit:function(e){
    subObj.coupQuantity = this.data.coupQuantity;
    subObj.deadline = this.data.deadline;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  on_addPic_wrap_click: function (e) {
    if (longClick2) {
      longClick2 = false;
      return;
    } else {
      this.setData({
        isHidden_delete: true
      })
    }

  },
  on_addPic_wrap_click2:function(e) {
    if (longClick22) {
      longClick22 = false;
      return;
    } else {
      this.setData({
        isHidden_delete2: true
      })
    }
  },
  showDelete: function (e) {
    this.setData({
      isHidden_delete: false
    })
    longClick = true;
    longClick2 = true;
    longClick22 = true;

  },
  showDelete2: function (e) {
    this.setData({
      isHidden_delete2: false
    })
    longClick = true;
    longClick22 = true;
    longClick2 = true;
  },
  sourceTypeChange: function (e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    })
  },

  chooseImage: function () {
    var that = this
    if (this.data.imageList.length - 1 >= this.data.countIndex) {
      return;
    }
    imgList = this.data.imageList;
    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex],
      success: function (res) {

        imgList = imgList.concat(res.tempFilePaths);
        subObj.storeImgs = imgList;
        that.setData({
          imageList: imgList
        })
      }
    })
  },
  previewImage: function (e) {

    if (longClick) {
      longClick = false;
      return;
    } else {
      this.setData({
        isHidden_delete: true,
        isHidden_delete2:true
      })
      var current = e.target.dataset.src
      wx.previewImage({
        current: current,
        urls: this.data.imageList
      })
    }

  },
  
  deleteItem: function (e) {
    var current = e.target.dataset.src;
    var index = this.data.imageList.indexOf(current);
    this.data.imageList.splice(index, 1);
    this.setData({
      imageList: this.data.imageList
    })
  },




  chooseImage2: function () {
    var that = this
    if (this.data.imageList2.length - 1 >= this.data.countIndex2) {
      return;
    }
    imgList = this.data.imageList2;
    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex2],
      success: function (res) {
        imgList = imgList.concat(res.tempFilePaths);
        subObj.storeImgs = imgList;
        that.setData({
          imageList2: imgList
        })
      }
    })
  },
  previewImage2: function (e) {
    if (longClick) {
      longClick = false;
      return;
    } else {
      this.setData({
        isHidden_delete: true,
        isHidden_delete2: true
      })
      var current = e.target.dataset.src
      wx.previewImage({
        current: current,
        urls: this.data.imageList2
      })
    }

  },

  deleteItem2: function (e) {
    var current = e.target.dataset.src;
    var index = this.data.imageList2.indexOf(current);
    this.data.imageList2.splice(index, 1);
    this.setData({
      imageList2: this.data.imageList2
    })
  },

})