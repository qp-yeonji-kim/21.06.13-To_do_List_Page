const toDoForm = document.querySelector(".toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".toDoList"),
  finishList = document.querySelector(".finishList");
let PENDING = [],
  FINISHED = [];

function finishToDo(event) {
  const btn = event.target,
    li = btn.parentNode,
    done = li.firstChild.innerText;
  deleteToDo(event);
  writeDone(done);
}

function cancelDone(event) {
  const btn = event.target,
    li = btn.parentNode,
    toDo = li.firstChild.innerText;
  deleteFinish(event);
  writeToDo(toDo);
}

function deleteToDo(event) {
  const btn = event.target,
    li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDo = PENDING.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  PENDING = cleanToDo;
  saveDo();
}

function deleteFinish(event) {
  const btn = event.target,
    li = btn.parentNode;
  finishList.removeChild(li);
  const cleanDone = FINISHED.filter(function (done) {
    return done.id !== parseInt(li.id);
  });
  FINISHED = cleanDone;
  saveDo();
}

function saveDo() {
  localStorage.setItem("PENDING", JSON.stringify(PENDING));
  localStorage.setItem("FINISHED", JSON.stringify(FINISHED));
}

function writeToDo(toDo) {
  const li = document.createElement("li"),
    span = document.createElement("span"),
    finBtn = document.createElement("button"),
    delBtn = document.createElement("button");
  finBtn.addEventListener("click", finishToDo);
  delBtn.addEventListener("click", deleteToDo);
  let newId = PENDING.length + 1,
    toDoObj = {
      PENDING: toDo,
      id: newId
    };
  span.innerText = toDo;
  finBtn.innerText = "⭕";
  delBtn.innerText = "❌";
  li.appendChild(span);
  li.appendChild(finBtn);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  PENDING.push(toDoObj);
  saveDo();
}

function writeDone(toDo) {
  const li = document.createElement("li"),
    span = document.createElement("span"),
    cancelBtn = document.createElement("button"),
    delBtn = document.createElement("button");
  cancelBtn.addEventListener("click", cancelDone);
  delBtn.addEventListener("click", deleteFinish);
  let newId = FINISHED.length + 1,
    toDoObj = {
      FINISHED: toDo,
      id: newId
    };
  span.innerText = toDo;
  cancelBtn.innerText = "🚫";
  delBtn.innerText = "❌";
  li.appendChild(span);
  li.appendChild(cancelBtn);
  li.appendChild(delBtn);
  li.id = newId;
  finishList.appendChild(li);
  FINISHED.push(toDoObj);
  saveDo();
}

function handleSubmit(event) {
  event.preventDefault();
  const submittedToDo = toDoInput.value;
  writeToDo(submittedToDo);
  toDoInput.value = "";
}

function loadToDo() {
  const loadedToDo = localStorage.getItem("PENDING"),
    loadedFinDo = localStorage.getItem("FINISHED");
  if (loadedToDo !== null) {
    const parsedToDo = JSON.parse(loadedToDo);
    parsedToDo.forEach(function (inputText) {
      writeToDo(inputText.PENDING);
    });
  }
  if (loadedFinDo !== null) {
    const parsedFinDo = JSON.parse(loadedFinDo);
    parsedFinDo.forEach(function (inputText) {
      writeDone(inputText.FINISHED);
    });
  }
}

function init() {
  loadToDo();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
