// Select elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const deleteAllBtn = document.getElementById('delete-all-btn');
const taskList = document.getElementById('task-list');
const emptyImage = document.getElementById('empty-image');
const toast = document.getElementById('toast');

// Add a task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    showToast('Please enter a task!', 'error');
    return;
  }

  const taskItem = document.createElement('li');
  taskItem.className = 'task-item';
  taskItem.innerHTML = `
    ${taskText}
    <span class="task-buttons">
      <i class="fas fa-edit" onclick="editTask(this)"></i>
      <i class="fas fa-trash" onclick="deleteTask(this)"></i>
    </span>
  `;
  taskList.appendChild(taskItem);
  taskInput.value = '';

  showToast('Task added successfully ✅', 'success');
  updateEmptyImage();
});

// Delete one task
function deleteTask(element) {
  const taskItem = element.closest('li');
  taskItem.classList.add('fadeOut');
  taskItem.addEventListener('animationend', () => {
    taskItem.remove();
    updateEmptyImage();
  });
  showToast('Task deleted 🗑️', 'success');
}

// Edit a task
function editTask(element) {
  const taskItem = element.closest('li');
  const newText = prompt('Edit your task:', taskItem.firstChild.textContent.trim());
  if (newText !== null && newText.trim() !== '') {
    taskItem.firstChild.textContent = newText.trim();
    showToast('Task updated ✏️', 'success');
  }
}

// Delete all tasks
deleteAllBtn.addEventListener('click', () => {
  taskList.innerHTML = '';
  updateEmptyImage();
  showToast('All tasks deleted 🗑️', 'success');
});

// Show/hide empty image
function updateEmptyImage() {
  if (taskList.children.length === 0) {
    emptyImage.style.display = 'block';
  } else {
    emptyImage.style.display = 'none';
  }
}

// Toast function
function showToast(message, type) {
  toast.textContent = message;
  toast.style.background = type === 'error' ? '#e74c3c' : '#4caf50';
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
  }, 2500);
}

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Change button text depending on mode
  if (document.body.classList.contains('dark-mode')) {
    darkModeToggle.textContent = '☀️ Light Mode';
  } else {
    darkModeToggle.textContent = '🌙 Dark Mode';
  }
});
