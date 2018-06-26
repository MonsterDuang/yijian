// 在线展厅
var classId = location.search.slice(1).split(',')[0], index = location.search.slice(1).split(',')[1]

// PC
if (document.documentElement.clientWidth > 1050) {
  var pagenav
  function getData(cid, index, words){
    var CID = cid
    var isFirstCall = false
    var pageChangedHandler = function(page, size, isFirstCall, cid) {
      cid = cid || CID
      if (!pagenav && !isFirstCall) {
        return
      }
      var xmlhttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
      xmlhttp.open("GET", apihost + "/yj/NewsClient/selectUnit?classid=" + cid + "&pageIndex=" + page + "&words=" + words, true)
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          var data = JSON.parse(xmlhttp.response).data.newsArr
          if (data.length <= 0) {
            $('#products_img' + index ).html("<b style='margin-top: 100px; display: inline-block; width: 100%; text-align: center'>暂无数据</b>")
            return
          }
          var pages = JSON.parse(xmlhttp.response).data.totalPage
          if (isFirstCall) {
            // 分页
            pagenav = xPagination(pageList, {
              max: 6,
              curr: 1,
              size: 9,
              pages: pages,
              jump: true,
              prev: '上一页',
              next: '下一页',
              onpagination: pageChangedHandler
            })
          }
          var item = "";
          for (var i = 0; i < data.length; i++) {
            item += "<div class='news-list2'>" +
                        "<a href='news-details.html?" + data[i].id + "'>" +
                        "<img src='" + apihost + data[i].titleimg + "' class='list-img'>" +
                        "<div class='news-desc'>" +
                          "<p class='news-desc-title'>" + data[i].title + "</p>" +
                          "<p class='news-desc-part'>" + data[i].summary + "</p>" +
                          "<p class='date'>" + timetrans(data[i].createdAt).split(' ')[0] + "</p>" +
                        "</div>" +
                      "</a>" +
                    "</div>"
          }
          $('#products_img' + cid).html(item)
        }
      }
      xmlhttp.send()
    }
    pageChangedHandler(1, 9, true, cid)
  }
} else {
  var page = 1
  function getData(cid, index, words){
    var xmlhttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
    xmlhttp.open("GET", apihost + "/yj/NewsClient/selectUnit?classid=" + cid + "&pageIndex=" + page + "&words=" + words, true)
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        var data = JSON.parse(xmlhttp.response).data.newsArr
        if (data.length <= 0) {
          $('#products_img_m' + cid ).html("<b style='margin: 50px 0;display: inline-block; width: 100%; text-align: center'>暂无数据</b>")
          return
        }
        var item = "";
        for (var i = 0; i < data.length; i++) {
          item += "<div class='news-list2-m'>" +
                "<a href='news-details.html?" + data[i].id + "'>" +
                "<img src='" + apihost + data[i].titleimg + "' class='list-img-m'>" +
                "<div class='news-desc-m'>" +
                  "<p class='news-desc-title-m'>" + data[i].title + "</p>" +
                  "<p class='date-m'>" + timetrans(data[i].createdAt).split(' ')[0] + "</p>" +
                "</div>" +
              "</a>" +
            "</div>"
        }
        $('#products_img_m' + index).html(item)
      }
    }
    xmlhttp.send()
  }
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