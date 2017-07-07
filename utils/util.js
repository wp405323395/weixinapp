function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function my_openSetting() {
  if (wx.openSetting) {
    wx.openSetting({
      success: (res) => {
        console.log(JSON.stringify(res));
      }
    })
  } else {
    console.log('不支持 wx.openSetting');
  }
}

function textIsNotNull(str){
  if (str == null || str == undefined || str == ''){
    return false;
  }
  return true;
}
module.exports = {
  formatTime: formatTime,
  my_openSetting: my_openSetting,
  textIsNotNull: textIsNotNull
}
