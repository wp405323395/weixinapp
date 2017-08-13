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

function showTitleDialog(title, content) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: false,
    confirmText: "确定"
  })
}

function showToast(toastObj = { title: '加载中', icon:'loading', duration: 30000 }) {
  wx.hideNavigationBarLoading();
  wx.hideToast();
  wx.showToast({
    title: toastObj.title,
    icon: toastObj.icon,
    image: toastObj.image,
    duration: toastObj.duration ?toastObj.duration:30000,
    success: toastObj.success
  });
}

function showShortToast(toastObj) {
  wx.hideNavigationBarLoading();
  wx.hideToast();
  wx.showToast({
    title: toastObj.title,
    icon: toastObj.icon,
    image: toastObj.image,
    duration: toastObj.duration ? toastObj.duration : 2000,
    success: toastObj.success
  });
}

function getAuther(autherName) {
  wx.getSetting({
    success(res) {
      if (!res.authSetting[autherName]) {
        wx.authorize({
          scope: autherName,
          success() {
          },
          fail() {
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

module.exports = {
  formatTime: formatTime,
  formatLocation: formatLocation,
  textIsNotNull: textIsNotNull,
  formatDay: formatDay,
  showTitleDialog: showTitleDialog,
  getAuther: getAuther,
  showToast: showToast,
  showShortToast: showShortToast
}
