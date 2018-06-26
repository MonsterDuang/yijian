// PC
var nowIndex = location.search.split('')[1] || 1
if (document.documentElement.clientWidth > 1050) {
  // 关于我们
  switch(nowIndex) {
    case '1':
      $('#now-site').text('公司简介')
      break
    case '2':
      $('#now-site').text('业务指南')
      break
    case '3':
      $('#now-site').text('联系我们')
      break
    case '4':
      $('#now-site').text('加入我们')
      break
    default:
      break
  }
  $('#about-nav li:nth-of-type(' + nowIndex + ')').find('a').attr('class', 'active-nav')
  $("#about-content > .about-container:nth-of-type(" + nowIndex + ")").show().siblings().hide()
  $("#about-items > li:nth-of-type(" + nowIndex + ")").find('> a').css({ 'color': '#951B25'}).end().siblings().find('> a').css({ 'color': '#333'})
  $("#about-items > li:nth-of-type(" + nowIndex + ")").find('img').attr('src', '../images/about/about_go_select@2x.png').end().siblings().find('img').attr({ 'src': '../images/about/about_go_normal@2x.png'})
  $("#about-items > li:nth-of-type(" + nowIndex + ")").css({ 'border-bottom': '#951B25 2px solid'}).siblings().css({ 'border-bottom': '#ccc 1px solid'})
  if (nowIndex == 4) {
    $('#rotate_img').css('transform', 'rotate(90deg)')
    $('#join-us').animate({'height': '100%'}, 300)
    $('#join-us p:first-of-type').find('a').css({ 'color': '#951B25'}).end().siblings().find('a').css({ 'color': '#333'})
    $("#join-items li:nth-of-type(1)").show().siblings().hide()
    $('#now-site2').text(' > ' + $('#join-us p:first-of-type').find('a').text())
  } else {
    $('#rotate_img').css('transform', 'rotate(0deg)')
    $('#join-us').animate({'height': '0px'}, 300)
  }

  $('#about-items > li').click(function() {
    $('#now-site').text($(this).text())
    $('#now-site2').text('')
    $(this).find('> a').css({ 'color': '#951B25'}).end().siblings().find('> a').css({ 'color': '#333'})
    $(this).find('img').attr('src', '../images/about/about_go_select@2x.png').end().siblings().find('img').attr({ 'src': '../images/about/about_go_normal@2x.png'})
    $(this).css({ 'border-bottom': '#951B25 2px solid'}).siblings().css({ 'border-bottom': '#ccc 1px solid'})
    $('#about-content > .about-container').eq($(this).index()).stop().show().siblings().hide()
    // 切换到联系我们时 显示地图
    if ($(this).index() === 2) {
      // BMap
      var map = new BMap.Map("b-map")
      var point = new BMap.Point(113.8924170649, 22.5530549461);
      map.centerAndZoom(point, 17)
      map.setCurrentCity('深圳市')
      var marker = new BMap.Marker(point)
      map.addOverlay(marker)
      map.panTo(point)
      map.addControl(new BMap.NavigationControl())
      map.enableScrollWheelZoom(true)
      var licontent = "<p style='color: #951B25; margin-bottom: 10px !important; font-size: 14px'>深圳易鉴收藏咨询有限公司</p>"
      licontent += "<p style='color: #666; margin-bottom: 5px !important; font-size: 12px'><span style='color: #333'>地址：</span>卓越宝中时代广场A座1701</p>"
      licontent += "<p style='color: #666; font-size: 12px'><span style='color: #333'>电话：</span>400-678-8632</p>"
      var infoWindow = new BMap.InfoWindow(licontent, {width: 150, height: 66})
      marker.openInfoWindow(infoWindow)
      marker.addEventListener('click',function(){
        marker.openInfoWindow(infoWindow)
      })
    }
    // 切换到加入我们时 显示职位列表 通过点击职位列表查看不同的职位描述
    if ($(this).index() === 3) {
      $('#rotate_img').css('transform', 'rotate(90deg)')
      $('#join-us').animate({'height': '100%'}, 300)
      $('#join-us p:first-of-type').find('a').css({ 'color': '#951B25'}).end().siblings().find('a').css({ 'color': '#333'})
      $('#now-site2').text( ' > ' + $('#join-us p:first-of-type').find('a').text())
      $("#join-items li:nth-of-type(1)").show().siblings().hide()
    } else {
      $('#rotate_img').css('transform', 'rotate(0deg)')
      $('#join-us').animate({'height': '0px'}, 300)
    }
  })

  // nav 栏直接进入联系我们时 显示地图
  var map = new BMap.Map("b-map")
  var point = new BMap.Point(113.8924170649, 22.5530549461);
  map.centerAndZoom(point, 17)
  map.setCurrentCity('深圳市')
  var marker = new BMap.Marker(point)
  map.addOverlay(marker)
  map.panTo(point)
  map.addControl(new BMap.NavigationControl())
  map.enableScrollWheelZoom(true)
  var licontent = "<p style='color: #951B25; margin-bottom: 10px !important; font-size: 14px'>深圳易鉴收藏咨询有限公司</p>"
  licontent += "<p style='color: #666; margin-bottom: 5px !important; font-size: 12px'><span style='color: #333'>地址：</span>卓越宝中时代广场A座1701</p>"
  licontent += "<p style='color: #666; font-size: 12px'><span style='color: #333'>电话：</span>400-678-8632</p>"
  var infoWindow = new BMap.InfoWindow(licontent, {width: 150, height: 66})
  marker.openInfoWindow(infoWindow)
  marker.addEventListener('click',function(){
    marker.openInfoWindow(infoWindow)
  })
} else {
  $("#pro_content_m > li:nth-of-type(" + nowIndex + ")").show().siblings().hide()
  $("#pro_dir_m >li:nth-of-type(" + nowIndex + ")").find('> a').css({'border-bottom':'#951B25 1px solid', 'color': '#951B25'}).end().siblings().find('> a').css({'border-bottom':'none', 'color': '#333'})
  $("#pro_dir_m >li:nth-of-type(" + nowIndex + ")").find('> a').end().siblings().find('> a')
  $('#pro_dir_m > li').click(function() {
    $('#now-site').text($(this).text())
    $(this).find('> a').css({'border-bottom':'#951B25 1px solid', 'color': '#951B25'}).end().siblings().find('> a').css({'border-bottom':'none', 'color': '#333'})
    $('#pro_content_m > li').eq($(this).index()).stop().show().siblings().hide()
  })
  // BMap
  var map = new BMap.Map("b-map-m")
  var point = new BMap.Point(113.8924170649, 22.5530549461);
  map.centerAndZoom(point, 17)
  map.setCurrentCity('深圳市')
  var marker = new BMap.Marker(point)
  map.addOverlay(marker)
  map.panTo(point)
  map.addControl(new BMap.NavigationControl())
  map.enableScrollWheelZoom(true)
  var licontent = "<p style='color: #951B25; margin-bottom: 0.175rem !important; font-size: 0.5rem'>深圳易鉴收藏咨询有限公司</p>"
  licontent += "<p style='color: #666; font-size: 0.4rem'><span style='color: #333'>地址：</span>卓越宝中时代广场A座1701</p>"
  licontent += "<p style='color: #666; font-size: 0.4rem'><span style='color: #333'>电话：</span>400-678-8632</p>"
  var infoWindow = new BMap.InfoWindow(licontent, {height: 60})
  marker.openInfoWindow(infoWindow)
  marker.addEventListener('click',function(){
    marker.openInfoWindow(infoWindow)
  })
}


