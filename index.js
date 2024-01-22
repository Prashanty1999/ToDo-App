let form=document.getElementById("form");
let textInput=document.getElementById("textInput");
let dateInput=document.getElementById("dateInput");
let textarea=document.getElementById("textarea");
let msg=document.getElementById("msg");
let add=document.getElementById("add");
let tasks=document.getElementById("tasks");

let data=[];

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    formvalidation();
});

let showTasks=()=> {
    let task = JSON.parse(localStorage.getItem('tasks'));
    tasks.innerHTML="";
    task.map((item, index) => {
        return(
            tasks.innerHTML +=`
            <div id="item" >
            <span class="fw-bold">${item.text}</span>
            <span class="small text-secondary" >${item.date}</span>
            <p>${item.description}</p>
            <span class="options" >
              <i class="bi bi-pencil-square" onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" ></i>
              <i class="bi bi-trash" onclick="deleteTask(this)" ></i>
            </span>
          </div>`
        );
    });
    resetForm();
};

let resetForm = () => {
        textInput.value='';
        dateInput.value='';
        textarea.value='';
};

let acceptdata = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });

    localStorage.setItem('tasks',JSON.stringify(data));
    showTasks();
    
    console.log(data)
};

let formvalidation =()=>{
    if(textInput.value===""){
        msg.innerHTML='*task title can not be blank';
    }else {
        msg.innerHTML="";
        acceptdata();
        add.setAttribute('data-bs-dismiss','modal');
        add.click();


        (() => {
            add.setAttribute('data-bs-dismiss','');
        })();
    }
};
//delete the tsk

let deleteTask = (e) => {
    console.log(e.parentElement.parentElement);
    //removing from dom   
    e.parentElement.parentElement.remove();
    //removing fromm data areay
    data.splice(e.parentElement.parentElement.id, 1);

    localStorage.setItem('tasks',JSON.stringify(data));
    console.log(data);
};

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
    console.log(selectedTask.children[1]);

    textInput.value=selectedTask.children[0].innerHTML;
    dateInput.value=selectedTask.children[1].innerHTML;
    textarea.value=selectedTask.children[2].innerHTML;

    //delete the previous task that u r ediating
    deleteTask(e);
};

(()=>{
    data=JSON.parse(localStorage.getItem('tasks')) || [];
    showTasks();
})();

