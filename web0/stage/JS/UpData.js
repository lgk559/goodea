


// //抓取檔案：

// // Create a reference to 'mountains.jpg'
// var mountainsRef = storageRef.child('mountains.jpg');

// // Create a reference to 'images/mountains.jpg'
// var mountainImagesRef = storageRef.child('images/mountains.jpg');


//監聽
document.querySelector("#file_uploader").addEventListener("change",AP_productImg_selector,false)
document.querySelector("#btn_reset").addEventListener("click",A_productImg_reset,false)
document.querySelector("#btn_uploader").addEventListener("click",A_productImg_upload__firebase,false)

var fileList

function AP_productImg_selector(e){
   fileList = e.target.files
  // console.log(fileList)
}

function A_productImg_reset(){
  document.querySelector("#file_uploader").value = ""
  fileList =[]
}

function A_productImg_upload__firebase(){
  var storage = firebase.storage();
  var storageRef = storage.ref("https://mystage-1b933.firebaseio.com");
  var file = fileList;
  ref.put(file).then(function(snapshot) {
    console.log('Uploaded a blob or file!');
  });
  var spaceRef = storageRef.child('images/'+fileList).put(file, metadata);
  spaceRef.pause();


}

