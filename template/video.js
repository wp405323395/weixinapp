
var videoController = {
  like:function(e, context){
    console.log(e);
    let videoId = e.currentTarget.dataset.videoid;
    context.wxRequest.request(context.netApi.like, null, success=>{},faild=>{});
    console.log("like");
  },
  msg: function (e, context){
    //let videoid = context.data.items[e.currentTarget.dataset.index].id;
    wx.navigateTo({
      url: '/pages/videodetail/detail/detail?videoId=' + e.currentTarget.dataset.videoid,
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
    let index = e.currentTarget.dataset.index
    let itmes = context.data.items;
    for (let i = 0; i < itmes.length; i++) {
      if (i == index){
        itmes[index].playing = true;
        itmes[index].isEnd = false;
      }else {
        itmes[i].playing = false;
      }
    }

    context.setData({
      items: itmes
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