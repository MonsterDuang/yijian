
if (document.documentElement.clientWidth > 1050) {
  // 相关藏品数据
  var collectionid = location.search.slice(1)
  var relatedxmlhttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
  relatedxmlhttp.open("GET", apihost + "/yj/CollectionClient/similar", true)
  relatedxmlhttp.onreadystatechange = function () {
    if (relatedxmlhttp.readyState === 4 && relatedxmlhttp.status === 200) {
      var data = JSON.parse(relatedxmlhttp.response).data
      var aboutPro = ''
      for (var i = 0; i < data.length; i++) {
        aboutPro += '<li>' +
                      '<a href="baby-details.html?' + data[i].id + '">' +
                        '<span>' +
                          '<img class="pro-img" src="' + imghost + data[i].recommendimg + '" title="' + data[i].title + '">' +
                        '</span>' +
                        '<p align="center" title="' + data[i].title + '" class="ptit">' + data[i].title + '</p>' +
                      '</a>' +
                    '</li>'
      }
      $('#products_img').html(aboutPro)
      if (data.length > 4) {
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
      }
    }
  }
  relatedxmlhttp.send()
}

// 获取藏品详情数据
var collectionid = location.search.slice(1)
var xmlhttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
xmlhttp.open("GET", apihost + "/yj/CollectionClient/unitDetail?collectionId=" + collectionid, true)
xmlhttp.onreadystatechange = function () {
  if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    var data = JSON.parse(xmlhttp.response).data
    var item = "";
    var previewimg = ''
    var standard = ''
    var previewimg2 = ''
    var rollPic = ''
    var indicators = ''
    var previewimgData = JSON.parse(data.previewimg)
    for (var i = 0; i < data.standard.length; i++) {
      standard += data.standard[i].name + ":" + data.standard[i].val + ' '
    }
    for (var i = 0; i < previewimgData.length; i++) {
      previewimg += "<img src='" + imghost + previewimgData[i] + "'>"
      previewimg2 += "<img src='" + imghost + previewimgData[i] + "' class='show-small-img'>"
      rollPic += '<div class="carousel-item">' +
                    '<img src="' + imghost + previewimgData[i] + '" class="d-block w-100">' +
                  '</div>'
      indicators += '<li data-target="#carouselExampleIndicators" data-slide-to="' + i + '"></li>'
    }
    // pc
    if (document.documentElement.clientWidth > 1050) {
      $('#now-site').text(data.classname + ' > ')
      $('#now-site2').text(data.title)
      item =  '<div class="baby-title">' + data.title + '<span>浏览量：' + data.scannum + '</span></div>' +
              '<p>估&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：<span>' + data.entrustprice + '</span></p>' +
              '<p>款&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;式：<span>' + data.style + '</span></p>' +
              '<p>数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：<span>' + data.quantity + '</span></p>' +
              '<p>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：<span>' + data.classname + '</span></p>' +
              '<p>规&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格：<span>' + data.standard + '</span></p>' +
              '<p>咨询热线：<b>400 616 2520</b></p>' +
              '<div class="baby-desc">' +
                '<p>藏品介绍：</p>' +
                data.content +
              '</div>' +
              '<div class="online-ask">' +
                '<button>在线咨询</button>' +
              '</div>'
      $('#right-desc').html(item)
      $('#small-img-roll').html(previewimg2)
      $('#t_container').attr('href', imghost + previewimgData[0]).html('<img src="' + imghost + previewimgData[0] + '" id="show-img" class="show-img">')
      $('#baby-show').html('<p class="baby-show-title"><span></span>&nbsp;&nbsp;&nbsp;&nbsp;藏品详情&nbsp;&nbsp;&nbsp;&nbsp;<span></span></p>' + previewimg)

      // 图片放大镜
      $('.t_container').zoomImage();

      // 藏品图片切换
      $('.show-small-img:first-of-type').css({'border': 'solid 1px #951b25', 'padding': '2px'})
      $('.show-small-img:first-of-type').attr('alt', 'now').siblings().removeAttr('alt')
      $('.show-small-img').click(function () {
        $('#show-img').attr('src', $(this).attr('src'))
        $('#big-img').attr('src', $(this).attr('src'))
        $(this).attr('alt', 'now').siblings().removeAttr('alt')
        $(this).css({'border': 'solid 1px #951b25', 'padding': '2px'}).siblings().css({'border': 'none', 'padding': '0'})
        if ($('#small-img-roll').children().length > 4) {
          if ($(this).index() >= 3 && $(this).index() < $('#small-img-roll').children().length - 1) {
            $('#small-img-roll').css('left', -($(this).index() - 2) * 76 + 'px')
          } else if ($(this).index() == $('#small-img-roll').children().length - 1) {
            $('#small-img-roll').css('left', -($('#small-img-roll').children().length - 4) * 76 + 'px')
          } else {
            $('#small-img-roll').css('left', '0')
          }
        }
      })
      // 点击 '>' 下一张
      $('#next-img').click(function (){
        $('#show-img').attr('src', $(".show-small-img[alt='now']").next().attr('src'))
        $('#big-img').attr('src', $(".show-small-img[alt='now']").next().attr('src'))
        $(".show-small-img[alt='now']").next().css({'border': 'solid 1px #951b25', 'padding': '2px'}).siblings().css({'border': 'none', 'padding': '0'})
        $(".show-small-img[alt='now']").next().attr('alt', 'now').siblings().removeAttr('alt')
        if ($('#small-img-roll').children().length > 4) {
          if ($(".show-small-img[alt='now']").index() >= 3 && $(".show-small-img[alt='now']").index() < $('#small-img-roll').children().length - 1){
            $('#small-img-roll').css('left', -($(".show-small-img[alt='now']").index() - 2) * 76 + 'px')
          } else if ($(".show-small-img[alt='now']").index() == $('#small-img-roll').children().length - 1) {
            $('#small-img-roll').css('left', -($('#small-img-roll').children().length - 4) * 76 + 'px')
          } else {
            $('#small-img-roll').css('left', '0')
          }
        }
      })
      // 点击 '<' 上一张
      $('#prev-img').click(function (){
        $('#show-img').attr('src', $(".show-small-img[alt='now']").prev().attr('src'))
        $('#big-img').attr('src', $(".show-small-img[alt='now']").prev().attr('src'))
        $(".show-small-img[alt='now']").prev().css({'border': 'solid 1px #951b25', 'padding': '2px'}).siblings().css({'border': 'none', 'padding': '0'})
        $(".show-small-img[alt='now']").prev().attr('alt', 'now').siblings().removeAttr('alt')
        if ($('#small-img-roll').children().length > 4) {
          if ($(".show-small-img[alt='now']").index() >= 3 && $(".show-small-img[alt='now']").index() < $('#small-img-roll').children().length - 1){
            $('#small-img-roll').css('left', -($(".show-small-img[alt='now']").index() - 2) * 76 + 'px')
          } else if ($(".show-small-img[alt='now']").index() == $('#small-img-roll').children().length - 1) {
            $('#small-img-roll').css('left', -($('#small-img-roll').children().length - 4) * 76 + 'px')
          } else {
            $('#small-img-roll').css('left', '0')
          }
        }
      })
    } else { // mobile
      item =  '<div class="baby-title-m">' + data.title + '<span>浏览量：' + data.scannum + '</span></div>' +
              '<p>估&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：<span>' + data.entrustprice + '</span></p>' +
              '<p>款&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;式：<span>' + data.style + '</span></p>' +
              '<p>数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：<span>' + data.quantity + '</span></p>' +
              '<p>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：<span>' + data.classname + '</span></p>' +
              '<p>规&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格：<span>' + data.standard + '</span></p>' +
              '<p>咨询热线：<b>400 616 2520</b></p>'
      $('#desc-m').html(item)
      $('#baby-detail-content').html(data.content + previewimg)
      $('#banList_m').html(rollPic).find('> div:first-of-type').attr('class', 'carousel-item active')
      $('#indicators_m').html(indicators).find('> li:first-of-type').attr('class', 'active')
      // banner
      $('.carousel').carousel({
        interval: 3000,
        pause: 'hover'
      })
      // 手指滑动切换图片
      var isTouch=('ontouchstart' in window)
      if(isTouch){
        $(".carousel").on('touchstart', function(e){
          var that=$(this)
          var touch = e.originalEvent.changedTouches[0]
          var startX = touch.pageX
          var startY = touch.pageY
          $(document).on('touchmove',function(e){
            touch = e.originalEvent.touches[0] ||e.originalEvent.changedTouches[0]
            var endX=touch.pageX - startX
            var endY=touch.pageY - startY
            if(Math.abs(endY)<Math.abs(endX)){
              if(endX > 10){
                $(this).off('touchmove')
                that.carousel('prev')
              }else if (endX < -10){
                $(this).off('touchmove')
                that.carousel('next')
              }
              return false
            }
          })
        })
        $(document).on('touchend',function(){
          $(this).off('touchmove')
        })
      }
    }
  }
}
xmlhttp.send()
