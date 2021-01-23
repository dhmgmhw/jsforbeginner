const toDoForm = document.querySelector('.js-toDoForm'),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.js-Pending');
    DoneList = document.querySelector('.js-Finished');

const Pending_LS = 'PENDING';
const Finished_LS = 'FINISHED';

let PENDING = [];
let FINISHED = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanPending = PENDING.filter(function(toDo){
            return toDo.id !== parseInt(li.id);
    });
    PENDING = cleanPending;
    savePending();
}

function checkToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    DoneList.appendChild(li);
    const cleanFinished = FINISHED.filter(function(toDo){
            return toDo.id !== parseInt(li.id);
    });
    FINISHED = cleanFinished;
    savePending();
}


function savePending(){
    localStorage.setItem(Pending_LS, JSON.stringify(PENDING));
}

function saveFinished(){
    localStorage.setItem(Finished_LS, JSON.stringify(FINISHED));
}

function paintToDo(text){
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const doneBtn = document.createElement('button');
    const newId = PENDING.length + 1;
    delBtn.innerText = '❌';
    doneBtn.innerText = '✅';
    delBtn.addEventListener('click', deleteToDo);
    doneBtn.addEventListener('click', checkToDo);
    const span = document.createElement('span');
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(doneBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    PENDING.push(toDoObj);
    savePending();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadPending(){
    const loadedPending = localStorage.getItem(Pending_LS);
    if (loadedPending !== null){
        const parsedPending = JSON.parse(loadedPending);
        parsedPending.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function init(){
    loadPending();
    toDoForm.addEventListener('submit', handleSubmit);
}
init();