document.addEventListener('DOMContentLoaded',()=>{

    //Initilaized my essential HTML Elements
const taskForm = document.getElementById('input-task-form');
const inputField = document.getElementById('task-input');
const listView = document.getElementById('task-list-view');

let tasks = [] && JSON.parse(localStorage.getItem('tasks'));   // User's tasks will be regiserted here for any task manipulation
renderTasks();

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

    const clickedElement = event.target;
    const taskItem = clickedElement.closest('.task-item');

    if (event.target.classList.contains('btn-delete')) {                //Check if delete button is pressed
        const id = event.target.closest('.task-item').dataset.id;           //Elzero tips again

        deleteTask(id);             //Delete bbutton
    }
    else if (clickedElement.classList.contains('task-text')) {
        const id = taskItem.dataset.id;
        toggleComplete(id);        //mark as completed
    }
});

function addTask(text){

    const task = {                 //Initilaize task object that holds essential data
        id: Date.now(),              //To be used for deadlines
        text: text,                 // Use text variable
        completed: false            //Default to boolean false for tasks to be incomplete
    }
        tasks.push(task);                   //Add new task to array
        saveTasks(); 
        renderTasks();                      //Update the UI of the user
}

function renderTasks(){
    listView.innerHTML ='';                 //Empty list of tasks

    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = 'task-item';                     //Created li list for the list view of the user's tasks

        li.setAttribute('data-id', task.id);            //Differentiate between which task to delete

        if (task.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `<span>${task.text}</span><button class="btn-delete">Delete</button>`;

        listView.appendChild(li);
    });            
    
}

function deleteTask(id){
     tasks = tasks.filter(task => task.id != id);          
    saveTasks();
    renderTasks();                                          //Update tasks array
    
}

function toggleComplete(id) {
    const taskToToggle = tasks.find(task => task.id == id);
    taskToToggle.completed = !taskToToggle.completed;
    saveTasks(); 
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



});