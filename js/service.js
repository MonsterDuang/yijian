// PC
if (document.documentElement.clientWidth > 1050) {
  // 在线展厅
  var nowIndex = location.search.split('')[1] || 1
  switch(nowIndex) {
    case '1':
      $('#now-site').text('藏品鉴定')
      break
    case '2':
      $('#now-site').text('藏品展览')
      break
    case '3':
      $('#now-site').text('藏品征集')
      break
    case '4':
      $('#now-site').text('藏品交易')
      break
    default:
      break
  }
  $('#service-nav li:nth-of-type(' + nowIndex + ')').find('a').attr('class', 'active-nav')
}