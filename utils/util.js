const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const isPoneAvailable = str =>{
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
}
function add0(m) { return m < 10 ? '0' + m : m }
//时间戳转化成时间格式
function timeFormat(timestamp) {
  //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
  var time = new Date(timestamp);
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var date = time.getDate();
  var hours = time.getHours();
  var minutes = time.getMinutes();
  var seconds = time.getSeconds();
  return year + '-' + add0(month) + '-' + add0(date) + ' ' + add0(hours) + ':' + add0(minutes) + ':' + add0(seconds);
}

const formartTime = mss=>{
  var hours = add0(parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  var minutes = add0(parseInt((mss % (1000 * 60 * 60)) / (1000 * 60)));
  var seconds = add0((mss % (1000 * 60)) / 1000);
  if(hours) {
    return `${hours}:${minutes}:${seconds}`;
  } else if(minutes) {
    return `00:${minutes}:${seconds}`;
  }else{
    return `00:00:${seconds}`;
  }
}
const formartTime1 = mms =>{
  return timeFormat(mms);
}
const formartTime2 = mss => {
  var hours = add0(parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  var minutes = add0(parseInt((mss % (1000 * 60 * 60)) / (1000 * 60)));
  var seconds = add0((mss % (1000 * 60)) / 1000);
  if (hours) {
    return `${hours}:${minutes}`;
  } else if (minutes) {
    return `00:${minutes}`;
  }
}
/**
 * 时间戳转化为年 月 日 时 分 秒
 * number: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
*/
const formatDate = (mss,format)=>{
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(mss);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}
function getRelativePath(absolutePath) {
  let routers = getCurrentPages();
  let currentPage = routers[routers.length - 1].route;
  let paths = currentPage.split('/');
  let absolutePaths = absolutePath.split('/');
  absolutePaths = absolutePaths.splice(1, absolutePaths.length).join('/')
  let arr = new Array(paths.length - 1);
  let relativePath = arr.join('../') + absolutePaths;
  return relativePath;
}

module.exports = {
  formatTime: formatTime,
  isPoneAvailable: isPoneAvailable,
  formartTime2: formartTime2,
  formartTime1: formartTime1,
  formartTime: formartTime,
  formatDate: formatDate,
  getRelativePath: getRelativePath
}
