const form = document.querySelector(".js-form");
const input = form.querySelector("input");          //왜 querySelector로 해주니까 될까..
const greeting = document.querySelector(".js-greeting"); 

const USER_LS = "currentUser";
const SHOWING_ON = "showing";

function saveName(name) {
    localStorage.setItem(USER_LS, name);
}

function handleSubmitEvent(event) {
    event.preventDefault();
    const currentValue = input.value;
    saveName(currentValue);
    loadName();
}

function askForName() {
    form.classList.add(SHOWING_ON);
    form.addEventListener("submit", handleSubmitEvent);    //첫번쨰 인자에 대한 이벤트가 발생했을 때, 2번쨰 함수를 실행한다
}

function paintName(text) {
    form.classList.remove(SHOWING_ON);
    greeting.classList.add(SHOWING_ON);
    greeting.innerHTML = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        paintName(currentUser);
    }
}

function init() {
    localStorage.clear();
    loadName();
}

function diff() {
    console.log("되는 것 : " + input);
    console.log("안 되는 것 : " + form.getElementsByTagName("input"));      //HTML COllection으로 표기되기 떄문!
}

init();
diff();
