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
        ${taskText}
        <button class="btn btn-danger btn-sm" onclick="removeTask(this)">X</button>
    `;

    taskList.appendChild(li);
    taskInput.value = "";  
}

function removeTask(button) {
    button.parentElement.remove();
}
