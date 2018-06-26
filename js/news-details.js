
var newsid = location.search.slice(1)
var xmlhttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
xmlhttp.open("GET", apihost + "/yj/NewsClient/unitDetail?newsId=" + newsid, true)
xmlhttp.onreadystatechange = function () {
  if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    var data = JSON.parse(xmlhttp.response).data
    var item = "";
    var title = ''
    // pc
    if (document.documentElement.clientWidth > 1050) {
      $('#now-site').text(data.classname + ' > ')
      $('#now-site2').text(data.title)
      item += '<div class="details-title">' + data.title + '</div>' +
              '<p>' + data.content + '</p>' +
              '<img src="' + imghost + data.titleimg + '">'
      $('#details-content').html(item)
    } else { // mobile
      title += '<p>' + data.title + '</p>' +
                '<span>发布时间：<span>' + timetrans(data.createdAt).split(' ')[0] + '</span><span class="seed">' + data.scannum + '次浏览</span></span>'
      item += '<p>' + data.content + '</p>' +
              '<img src="' + imghost + data.titleimg + '">'
      $('#news-title').html(title)
      $('#news-detail').html(item)
    }
  }
}
xmlhttp.send()

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
// mobile  上一篇下一篇
if (document.documentElement.clientWidth < 1050) {
  var newsxmlhttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
  newsxmlhttp.open("GET", apihost + "/yj/NewsClient/udPiece?newsId=" + newsid, true)
  newsxmlhttp.onreadystatechange = function () {
    if (newsxmlhttp.readyState === 4 && newsxmlhttp.status === 200) {
      var data = JSON.parse(newsxmlhttp.response).data
      // 上一篇
      if (data.lastPiece) {
        $('#prev').attr('href', 'news-details.html?' + data.lastPiece.id).find('>span').text(data.lastPiece.title)
      } else {
        $('#prev').attr('href', 'javascript: void(0)').find('>span').text('没有了')
      }
      // 下一篇
      if (data.nextPiece) {
        $('#next').attr('href', 'news-details.html?' + data.nextPiece.id).find('>span').text(data.nextPiece.title)
      } else {
        $('#next').attr('href', 'javascript: void(0)').find('>span').text('没有了')
      }
    }
  }
  newsxmlhttp.send()
}