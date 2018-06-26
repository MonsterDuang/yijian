// 获取专家详情数据
var expertid = location.search.slice(1)
var xmlhttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
xmlhttp.open("GET", apihost + "/yj/ExpertClient/unitDetail?expertId=" + expertid, true)
xmlhttp.onreadystatechange = function () {
  if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    var data = JSON.parse(xmlhttp.response).data
    var item = "";
    // pc
    if (document.documentElement.clientWidth > 1050) {
      $('#now-site').text(data.name)
      item += '<div class="details-title">' + data.name + '</div>' +
              '<p>' + data.content + '</p>' +
              '<img src="' + imghost + data.recommendimg + '" alt="">'
      $('#details-content').html(item)
    } else { // mobile
      item += '<div class="title">' +
                '<p>' + data.name + '</p>' +
                '<p>' + data.honoraryname + '</p>' +
              '</div>' +
              '<p>' + data.content + '</p>' +
              '<img src="' + imghost + data.recommendimg + '" alt="">'
      $('#exert-detail').html(item)
    }
  }
}
xmlhttp.send()