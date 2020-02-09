//網頁載入完成(初始)

// var color



//文字反白範圍
var writeBox = document.querySelector("#writeBox");
var str;



writeBox.addEventListener('click',F_writeBox,false)
function F_writeBox(e){ 
  var writeBox_HTML = e.target;

  console.log(writeBox_HTML)
  
  var writeStr = document.getSelection();
  if (writeStr != "") {

//總長度
var length = writeBox.textContent.length
//沒被選取的字串前段
var strStar = document.getSelection().anchorOffset
var str1=  writeBox.innerHTML.slice(0,strStar);
console.log(str1)

//被選取的字串

str=  "<span class='addStyle'>"+writeBox.innerHTML.slice(strStar,(length-strStar+1))+"</span>";
console.log(str)

//沒被選取的字串後段
var strEnd = document.getSelection().focusOffset
var str2=  writeBox.innerHTML.slice(strEnd);
console.log(str2)  



//組合並印出
document.getElementById("writeBox").innerHTML = str1+str+str2


      
    }
};

//改變文字大小
// 
//標題字樣飾

//改變文字顏色

var color_text = "";
document.querySelector(".colorSelect").addEventListener("click",F_colorSelect,false);
function F_colorSelect(e){
  var targetN = e.target.nodeName;
  var getId = e.target.id
  var SelecColor = document.getElementById(getId);
  var color_text= window.getComputedStyle(SelecColor,null).backgroundColor;


  //取文字顏色-全部
  //將選取字串改變顏色
document.querySelector(".addStyle").style.color = color_text;
  //取文字顏色-部份
  // writeStr.style.color = color_text;
  if(targetN !== "A"){return}
}

//