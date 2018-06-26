$('#nav-btn').click(function () {
  if ($(this).find('>img').attr('alt') == 'c') {
    $(this).find('>img').attr('alt', 'o')
    $('#frt').css('z-index', '90')
    $('#nav-items').css({'background': 'rgba(0, 0, 0, .2)', 'z-index': '99'})
    $('body').css('overflow', 'hidden')
    if (location.pathname == dir + '/index.html' || location.pathname == dir + '/') {
      $(this).find('>img').css('transform', 'rotate(180deg)').attr('src', 'images/home/home_icon_close@2x.png')
    } else {
      $(this).find('>img').css('transform', 'rotate(180deg)').attr('src', '../images/home/home_icon_close@2x.png')
    }
    $('#nav-items3').animate({'width': '15.63rem'}, 300)
  } else {
    $(this).find('>img').attr('alt', 'c')
    $('body').css('overflow', 'auto')
    if (location.pathname == dir + '/index.html' || location.pathname == dir + '/') {
      $(this).find('>img').css('transform', 'rotate(0deg)').attr('src', 'images/home/nav_icon_menu@2x.png')
    } else {
      $(this).find('>img').css('transform', 'rotate(0deg)').attr('src', '../images/home/nav_icon_menu@2x.png')
    }
    $('#nav-items3').animate({'width': '0'}, 300)
    $('#nav-items').animate({'background': '#fff', 'z-index': '-1'}, 300)
    $('#frt').animate({'z-index': '100'}, 300)
  }
})
$('#nav-items').click(function () {
  $('#nav-btn').find('>img').attr('alt', 'c')
  $('body').css('overflow', 'auto')
  if (location.pathname == dir + '/index.html' || location.pathname == dir + '/') {
    $('#nav-btn').find('>img').css('transform', 'rotate(0deg)').attr('src', 'images/home/nav_icon_menu@2x.png')
  } else {
    $('#nav-btn').find('>img').css('transform', 'rotate(0deg)').attr('src', '../images/home/nav_icon_menu@2x.png')
  }
  $('#nav-items3').animate({'width': '0'}, 300)
  $('#nav-items').animate({'background': '#fff', 'z-index': '-1'}, 300)
  $('#frt').animate({'z-index': '100'}, 300)
})
// 
$('#nav-items').css({'z-index': '-1'})

