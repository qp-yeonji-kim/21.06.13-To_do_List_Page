/* html 요소에 해당되는 선택자 */
const timeContainer = document.querySelector('.timeContainer'),
  nameContainer = document.querySelector('.nameContainer'),
  questionName = nameContainer.querySelector('p'),
  answerName = nameContainer.querySelector('input'),
  helloUser = document.querySelector('.helloUser'),
  toDoList = document.querySelector('.toDoList'),
  days = ['일', '월', '화', '수', '목', '금', '토'];
/*   
  selectNumber = document.querySelector('.selectNumber'),
  choseNumber = document.querySelector('.choseNumber'), 
*/

/* html 요소에 해당되는 선택자 */
function getTime(){
  let today = new Date(),
  year = today.getFullYear(),
  month = today.getMonth() + 1,
  date = today.getDate(),
  day = today.getDay(),

  hour = today.getHours(),
  min = today.getMinutes(),
  sec = today.getSeconds();

timeContainer.innerHTML = `<span>${year}년 ${month < 10 ? `0${month}` : month}월 ${date < 10 ? `0${date}` : date}일 ${days[day]}요일</span> <span>${hour < 12 ? `오전` : `오후`} ${hour < 13 ? hour : hour - 12}시 ${min}분 ${sec}초</span>`;
}

function saveName(username){
  localStorage.setItem('userName', username);
}

function sayHello(username){
  questionName.classList.add('hide');
  helloUser.classList.remove('hide');
  helloUser.innerText = `${username}님 안녕하세요?`;
  answerName.placeholder = '저 다른 이름 쓸게요';
  askName();
}

function askName(){
  nameContainer.addEventListener('submit', function(event){
    event.preventDefault();
    let userName = answerName.value;
    if(userName){
      sayHello(userName);
      saveName(userName);
    }
    answerName.value = "";
  });
}

function greetUser(){
  let savedAnswerName = localStorage.getItem('userName');
  if(savedAnswerName === null){
    askName();
  } else {
    sayHello(savedAnswerName);
  }
}

function init(){
  setInterval(getTime, 1000);
  greetUser();
}

init();

  /* 
  point userName을 표현하는 방법이 두 가지가 있다.
  input에서 submit했을 때 받는 값 (변수)
  localstorage에서 저장한 값을 불러올 때 쓰는 (문자열)
  */
