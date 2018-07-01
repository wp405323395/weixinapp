var videoController = {
  like:function(e, context){
    context.data.items[e.currentTarget.dataset.index].msg = '点了我';
    context.setData({
      items: context.data.items
    });
  },
  msg: function (e, context){
    let videoid = context.data.items[e.currentTarget.dataset.index].id;
    videoid = '323';
    wx.navigateTo({
      url: '/pages/videodetail/detail/detail?videoid=' + videoid,
    })
  },
  star: function (e, context){
    console.log("star");
  },
  share: function (e, context){
    let msg = context.data.items[e.currentTarget.dataset.index].msg;
    console.log("share");
    console.log(msg);
  },
  play: function (e, context){
    context.data.items[e.currentTarget.dataset.index].playing = true;
    context.setData({
      items: context.data.items
    });
  },
  showOnTv: function (e, context){
    console.log("showOnTv");
  },
  onVideoEnd: function(e, context){
    context.data.items[e.currentTarget.dataset.index].playing = false;
    context.setData({
      items: context.data.items
    });
    console.log("showOnTv");
  }
}
export default videoController;