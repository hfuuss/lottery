function submit() {
  if (state !== STATE_ENUM.pending) {
    return false
  }
  var level = $('#select-prize option:selected').val()
  var times = $('#select-times').val()
  var total = $('#select-number').val()
  localStorage.setItem('level', level);
  localStorage.setItem('times', times);
  localStorage.setItem('total', total);
  $("#toast").stop(true, true).text("配置成功，可以抽奖啦！").fadeIn().delay(1000).fadeOut();
}
function reset (showInfo) {
  if (showInfo && state !== STATE_ENUM.pending) {
    return false
  }
  $('#select-prize option:first').attr('selected', true).siblings().removeAttr('selected');
  $('#select-times').val(1);
  $('#select-number').val(100);
  $('#winner ul').children().remove();
  localStorage.setItem('level', 1);
  localStorage.setItem('times', 1);
  localStorage.setItem('total', 100);
  localStorage.removeItem('list');
  if(showInfo) {
    $("#toast").stop(true, true).text("已清除历史数据").fadeIn().delay(1000).fadeOut();
  }
}
function changePrize () {
  $('#select-prize option:selected').attr('selected', true).siblings().removeAttr('selected');
}
function changeTimes () {
  var oTimes = $('#select-times')
  var num = Number(oTimes.val())
  if (num > 5) {
    oTimes.val(5)
  }
  if (num < 1) {
    oTimes.val(1)
  }
}
function numRand() {
  var x = Number(localStorage.getItem('total')); //上限
  var y = 1; //下限
  var rand = parseInt(Math.random() * (x - y + 1) + y);
  var prizedNum = localStorage.getItem('list') ? localStorage.getItem('list').split(',') : [];
  if (prizedNum.length >= x) {
    $("#toast").text("没有有效的中奖数字了，请点击重置");
    $("#toast").fadeIn().delay(1000).fadeOut();
    stopBgm();
    return 0
  }
  if (prizedNum.indexOf((rand + '')) === -1) {
    prizedNum.push(rand + '')
    localStorage.setItem('list', prizedNum)
    return rand;
  } else {
    return numRand()
  }
}
function changeNum () {
  var oNum = $('#select-number')
  var num = Number(oNum.val())
  if (num > 999) {
    oNum.val(999)
  }
  if (num < 1) {
    oNum.val(1)
  }
}
function getPrizeLevelText () {
  var level = localStorage.getItem('level');
  switch (level) {
    case '1': {return '一等奖';}
    case '2': {return '二等奖';}
    case '3': {return '三等奖';}
    default: return ''
  } 
}

function isFullScreen () {
  return document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen
}