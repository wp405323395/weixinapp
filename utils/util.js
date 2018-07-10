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
const formartTime = mss=>{
  var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = (mss % (1000 * 60)) / 1000;
  if(hours) {
    return `${hours}:${minutes}:${seconds}`;
  } else if(minutes) {
    return `00:${minutes}:${seconds}`;
  }else{
    return `00:00:${seconds}`;
  }
}
const formartTime2 = mss => {
  var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = (mss % (1000 * 60)) / 1000;
  if (hours) {
    return `${hours}:${minutes}`;
  } else if (minutes) {
    return `00:${minutes}`;
  }
}


module.exports = {
  formatTime: formatTime,
  isPoneAvailable: isPoneAvailable,
  formartTime2: formartTime2,
  formartTime: formartTime
}
