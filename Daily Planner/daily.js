// Load tasks from localStorage when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    updateStats();
    
    // Add event listener for Enter key in task input
    document.getElementById('taskInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Theme toggle functionality
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
});

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("taskList");

    let li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div class="task-actions">
            <button class="btn btn-success btn-sm" onclick="toggleComplete(this)">
                <i class="fas fa-check"></i>
            </button>
            <button class="btn btn-danger btn-sm" onclick="removeTask(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    taskList.appendChild(li);
    taskInput.value = "";
    
    saveTasks();
    updateStats();
}

function removeTask(button) {
    button.closest('li').remove();
    saveTasks();
    updateStats();
}

function toggleComplete(button) {
    const taskItem = button.closest('li');
    const taskText = taskItem.querySelector('.task-text');
    
    taskText.classList.toggle('completed');
    saveTasks();
    updateStats();
}

function clearCompleted() {
    const completedTasks = document.querySelectorAll('.task-text.completed');
    completedTasks.forEach(task => {
        task.closest('li').remove();
    });
    saveTasks();
    updateStats();
}

function clearAllTasks() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        document.getElementById('taskList').innerHTML = '';
        saveTasks();
        updateStats();
    }
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(item => {
        const text = item.querySelector('.task-text').textContent;
        const completed = item.querySelector('.task-text').classList.contains('completed');
        tasks.push({ text, completed });
    });
    localStorage.setItem('dailyPlannerTasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('dailyPlannerTasks');
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        const taskList = document.getElementById('taskList');
        
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `
                <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                <div class="task-actions">
                    <button class="btn btn-success btn-sm" onclick="toggleComplete(this)">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="removeTask(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }
}

function updateStats() {
    const totalTasks = document.querySelectorAll('#taskList li').length;
    const completedTasks = document.querySelectorAll('.task-text.completed').length;
    const pendingTasks = totalTasks - completedTasks;
    
    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('completedTasks').textContent = completedTasks;
    document.getElementById('pendingTasks').textContent = pendingTasks;
}

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeToggle').querySelector('i');
    
    if (body.classList.contains('bg-light')) {
        body.classList.remove('bg-light');
        body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('bg-light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}