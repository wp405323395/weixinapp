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
    },
    addChannel:function(){
      //todo: 添加电视台
    },
    showDelete:function(){
      this.setData({
        isShowDelete:true
      });
    },

    despatchClick:function(e){
      if(e.target.id == "10105") {
          if(this.data.isShowDelete) {
            console.log("开始删除应用");
            //todo: 删除我的频道
          } else {
            console.log("点击进入播放台");
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
