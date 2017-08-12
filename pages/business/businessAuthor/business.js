// business.js
var util = require('../../../utils/util.js')
var config = require('../../../config.js');
var requestEngin = require('../../../netApi/requestModle.js');
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
  },
  submit: function (e) {
    if (!this.data.clickAble) {
      return ;
    }
    let param = {};
    param.formData = JSON.stringify(subObj);
    let that = this;
    new Promise((resolve, reject) => {
      requestEngin.request(config.businessAuther, param, { callBy: that, method:that.submit,params:[]}, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    }).then((value) => {
      if (value.retCode == '0') {
        
        return util.uploadimg({
          url: config.uploadBusinessPic,
          path: subObj.storeImgs
        }, { id: value.id, type: 0 });
      } else {
        util.showTitleDialog('审核提交操作失败', '');
      }
    }, (err) => {
      console.log('errerrerrerrerrerrerr');
    }).then((value)=>{
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    },(err)=>{
      console.log('errerrerrerrerrerrerr');
    }).catch(function (err) {
        console.log("--------" +err);
    });
   
  },
  multiImageCallback:function(){
    
  }

})