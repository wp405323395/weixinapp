var util = require('../utils/util');
//多张图片上传
function uploadimg(data, formData) {
  var that = this,
    i = data.i ? data.i : 0,
    success = data.success ? data.success : 0,
    fail = data.fail ? data.fail : 0;
  if (i == 0) {
    console.log('####################################');
    console.log('上传图片的url:::' + data.url);
    console.log('上传图片请求参数~');
    console.log(formData);
    console.log('-------------------------------------');
    util.showToast({
      title: "图片上传中...",
      icon: "loading"
    });
  }

  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'fileData',
      formData: formData,
      success: (resp) => {
        success++;
        util.showToast({
          title: "成功上传(" + success + ")...",
          icon: "loading"
        });
        console.log("success:" + success);
        //这里可能有BUG，失败也会执行这里
      },
      fail: (res) => {
        util.showToast({
          title: "上传失败(" + i + ")...",
          icon: "loading"
        });
        reject(res);
        fail++;
        console.log('fail:' + i + "fail:" + fail);
        console.log('失败原因是~');
        console.log(res);
      },
      complete: () => {
        i++;
        if (i == data.path.length) {  //当图片传完时，停止调用     
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
          wx.hideToast();
          util.showShortToast({
            title: "成功上传(" + success + ")...",
            icon: "success",
            success: () => {
              resolve('success');
            }
          });
          setTimeout(() => {
            if (i > 1) {
              wx.navigateBack({
              });
            }

          }, 2000)
          console.log('####################################');
        } else {//若图片还没有传完，则继续调用函数
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data, formData);
        }

      }
    });
  });

}

module.exports = {
  uploadimg: uploadimg
}