// 相关藏品
var speed = 10
var tab = document.getElementById("other-item")
var tab1 = document.getElementById("demo1")
var tab2 = document.getElementById("demo2")
tab2.innerHTML = tab1.innerHTML
function Marquee() {
  if (tab2.offsetWidth - tab.scrollLeft <= 0)
      tab.scrollLeft -= tab1.offsetWidth
  else {
      tab.scrollLeft++
  }
}
var MyMar = setInterval(Marquee, speed);
tab.onmouseover = function() {
  clearInterval(MyMar)
}
tab.onmouseout = function() {
  MyMar = setInterval(Marquee, speed)
}

// 藏品图片切换
$('.show-small-img:first-of-type').css({'border': 'solid 1px #951b25', 'padding': '2px'})
$('.show-small-img:first-of-type').attr('alt', 'now').siblings().removeAttr('alt')
$('.show-small-img').click(function () {
  $('#show-img').attr('src', $(this).attr('src'))
  $('#big-img').attr('src', $(this).attr('src'))
  $(this).attr('alt', 'now').siblings().removeAttr('alt')
  $(this).css({'border': 'solid 1px #951b25', 'padding': '2px'}).siblings().css({'border': 'none', 'padding': '0'})
  if ($(this).index() >= 3 && $(this).index() < $('#small-img-roll').children().length - 1){
    $('#small-img-roll').css('left', -($(this).index() - 2) * 76 + 'px')
  } else if ($(this).index() == $('#small-img-roll').children().length - 1) {
    $('#small-img-roll').css('left', -($('#small-img-roll').children().length - 4) * 76 + 'px')
  } else {
    $('#small-img-roll').css('left', '0')
  }
})
// 点击 '>' 下一张
$('#next-img').click(function (){
  $('#show-img').attr('src', $(".show-small-img[alt='now']").next().attr('src'))
  $('#big-img').attr('src', $(".show-small-img[alt='now']").next().attr('src'))
  $(".show-small-img[alt='now']").next().css({'border': 'solid 1px #951b25', 'padding': '2px'}).siblings().css({'border': 'none', 'padding': '0'})
  $(".show-small-img[alt='now']").next().attr('alt', 'now').siblings().removeAttr('alt')
  if ($(".show-small-img[alt='now']").index() >= 3 && $(".show-small-img[alt='now']").index() < $('#small-img-roll').children().length - 1){
    $('#small-img-roll').css('left', -($(".show-small-img[alt='now']").index() - 2) * 76 + 'px')
  } else if ($(".show-small-img[alt='now']").index() == $('#small-img-roll').children().length - 1) {
    $('#small-img-roll').css('left', -($('#small-img-roll').children().length - 4) * 76 + 'px')
  } else {
    $('#small-img-roll').css('left', '0')
  }
})
// 点击 '<' 上一张
$('#prev-img').click(function (){
  $('#show-img').attr('src', $(".show-small-img[alt='now']").prev().attr('src'))
  $('#big-img').attr('src', $(".show-small-img[alt='now']").prev().attr('src'))
  $(".show-small-img[alt='now']").prev().css({'border': 'solid 1px #951b25', 'padding': '2px'}).siblings().css({'border': 'none', 'padding': '0'})
  $(".show-small-img[alt='now']").prev().attr('alt', 'now').siblings().removeAttr('alt')
  if ($(".show-small-img[alt='now']").index() >= 3 && $(".show-small-img[alt='now']").index() < $('#small-img-roll').children().length - 1){
    $('#small-img-roll').css('left', -($(".show-small-img[alt='now']").index() - 2) * 76 + 'px')
  } else if ($(".show-small-img[alt='now']").index() == $('#small-img-roll').children().length - 1) {
    $('#small-img-roll').css('left', -($('#small-img-roll').children().length - 4) * 76 + 'px')
  } else {
    $('#small-img-roll').css('left', '0')
  }
})

// 图片放大镜
$('.t_container').zoomImage();
// 在线展厅
var onlineUrl = document.referrer.split(/\//g)[4]
switch(onlineUrl) {
  case 'online.html?1':
    $('#now-site').text('精品瓷器 > ')
    break
  case 'online.html?2':
    $('#now-site').text('古玩玉器 > ')
    break
  case 'online.html?3':
    $('#now-site').text('名家字画 > ')
    break
  case 'online.html?4':
  $('#now-site').text('奇珍杂项 > ')
  break
  default:
  break
}