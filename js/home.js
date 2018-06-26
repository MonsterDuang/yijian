
// PC
if (document.documentElement.clientWidth > 1050) {
  
  // 在线展厅数据
  
  function getData(cid, index){
    var xmlhttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
    xmlhttp.open("GET", apihost + "/yj/CollectionClient/recommendUnit?classid=" + cid, true)
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        var data = JSON.parse(xmlhttp.response).data
        if (data.length <= 0) {
          $('#products_img' + index ).html("<b style='margin-top: 200px;display: inline-block; width: 100%; text-align: center'>暂无数据</b>")
          return
        }
        var item = "";
        for (var i = 0; i < (data.length > 8 ? 8 : data.length); i++) {
          item += '<li>' +
                    '<a href="pages/baby-details.html?' + data[i].id + '">' +
                      '<span>' +
                        '<img class="pro-img" src="' + imghost + data[i].recommendimg + '" title="' + data[i].title + '" class="pro-img">' +
                      '</span>' +
                      '<p align="center" title="' + data[i].title + '" class="ptit">' + data[i].title + '</p>' +
                    '</a>' +
                  '</li>'
        }
        $('#products_img' + index).html(item)
      }
    }
    xmlhttp.send()
  }
  
  
  // 获取专家数据
  var xmlhttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
  xmlhttp.open("GET", apihost + "/yj/ExpertClient/recommendUnit", true)
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      var data = JSON.parse(xmlhttp.response).data
      var item = "";
      for (var i = 0; i < (data.length > 4 ? 4 : data.length); i++) {
        item += '<li>' +
                  '<a href="pages/expert-details.html?' + data[i].id + '">' +
                    '<img src="' + imghost + data[i].recommendimg + '" width="260" height="300" alt="">' +
                  '</a>' +
                  '<p class="expert-msg">' +
                    '<span>' + data[i].name + '</span>' +
                    '<span>' + data[i].honoraryname + '</span>' +
                  '</p>' +
                '</li>' 
      }
      $('#expert_img').html(item)
        // 专家团队描述
      $('#expert_img li').hover(function () {
        $(this).find($('.expert-msg')).animate({'height': '60px'}, 500)
      }, function () {
        $('.expert-msg').eq($(this).index()).animate({'height': '0px'}, 300)
      })
    }
  }
  xmlhttp.send()

  // 新闻动态数据
  function getNews(cid) {
    var xmlhttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
    xmlhttp.open("GET", apihost + "/yj/NewsClient/recommendUnit?classid=" + cid, true)
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        var data = JSON.parse(xmlhttp.response).data
        var item = "";
        if (cid == $('#left-title').find('> a').attr('href').split('?')[1].split(',')[0]) { // 企业动态
          for (var i = 0; i < (data.length > 3 ? 3 : data.length); i++) {
            item += '<div class="left-list">' +
                        '<a href="pages/news-details.html?' + data[i].id + '">' +
                          '<span><img src="' + imghost + data[i].titleimg + '" alt="" class="list-img"></span>' +
                          '<div class="news-desc">' +
                            '<p class="news-desc-title">' + data[i].title + '</p>' +
                            '<p class="news-desc-part">' + data[i].summary + '</p>' +
                          '</div>' +
                        '</a>' +
                      '</div>'
          }
          $('#left-news-list').html(item)
        } else {
          for (var i = 0; i < data.length; i++) {
            item += "<li>" +
                      "<a href='pages/news-details.html?" + data[i].id + "' class='news-item'>" + data[i].title + "</a>" +
                      "<span>" + timetrans(data[i].createdAt).split(' ')[0] + "</span>" +
                    "</li>"
          }
          $('#news-list').html(item)
        }
      }
    }
    xmlhttp.send()
  }


  // 获取友链数据
  var linkxmlhttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
  linkxmlhttp.open("GET", apihost + "/yj/LinkClient/recommendUnit", true)
  linkxmlhttp.onreadystatechange = function () {
    if (linkxmlhttp.readyState === 4 && linkxmlhttp.status === 200) {
      var data = JSON.parse(linkxmlhttp.response).data
      var links = "";
      for (var i = 0; i < data.length; i++) {
        links += '<li>' +
                    '<a href="' + data[i].linksurl + '" target="_blank">' +
                      '<img src="' + data[i].logoimg + '" alt="">' +
                    '</a>' +
                    '<span>' + data[i].linkstitle + '</span>' +
                  '</li>'
      }
      $('#links-items').html(links)
      if (data.length > 4) {
        var speed = 10
        var tab = document.getElementById("links-content")
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
  linkxmlhttp.send()


  // 商务通链接
  // $('#LR_miniframe').attr('src', 'https://lzt.zoosnet.net/LR/Chatpre.aspx?id=LZT22963874&cid=1526458709789611164451&lng=cn&sid=1526607240077263753048&p=http%3A//www.mjhzl.cn/&rf1=http%3A//www.mjhzl.cn/index&rf2=.php%3Fm%3DPage%26a%3Dindex%26id%3D20&msg=&d=1526624257110')

} else {
  // 移动端资讯
  var xmlhttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
  xmlhttp.open("GET", apihost + "/yj/NewsClient/recommendUnit?classid=1", true)
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      var data = JSON.parse(xmlhttp.response).data
      var item = "";
      for (var i = 0; i < data.length; i++) {
        item += "<li>" +
                  "<a href='pages/news-details.html?" + data[i].id + "' class='news-item'>" + data[i].title + "</a>" +
                  "<span>" + timetrans(data[i].createdAt).split(' ')[0] + "</span>" +
                "</li>"
      }
      $('#company-news').html(item)
    }
  }
  xmlhttp.send()
}



// 时间戳转化
function timetrans(date){
  var date = new Date(date);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return Y + M + D + h + m + s;
}