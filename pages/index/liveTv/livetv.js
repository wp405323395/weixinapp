// pages/index/liveTv/livetv.js
import { wxRequest, netApi } from '../../../netapi.js'
import util from '../../../utils/util.js'
let context;
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持  
  },  
  /**
   * 组件的属性列表
   */
  properties: {
    
  },
  attached:function(){
    context = this;
  },
  /**
   * 组件的初始数据
   */
  data: {
    kindSelect:0,
    isShowDelete:false,
    myChannels: [],
    otherChannels:[]
  },


  /**
   * 组件的方法列表
   */
  methods: {

    onLoadData: function () {
      this.initData().then(value=>{
        return this.queCurProListByType(0);
      }).catch(err=>{
        console.log("请求失败");
      });
    },
    queCurProListByType:function(tag){
     return new Promise((resolve,reject)=>{
        wxRequest.request(netApi.queCurProListByType, { type: tag }, success => {
          for (let channel of success) {
            channel.watchTime = (util.formartTime2(channel.endTime) + '-' + util.formartTime2(channel.startTime));
          }
          context.setData({
            otherChannels: success
          });
          resolve(success);
        }, faild => {
          reject(faild);
         })
      });
      
    },
    initData:function(){
     return new Promise((resolve, reject)=>{
        wxRequest.request(netApi.userFavoriteChannel, null, success => {
          context.setData({
            myChannels: success
          });
          resolve(success);
        }, faild => {
          reject(faild);
         });
      });
      
    },
    selectKind:function(evn) {
      let id = evn.target.id;
      if(id == context.data.kindSelect) {
        return ;
      }
      context.setData({
        kindSelect:id
      });
      //todo: 切换频道类型，切换数据
      context.queCurProListByType(id);
      console.log("开始切换频道类型");
    },
    addChannel:function(){
      //todo: 添加电视台
      console.log("开始添加频道");
      wx.navigateTo({
        url: '../channelcenter/channelcenter',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    showDelete:function(){
      context.setData({
        isShowDelete:true
      });
    },

    despatchClick:function(e){
      if(e.target.id == "10105") {
          let channelid = e.target.dataset.channelid;
          if(this.data.isShowDelete) {
            console.log("开始删除频道 channelid= "+ channelid);
            //todo: 删除我的频道
            wxRequest.request(netApi.delMyChannel, { channelId:channelid}, success=>{
              context.initData();
            },faild=>{});
          } else {
            console.log("点击进入播放台channelid= " + channelid);
            //todo: 播放频道
          }
      } else {
        context.setData({
          isShowDelete:false
        });
      }
    }
  }
})
