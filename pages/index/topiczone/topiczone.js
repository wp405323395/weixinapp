// pages/index/topiczone/topiczone.js
import { wxRequest, netApi} from '../../../netapi.js'
let context;
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
    items:[]
  },
  attached: function () {
    context = this;
    this.initData();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoTopic:function(e) {
      let topicId = e.target.dataset.topicid;
      console.log("进入专题 id = "+ topicId);
      wx.navigateTo({
        url: '../topic/topicdetail/topicdetail?topicId='+topicId,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    initData:function(){
      wxRequest.request(netApi.topic, { current: 0 }, successed => {
        console.log(successed);
        context.setData({
          items: context.data.items.concat(successed)
        });

      }, failed => {
        console.log(failed);
      });
    }
  }
})
