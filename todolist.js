const toDoContainer = document.querySelector('.toDoContainer'),
toDoInput = toDoContainer.querySelector('input'),
toDoList = document.querySelector('.toDoList'),
doneList = document.querySelector('.doneList');

function writeToDo(){
  const li = document.createElement('li'),
    text = document.createTextNode(ONGOING),
    delBtn = document.createElement('button');
  delBtn.innerText = '❌';
  delBtn.addEventListener('click', deleteToDo);
  li.appendChild(text);
  // li.append(span, deleteBtn); 이 방법도 있네?
  //span은 꼭 안만들어도 되지 않을까..
  // li.id = task.id 흠 이건 뭐지
  toDoList.appendChild(li);
}

function submitToDo(e){
  e.preventDefault();
  const submittedToDo = toDoInput.value;
  writeToDo(submittedToDo);
  toDoInput.value = "";
}

function loadTask(){
  let ONGOING = localStorage.getItem('ONGOING'),
    FINISHED = localStorage.getItem('FINISHED');
  if(ONGOING) {
    let parsedToDo = JSON.parse(ONGOING);
    parsedToDo.forEach(function (inputText){
      loadToDo(inputText.ONGOING);
    });
  }
  if(FINISHED) {
    let parsedDone = JSON.parse(FINISHED);
    parsedDone.forEach(function (inputText){
      loadToDo(inputText.FINISHED);
    });
  }
};

function init(){
  loadTask();
  toDoContainer.addEventListener("submit", submitToDo);
}

/* 
그 떄 createElement을 써서 만들었던 것 같은데 굉장히 복잡하게 만들었네? 
코드가 길어질까봐 그랬던 것 같기도
*/