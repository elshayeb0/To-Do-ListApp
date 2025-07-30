document.addEventListener('DOMContentLoaded' , ()=>{

    const tasks = [
        { id: 1, text: 'This is a sample text for todo column', status: 'todo' },
            
        { id: 2, text: 'This is a sample text for completed column', status: 'completed', },

        { id: 3, text: 'This is a sample text for deleted column', status: 'deleted' }
    ]

    const toDo = document.getElementById('todo-list');
    const toCompleted = document.getElementById('completed-list');
    const toDeleted = document.getElementById('deleted-list');

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

    renderTasks();





















});