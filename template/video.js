var videoController = {
  like:function(e, context){
    console.log("like");
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
    console.log("携带的关键数据是，" + e.target.dataset.index);
    return {
      title: "fffffffffff",
      path: '/page/user?id=' + e.target.dataset.index,
      success: function (res) {
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
      }
    }
  },
  play: function (e, context){
    context.data.items[e.currentTarget.dataset.index].playing = true;
    context.data.items[e.currentTarget.dataset.index].isEnd = false;
    context.setData({
      items: context.data.items
    });
  },
  showOnTv: function (e, context){
    console.log("showOnTv");
  },
  onVideoEnd: function(e, context){
    context.data.items[e.currentTarget.dataset.index].playing = false;
    context.data.items[e.currentTarget.dataset.index].isEnd = true;
    context.setData({
      items: context.data.items
    });
    console.log("showOnTv");
  }
}
export default videoController;