//從全部筆記本切換到新增筆記
//以B4為原型，作的修改

// document.querySelector("#addNote").addEventListener("click",F_addNote,false)
document.querySelector("#addNote2").addEventListener("click",F_addNote2,false)

function F_addNote2(){
document.querySelector("#addNote2").classList.remove("active");
// document.querySelector("#v-pills-home-tab").setAttribute("aria-selected", false)
document.querySelector("#addNote2").getAttribute("aria-selected")=="false"
document.querySelector("#addNote_page").classList.remove("show");
document.querySelector("#addNote_page").classList.remove("active");
document.querySelector("#addNote_page").style.display= "none";

// document.querySelector("#v-pills-messages-tab").classList.add("active")
// // document.querySelector("#v-pills-messages-tab").setAttribute("aria-selected", true)
// document.querySelector("#v-pills-messages-tab").getAttribute("aria-selected")=="true"
// document.querySelector("#v-pills-messages").classList.add("show")
// document.querySelector("#v-pills-messages").classList.add("active")

}


