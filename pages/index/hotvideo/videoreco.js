// pages/index/hotvideo/videoreco.js
import videoController from '../../../template/video.js'
import { wxRequest, netApi } from '../../../netapi.js'
import util from '../../../utils/util.js'
let context;
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  attached: function () {
    context = this;
    context.wxRequest = wxRequest;
    context.netApi = netApi;
    context.util = util;
  },

  /**
   * 组件的初始数据
   */
  data: {
    items:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    stopAllPlay:function(e){
      for (let item of context.data.items){
        item.playing = false;
      }
      context.setData({
        items: context.data.items
      });
    },
    onLoadData: function (e) {
      wxRequest.request(netApi.recommendList,null,success=>{
        for (let item of success) {
          item.duration = util.formartTime(item.duration);
        }
        if(e==1){
          context.setData({
            items: success.concat(context.data.items)
          });
        }else{
          context.setData({
            items: context.data.items.concat(success)
          });
        }
       
      },failed=>{});
    },
    like:function(e) {
      videoController.like(e,this);
    },
    msg:function(e){
      videoController.msg(e,this);
    }, 
    star:function(e){
      videoController.star(e,this);
    },
    play:function(e){
      videoController.play(e,this);
    },
    showOnTv: function(e){
      videoController.showOnTv(e,this);
    },
    onVideoEnd:function(e){
      videoController.onVideoEnd(e, this);
    }
  }
})
