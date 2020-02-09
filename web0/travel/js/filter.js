//變數
////資料庫相關
var requestURL = 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97';
var request = new XMLHttpRequest();//建立請求。建立新請求物件
var maintitle
////篩選資料內容 

var show_data=[];
var info =document.querySelector(".info");

//資料庫
request.open('GET', requestURL);//最基本資料檢索請求
request.responseType = 'json';//告訴伺服器應回傳JSON物件
request.send();//send代表傳送請求
  


request.onprogress = function(e) {
  if(event.lengthComputable) {
    var progressBar = document.getElementById('progressBar')
    console.log("請稍等一下")
    document.querySelector(".progressBar").style.display ="block"
    progressBar.max = e.total;
    progressBar.value = e.loaded;

  }
}

request.onload = function () {//等代伺服器回傳後再接著處理
  document.querySelector(".progressBar").style.display ="none"
  document.querySelector("#Info_Select").classList.remove("Info_Select-none");
    var superHeroes = request.response;//response為所接收數據內容。之前已設定為JSON物件(第29行)
    populateHeader(superHeroes);//將內容傳入下方的自己建立的函式
    random();//亂數
}


function populateHeader(jsonObj) {
  maintitle = jsonObj['result'].records;//抓取JSON裡的squadName內容。jsonObj['物件title']
}

//亂數
function random(){
  var arr = [];
  var maxRandom = maintitle.length
  var num
  for(var i=0; arr.length<7; i++){
    num = Math.ceil(Math.random()*maxRandom);
    if (arr.indexOf(num) > -1){
      continue;
    }
    else{
      arr.push(num);
    }
  }
  console.log(arr)
  return d4(arr)
}


//初始畫面--介面更新
function d4(arr){
  // console.log(arr);
  document.querySelector(".info").innerHTML="";
  F_show(1,arr);
  document.querySelector(".main h3").textContent = "旅遊資訊--隨機推薦"

}

//查詢符合所選地區才印出
document.querySelector("#Info_Select").addEventListener("change",F_selectZone,false);
document.querySelector("#area1").addEventListener("click",F_btnArea,false);
document.querySelector("#area2").addEventListener("click",F_btnArea,false);
document.querySelector("#area3").addEventListener("click",F_btnArea,false);
document.querySelector("#area4").addEventListener("click",F_btnArea,false);
//篩選符合的資料
function F_selectZone(e){
  
  let selector_option = e.target.value;
  if(selector_option == "- 請選擇行政區 -"){
    return
  }
  F_area(selector_option)
}

function F_btnArea(e){
  let selector_option = e.target.textContent;
  F_area(selector_option)
}

function F_area(selector_option){
  console.log(selector_option)
  document.querySelector(".info").innerHTML="";
  document.querySelector(".main h3").textContent = "旅遊資訊--" + selector_option
  var n = 0
  show_data.length = 0
    for(var i=0; i<maintitle.length; i++){  
      var Zone = maintitle[i].Zone
      if (selector_option == Zone){
        n= n+1;
        show_data.push(i) //符合的索引抓出來
      }
    }
    return page(n)   
}

//介面更新：印出所需頁數
function page(n){
  // console.log(show_data)  
  var pages = Math.ceil(n/6); //無條件進位，取整數
  // var page = n%6;  //餘數
  var p_add=""
  var el_p = document.querySelector(".page p");
  // console.log(pages);
  // console.log(page);
  //頁數迴圈
  for (var i=1; i<(pages+1); i++){
    p_add += "<span>"+"<a class='page p"+i+"'>" +i+"</a></span>" 
  }
  el_p.innerHTML = p_add;  //介面更新
  document.querySelector(".page .p1").style.color = "#cc3300"; //第一頁頁數紅色
  F_show(1,show_data); //預設先印出第一頁
}

//介面更新：初始頁數的樣式
function d4Page(allPage){
  for (var i=0; i<allPage.length; i++){
    allPage[i].style.color = "#000"
  }
}


//監聽1-點選頁數按鈕
document.querySelector(".page").addEventListener("click",F_goP,false);
//點選頁數按鈕
function F_goP(e){
  // e.preventDefault()
  var getEle = e.target.nodeName
  var allPage = document.querySelectorAll(".page span a")
  
  if (getEle !== "A"){return}
  d4Page(allPage);
  var p =e.target.textContent //取文字內容：要跳去的頁數
  console.log(p)
  e.target.style.color = "#cc3300"
  F_show(p,show_data)
}

function F_show(p,show_data){
  document.querySelector(".info").innerHTML="";
  var pNstart = ((p-1)*6);
  var pNend = p*6;
  for (pNstart; pNstart<pNend && pNstart<show_data.length;pNstart++){
    var getData = show_data[pNstart];
    // console.log(getData)
    var newDiv_travelBox = document.createElement("div");
    var newDiv_travelImg = document.createElement("div");
    newDiv_travelBox.className+="travelBox"+" "+"col-lg-6"+" "+"col-12"+" "+"mb-5";
    newDiv_travelImg.className+=" "+"travelImg"+" "+"border"+" "+"row"+" "+"justify-content-between"+" "+"align-items-end"+" "+"bg-cover"+" "+"mb-0";
    var strId = "travelBox"+ pNstart
    var strId_Img= "#"+strId + " "+".travelImg "
    newDiv_travelBox.id = strId  //控制的id
    
    info.appendChild(newDiv_travelBox).appendChild(newDiv_travelImg)
    // console.log(maintitle[getData].Name)
    var imgUrl = maintitle[getData].Picture1
    document.querySelector(strId_Img).style.backgroundImage = 'url('+imgUrl+')'

    if(maintitle[getData].Ticketinfo ==""){
        var Ticketinfo = "收費資訊：不清楚"
    }
    else{
      Ticketinfo = "收費資訊：" + maintitle[getData].Ticketinfo
    }
      /////////////////////////////////////
    var newDiv_travelInfo = document.createElement("div");
    newDiv_travelInfo.className+=" "+"travelInfo"+" "+"border"+" "+"row"+" "+"pt-3";
    info.appendChild(newDiv_travelBox).appendChild(newDiv_travelInfo)
    var strId_info = "#"+strId + " "+".travelInfo"
    console.log(strId_info)
    document.querySelector(strId_Img).innerHTML = "<h5 class='col-8 Info_Name'>"+maintitle[getData].Name +"</h5>" +"<h5 class='col-4 Info_Zone'>"+ maintitle[getData].Zone +"</h5>"
    document.querySelector(strId_info).innerHTML =
    "<div class='col-12 Info_Time'>"+ "<img src='https://hexschool.github.io/JavaScript_HomeWork/assets/icons_clock.png'" +"</div>"+"<span>"+ maintitle[getData].Opentime +"</span></div>"+
    "<div class='col-12 Info_Where'>"+ "<img src='https://hexschool.github.io/JavaScript_HomeWork/assets/icons_pin.png' alt='景點地址'"+"<span>"+ maintitle[getData].Add+"</span></div>"+
    "<div class='col-auto Info_Tle'>"+ "<img src='https://hexschool.github.io/JavaScript_HomeWork/assets/icons_phone.png' alt='景點電話'"+"<span>"+ maintitle[getData].Tel + "</span></div>"+
    "<div class='col-auto ml-auto Info_Ticket'>"+ "<img src='https://hexschool.github.io/JavaScript_HomeWork/assets/icons_tag.png' alt='門票收費'"+"<span>"+ Ticketinfo
  + "</span>"+ "</div>";
  }

}


