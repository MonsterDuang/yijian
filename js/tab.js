
// 分类切换
var nowIndex = location.search.split('')[1] || 1
// pc
$("#pro_content > li:nth-of-type(" + nowIndex + ")").show().siblings().hide()
$("#pro_dir > li:nth-of-type(" + nowIndex + ")").find('> a').css({'background':'#951B25', 'color': '#fff'}).end().siblings().find('> a').css({'background':'none', 'color': '#666'})
$("#pro_dir > li:nth-of-type(" + nowIndex + ")").find('> a').attr('alt', '1').end().siblings().find('> a').removeAttr('alt')
$('#now-site').text($("#pro_dir > li:nth-of-type(" + nowIndex + ")").find('> a').text())
$('#pro_dir > li').click(function () {
  $('#now-site').text($(this).text())
  $(this).find('> a').attr('alt', '1').end().siblings().find('> a').removeAttr('alt')
  $(this).find('> a').css({'background':'#951B25', 'color': '#fff'}).end().siblings().find('> a').css({'background':'none', 'color': '#666'})
  $('#pro_content > li').eq($(this).index()).stop().show().siblings().hide()
})
// mobile
$("#pro_content_m > li:nth-of-type(" + nowIndex + ")").show().siblings().hide()
$("#pro_dir_m > li:nth-of-type(" + nowIndex + ")").find('> a').css({'border-bottom':'#951B25 1px solid', 'color': '#951B25'}).end().siblings().find('> a').css({'border-bottom':'none', 'color': '#333'})
$("#pro_dir_m > li:nth-of-type(" + nowIndex + ")").find('> a').end().siblings().find('> a')
$('#pro_dir_m > li').click(function () {
  $('#now-site').text($(this).text())
  $(this).find('> a').css({'border-bottom':'#951B25 1px solid', 'color': '#951B25'}).end().siblings().find('> a').css({'border-bottom':'none', 'color': '#333'})
  $('#pro_content_m > li').eq($(this).index()).stop().show().siblings().hide()
})