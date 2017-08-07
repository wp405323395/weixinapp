// business.js
var util = require('../../../utils/util.js')
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
  addrStr: '',
  storePhone: '',
  storePersonName: '',
  storeKind: '',
  storeIntro: '',
  storeImgs: ['', '', '']

}
Page({
  data: {
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
        subObj.address,
        subObj.latitude,
        subObj.longitude
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
    subObj.storeKind = this.data.storeKind[id];
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
    subObj.storePhone = phone;
  },
  bindInput_personName: function (e) {
    let personName = e.detail.value;
    subObj.storePersonName = personName;
  },
  bindInput_storIntro: function (e) {
    let storIntro = e.detail.value;
    subObj.storeIntro = storIntro;
  },
  submit: function (e) {

    uploadImgs(subObj.storeImgs);
  }, 
  uploadImgs:function(arr){
    if(arr.length != 0) {
      wx.uploadFile({
        url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
        filePath: arr[0],
        name: 'file',
        formData: {
          'user': 'test'
        },
        success: function (res) {
          var data = res.data
          //do something
          arr.splice(0, 1)
          sendPhotos(arr)
        }
      })
    }
  }

})