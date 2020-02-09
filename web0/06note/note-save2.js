//監聽
document.querySelector("#addNote2").addEventListener("click",AP_save_initial,false)//新增新筆記tab按鈕
document.querySelector("#showAll").addEventListener("click",A_NotesTarget_difference,false);//監聽顯示全部筆記區--刪除、內容
document.querySelector("#star-page .nodePage").addEventListener("click",A_NotesTarget_difference,false);//監聽顯示星號筆記區--刪除、內容
document.querySelector("#Edit_page .nodePage").addEventListener("click",A_NotesTarget_difference,false)//監聽顯示近期編輯區--刪除、內容

document.querySelector("#save_out").addEventListener("click",A_save_difference,false); //存檔..相關函式：A_save_difference、_Oldsave、F_NewSave
document.querySelector("#save_inner").addEventListener("click",A_save_check__allData,false); //儲存按鈕(最裡面的)
document.querySelector("#SelectClass select").addEventListener("change",A_SelectNoteClass_check__task,false); //下拉選單
document.querySelector("#NewNoteClass button").addEventListener("click",A_addNoteClass_check__task,false); //新增類別
document.querySelector("#noteClass").addEventListener("click",A_NodeClass_delete__task,false); //移除類別



//變數
var allData = JSON.parse(localStorage.getItem("noteObj")) || [];
var allClass //P_SelectNoteClass_print__allClass(e)(存放過去使用者新增的陣列(複製allClass)。存檔(內層) 時會檢查，如無重複會新增陣列資料。
var noteClass = []; //存放此次使用者新增的陣列，在無存檔前跳開會清除。存檔(內層) 時會檢查，如無重複會新增陣列資料。
var index = "" //A_NotesTarget_difference()  //印出畫面時，所給筆記本的流水號。命名格式data-index="流水號"。會用target事件方式抓取。
var name =""
var task = []; //本次使用者所選的類別。當完成存檔後會初始陣列
var strN= []; //抓取筆記內容的前三句，字數超過會變為…。(存檔階段確認檔名ok後會執行)，
var nodeName_save ="";//存檔小視窗輸入框的檔名。初始是""；如是舊檔會將原檔名取代""。
var pos //舊檔案所在陣列中的索引位子。函式：A_save_check__allData()


//儲存
//先印出已建好的類別供下拉選擇(監聽下拉選單)、新增類型的輸入框(button新增)。
//可以複選，所以當新增的類型會在下方，一個筆記本最多可建5個標籤
//如果文字=""就return，如果有值就執行儲存
//抓取筆記名稱、類別及筆記內容、當時時間、是否有加入星號

//初始畫面
PP_allNotes_FilterPrint__alldata();
PP_onlyStar_FilterPrint__alldata()
PP_RecentEdit_FilterPrint__alldata()


//-------------------------------------//
//----------------------------畫面更新------------------------------//
//-------------------------------------//
//抓取資料
function PP_allNotes_FilterPrint__alldata(){
  allData = JSON.parse(localStorage.getItem("noteObj")) || []
  document.querySelector("#showAll").innerHTML = ""
  var add =""
  for(var i=0; i<allData.length; i++){
    add+= PPP_notes_DOM(i,add,allData) //生成add的函式
  }
  document.querySelector("#showAll").innerHTML = add
  for(var n=0; n<allData.length; n++){
    var love_id = "#showAll #addMyLove"+n
    // console.log(allData[n].star)
    if(allData[n].star == true){
      document.querySelector(love_id).checked = true
    }
    else{
      document.querySelector(love_id).checked = false
    }
  }
  }

//-------------------------------------//
var arr=[]
function PP_RecentEdit_FilterPrint__alldata(){
  //顯示1~5筆
  allData = JSON.parse(localStorage.getItem("noteObj")) || [];
  arr = allData.sort(function (a, b) {
    return a.date > b.date ? -1 : 1;
   });
  //  console.log(arr)
   var add =""
   document.querySelector("#Edit_page .nodePage").innerHTML = add
    var n=5;
    for(var i=0; i<arr.length; i++){
      if(n>0){
        n=n-1
        add+= PPP_notes_DOM(i,add,arr) //生成add的函式
        
        document.querySelector("#Edit_page .nodePage").innerHTML = add
       } 
    }
    n=5;
      for(var i=0; i<arr.length; i++){
        
        if(n>0){
          // console.log("love")
          n=n-1
          var love_id = "#Edit_page #addMyLove"+i
          // console.log(arr[i].star)
          if(arr[i].star == true){
            document.querySelector(love_id).checked = true
          }
          else{
            document.querySelector(love_id).checked = false
          }
        }
        else{
          return
        }
      }
  }

