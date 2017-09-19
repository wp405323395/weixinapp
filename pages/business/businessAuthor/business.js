// business.js
var util = require('../../../utils/util.js')
var config = require('../../../config.js');
import RequestEngine from '../../../netApi/requestEngine.js';  
var uploadFileEngin = require('../../../netApi/uploadFiles.js');
var Promise = require('../../../libs/es6-promise.js').Promise;
var formatLocation = util.formatLocation
var sourceType = [['camera'], ['album'], ['camera', 'album']]
var sizeType = [['compressed'], ['original'], ['compressed', 'original']]
var longClick;
var longClick2;
var imgList;
var subObj = {
  storeName: '',
  latitude: 0.0,
  longitude: 0.0,
  phone: '',
  storePersonName: '',
  storeType: '',
  storeIntro: '',
  storeImgs: ['', '', '']

}
Page({
  data: {
    hasInputNum:0,
    btnText: '申请认证',
    clickAble: true,
    imageList: [],
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],

    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],

    countIndex: 2,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    isHidden_delete: true,
    hasLocation: false,
    storeKind: ['生活服务', '餐饮美食', '水果副食', '休闲娱乐', '运动健身', '酒店住宿','其他类别']
  },
  showDelete: function (e) {
    this.setData({
      isHidden_delete: false
    })
    longClick = true;
    longClick2 = true;

  },
  sourceTypeChange: function (e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    })
  },
  sizeTypeChange: function (e) {
    this.setData({
      sizeTypeIndex: e.detail.value
    })
  },
  countChange: function (e) {
    this.setData({
      countIndex: e.detail.value
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
  onLoad: function (options) {
    this.rejectStoreId = options.rejectStoreId;
  },
  previewImage: function (e) {
    if (longClick) {
      longClick = false;
      return;
    } else {
      this.setData({
        isHidden_delete: true
      })
      var current = e.target.dataset.src
      wx.previewImage({
        current: current,
        urls: this.data.imageList
      })
    }

  },
  onChooceLocation: function (e) {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        subObj.addr = res.address ;
        subObj.latitude = res.latitude;
        subObj.longitude = res.longitude;
        that.setData({
          hasLocation: true,
          location: formatLocation(res.longitude, res.latitude),
          locationAddress: res.address
        })
      }
    });
  },
  deleteItem: function (e) {
    var current = e.target.dataset.src;
    var index = this.data.imageList.indexOf(current);
    this.data.imageList.splice(index, 1);
    this.setData({
      imageList: this.data.imageList
    })
    subObj.storeImgs = this.data.imageList;
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
  onKindClick: function (e) {
    let id = e.currentTarget.dataset.kindid;
    subObj.storeType = id;
    this.setData({
      type_index: id
    })

  },
  bindInput_storName: function (e) {
    let storName = e.detail.value;
    subObj.storeName = storName;
  },
  bindInput_phone: function (e) {
    let phone = e.detail.value;
    subObj.phone = phone;
  },
  bindInput_personName: function (e) {
    let personName = e.detail.value;
    subObj.storePersonName = personName;
  },
  bindInput_storIntro: function (e) {
    let storIntro = e.detail.value;
    subObj.storeIntro = storIntro;
    this.setData({
      hasInputNum: storIntro.length
    });
  },
  showError: function (str) {
    util.showShortToast({
      title: str,
      image: '../../../img/coup_status_fail.png',
      icon: 'faild'
    })
  },
  checkPhone: function (phone){ 
    
    if(!(/^1[34578]\d{9}$/.test(phone))){ 
      return false;
    } else {
      return true;
    }
  },
  checkTel:function(tel){    
    if(!/^(\d3, 4 |\d{3,4}-|\s) ?\d{7, 14 } $ /.test(tel)){
      return false;
    }
    return true;
  },  
    
  submit: function (e) {
    if (!subObj.storeImgs || subObj.storeImgs.length != 3) {
      this.showError('店铺图片必须为三张');
      return;
    } else if (!util.textIsNotNull(subObj.storeName)){
      this.showError('店名不能为空');
      return ;
    } else if (!util.textIsNotNull(subObj.addr)) {
      this.showError('店铺地址不能为空');
      return;
    } else if (!util.textIsNotNull(subObj.phone)) {
      this.showError('电话不能为空');
      return;
    } else if (!this.checkPhone(subObj.phone) && !this.checkTel(subObj.phone)){
      this.showError('您输入的电话号码有误');
      return;
    }  else if (!util.textIsNotNull(subObj.storePersonName)) {
      this.showError('店铺负责人不能为空');
      return;
    } else if (!util.textIsNotNull(subObj.storeType)){
      this.showError('店铺类型不能为空');
      return;
    }
    if (!this.data.clickAble) {
      return ;
    }
    let that = this;
    subObj.id = this.rejectStoreId;
    new Promise((resolve, reject) => {
      new RequestEngine().request(config.businessAuther, subObj, { callBy: that, method:that.submit,params:[]}, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    }).then((value) => {
        return uploadFileEngin.uploadFils({
          url: config.uploadBusinessPic,
          path: subObj.storeImgs
        }, { id: value.id, type: 0 });
    }).catch(function (err) {
      util.showTitleDialog(err, '');
    });
   
  },
  multiImageCallback:function(){
    
  }

})