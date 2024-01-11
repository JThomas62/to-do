// Task list array to store tasks
let tasks = [];

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // Clear the existing list

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.className = "task";
        listItem.innerHTML = `
            <span>${task}</span>
            <div class="task-actions">
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(listItem);
    });

    // Save tasks to local storage after rendering
    saveTasksToLocalStorage();
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        tasks.push(taskText);
        taskInput.value = ""; // Clear the input field
        renderTasks();
    }
}

// Function to edit a task
function editTask(index) {
    const listItem = document.querySelectorAll('.task')[index];
    const span = listItem.querySelector('span');
    const editInput = document.createElement('input');
    editInput.value = span.textContent;
    span.replaceWith(editInput);
    editInput.focus();

    editInput.addEventListener('blur', () => {
        span.textContent = editInput.value.trim();
        tasks[index] = span.textContent;
        renderTasks();
    });
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

// Event listener for the Add Task button
document.getElementById("addTaskBtn").addEventListener("click", addTask);

// Load tasks from local storage on page load
loadTasksFromLocalStorage();
