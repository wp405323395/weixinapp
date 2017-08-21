// postCoup.js
var util = require('../../../utils/util.js');
var config = require('../../../config.js');
import RequestEngine from '../../../netApi/requestEngine.js';
var Promise = require('../../../libs/es6-promise').Promise;
var uploadFileEngin = require('../../../netApi/uploadFiles.js');
var sourceType = [['camera'], ['album'], ['camera', 'album']]
var sizeType = [['compressed'], ['original'], ['compressed', 'original']]
var longClick;
var longClick2;
var longClick22;
storeImgs: ['', '', '']
let valueId;
var imgList;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    subObj: {
      couponName: '',
      couponDescrip: '',
      useCondition: '',
      coupQuantity: 0,
      deadline: ''
    },
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
    this.data.subObj.couponName = e.detail.value;
  },
  bindInput_couponDescrip:function(e){
    this.data.subObj.couponDescrip = e.detail.value;
  },
  bindInput_useCondition: function (e) {
    this.data.subObj.useCondition = e.detail.value;
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
    this.data.subObj.coupQuantity = this.data.coupQuantity;
    this.data.subObj.deadline = this.data.deadline;
    if (this.data.subObj.coupIconImage == undefined || this.data.subObj.coupIconImage.length !=1) {
      this.showError('请选择优惠券图片');
      return ;
    } else if (this.data.subObj.storeImgs == undefined || this.data.subObj.storeImgs.length !=3) {
      this.showError('店铺图片必须为三张');
      return ;
    } else if (!util.textIsNotNull(this.data.subObj.couponName)) {
      this.showError('优惠券名称不能为空');
      return;
    } else if (this.data.subObj.coupQuantity == 0){
      this.showError('优惠券数量不能为0');
      return;
    } else if (!util.textIsNotNull(this.data.subObj.couponDescrip)) {
      this.showError('店优惠券描述不能为空');
      return;
    } else if (!util.textIsNotNull(this.data.subObj.useCondition)) {
      this.showError('优惠券使用约束不能为空');
      return;
    }
    let exchangeParam = {
      couponName : this.data.subObj.couponName,
      couponIntro : this.data.subObj.couponDescrip,
      useCondition : this.data.subObj.useCondition,
      issueNum : this.data.subObj.coupQuantity,
      useEndTime : this.data.subObj.deadline
    }
    let that = this;
    
    new Promise((resolve, reject) => {
      new RequestEngine().request(config.publishMercCoup, { formData: JSON.stringify(exchangeParam)}, { callBy: that, method: that.submit, params: [] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    }).then((value) => {
      if (value.retCode == '0') {
        valueId = value.id;
        return uploadFileEngin.uploadimg({
          url: config.uploadBusinessPic,//这里是你图片上传的接口
          path: this.data.subObj.coupIconImage//这里是选取的图片的地址数组
        }, { id: valueId, type: '11' });
      }
    }, (err) => {
    }).then((value)=>{
      if(value == undefined) {
        return null;
      }
      return uploadFileEngin.uploadimg({
        url: config.uploadBusinessPic,//这里是你图片上传的接口
        path: this.data.subObj.storeImgs//这里是选取的图片的地址数组
      }, { id: valueId, type: '10' });
    },(err)=>{
      util.showShortToast({
        title: '图片上传失败',
        image: '../../../img/coup_status_fail.png',
        icon: 'faild'
      })
    }).then((value)=>{
      wx.hideNavigationBarLoading();
    },(err)=>{
      util.showShortToast({
        title: '图片上传失败',
        image: '../../../img/coup_status_fail.png',
        icon: 'faild'
      })
    });
    
  },
  showError:function(str) {
    util.showShortToast({
      title: str,
      image: '../../../img/coup_status_fail.png',
      icon: 'faild'
    })
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
        that.data.subObj.coupIconImage = imgList;
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
    this.data.subObj.coupIconImage = this.data.imageList;
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
        that.data.subObj.storeImgs = imgList;
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
    this.data.subObj.storeImgs = this.data.imageList2;
    this.setData({
      imageList2: this.data.imageList2
    })
  },

})