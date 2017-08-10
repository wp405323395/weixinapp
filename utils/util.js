function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function formatDay(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}

function textIsNotNull(str) {
  if (str == null || str == undefined || str == '') {
    return false;
  }
  return true;
}

function showTitleDialog(title, content){
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      confirmText: "确定"
    })
}

function getAuther(autherName) {
  wx.getSetting({
    success(res) {
      if (!res.authSetting[autherName]) {
        wx.authorize({
          scope: autherName,
          success() {
          },
          fail(){
            wx.openSetting({
              success: (res) => {
                res.authSetting = {
                  autherName: true
                }
              }
            })
          }
        })
      }
    }
  })
}

//多张图片上传
function uploadimg(data,formData) {
  var that = this,
    i = data.i ? data.i : 0,
    success = data.success ? data.success : 0,
    fail = data.fail ? data.fail : 0;
    return new Promise((resolve,reject)=>{
      wx.uploadFile({
        url: data.url,
        filePath: data.path[i],
        name: 'fileData',
        formData: formData,
        success: (resp) => {
          success++;
          console.log(resp)
          console.log(i);
          //这里可能有BUG，失败也会执行这里
        },
        fail: (res) => {
          reject(res);
          fail++;
          console.log('fail:' + i + "fail:" + fail);
          
        },
        complete: () => {
          console.log(i);
          i++;
          if (i == data.path.length) {  //当图片传完时，停止调用     
            console.log('执行完毕');
            console.log('成功：' + success + " 失败：" + fail);
            resolve('success');
          } else {//若图片还没有传完，则继续调用函数
            console.log(i);
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
  formatTime: formatTime,
  formatLocation: formatLocation,
  textIsNotNull: textIsNotNull,
  formatDay: formatDay,
  showTitleDialog: showTitleDialog,
  getAuther: getAuther,
  uploadimg: uploadimg
}
