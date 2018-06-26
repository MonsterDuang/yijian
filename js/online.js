// 在线展厅
var classId = location.search.slice(1).split(',')[0], index = location.search.slice(1).split(',')[1]
// PC
if (document.documentElement.clientWidth > 1050) {
  // 按回车搜索
  $('#search-pc').keydown(function (e) {
    if (e.keyCode == 13) {
      $('#pageList').html('')
      getData(classId, index, $(this).val())
    }
  })
  // 点击放大镜搜索
  $('#search-btn').click(function (e) {
    $('#pageList').html('')
    getData(classId, index, $('#search-pc').val())
  })
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
      xmlhttp.open("GET", apihost + "/yj/CollectionClient/selectUnit?classid=" + cid + "&pageIndex=" + page + "&words=" + words, true)
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          var data = JSON.parse(xmlhttp.response).data.goodsArr
          if (data.length <= 0) {
            $('#products_img' + index ).html("<b style='margin-top: 100px;display: inline-block; width: 100%; text-align: center'>暂无数据</b>")
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
            item += "<li>" +
                      '<a href="baby-details.html?' + data[i].id + '">' +
                        "<span>" +
                          '<img class="pro-img" src="' + imghost + data[i].recommendimg + '" title="' + data[i].title + '">' +
                        "</span>" +
                        '<p align="center" title="' + data[i].title + '" class="ptit">' + data[i].title + '</p>' +
                      "</a>" +
                    "</li>"
          }
          $('#products_img' + index ).html(item)
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
    xmlhttp.open("GET", apihost + "/yj/CollectionClient/selectUnit?classid=" + cid + "&pageIndex=" + page + "&words=" + words, true)
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        var data = JSON.parse(xmlhttp.response).data.goodsArr
        if (data.length <= 0) {
          $('#products_img_m' + index ).html("<b style='margin: 50px 0;display: inline-block; width: 100%; text-align: center'>暂无数据</b>")
          return
        }
        var item = "";
        for (var i = 0; i < data.length; i++) {
          item += "<li>" +
                      '<a href="baby-details.html?' + data[i].id + '">' +
                        '<img class="pro-img-m" src="' + imghost + data[i].recommendimg + '">' +
                        '<p align="center" class="ptit-m">' + data[i].title + '</p>' +
                      "</a>" +
                    "</li>"
        }
        $('#products_img_m' + index ).html(item)
      }
    }
    xmlhttp.send()
  }
}