//-------------------------------------//

function PP_onlyStar_FilterPrint__alldata(){
  //抓出星號
  allData = JSON.parse(localStorage.getItem("noteObj")) || []
  var add = "";
  document.querySelector("#star-page .nodePage").innerHTML = ""
  for(var i=0; i<allData.length; i++){
    if(allData[i].star == true){
      add+= PPP_notes_DOM(i,add,allData) //生成add的函式
    }
  }
  document.querySelector("#star-page .nodePage").innerHTML = add;
  var ele = document.querySelectorAll("#star-page input")
  var len = ele.length
  for (var i=0; i<len; i++){
    ele[i].checked=true
  }
}

//-------------------------------------//

function PPP_notes_DOM(i,add,data){
  
      var partInfo = data[i].info1
      var noteId = "Product_"+i
      add = 
      "<div class='col-12 book' id='"+noteId+"'>"
      +"<h6 class='font-weight-bold text-left'>"
      + data[i].noteName 
      + "</h6>" 
      +"<div class='bookInner'"+ " data-index='"+i +"'>"
      +"<div class='d-flex justify-content-between text-center mb-2 pb-2'>"
      +"<div class='custom-switch'>"
      +"<input type='checkbox' class='col-auto mt-2 custom-control-input' id='addMyLove"+i+"' value ='加入我的星號'>"
      +"<label class='custom-control-label' for='addMyLove"+i+"'><i class='far fa-star mr-3'></i></label> </div>"
      +"<button class='col-auto p-0 btn'>&times;</button></div>"
      + PPPP_noteIntro_get__allData(partInfo)
      +"</div></div>";
    return add
}

//-------------------------------------//

//印出縮簡的句子
function PPPP_noteIntro_get__allData(item){
  var len =item.length
  var str =""
  for (var i = 0; i<len; i++){
    // console.log(item[i])
    str +=item[i]
  }
  return str
}


//-------------------------------------//
//----------------------------點擊顯示筆記項目區域------------------------------//
//-------------------------------------//

//點擊印出的筆記本，可開始編輯
function A_NotesTarget_difference(e){
  allData = JSON.parse(localStorage.getItem("noteObj")) || []
  var eleClass = e.target.className;
  var eleNode = e.target.nodeName;
  var name_id
  index=""
  name = ""
   if(eleClass == "bookInner"){
    index = e.target.dataset.index
    name_id = "#Product_"+index +" h6"
    name = document.querySelector(name_id).textContent
    document.querySelector("#writeBox .ql-editor").innerHTML = allData[index].info
    console.log("顯示內文"+index,name,allData[index].info)
  }
  else if(eleNode == "P"){
  index = e.target.parentNode.dataset.index
  name_id = "#Product_"+index +" h6"
  name = document.querySelector(name_id).textContent
  document.querySelector("#writeBox .ql-editor").innerHTML = allData[index].info
  console.log("顯示內文"+index,name,allData[index].info)
  } 
  else if(eleNode == "BUTTON"){
    index = e.target.parentNode.parentNode.dataset.index
    name_id = "#Product_"+index +" h6"
    name = document.querySelector(name_id).textContent
    P_Node_delete__allData(name,index)
  }
  else if(eleNode == "INPUT"){
    index = e.target.parentNode.parentNode.parentNode.dataset.index
    name_id = "#Product_"+index +" h6"
    name = document.querySelector(name_id).textContent
    console.log("執行星號"+index)
    P_starInput_change__allData(name,index)
    }
}



//-------------------------------------//
//----------------------------存檔相關-跳出小視窗(存檔表單)------------------------------//
//-------------------------------------//

//判斷方法--抓取索引值，如果是空值就是新檔案。如果有值就是舊檔案
function A_save_difference(){
  P_SelectNoteClass_print__allClass() //初始存檔小視窗下拉選單
  document.querySelector(".modal").setAttribute("id","save")
  if(name == ""){ 
    console.log("執行新檔")
    }
    else{
      console.log("舊檔")
      document.querySelector("#NewNoteName").value = name
      document.querySelector("#NewNoteName").setAttribute("readonly","true")
      }
  }