// 招聘职位数据
var xmlhttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
xmlhttp.open("GET", apihost + "/yj/JobClient/recommendUnit", true)
xmlhttp.onreadystatechange = function () {
  if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    var data = JSON.parse(xmlhttp.response).data
    var jobname = "";
    var jobdatail = ''
    // pc
    if (document.documentElement.clientWidth > 1050) {
      for (var i = 0; i < data.length; i++) {
        jobname += '<p><a href="javascript:;" class="join-a">' + data[i].jobname + '</a></p>'
        jobdatail += '<li style="display: none">' +
                        '<p>' + data[i].jobname + '</p>' +
                        '<span>岗位职责：</span>' +
                        '<span>' + data[i].jobblame + '</span>' +
                        '<br />' +
                        '<span>任职要求：</span>' +
                        '<span>' + data[i].jobclaim + '</span>' +
                        '<br />' +
                        '<span>将简历发送到邮箱：<b>zhaopin@yjsczx.cn</b>，邮件主题格式： 应聘职位+姓名+手机号 ，筛选通过的简历我们会在3个工作日内电话联系。</span>' +
                        '<span>面试流程：投递→简历评估→面试→发放录用意向书</span>' +
                        '<span>期待你的加入！</span>' +
                        '<button>立即申请</button>' +
                      '</li>'
      }
      $('#join-us').html(jobname).find('.join-a:first').css({ 'color': '#951B25'})
      $('#join-items').html(jobdatail).find('> li:first').css('display', '')
       // 切换职位 --- pc
      $('#join-us p').click(function (){
        $(this).find('> a').css({ 'color': '#951B25'}).end().siblings().find('> a').css({ 'color': '#333'})
        $('#now-site2').text( ' > ' + $(this).find('> a').text())
        $("#join-items li").eq($(this).index()).stop().show().siblings().hide()
      })
    } else { // mobile
      for (var i = 0; i < data.length; i++) {
        jobdatail += '<li class="job-name">' + data[i].jobname + '<img src="../images/home/online_icon_right@2x.png" alt="c"></li>' +
                      '<li class="job-detail">' +
                        '<p>岗位职责：</p>' +
                        '<span>' + data[i].jobblame + '</span>' +
                        '<p>任职要求：</p>' +
                        '<span>' + data[i].jobclaim + '</span>' +
                        '<p>立即申请：</p>' +
                        '<span>1. 将简历发送到邮箱：<b>zhaopin@yjsczx.cn</b>，邮件主题格式： 应聘职位+姓名+手机号 ，筛选通过的简历我们会在3个工作日内电话联系。</span>' +
                        '<span>2. 面试流程：投递→简历评估→面试→发放录用意向书</span>' +
                        '<span>3. 期待你的加入！</span>' +
                      '</li>'
      }
      $('#job-items').html(jobdatail)
      // 点击显示职位详情 --- mobile
      $('#job-items > li.job-name').click(function() {
        if ($(this).find('> img').attr('alt') == 'c') {
          $(this).find('> img').css('transform', 'rotate(90deg)').attr('alt', 'o')
          $(this).next().animate({'height': '100%', 'padding': '0.94rem'}, 300)
        } else {
          $(this).find('> img').css('transform', 'rotate(0deg)').attr('alt', 'c')
          $(this).next().animate({'height': '0', 'padding': '0rem 0.94rem'}, 300)
        }
      })
      $('#job-items > li.job-detail').click(function(){
        $(this).prev().find('> img').css('transform', 'rotate(0deg)').attr('alt', 'c')
        $(this).animate({'height': '0', 'padding': '0rem 0.94rem'}, 300)
      })
    }
  }
}
xmlhttp.send()