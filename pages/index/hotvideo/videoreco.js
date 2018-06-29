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
    item: {
      index: 0,
      msg: 'this is a template',
      time: '2016-09-15',
      url:'../../MY_VIDEO.mp4'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    like: videoController.like,
    msg:videoController.msg,
    star:videoController.star,
    share:videoController.share,
    play:videoController.play,
    showOnTv: videoController.showOnTv
  }
})
