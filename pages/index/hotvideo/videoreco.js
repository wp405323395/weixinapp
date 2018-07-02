// pages/index/hotvideo/videoreco.js
import videoController from '../../../template/video.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    items: [{
      index: 0,
      msg: 'ahahahahahah',
      time: '2016-09-15',
      url:'../../MY_VIDEO.mp4'
    },{
      index: 0,
      msg: 'ahahahahahah',
      time: '2016-09-15',
      url: '../../MY_VIDEO.mp4'
      },{
        index: 0,
        msg: 'ahahahahahah',
        time: '2016-09-15',
        url: '../../MY_VIDEO.mp4'
    },{
      index: 0,
      msg: 'ahahahahahah',
      time: '2016-09-15',
      url: '../../MY_VIDEO.mp4'
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