// 获取在线展厅分类
var catexmlhttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
catexmlhttp.open("GET", apihost + "/yj/CollectionClient/selectClass", true)
catexmlhttp.onreadystatechange = function () {
  if (catexmlhttp.readyState === 4 && catexmlhttp.status === 200) {
    var data = JSON.parse(catexmlhttp.response).data
    var item = "";
    var mobileItem = ''
    var Container = ""
    var Container_m = ""
    for (var i = 0; i < data.length; i++) {
      if (location.pathname == dir + '/index.html' || location.pathname == dir + '/') {
        item += "<li alt='" + data[i].id + "'>" +
                  "<a href='pages/online.html?" + data[i].id + "," + (i+1) + "'>" + data[i].name + "</a>" +
                "</li>"
        if (i < 5) {
          mobileItem += '<li><a href="pages/online.html?' + data[i].id + "," + (i+1) + '"><img src="images/home/home_icon_china@2x.png" alt=""><span>' + data[i].name + '</span></a></li>'
        }
      } else {
        item += "<li alt='" + data[i].id + "'>" +
                  "<a href='online.html?" + data[i].id + "," + (i+1) + "'>" + data[i].name + "</a>" +
                "</li>"
      }
      Container += '<li style="display: none;">' +
                      '<ul class="products_img" id="products_img' + (i+1) + '">' +
                      '</ul>' +
                    '</li>'
      Container_m += '<li style="display: none;">' +
                        '<ul class="products_img_m" id="products_img_m' + (i+1) + '">' +
                        '</ul>' +
                      '</li>'
    }
    if (location.pathname == dir + '/index.html' || location.pathname == dir + '/') {
      if (document.documentElement.clientWidth > 1050) { // pc
        $('#pro_dir').html(item)
        $('#pro_content').html(Container)
        $('#pro_dir li').css('width', 100 / data.length + '%')
        // 首页在线展厅tab切换
        getData($('#pro_dir li:first-of-type').attr('alt'), 1)
        $("#pro_content > li:first").show().siblings().hide()
        $("#pro_dir >li:first").find('> a').css({'background':'#951B25', 'color': '#fff'}).end().siblings().find('> a').css({'background':'none', 'color': '#666'})
        $('#pro_dir > li').hover(function() {
          $(this).find('> a').css({'background':'#951B25', 'color': '#fff'}).end().siblings().find('> a').css({'background':'none', 'color': '#666'})
          $('#pro_content > li').eq($(this).index()).stop().show().siblings().hide()
          if ($(this).find('> a').css('color') != 'rgb(255, 255, 255)') {
            getData($(this).attr('alt'), $(this).index()+1)  // 获取首页各分类的数据
          }
        }, function(){})
      } else { // mobile
        $('#hall').html(mobileItem)
      }
      $('#online-nav').html(item)
      $('.nav-item:nth-of-type(2)').find('>a').attr('href', $('#online-nav').find('>li:first').find('>a').attr('href'))
      $('#nav-items3').find('>li:nth-of-type(2)').find('>a').attr('href', $('#online-nav').find('>li:first').find('>a').attr('href'))
    } else if (location.pathname == dir + '/pages/online.html') {
      // 分类过多显示横向滚动条 - pc
      if (data.length > 12) {
        $('#pro_dir').html(item).css('width', 10 * (data.length - 12) + 100 + '%')
      } else {
        $('#pro_dir').html(item).css('width', '100%')
      }
      $('#pro_content').html(Container)
      // 分类过多显示横向滚动条 - mobile
      if (data.length > 7) {
        $('#pro_dir_m').html(item).css('width', 10 * (data.length / 1.5) + 100 + '%')
      } else {
        $('#pro_dir_m').html(item).css('width', '100%')
      }
      $('#pro_content_m').html(Container_m)
      // 出现横向滚动条  点击隐藏的分类时 让其父容器滚动到可以看到的位置
      if (index > 6) {
        $('.products_nav_container').scrollLeft(index / 2 * 100)
        $('.pro_dir_container').scrollLeft(index / 3 * 100)
      } else {
        $('.products_nav_container').scrollLeft(0)
        $('.pro_dir_container').scrollLeft(0)
      }
      $('#pro_dir li').css('width', 100 / data.length + '%')
      $('#online-nav').html(item)
      $('.nav-item:nth-of-type(2)').find('>a').attr('href', $('#online-nav').find('>li').find('>a').attr('href'))
      $('#nav-items3').find('>li:nth-of-type(2)').find('>a').attr('href', $('#online-nav').find('>li:first').find('>a').attr('href'))
      getData(classId, index, '')
      $('#online-nav li:nth-of-type(' + index + ')').find('a').attr('class', 'active-nav')
      // 在线展厅tab切换---pc
      $("#pro_content > li:nth-of-type(" + index + ")").show().siblings().hide()
      $("#pro_dir > li:nth-of-type(" + index + ")").find('> a').css({'background':'#951B25', 'color': '#fff'}).end().siblings().find('> a').css({'background':'none', 'color': '#666'})
      $("#pro_dir > li:nth-of-type(" + index + ")").find('> a').attr('alt', '1').end().siblings().find('> a').removeAttr('alt')
      $('#now-site').text($("#pro_dir > li:nth-of-type(" + index + ")").find('> a').text())
      $('#pro_dir > li').click(function () {
        $('#now-site').text($(this).text())
        $(this).find('> a').attr('alt', '1').end().siblings().find('> a').removeAttr('alt')
        $(this).find('> a').css({'background':'#951B25', 'color': '#fff'}).end().siblings().find('> a').css({'background':'none', 'color': '#666'})
        $('#pro_content > li').eq($(this).index()).stop().show().siblings().hide()
      })
      // 在线展厅tab切换---mobile
      $("#pro_content_m > li:nth-of-type(" + index + ")").show().siblings().hide()
      $("#pro_dir_m > li:nth-of-type(" + index + ")").find('> a').css({'border-bottom':'#951B25 1px solid', 'color': '#951B25'}).end().siblings().find('> a').css({'border-bottom':'none', 'color': '#333'})
      $("#pro_dir_m > li:nth-of-type(" + index + ")").find('> a').end().siblings().find('> a')
      $('#pro_dir_m > li').click(function () {
        $('#now-site').text($(this).text())
        $(this).find('> a').css({'border-bottom':'#951B25 1px solid', 'color': '#951B25'}).end().siblings().find('> a').css({'border-bottom':'none', 'color': '#333'})
        $('#pro_content_m > li').eq($(this).index()).stop().show().siblings().hide()
      })
    } else {
      $('#online-nav').html(item)
      $('.nav-item:nth-of-type(2)').find('>a').attr('href', $('#online-nav').find('>li:first').find('>a').attr('href'))
      $('#nav-items3').find('>li:nth-of-type(2)').find('>a').attr('href', $('#online-nav').find('>li:first').find('>a').attr('href'))
    }
  }
}
catexmlhttp.send()

