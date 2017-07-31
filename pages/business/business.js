// business.js
var util = require('../../utils/util.js')
var formatLocation = util.formatLocation
var sourceType = [['camera'], ['album'], ['camera', 'album']]
var sizeType = [['compressed'], ['original'], ['compressed', 'original']]
var longClick;
var longClick2;
var imgList;
Page({
  data: {
    imageList: [],
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],

    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],

    countIndex: 2,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    isHidden_delete:true,
    hasLocation:false
  },
  showDelete:function(e){
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
      return ;
    }
    imgList = this.data.imageList;
    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex],
      success: function (res) {
        console.log(res)
        imgList = imgList.concat(res.tempFilePaths);
        that.setData({
          imageList: imgList
        })
      }
    })
  },
  previewImage: function (e) {
    console.log("previewImage");
    if (longClick){
      longClick = false;
      return ;
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
  onChooceLocation: function(e) {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          hasLocation: true,
          location: formatLocation(res.longitude, res.latitude),
          locationAddress: res.address
        })
      }
    });
  },
  deleteItem:function(e) {
    var current = e.target.dataset.src;
    var index = this.data.imageList.indexOf(current);
    this.data.imageList.splice(index, 1);
    this.setData({
      imageList: this.data.imageList
    })
  },
  on_addPic_wrap_click:function(e){
    if (longClick2) {
      longClick2 = false;
      return;
    } else {
      this.setData({
        isHidden_delete: true
      })
    }
    
  },
  onKindClick:function(e) {
    let id = e.currentTarget.dataset.kindid;
    this.setData({
      type_index: id
    })
    console.log(e);
  },
  submit:function(e){
    console.log("----dddddddddddd");
  }

})