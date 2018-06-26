// 获取banner数据
function getBanner (platform) {
  var bannerxmlhttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
  bannerxmlhttp.open("GET", apihost + "/yj/BannerClient/recommendUnit?platform=" + platform, true)
  bannerxmlhttp.onreadystatechange = function () {
    if (bannerxmlhttp.readyState === 4 && bannerxmlhttp.status === 200) {
      var data = JSON.parse(bannerxmlhttp.response).data
      var rollPic = ''
      var indicators = ''
      for (var i = 0; i < data.length; i++) {
        rollPic += '<div class="carousel-item">' +
                      '<a href="' + data[i].jumpurl + '" target="_blank">' +
                        '<img src="' + data[i].bannerimg + '" class="d-block w-100">' +
                      '</a>' +
                    '</div>'
        indicators += '<li data-target="#carouselExampleIndicators" data-slide-to="' + i + '"></li>'
      }
      // pc
      if (platform == 'pc') {
        $('#banList').html(rollPic).find('> div:first-of-type').attr('class', 'carousel-item active')
        $('#indicators').html(indicators).find('> li:first-of-type').attr('class', 'active')

        // banner
        $('.carousel').carousel({
          interval: 3000,
          pause: 'hover'
        })
      } else { // mobile
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
          $(".carousel").on('touchstart', function(e) {
            var that = $(this)
            var touch = e.originalEvent.changedTouches[0]
            var startX = touch.pageX
            var startY = touch.pageY
            $(document).on('touchmove', function(e) {
              touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]
              var endX = touch.pageX - startX
              var endY = touch.pageY - startY
              if(Math.abs(endY) < Math.abs(endX)){
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
          $(document).on('touchend', function() {
            $(this).off('touchmove')
          })
        }
      }
    }
  }
  bannerxmlhttp.send()
}

if (document.documentElement.clientWidth < 1050 && (location.pathname == dir + '/index.html' || location.pathname == dir + '/')) {
  getBanner('app')
} else if (document.documentElement.clientWidth > 1050) {
  getBanner('pc')
}