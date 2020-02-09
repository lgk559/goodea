var app = new Vue({
  el: '#app',
  data: {
    index: '',
    name: '',
    strN: [],
    data: {},
    task: [],
    allData: [],
    pos: ''
  },
  created(){
    this.allData = JSON.parse(localStorage.getItem("noteObj")) || []
  },
  methods: {
    A_dismiss: function () {
      document.getElementById("save0").classList.remove("was-validated")
    },
    AP_save_initial: function () {
      document.querySelector("#writeBox .ql-editor").innerHTML = "";//內文編輯區
      document.querySelector("#NewNoteName").value = ""; //檔名(輸入框)
      document.querySelector("#noteClass").innerHTML = ""; //已加入類別圖示(span)
      document.querySelector("#addMyLove").checked = false; //星號
      document.querySelector("#NewNoteClass input").value = ""; //新增類別的輸入框
      document.querySelector("#NewNoteClass").classList.remove("d-flex") //輸入框樣式
      document.querySelector("#NewNoteClass").classList.add("d-none") //輸入框樣式
      document.querySelector("#NewNoteName").removeAttribute("readonly")
      this.index = ""
      this.name = ""
      this.strN = []
      this.data = {};
      this.task = [];
      this.pos = ""
      document.querySelector("#NewNoteName").nextElementSibling.style.display = "none"
      document.querySelector("#NewNoteName").nextElementSibling.textContent = "幫筆記命名吧~~"
    },
    A_NotesTarget_difference: function (e) {
      allData = JSON.parse(localStorage.getItem("noteObj")) || []
      var eleClass = e.target.className;
      var eleNode = e.target.nodeName;
      var name_id
      index = ""
      name = ""
      if (eleClass == "bookInner") {
        index = e.target.dataset.index
        name_id = "#Product_" + index + " h6"
        name = document.querySelector(name_id).textContent
        document.querySelector("#writeBox .ql-editor").innerHTML = allData[index].info
        console.log("顯示內文" + index, name, allData[index].info)
      }
      else if (eleNode == "P") {
        index = e.target.parentNode.dataset.index
        name_id = "#Product_" + index + " h6"
        name = document.querySelector(name_id).textContent
        document.querySelector("#writeBox .ql-editor").innerHTML = allData[index].info
        console.log("顯示內文" + index, name, allData[index].info)
      }
      else if (eleNode == "BUTTON") {
        index = e.target.parentNode.parentNode.dataset.index
        name_id = "#Product_" + index + " h6"
        name = document.querySelector(name_id).textContent
        P_Node_delete__allData(name, index)
        PP_RecentEdit_FilterPrint__alldata()
      }
      else if (eleNode == "INPUT") {
        index = e.target.parentNode.parentNode.parentNode.dataset.index
        name_id = "#Product_" + index + " h6"
        name = document.querySelector(name_id).textContent
        console.log("執行星號" + index)
        P_starInput_change__allData(name, index)
        PP_RecentEdit_FilterPrint__alldata()
      }
    }

  },
  computed: {
    upAllData: function(){
      
    }
  }
})