// 获取企业资讯分类
var newsxmlhttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
newsxmlhttp.open("GET", apihost + "/yj/NewsClient/selectClass", true)
newsxmlhttp.onreadystatechange = function () {
  if (newsxmlhttp.readyState === 4 && newsxmlhttp.status === 200) {
    var data = JSON.parse(newsxmlhttp.response).data
    var item = "";
    var Container = ""
    var Container_m = ""
    var homeNewsTitle1 = homeNewsTitle2 = ''
    for (var i = 0; i < data.length; i++) {
      if (location.pathname == dir + '/index.html' || location.pathname == dir + '/') {
        item += "<li alt='" + data[i].id + "'>" +
                  '<a href="pages/news.html?' + data[i].id + "," + (i+1) + '">' + data[i].name + '</a>' +
                '</li>'
      } else {
        item += "<li alt='" + data[i].id + "'>" +
                  '<a href="news.html?' + data[i].id + "," + (i+1) + '">' + data[i].name + '</a>' +
                '</li>'
      }
      Container += '<li id="products_img' + (i+1) + '"></li>'
      Container_m += '<li id="products_img_m' + (i+1) + '"></li>'
    }
    homeNewsTitle1 = data[0].name + "<a href='pages/news.html?" + data[0].id + ",1'>查看更多</a>"
    homeNewsTitle2 = data[1].name + "<a href='pages/news.html?" + data[1].id + ",1'>查看更多</a>"
    if ((location.pathname == dir + '/index.html' || location.pathname == dir + '/') && document.documentElement.clientWidth > 1050) {
      // 首页资讯
      getNews(data[0].id)
      getNews(data[1].id)
      $('#news-nav').html(item)
      $('#left-title').html(homeNewsTitle1)
      $('#right-title').html(homeNewsTitle2)
      $('.nav-item:nth-of-type(4)').find('>a').attr('href', $('#news-nav').find('>li').find('>a').attr('href'))
    } else if (location.pathname == dir + '/pages/news.html') {
      $('#pro_dir').html(item)
      $('#pro_content').html(Container)
      $('#pro_dir_m').html(item)
      $('#pro_content_m').html(Container_m)
      $('#pro_dir li').css('width', 100 / data.length + '%')
      $('#news-nav').html(item)
      $('.nav-item:nth-of-type(4)').find('>a').attr('href', $('#news-nav').find('>li').find('>a').attr('href'))
      $('#nav-items3').find('>li:nth-of-type(4)').find('>a').attr('href', $('#news-nav').find('>li').find('>a').attr('href'))
      getData(classId, index, '')
      $('#news-nav li:nth-of-type(' + index + ')').find('a').attr('class', 'active-nav')
      // 最新资讯tab切换 --- pc
      $("#pro_dir > li:nth-of-type(" + index + ")").find('> a').css({'background':'#951B25', 'color': '#fff'}).end().siblings().find('> a').css({'background':'none', 'color': '#666'})
      $("#pro_dir > li:nth-of-type(" + index + ")").find('> a').attr('alt', '1').end().siblings().find('> a').removeAttr('alt')
      $('#now-site').text($("#pro_dir > li:nth-of-type(" + index + ")").find('> a').text())
      $('#pro_dir > li').click(function () {
        $('#now-site').text($(this).text())
        $(this).find('> a').attr('alt', '1').end().siblings().find('> a').removeAttr('alt')
        $(this).find('> a').css({'background':'#951B25', 'color': '#fff'}).end().siblings().find('> a').css({'background':'none', 'color': '#666'})
        $('#pro_content > li').eq($(this).index()).stop().show().siblings().hide()
      })
      // 最新资讯tab切换---mobile
      $("#pro_content_m > li:nth-of-type(" + index + ")").show().siblings().hide()
      $("#pro_dir_m > li:nth-of-type(" + index + ")").find('> a').css({'border-bottom':'#951B25 1px solid', 'color': '#951B25'}).end().siblings().find('> a').css({'border-bottom':'none', 'color': '#333'})
      $("#pro_dir_m > li:nth-of-type(" + index + ")").find('> a').end().siblings().find('> a')
      $('#pro_dir_m > li').click(function () {
        $('#now-site').text($(this).text())
        $(this).find('> a').css({'border-bottom':'#951B25 1px solid', 'color': '#951B25'}).end().siblings().find('> a').css({'border-bottom':'none', 'color': '#333'})
        $('#pro_content_m > li').eq($(this).index()).stop().show().siblings().hide()
      })
      news(data[0].id)  // 每个页面共同部分的资讯
    } else if (document.documentElement.clientWidth > 1050) {
      $('#news-nav').html(item)
      news(data[0].id)  // 每个页面共同部分的资讯
      $('.nav-item:nth-of-type(4)').find('>a').attr('href', $('#news-nav').find('>li').find('>a').attr('href'))
    } else {
      $('#news-nav').html(item)
      $('#nav-items3').find('>li:nth-of-type(4)').find('>a').attr('href', $('#news-nav').find('>li').find('>a').attr('href'))
    }
  }
}
newsxmlhttp.send()


// 留言
$('#leaveMsg').click(function () {
  if ($('#msgContent').serializeArray()[0].value == '' || $('#msgContent').serializeArray()[1].value == '' || $('#msgContent').serializeArray()[2].value == '') {
    alert('请正确填写您的姓名、邮箱、地址！')
  } else if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test($('#msgContent').serializeArray()[1].value)) {
    alert('请正确填写您的邮箱！\n例如：zhangsan-001@gmail.com')
  } else {
    console.log($('#msgContent').serializeArray())
  }
})

// 留言下面的资讯
function news(cid) {
  var msgxmlhttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
  msgxmlhttp.open("GET", apihost + "/yj/NewsClient/recommendUnit?classid=" + cid, true)
  msgxmlhttp.onreadystatechange = function () {
    if (msgxmlhttp.readyState === 4 && msgxmlhttp.status === 200) {
      var data = JSON.parse(msgxmlhttp.response).data
      var item = "";
      for (var i = 0; i < (data.length > 10 ? 10 : data.length); i++) {
        item += "<li><a href='news-details.html?" + data[i].id + "' class='news-item'>" + data[i].title + "</a></li>"
      }
      $('.news-list').html(item)
    }
  }
  msgxmlhttp.send()
}
