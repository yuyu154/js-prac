const form = document.querySelector(".js-to-do-list");
const input = form.querySelector("input");
const selectedDiv = document.querySelector(".js-selected-list");
const ul = selectedDiv.querySelector("ul");

const TODOS_LS = "toDos";
toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function removeNode(li) {
    cleanedTodos = toDos.filter(function(toDo) {
        return (li.id != toDo.id); 
    });
    toDos = cleanedTodos;
    li.remove();
}

function handleClick(event) {
    event.preventDefault();
    const li = event.target.parentNode;
    removeNode(li);
    saveToDos();
}

function createContent(toDoObj) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerHTML = "❌";
    btn.addEventListener("click", handleClick);
    const span = document.createElement("span");
    span.classList.add("caret");
    span.innerHTML = toDoObj.text;
    li.appendChild(btn);
    li.appendChild(span);
    li.id = toDoObj.id;
    li.classList.add("list-group-item");
    return li;
}

function paintToDo(toDoObj) {
    toDos.push(toDoObj);
    const li = createContent(toDoObj);
    ul.appendChild(li);
}

function handleSubmit(event) {
    event.preventDefault();
    const text = input.value;
    input.value = "";
    newId = toDos.length + 1;
    const toDoObj = {
        text : text,
        id : newId
    };
    paintToDo(toDoObj);
    saveToDos();
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    console.log("loading...");
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        console.log(parsedToDos);
        parsedToDos.forEach(paintToDo);
    }
}

function init() {
    console.log("to-do-list start");
    form.addEventListener("submit", handleSubmit);
    loadToDos();
}

init();