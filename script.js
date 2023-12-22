let addBtn = document.querySelector('.add-btn');
let modal = document.querySelector('.modal-cont');
let addTask = document.querySelector('.add-task');
let mainTicketCont = document.querySelector('.main-ticket-cont');
let prioritySelect = document.querySelector('.priority-color-cont');
let toolBoxCont = document.querySelector('.toolbox-cont');
let addModal = true;
let lastClickedPriority;
let taskColor = 'light-red';
let removeBtn = document.querySelector('.remove-btn');
let removeTasks = false;
let colorIndex = 0;
let colorMap = { 'light-red': 0, 'light-green': 1, 'sky-blue': 2, 'grey-black': 3};


addBtn.addEventListener('click', function () {
    if(addModal){
        modal.style.display = 'flex'; // show the modal
    }
    else{
        modal.style.display = 'none'; // hide the modal
    }
    addModal = !addModal;
});

addTask.addEventListener('keydown', function (e) {
    let key = e.key;
    if(key == 'Enter'){
        if(addTask.value == ""){
            alert('Please enter a task');
            return;
        }
        generateTask(e.target.value);
        addTask.value = "";
        modal.style.display = 'none';
        addModal = true;
    }
});

prioritySelect.addEventListener('click', function (e) {
    e.target.classList.add('active');
    if(lastClickedPriority){
        lastClickedPriority.classList.remove('active');
    }
    lastClickedPriority = e.target;

    taskColor = e.target.classList[1];
});

// Initialise the unique id generator
var uid = new ShortUniqueId();


function generateTask(task,priorityColor) {
    let id = uid.rnd();
    let ticketCont = document.createElement('div');
    ticketCont.className = 'ticket-cont';
    ticketCont.innerHTML = `<div class="ticket-color ${taskColor}">
                            </div><div class="ticket-id">${id}</div>
                            <div class="ticket-area">${task}</div>
                            <div class="lock"><i class="fa-solid fa-lock"></i></div>`;
    console.log(ticketCont);
    mainTicketCont.appendChild(ticketCont);
}

removeBtn.addEventListener('click', function () {
    removeTasks = !removeTasks;
    if (removeTasks) {
        removeBtn.classList.add('red');
        mainTicketCont.addEventListener('click', removeTicket);
    } else {
        removeBtn.classList.remove('red');
        mainTicketCont.removeEventListener('click', removeTicket);
    }
});

function removeTicket(e) {
    if (e.target.parentNode.classList.contains('ticket-cont')) {
        e.target.parentNode.remove();
        console.log(removeTasks);
    }
}

toolBoxCont.addEventListener('click', function (e) {
    console.log(e.target);
    let selectedTool = e.target.classList[1];
    console.log(selectedTool);
    for (let i = 0; i < mainTicketCont.children.length; i++) {
        let ticket = mainTicketCont.children[i];
        let ticketColor = ticket.children[0].classList[1];
        console.log(ticketColor);

    }
});

mainTicketCont.addEventListener('click', function (e) {
    console.log(e.target);
    console.log(e.target.parentNode);
    if(e.target.classList.contains('ticket-color')) {
        colorIndex = colorMap[e.target.classList[1]];
        e.target.classList.remove(e.target.classList[1]);
        colorIndex = (colorIndex + 1) % 4;
        e.target.classList.add(Object.keys(colorMap)[colorIndex]);
    }
    if(e.target.parentNode.classList.contains('lock')) {
        let taskArea = e.target.parentNode.parentNode.children[2];
        console.log(taskArea);
        if(e.target.classList.contains('fa-lock')){
            e.target.classList.remove('fa-lock');
            e.target.classList.add('fa-lock-open');
            taskArea.setAttribute('contenteditable', 'true');
        }
        else{
            e.target.classList.remove('fa-lock-open');
            e.target.classList.add('fa-lock');
            taskArea.setAttribute('contenteditable', 'false');
        }
    }
});