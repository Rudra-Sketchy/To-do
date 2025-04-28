// Selecting elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
window.onload = function() {
    loadTasks();
};

// Add task button click
addTaskBtn.addEventListener('click', addTask);

// Add task function
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
        ${taskText}
        <button class="delete-btn">Delete</button>
    `;

    taskList.appendChild(li);
    saveTask(taskText);

    // Clear input
    taskInput.value = '';

    // Attach delete functionality
    li.querySelector('.delete-btn').addEventListener('click', function() {
        li.remove();
        deleteTask(taskText);
    });
}

// Save task to local storage
function saveTask(task) {
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    let tasks = getTasks();
    tasks.forEach(taskText => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${taskText}
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(li);

        li.querySelector('.delete-btn').addEventListener('click', function() {
            li.remove();
            deleteTask(taskText);
        });
    });
}

// Get tasks from local storage
function getTasks() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Delete task from local storage
function deleteTask(taskText) {
    let tasks = getTasks();
    tasks = tasks.filter(t => t !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
