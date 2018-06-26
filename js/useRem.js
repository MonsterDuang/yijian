// 判断手机端
if (document.documentElement.clientWidth < 1050) {
  if (location.pathname == dir + '/index.html') {
    $('head').append('<script src="js/rem.js"></script>')
  } else {
    $('head').append('<script src="../js/rem.js"></script>')
  }
  // 半隐藏浮动的在线客服
  $(window).scroll(function () {
    $('#frt').css({'transform': 'translateX(2.5rem)'})
    $('#search').blur()  // 滚动时 input 失焦
    // 显示返回顶部按钮
    if ($(window).scrollTop() > 100) {
      $('#back-up').css({'opacity': '.8', 'z-index': '100'})
    } else {
      $('#back-up').css({'opacity': '0', 'z-index': '-100'})
    }
  })
  // 点击返回顶部
  $('#back-up').click(function () {
    $('body, html').animate({'scrollTop': '0'}, 300)
  })
  // 点击再次出来
  $('#frt').click(function () {
    $(this).css({'transform': 'translateX(0)'})
  })
  // 按回车搜索
  $('#search').keydown(function (e) {
    if (e.keyCode == 13) {
      getData(classId, index, $(this).val())
    }
  })
  // 调起手机端电话
  $('#frt > .tell-chat:first').click(function () {
    if ($('#frt').css('transform') == 'matrix(1, 0, 0, 1, 0, 0)') {
      window.open("tel: 400 678 8632")
    }
  })
  // 在线客服
  $('#frt > .chat:first').click(function () {
    if ($('#frt').css('transform') == 'matrix(1, 0, 0, 1, 0, 0)') {
      window.open('')
    }
  })
}

//判断手机横竖屏状态：
// window.addEventListener("onorientationchange" in window ? "orientationchange": "resize", function() {
//   if(window.orientation === 90 || window.orientation === -90 ){
//     $('body').append("<div class='mask'>抱歉，当前页面不支持横屏查看，请把手机竖起来~~</div>")
//     $('body').css('overflow', 'hidden')
//     $('#LXB_CONTAINER').css('z-index', '-10')
//     $('#LRMINIWIN0').css('z-index', '-10')
//   } else {
//     $('body').css('overflow', 'auto')
//     $('div').remove('.mask')
//     $('#LXB_CONTAINER').css('z-index', '0')
//     $('#LRMINIWIN0').css('z-index', '0')
//   }
// }, false);