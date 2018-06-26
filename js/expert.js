
// 获取专家数据
var xmlhttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
xmlhttp.open("GET", apihost + "/yj/ExpertClient/selectUnit?pageIndex=1", true)
xmlhttp.onreadystatechange = function () {
  if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    var data = JSON.parse(xmlhttp.response).data.expertArr
    var item = "";
    // pc
    if (document.documentElement.clientWidth > 1050) {
      for (var i = 0; i < data.length; i++) {
        item += '<li>' +
                  '<a href="expert-details.html?' + data[i].id + '">' +
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
        console.log('111')
        $(this).find($('.expert-msg')).animate({'height': '60px'}, 500)
      }, function () {
        $('.expert-msg').eq($(this).index()).animate({'height': '0px'}, 300)
      })
    } else { // mobile
      for (var i = 0; i < data.length; i++) {
        item += '<li>' +
                  '<a href="expert-details.html?' + data[i].id + '">' +
                    '<img src="' + imghost + data[i].recommendimg + '" alt="">' +
                    '<p class="expert-msg-m">' +
                      '<span>' + data[i].name + '</span>' +
                      '<span>' + data[i].honoraryname + '</span>' +
                    '</p>' +
                  '</a>' +
                '</li>'
      }
      $('#expert-items').html(item)
    }
  }
}
xmlhttp.send()