//-------------------------------------//

//介面更新--印出下拉選項
function P_SelectNoteClass_print__allClass(){
  allClass = JSON.parse(localStorage.getItem("allClass")) || [];
  noteClass = allClass
  var ele = document.querySelector("#SelectClass select")
  ele.innerHTML = "<option>選擇或新增類別…</option>";

  for(var i=0; i<noteClass.length; i++){
    var newOption = document.createElement("option")
    var newOption_text = document.createTextNode(noteClass[i])
    newOption.dataset.item = i
    ele.appendChild(newOption) .appendChild(newOption_text)
    }
    newOption = document.createElement("option")
    newOption_text = document.createTextNode("新增...")
    newOption.className = "addClass"
    ele.appendChild(newOption).appendChild(newOption_text)
}

//-------------------------------------//
//----------------------------存檔相關-存檔表單要填的項目(小視窗)------------------------------//
//-------------------------------------//

//新增類別-監聽輸入框+資料處理(介面上新增資料有無重複判斷)
//沒有重複就更新到介面上、資料儲存
function A_addNoteClass_check__task(){
  var str = document.querySelector("#NewNoteClass input").value
  if(str ==""){
    document.querySelector("#NewNoteClass .invalid-feedback").textContent= "請先輸入類別才能新增喔"
    document.querySelector("#NewNoteClass .invalid-feedback").style.display= "block"
  }
  else{
    document.querySelector("#NewNoteClass .invalid-feedback").style.display= "none"
    // console.log(str)
    // console.log(task)
    if(task.indexOf(str)>-1) {
      document.querySelector("#NewNoteClass .invalid-feedback").textContent= "此類別已建立過"
      document.querySelector("#NewNoteClass .invalid-feedback").style.display= "block"
      // console.log("新增重複")
    }
    else{
      // console.log("沒有新增重複")
      task.push(str)//資料儲存
      P_addNoteClass_print__task() //介面更新-新增回饋+更新使用者本次所選取資料(task陣列)
    }
  }
}

//-------------------------------------//


//選擇類別-監聽下拉選單 + 樣式回饋
function A_SelectNoteClass_check__task(e) {
  var str = e.target.value
  if(str == "選擇或新增類別…"){
    document.querySelector("#SelectClass .invalid-feedback").style.display= "none"
    document.querySelector("#NewNoteClass").classList.remove("d-flex")
    document.querySelector("#NewNoteClass").classList.add("d-none")
    }
  else if(str == "新增..."){
    document.querySelector("#NewNoteClass").classList.remove("d-none")
    document.querySelector("#NewNoteClass").classList.add("d-flex")
  }
  else{  //
    document.querySelector("#NewNoteClass").classList.remove("d-flex")
    document.querySelector("#NewNoteClass").classList.add("d-none")
    if (task.indexOf(str)<0){
      // console.log("下拉沒有重複")
      task.push(str)//資料儲存
      P_addNoteClass_print__task()
    }
    else{ 
      //下拉選的值重複
      document.querySelector("#SelectClass .invalid-feedback").style.display= "block"
    }
  }
}


//-------------------------------------//

//介面更新-新增回饋(span).  //由A_addNoteClass_check__task()、A_SelectNoteClass_check__task()函式傳入。 執行移除span會影響n
function P_addNoteClass_print__task(){
  document.querySelector("#noteClass").innerHTML="";
  if(task.length==0){
    return
  }
  else{
    for(var i=0; i<task.length; i++){
      var ele = document.querySelector("#noteClass");
      var newSpan = document.createElement("span")
      var newButton = document.createElement("button")
      newSpan.innerHTML = task[i];
      newButton.setAttribute("data-index",i)  //全域變數--計數下拉及新增、移除span的流水號
      newButton.innerHTML = "&times;";
      newSpan.className = "badge" + " "+ "badge-primary" + " " + "mr-3";
      newButton.className = "ml-1"
      ele.appendChild(newSpan).appendChild(newButton)
    }
  }
}

//-------------------------------------//

//刪除功能span類別：監聽span清單 + 清除 + 更新本次類別
function A_NodeClass_delete__task(e){
  // e.preventDefault()
  var nodeName = e.target.nodeName
  if(nodeName !== "BUTTON"){return};
   //執行A_addNoteClass_check__task()、A_SelectNoteClass_check__task()函式、移除span會影響n
    var index = e.target.dataset.index;
    task.splice(index,1)
    P_addNoteClass_print__task()
}

