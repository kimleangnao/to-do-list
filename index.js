
let arrayTodoList = [
    
]
checkIfTodoArrayIsEmpty(arrayTodoList);
//form doms
let textInput = document.getElementById("js_formInput");
let submitBtn = document.getElementById("js_submitBtn");

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if(textInput.value.trim() != ""){
        let randomId = Math.floor(Math.random() * 1000000);

        let arrayText = 
        {
            id: randomId,
            text : textInput.value.trim(),
            done: false
        }
          
        arrayTodoList.push(arrayText)
        renderList(arrayTodoList)
        checkIfTodoArrayIsEmpty(arrayTodoList);
        //reset
        textInput.value = ""
        scrollToBottom();
    }else{
        alert("You cannot have empty task.")
    }
})


function renderList(arrayTodoList){
    let displayDOM = document.getElementById("js_displayTasks")
    displayDOM.innerHTML = ""

    for(let i = 0; i < arrayTodoList.length; i++){
        let barDiv = document.createElement("div");
        barDiv.classList.add("displayTasks_bar");
      
        //child 1
        let checkBtnDiv =  document.createElement("div");
        checkBtnDiv.classList.add("displayTasks_bar_checkBtn");
        checkBtnDiv.innerHTML = `<i class="fa-solid fa-check"></i>`;
        checkBtnDiv.setAttribute("id", `js_checkBtn_${arrayTodoList[i].id}`)

        //child 2
        let textDiv = document.createElement("div");
        textDiv.classList.add("displayTasks_bar_text");
        textDiv.textContent = arrayTodoList[i].text;
        textDiv.setAttribute("id", `js_text_${arrayTodoList[i].id}`)
      
        //child 3
        let deleteBtnDiv = document.createElement("div");
        deleteBtnDiv.classList.add("displayTasks_bar_deleteBtn");
        deleteBtnDiv.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        deleteBtnDiv.setAttribute("id", `js_deleteBtn_${arrayTodoList[i].id}`)

        if(arrayTodoList[i].done){
            textDiv.classList.add("displayTasks_bar_text-lineThrough");
            checkBtnDiv.classList.add("displayTasks_bar_checkBtn-done");
        }

        barDiv.appendChild(checkBtnDiv);
        barDiv.appendChild(textDiv);
        barDiv.appendChild(deleteBtnDiv);

      

        displayDOM.appendChild(barDiv);
        attachEventListenerToCheckBtn(arrayTodoList[i].id)
        attachEventListenerToDeleteBtn(arrayTodoList[i].id)
    }

 
}

function attachEventListenerToCheckBtn(domId){
    let checkBtn = document.getElementById(`js_checkBtn_${domId}`);
    let textDiv = document.getElementById(`js_text_${domId}`)
    checkBtn.addEventListener("click", (e) => {
        e.preventDefault();
        for(let i = 0; i < arrayTodoList.length; i++){
            if(arrayTodoList[i].id == domId){
                arrayTodoList[i].done = true;
            }
        }
        textDiv.classList.add("displayTasks_bar_text-lineThrough")
        checkBtn.classList.add("displayTasks_bar_checkBtn-done")
    })  
}

function attachEventListenerToDeleteBtn(domId){
    let deleteBtn = document.getElementById(`js_deleteBtn_${domId}`);
    deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let filterList = arrayTodoList.filter((list) => list.id != domId);
        arrayTodoList = filterList;
        renderList(arrayTodoList)
        checkIfTodoArrayIsEmpty(arrayTodoList)
    })  
  
}

function scrollToBottom(){
    let domDiv = document.getElementById("body")
    domDiv.scrollTop = domDiv.scrollHeight;
}

function checkIfTodoArrayIsEmpty(arrayTodo){
    let displayEmptyDiv = document.getElementById("js_displayEmpty");
    if(arrayTodo.length == 0){
        //provide empty elements holder to fill space
      
        displayEmptyDiv.style.display = 'block';
    }else{
        displayEmptyDiv.style.display = 'none';
    }
}