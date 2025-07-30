document.addEventListener('DOMContentLoaded' , ()=>{

    const tasks = [
        { id: 1, text: 'This is a sample text for todo column', status: 'todo' },
            
        { id: 2, text: 'This is a sample text for completed column', status: 'completed', },

        { id: 3, text: 'This is a sample text for deleted column', status: 'deleted' }
    ]

    const toDo = document.getElementById('todo-list');
    const toCompleted = document.getElementById('completed-list');
    const toDeleted = document.getElementById('deleted-list');

    const boardContainer = document.querySelector('.tasks-columns');    
    const columnsContainer = document.querySelectorAll('.task-list');    

    const taskForm = document.getElementById('add-task-form');
    const taskInput = document.getElementById('task-input');
    const btnSubmit = document.getElementById('task-btn');


    function clearBoard(){                          //Clears the task board everytime it's opened
       toDo.innerHTML = '';
       toCompleted.innerHTML = '';
       toDeleted.innerHTML = '';
    }

    function renderTasks(){                        
        clearBoard();                             //Function call to clear everytime board is rendered
    
        tasks.forEach(task => {                  //Task here is each task added which i will loop around

            const taskItem = document.createElement('div');
                taskItem.innerHTML = task.text;
                taskItem.dataset.id = task.id;
                taskItem.setAttribute('draggable','true');
                taskItem.className = 'task-item';


            if(task.status === 'todo'){
                //Will add append logic here
               toDo.appendChild(taskItem);
            }

            else if(task.status === 'completed'){
                //Will add append logic here
               toCompleted.appendChild(taskItem);
            }

            else if(task.status === 'deleted'){
                //Will add append logic here
               toDeleted.appendChild(taskItem);
            }

        });
    }

    function addTask(text){                             //Create a new task by user and add it to the tasks array above
        const newTask = { id: Date.now(), text: text, status: 'todo' }
        tasks.push(newTask);        
        renderTasks();                           
    }
       


    boardContainer.addEventListener('dragstart', (event)=>{                    //Set event listener only for task items if found we get the id from the dataset
        if(event.target.classList.contains('task-item')){
            event.dataTransfer.setData('text/plain', event.target.dataset.id);
        }
    });

    columnsContainer.forEach(column => {
    
        column.addEventListener('dragover', (event)=>{       // Tell the browser it's okay to drop an element
            event.preventDefault();
        });

        column.addEventListener('drop', (event) => {    
        event.preventDefault();

        const taskId = event.dataTransfer.getData('text/plain');
        const newStatus = event.currentTarget.id.replace('-list', '');

        const taskToUpdate = tasks.find(task => task.id == taskId);
        taskToUpdate.status = newStatus;

            renderTasks();
        });

    });

    taskForm.addEventListener('submit', (event)=>{
        event.preventDefault();

        const text = taskInput.value.trim();

        if(text !== ''){
            addTask(text);                          //Added Later
        }

        taskInput.value = '';

    });


    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    renderTasks();
});