//-------------------------------------//

//刪除功能
function P_Node_delete__allData(name,index){
  console.log("執行刪除")
  // nodeName_save = allData[index].noteName
  pos = allData.map(function(e) { return e.noteName; }).indexOf(name);
  // console.log(pos)
  allData.splice(pos,1)
  localStorage.setItem('noteObj',JSON.stringify(allData));
  PP_allNotes_FilterPrint__alldata()
  PP_onlyStar_FilterPrint__alldata()
  PP_RecentEdit_FilterPrint__alldata()
}

//-------------------------------------//

//更改星號功能
function P_starInput_change__allData(name,index){
  // index = ee.target.parentNode.parentNode.parentNode.dataset.index
  name_id = "#Product_"+index +" h6"
  name = document.querySelector(name_id).textContent
  pos = allData.map(function(e) { return e.noteName; }).indexOf(name);
  console.log("檔名:"+name,"索引位子："+pos)
  // console.log(allData[pos].star)
  var love_id = "#addMyLove"+index
  var love_ele = document.querySelector(love_id)
  var love_value

  if(love_ele.checked){
    love_ele = true;
    love_value = true;
  }
  else{
    love_value = false;
    love_ele = false;
  }
  allData[pos].date = PP_date_get(),
  allData[pos].star = love_value
  localStorage.setItem('noteObj',JSON.stringify(allData));
  index = ""
  name = ""
  PP_onlyStar_FilterPrint__alldata()
  PP_allNotes_FilterPrint__alldata()
  PP_RecentEdit_FilterPrint__alldata()  
}


//-------------------------------------//
//----------------------------存檔相關-上傳存檔表單(小視窗)------------------------------//
//-------------------------------------//

//存到物件A_save_check__allData + 上傳資料P_save_upload__allData。新檔、舊檔存取共用的函式
function A_save_check__allData(e){
  if(name == ""){ 
    console.log("執行新檔-存檔-記錄資料")
      document.querySelector("#NewNoteName").removeAttribute("readonly")
      nodeName_save = document.querySelector("#NewNoteName").value  //新檔名
      if(nodeName_save == ""){
        (function() {  //驗證樣式使用B4的js
          console.log("新檔-沒輸入檔名")
          "use strict";
          window.addEventListener("load", function() {
            var form = document.getElementById("save0");
            form.addEventListener("submit", function(event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add("was-validated");
            }, false);
          }, false);
        });//驗證樣式使用B4的js END
        return
      }
      else{
        e.preventDefault()
        // console.log(nodeName_save)
        pos = allData.map(function(e) { return e.noteName; }).indexOf(nodeName_save);
        if(pos !== -1){
          document.querySelector("#NewNoteName").nextElementSibling.style.display = "block"
          document.querySelector("#NewNoteName").nextElementSibling.textContent = "此檔名已存在，請取別的名字"
          return
          }
        }
        pos =allData.length
        console.log("索引位子"+pos)
  } 
  else{
    console.log("執行舊檔-存檔-記錄資料")
    nodeName_save = name
    pos = allData.map(function(e) { return e.noteName; }).indexOf(name);
    console.log("索引位子"+pos)
  }   
  P_save_upload__allData(pos,nodeName_save) 
}

//-------------------------------------//

function P_save_upload__allData(pos,nodeName_save){
  //比對檔名，看有沒有重複的
  //但無法判斷是新檔：請使用者重輸。舊檔：覆蓋
  PP_noteIntro_set__strN() //取一行簡短句子
    
    var data = {
        "noteName" : nodeName_save,
        "label" : task,
        "date" : PP_date_get(),
        "star" : PP_starInput_get(),
        "info" : document.querySelector("#writeBox .ql-editor").innerHTML,
        "info1" : strN
      };
      allData[pos] =data;
      localStorage.setItem('noteObj',JSON.stringify(allData));
      PP_allNotes_FilterPrint__alldata()
      PP_onlyStar_FilterPrint__alldata()
      PP_RecentEdit_FilterPrint__alldata()
      PP_noteClass_upload__noteClass()//更新陣列
      AP_save_initial();
      document.querySelector("#save_inner").setAttribute("data-target","#save") //引用B4的js開關   
}

//-------------------------------------//

