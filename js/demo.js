let count = 2
let pagenav
let get_page=0
function getData(_index) {
  if(_index==4){
      item = "";
      item = item + '<div class="case-pre">金宝贝<img src="https://mini.shenhudong.com/static/case-gymboree.jpg" style="width: 268px; height: 466px;">' +
      ' <div class="overlay"></div>' +
      ' <div class="work-content">' +
      '     <div class="work-link">' +
      '         <img src="https://mini.shenhudong.com/static/case-2.jpg" style="max-width:100%;border: 1px solid gray;" data-bd-imgshare-binded="1">' +
      '     </div>' +
      ' </div>' +
      '</div>';
      item = item + '<div class="case-pre">美吉姆<img src="https://mini.shenhudong.com/static/case-mygym.jpg" style="width: 268px; height: 466px;">' +
          ' <div class="overlay"></div>' +
          ' <div class="work-content">' +
          '     <div class="work-link">' +
          '         <img src="https://mini.shenhudong.com/static/case-1.jpg" style="max-width:100%;border: 1px solid gray;" data-bd-imgshare-binded="1">' +
          '     </div>' +
          ' </div>' +
          '</div>';
      $(".case-content").html(item);
      $("#pageList").html("");
     return;
  }
    $(".work-link a").show();

    const pageChangedHandler = function(page, size, isFirstCall = false) {
    if (!pagenav && !isFirstCall) {
      return
    }
    let caseContent = document.getElementsByClassName('case-content')[0]
    caseContent.innerHTML = ''
    let pageList = document.getElementById('pageList')
    let xmlhttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
    xmlhttp.open("POST", "https://mini.shenhudong.com/api/v1/wxopen/gettembycat", true)
      xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        let data = JSON.parse(xmlhttp.response).data.list
        const pages = JSON.parse(xmlhttp.response).data.sum % 8 > 0 ? parseInt(JSON.parse(xmlhttp.response).data.sum / 8) + 1 : JSON.parse(xmlhttp.response).data.sum / 8
        if (isFirstCall) {
          pagenav = xPagination(pageList, {
            max:6,
            curr:1,
            size:8,
            pages,
            jump:true,
            onpagination: pageChangedHandler
          })
          if (document.getElementsByClassName('page-btn-prev')[0]) {
            document.getElementsByClassName('page-btn-prev')[0].innerHTML = '上一页'
            document.getElementsByClassName('page-btn-next')[0].innerHTML = '下一页'
          }
        }

        var item = "";
        for (let i = 0; i < data.length; i++) {
            item = item + '<div class="case-pre">'+data[i].title+'<img src="'+data[i].preview+'" style="width: 268px; height: 466px;">' +
              ' <div class="overlay"></div>' +
              ' <div class="work-content">' +
              '     <div class="work-link">' +
              '         <img src="'+data[i].image+'" style="max-width:100%;border: 1px solid gray;" data-bd-imgshare-binded="1">' +
              '         <a href="javascript:void(0)" onclick="showDetail('+data[i].id+')">预览</a>' +
              '     </div>' +
              ' </div>' +
              '</div>';
        }
        $(".case-content").html(item);
      }
    }
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;")
    xmlhttp.send('tid=40&cid='+_index+'&nums=8&page=' + page)
  }
  // if(get_page!=0){
  //     pageChangedHandler(1, 20, false)
  // }else{
      $("#pageList").html("");
      pageChangedHandler(1, 20, true)
  // }
  get_page=1;

}
getData(0)