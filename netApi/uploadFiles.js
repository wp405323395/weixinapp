var util = require('../utils/util');
import Header from './Header.js'    //引入类
var Promise = require('../libs/es6-promise.js').Promise;
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
    let header = new Header('application/json').getHeader();
    console.log('请求头~');
    console.log(header);
    util.showToast({
      title: "图片上传中...",
      icon: "loading"
    });
  }

  return new Promise((resolve, reject) => {
    let header = new Header('application/json').getHeader();
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'fileData',
      header: header,
      formData: formData,
      success: (resp) => {
        success++;
        util.showToast({
          title: `成功上传(${success})...`,
          icon: "loading"
        });
        console.log(`success:${success}`);
        //这里可能有BUG，失败也会执行这里
      },
      fail: (res) => {
        util.showToast({
          title: `上传失败(${i})...`,
          icon: "loading"
        });
        reject(res);
        fail++;
        console.log(`fail:${i}  fail:${fail}`);
        console.log('失败原因是~');
        console.log(res);
      },
      complete: () => {
        i++;
        if (i == data.path.length) {  //当图片传完时，停止调用     
          console.log('执行完毕');
          console.log(`成功：${success} 失败：${fail}`);
          wx.hideToast();
          util.showShortToast({
            title: `成功上传(${success})...`,
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


function uploadFils(data, formData, callBack) {
  let tasks = [];
  let header = new Header('application/json').getHeader();
  util.showToast({
    title: `上传中...`,
    icon: "loading"
  });
  for(let path of data.path) {
    let pro = new Promise((resolve,reject)=>{
      wx.uploadFile({
        url: data.url,
        filePath: path,
        name: 'fileData',
        header: header,
        formData: formData,
        success: (resp) => {
          resolve();
        },
        fail: (res) => {
          reject(res);
        },
        complete: () => {
          
        }
      })
    });
    tasks.push(pro);
  } 
  Promise.all(tasks).then(values=>{
    wx.hideToast();
    wx.showModal({
      title: '已提交审核',
      success: function (res) {
        wx.navigateBack({
        })
      },
      showCancel:false
    })
    if (callBack) {
      callBack.success();
    }
    
  }).catch(err=>{
    if (callBack) {
      callBack.faild();
    }
    wx.showModal({
      title: '素材上传失败，可重新上传',
      success: function (res) {
      },
    })
    showCancel: false
  });
}

module.exports = {
  uploadimg: uploadimg,
  uploadFils: uploadFils
}