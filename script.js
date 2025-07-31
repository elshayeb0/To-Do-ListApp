document.addEventListener("DOMContentLoaded", () => {
  let tasks = [];

  const toDo = document.getElementById("todo-list");
  const toCompleted = document.getElementById("completed-list");
  const toDeleted = document.getElementById("deleted-list");

  const boardContainer = document.querySelector(".tasks-columns");
  const columnsContainer = document.querySelectorAll(".task-list");

  const taskForm = document.getElementById("add-task-form");
  const taskInput = document.getElementById("task-input");
  const btnSubmit = document.getElementById("task-btn");

  function clearBoard() {
    //Clears the task board everytime it's opened
    toDo.innerHTML = "";
    toCompleted.innerHTML = "";
    toDeleted.innerHTML = "";
  }

  function renderTasks() {
    clearBoard(); //Function call to clear everytime board is rendered

    tasks.forEach((task) => {
      //Task here is each task added which i will loop around

      const taskItem = document.createElement("div");
      taskItem.innerHTML = `<span class="task-text">${task.text}</span>
                  <button class="btn-delete">Delete</button>`;
      taskItem.dataset.id = task.id;
      taskItem.setAttribute("draggable", "true");
      taskItem.className = "task-item";

      if (task.status === "todo") {
        toDo.appendChild(taskItem);
      } else if (task.status === "completed") {
        toCompleted.appendChild(taskItem);
      } else if (task.status === "deleted") {
        toDeleted.appendChild(taskItem);
      }
    });
  }

  function addTask(text) {
    //Create a new task by user and add it to the tasks array above
    const newTask = { id: Date.now(), text: text, status: "todo" };
    tasks.push(newTask);
    renderTasks();
  }

  function loadTasksFromFile() {
    fetch("tasks.json")
      .then((response) => response.json())
      .then((data) => {
        tasks = data;
        renderTasks();
      })
      .catch((error) => {
        console.error("Error loading tasks:", error);
      });
  }

  boardContainer.addEventListener("dragstart", (event) => {
    //Set event listener only for task items if found we get the id from the dataset

    if (event.target.classList.contains("task-item")) {
      event.dataTransfer.setData("text/plain", event.target.dataset.id);
      event.target.classList.add("is-dragging");
    }
  });

  columnsContainer.forEach((column) => {
    column.addEventListener("dragenter", (event) => {
      event.preventDefault();
      event.currentTarget.classList.add("drag-over");
    });

    column.addEventListener("dragleave", (event) => {
      event.currentTarget.classList.remove("drag-over");
    });

    column.addEventListener("dragover", (event) => {
      // Tell the browser it's okay to drop an element
      event.preventDefault();
    });

    column.addEventListener("drop", (event) => {
      event.preventDefault();
      event.currentTarget.classList.remove("drag-over");

      const taskId = event.dataTransfer.getData("text/plain");
      const newStatus = event.currentTarget.id.replace("-list", "");

      const taskToUpdate = tasks.find((task) => task.id == taskId);
      if (taskToUpdate) {
        taskToUpdate.status = newStatus;
      }

      renderTasks();
    });
  });

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (text !== "") {
      addTask(text); //Added Later
    }

    taskInput.value = "";
  });

  boardContainer.addEventListener("click", (event) => {
    //Comment for Mark Here
    const clickedElement = event.target;

    if (clickedElement.classList.contains("btn-delete")) {
      const taskItem = clickedElement.closest(".task-item");
      const taskId = taskItem.dataset.id;
      const taskToUpdate = tasks.find((task) => task.id == taskId);
      taskToUpdate.status = "deleted";
    }

    renderTasks();
  });

  boardContainer.addEventListener("dragend", (event) => {
    if (event.target.classList.contains("is-dragging")) {
      event.target.classList.remove("is-dragging");
    }
  });

  loadTasksFromFile();
  //renderTasks();
});
