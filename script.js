// Selecting elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const deleteAllBtn = document.getElementById('delete-all-btn');
const taskList = document.getElementById('task-list');

// Load tasks on window load
window.onload = function() {
    loadTasks();
};

// Add a new task
addTaskBtn.addEventListener('click', addTask);

// Delete all tasks
deleteAllBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to delete all tasks?')) {
        localStorage.clear();
        taskList.innerHTML = '';
    }
});

// Function to add task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    createTaskElement(taskText);
    saveTask(taskText);
    taskInput.value = '';
}

// Create task element
function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div class="task-buttons">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    taskList.appendChild(li);

    // Complete task on click
    li.querySelector('.task-text').addEventListener('click', function() {
        li.classList.toggle('completed');
    });

    // Edit task
    li.querySelector('.edit-btn').addEventListener('click', function() {
        const newTaskText = prompt('Edit your task:', taskText);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            updateTask(taskText, newTaskText.trim());
            li.querySelector('.task-text').textContent = newTaskText.trim();
        }
    });

    // Delete task
    li.querySelector('.delete-btn').addEventListener('click', function() {
        if (confirm('Delete this task?')) {
            li.remove();
            deleteTask(taskText);
        }
    });
}

// Save task to local storage
function saveTask(task) {
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task in local storage
function updateTask(oldTask, newTask) {
    let tasks = getTasks();
    const index = tasks.indexOf(oldTask);
    if (index > -1) {
        tasks[index] = newTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Load tasks from local storage
function loadTasks() {
    let tasks = getTasks();
    tasks.forEach(taskText => {
        createTaskElement(taskText);
    });
}

// Get tasks from local storage
function getTasks() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Delete a task from local storage
function deleteTask(taskText) {
    let tasks = getTasks();
    tasks = tasks.filter(t => t !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
