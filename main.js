const taskInput =  document.querySelector("#taskInput");
const taskList =  document.querySelector("#taskList");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function addTask(){
    const date = new Date();
    const taskText = taskInput.value.trim();
    if(taskText === "") return;

    const task = {
        id: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
        text: taskText,
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    displayTasks();

}

function deleteTask(index){
    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}

function editTask(index){
    const newTask = prompt("Edit task:", tasks[index].text);

    if(newTask !== null){
        tasks[index].text = newTask;

        localStorage.setItem("tasks", JSON.stringify(tasks));

        displayTasks();
    }
}

function displayTasks(){
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${task.text}</span>
            <hr>
            <span>${task.id}</span>
            <hr>
            <div class="buttons-container">
                <button class="edit-button" onclick="editTask(${index})">Edit</button>
                <button class="delete-button" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}