
var noteObj =[
  {
    "noteName": "我的第一本筆記",
    "noteId": 0,
    "label":["美食","學習","旅記"],
    "date":"2019-12-12",
    "star": true
    
  },
  {
    "noteName": "我的第二本筆記",
    "label":["學習"],
    "date":"2019-11-12",
    "star": false
    
  },
  {
    "noteName": "我的第三本筆記",
    "label":["旅記"],
    "date":"2019-11-12",
    "star": true
    
  }
]

console.log(noteObj[0].label.length)

//使用條件查詢時：
//假設有兩個條件，搜尋符合：美食、遊記  標籤的筆記本(只要符合一個也算)
//把符合的值，存入此陣列arr=[]
//第0、2筆符合放到arr，所以arr，之後抓取符合的值用迴圈跑，把符合的值印出來
var dd = ["美食","旅記"]  //條件
// 符合條件積分就+1。
// 符合條件越多的 積分會越大
// 此時，用sort排序積分，再依此序印出
//http://www.eion.com.tw/Blogger/?Pid=1170
function sort_comdition(){
  for (var n1=0; n1<dd.length; n1++){
    //依序將條件帶入搜尋 noteObj.label 是否有符合的  //執行2次  //
    for(var n2=0; n2<noteObj.length;n2++){  //執行3次
      console.log("條件代入，測試有無： " +dd[n1])
        if(noteObj[n2].label.indexOf(dd[n1])>-1){
          // console.log()
          if(noteObj[n2].count==undefined){
            noteObj[n2].count = 1;
            // console.log("有重覆")
          }
          else{
          noteObj[n2].count = noteObj[n2].count + 1;
          // console.log("有重覆")
          }
        }
        else{
          if(noteObj[n2].count==undefined){
            noteObj[n2].count = 0;
            // console.log("無重覆")
          }
          else{
          noteObj[n2].count = noteObj[n2].count;
          // console.log("無重覆")
          }
        }
    }
  }
    // console.log(noteObj[0].count,noteObj[1].count,noteObj[2].count)
    //按積分作排序
    noteObj = noteObj.sort(function (a, b) {
      return a.count < b.count ? 1 : -1;
    });
    console.log(noteObj)
}







