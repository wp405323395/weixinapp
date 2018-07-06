// pages/index/topiczone/topiczone.js
import { wxRequest, netApi} from '../../../netapi.js'
let context;
let pageNum = 1;
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
      if(pageNum == -1) {
        return ;
      }
      wxRequest.request(netApi.topic, { current: pageNum }, successed => {
        
        if (successed) {
          pageNum++;
          if (successed.length == 0) {
            pageNum = -1;
          }
          context.setData({
            items: context.data.items.concat(successed)
          });
        }

      }, failed => {
        console.log(failed);
      });
    }
  }
})
