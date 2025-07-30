document.addEventListener('DOMContentLoaded', () => {

    const taskForm = document.getElementById('input-task-form');
    const inputField = document.getElementById('task-input');
    const listView = document.getElementById('task-list-view');

    let tasks = [];

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const text = inputField.value.trim();

        if (text !== '') {
            addTask(text);
            inputField.value = '';
        }
    });

    listView.addEventListener('click', (event) => {
        const clickedElement = event.target;
        const taskItem = clickedElement.closest('.task-item');

        if (clickedElement.classList.contains('btn-delete')) {
            const id = taskItem.dataset.id;
            deleteTask(id);
        } else if (clickedElement.classList.contains('task-text')) {
            const id = taskItem.dataset.id;
            toggleComplete(id);
        }
    });

    function addTask(text) {
        const task = {
            id: Date.now(),
            text: text,
            completed: false
        }
        tasks.push(task);
        renderTasks();
    }

    function renderTasks() {
        listView.innerHTML = '';

        tasks.forEach((task) => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.setAttribute('data-id', task.id);

            if (task.completed) {
                li.classList.add('completed');
            }

            li.innerHTML = `<span class="task-text">${task.text}</span><button class="btn-delete">Delete</button>`;

            listView.appendChild(li);
        });
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== Number(id));
        renderTasks();
    }

    function toggleComplete(id) {
        const taskToToggle = tasks.find(task => task.id == id);
        taskToToggle.completed = !taskToToggle.completed;
        renderTasks();
    }

});