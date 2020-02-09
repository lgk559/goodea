const databaseURL= "https://mystage-1b933.firebaseio.com"
var database = new XMLHttpRequest()

database.open('GET', databaseURL)
database.responseType = 'json';
database.send();


function pushDate(name) {
  var name = firebase.database().ref('name/').push({
   name: name,
  });
}

database.onload = function () {
// console.log(database.response)
console.log("ya")
}