// pages/index/liveTv/livetv.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持  
  },  
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    kindSelect:0,
    isShowDelete:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    selectKind:function(evn) {
      let id = evn.target.id;
      this.setData({
        kindSelect:id
      });
      //todo: 切换频道类型，切换数据
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
      this.setData({
        isShowDelete:true
      });
    },

    despatchClick:function(e){
      if(e.target.id == "10105") {
          let channelid = e.target.dataset.channelid;
          if(this.data.isShowDelete) {
            console.log("开始删除频道 channelid= "+ channelid);
            //todo: 删除我的频道
          } else {
            console.log("点击进入播放台channelid= " + channelid);
            //todo: 播放频道
          }
      } else {
        this.setData({
          isShowDelete:false
        });
      }
    }
  }
})