function PP_date_get(){
  var NowDate=new Date();
　var y=NowDate.getFullYear();
　var m=NowDate.getMonth()+1;
　var d=NowDate.getDate();
  var h=NowDate.getHours();
  var time=NowDate.getMinutes();
  var Seconds=NowDate.getSeconds();
  var date = y+"/"+m+"/"+d+"/"+h+"/"+time+"/"+Seconds;
  return date;
}

//-------------------------------------//

//是否有加入星號
function PP_starInput_get(){
  var mylove = document.querySelector("#addMyLove")
  var mylove_value
  if(mylove.checked){
    mylove_value = true;
    return mylove_value
  }
  else{
    mylove_value = false;
    return mylove_value
  }
}

//-------------------------------------//

//抓取筆記內文片段
function PP_noteIntro_set__strN(){
  var n =1
  var len = document.querySelector(".ql-editor").children.length
  var str
  for(var i=0; i<len; i++){
    if(n>0){
      var eleSTR = document.querySelector(".ql-editor").children[i].textContent
        if(eleSTR !== ""){
          var ele = document.querySelector(".ql-editor").children[i].nodeName
          // console.log(eleSTR)
          n = n-1
          if(ele =="P"){ 
            if(eleSTR.length>15){
              str = eleSTR.slice(0,15) + "..."
            }
            else{
              str = eleSTR;
            };
            str = "<p>"+str+"</p>"
            // console.log(str)
            strN.push(str)
            
          }
          else if(ele == "H1"|| ele =="H2"|| ele =="H3"){
            if(eleSTR.length>5){
              str = eleSTR.slice(0,5) + "..."
            }
            else{
              str = eleSTR
            };
            str = "<h4>"+str+"</h4>"
            strN.push(str)
            // console.log(str)
          }
        }
    }//if--n<4   
    else{break;}
  }  //FOR--i<len
}

//-------------------------------------//

//更新類別陣列
function PP_noteClass_upload__noteClass(){
  for(var i=0; i<task.length; i++){
    // console.log("執行了"+i+"次")
    if(noteClass.indexOf(task[i])>-1){
      return
    }
    else{
      noteClass.push(task[i])
    } 
  }

  localStorage.setItem('allClass',JSON.stringify(noteClass));
}


//判斷要儲存的筆記內容，區分標籤h&p、有無span樣式。
//children[1~3]，抓取三行，但要過慮<p><br></p>
//如果是h類的標籤，取1~7字
//如果是p類的標籤，p1+p2加總50字
//取標籤的style


//清空剛剛的編輯
function AP_save_initial(){
  document.querySelector("#writeBox .ql-editor").innerHTML="";//內文編輯區
  document.querySelector("#NewNoteName").value=""; //檔名(輸入框)
  document.querySelector("#noteClass").innerHTML=""; //已加入類別圖示(span)
  document.querySelector("#addMyLove").checked=false; //星號
  document.querySelector("#NewNoteClass input").value=""; //新增類別的輸入框
  document.querySelector("#NewNoteClass").classList.remove("d-flex") //輸入框樣式
  document.querySelector("#NewNoteClass").classList.add("d-none") //輸入框樣式
  document.querySelector("#NewNoteName").removeAttribute("readonly")
  index = ""
  name = ""
  strN = []
  data ={};
  task=[];
  pos=""
  document.querySelector("#NewNoteName").nextElementSibling.style.display = "none"
  document.querySelector("#NewNoteName").nextElementSibling.textContent = "幫筆記命名吧~~"

  // document.querySelector("#v-pills-home-tab").classList.add("active");
  // document.querySelector("#v-pills-home-tab").getAttribute("aria-selected")=="true"
  // document.querySelector("#v-pills-home").classList.add("show");
  // document.querySelector("#v-pills-home").classList.add("active");
  // document.querySelector("#v-pills-home").style.display= "block";

  // document.querySelector("#addNote2").classList.remove("active");
  // document.querySelector("#addNote2").getAttribute("aria-selected")=="false"
  // document.querySelector("#addNote_page").classList.remove("show");
  // document.querySelector("#addNote_page").classList.remove("active");
  // document.querySelector("#addNote_page").style.display= "none";
}



//計算字數(沒用到)
function str(noteId_id){
  var len = 50; // 超過50個字以"..."取代
  $(noteId_id).each(function(i){
    console.log("123")
      if($(this).text().length>len){
          $(this).attr("title",$(this).text());
          var text=$(this).text().substring(0,len-1)+"...";
          $(this).text(text);
          console.log("123")
      }
  });
};