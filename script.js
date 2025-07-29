document.addEventListener('DOMContentLoaded',()=>{

    //Initilaized my essential HTML Elements
const taskForm = document.getElementById('input-task-form');
const inputField = document.getElementById('task-input');
const listView = document.getElementById('task-list-view');

let tasks =[];   // User's tasks will be regiserted here for any task manipulation


taskForm.addEventListener('submit', (event) =>{
        event.preventDefault();

        const text = inputField.value.trim();    //Get user's clean text - Osama el zero's tips

        //Edge case if user input's is empty

         if (text !== '') {
            addTask(text);
            inputField.value = '';      // Box gets cleared for user to type again
        }
});

listView.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-delete')) {                //Check if delete button is pressed
        const id = event.target.closest('.task-item').dataset.id;           //Elzero tips again

        deleteTask(id);
    }
});

function addTask(text){

    const task = {                 //Initilaize task object that holds essential data
        id: Date.now(),              //To be used for deadlines
        text: text,                 // Use text variable
        completed: false            //Default to boolean false for tasks to be incomplete
    }
        tasks.push(task);                   //Add new task to array
        renderTasks();                       //Update the UI of the user
}

function renderTasks(){
    listView.innerHTML ='';                 //Empty list of tasks

    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = 'task-item';                     //Created li list for the list view of the user's tasks

        li.setAttribute('data-id', task.id);            //Differentiate between which task to delete

        li.innerHTML = `<span>${task.text}</span><button class="btn-delete">Delete</button>`;

        listView.appendChild(li);
    });            
    
}

function deleteTask(id){
     tasks = tasks.filter(task => task.id != id);          //
    renderTasks();                                      //Update tasks array
}









});