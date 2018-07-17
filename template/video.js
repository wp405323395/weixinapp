function getRelativePath(absolutePath) {
  let routers = getCurrentPages();
  let currentPage = routers[routers.length - 1].route;
  let paths = currentPage.split('/');
  let absolutePaths = absolutePath.split('/');
  absolutePaths = absolutePaths.splice(1, absolutePaths.length).join('/')
  let arr = new Array(paths.length-1);
  let relativePath = arr.join('../') + absolutePaths;
  return relativePath;
  
}
var videoController = {
  //视频列表是否点赞
  like:function(e, context){
    let items = context.data.items;  //获取热门推荐视频上下文
    let index = e.currentTarget.dataset.index;  //获取选中行下标
    let data = {
      videoId: e.currentTarget.dataset.videoid,  //视频id
      status: items[index].isLike?1:0  //0是点赞  1是取消点赞
    }
    context.wxRequest.request(context.netApi.like, data, success=>{
     
      items[index].isLike = !items[index].isLike;
      context.setData({
        items: items
      });
    },faild=>{});
    console.log("like");
  },
  msg: function (e, context){
    //let videoid = context.data.items[e.currentTarget.dataset.index].id;
    wx.navigateTo({
      url: '/pages/videodetail/detail/detail?videoId=' + e.currentTarget.dataset.videoid,
    })
  },
  //视频列表是否收藏
  star: function (e, context){
    let items = context.data.items;  //获取热门推荐视频上下文
    let index = e.currentTarget.dataset.index;  //获取选中行下标
    let data = {
      linkId: e.currentTarget.dataset.videoid,  //视频id
      'type': e.currentTarget.dataset.videotype,  //视频类型
      status: items[index].isFavorite ? 1 : 0   //收藏标识   0收藏  1取消收藏
    }
    context.wxRequest.request(context.netApi.userFavoriteVideo, data, success => {
      items[index].isFavorite = !items[index].isFavorite;
      context.setData({
        items: items
      });
    }, faild => { });
  },
  share: function (e, context, callback){
    let dataset = e.target.dataset;
    let data = {
      videoId: dataset.videoid,  //视频id
      'shareTo': 'weixin'  //分享渠道
    }
    
    return {
      title: dataset.videotitle,
      path: '/pages/videodetail/detail/detail?videoId=' + dataset.videoid,
      success: function (res) {
        context.wxRequest.request(context.netApi.videoShare, data, success => {
          if (callback != undefined){
            callback();
          }
    }, faild => { });
        // var shareTickets = res.shareTickets;
        // if (shareTickets.length == 0) {
        //   return false;
        // }
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

    let item = context.data.items[e.currentTarget.dataset.index];
    context.wxRequest.request(context.netApi.showVidoOnTV, { videoId: item.id}, success => {
      let url = getRelativePath('pages/interactive/interactive');
      console.log(url);
      wx.switchTab({
        url: url
      });
    }, faild => {
      console.log(faild);
      if (faild.code == 1) {
        wx.showModal({
          title: '观看提示',
          content: faild.message,
          showCancel: false,
          success: function (res) {
          }
        })
      } else if(faild.code == 100) {
        wx.showModal({
          title: '观看提示',
          content: faild.message,
          showCancel: false,
          success: function (res) {
            let url = getRelativePath('pages/me/centerfeatures/myDevices/myDevices');
            console.log(url);
            wx.navigateTo({
              url: url,
            });
          }
        })
      }
        
     });
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