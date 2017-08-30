// persons.js
var util = require('../../../utils/util.js')
var config = require('../../../config.js');
import RequestEngine from '../../../netApi/requestEngine.js';  
var Promise = require('../../../libs/es6-promise.js').Promise;
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    isHidden:true,
    qrImgUrl: "https://www.maywidehb.com/banner/loading.gif"
  },
  deletePerson:function(id){
    let that = this;
    new Promise((resolve, reject) => {
      new RequestEngine().request(config.delAssistbyAssistid, { formData: JSON.stringify({ assistid:id})}, { callBy: that, method: that.deletePerson, params: [id] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      })
    }).then(value=>{
      if (value.retCode=='0') {
        let removeIndex = 0;
        for (let person of this.data.personList) {
          removeIndex++;
          if(person.id == id) {
            break;
          }
        }
        if (removeIndex !=0) {
          this.data.personList.splice(removeIndex - 1, 1);
          this.setData({
            personList: this.data.personList
          });
        }
        
      }
    }).catch(err=>{});
  },
  onDeleteClick:function(event) {
    let id = event.currentTarget.dataset.id;
    let that = this;
    wx.showModal({
      content: "确定要删除该用户吗？",
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          that.deletePerson(id);
        } else if (res.cancel) {
          
        }
      }
    })
    console.log(event);
  },
  loadPersons:function(){
    
    var that = this;
    new Promise((resolve,reject)=>{ 
      new RequestEngine().request(config.queMercAssistListByStoreid, { }, { callBy: that, method: that.loadPersons, params: [] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      })
    }).then(value => {
      let list = value.retData;
      this.setData({
        personList: list
      });
    }).catch(err => { });
  },
  onClose:function(){
    this.loadPersons();
    this.setData({
      isHidden: true
    });
  },
  onAddPersonClick:function(){
    this.setData({
      isHidden:false
    });
    var that = this;
    new Promise((resolve,reject)=>{
      new RequestEngine().request(config.createStoreAssistCode, {}, { callBy: that, method: that.onAddPersonClick, params: [] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      })
    }).then(value=>{
      if (value.retCode == '0') {
        this.setData({
          qrImgUrl: value.retData.wxcodeurl
      });
      }
      
    }).catch(err=>{})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadPersons();
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