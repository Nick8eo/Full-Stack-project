const API = "http://localhost:8080/api/tasks";

async function loadTasks() {
    const res = await fetch(API);
    const tasks = await res.json();

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        const taskTitle = document.createElement("span");
        taskTitle.className = "task-title";
        taskTitle.textContent = task.title;
        taskTitle.onclick = () => toggleTask(task.id);

        if (task.completed) {
            li.classList.add("completed");
        }

        const delBtn = document.createElement("button");
        delBtn.className = "delete-btn";
        delBtn.textContent = "Delete";
        delBtn.onclick = (e) => {
            e.stopPropagation();
            deleteTask(task.id);
        };

        li.appendChild(taskTitle);
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

async function addTask() {
    const input = document.getElementById("taskInput");
    const title = input.value.trim();

    if (!title) return;

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title, completed: false })
    });

    input.value = "";
    input.focus();
    loadTasks();
}

async function deleteTask(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadTasks();
}

async function toggleTask(id) {
    await fetch(`${API}/${id}`, { method: "PUT" });
    loadTasks();
}

document.getElementById("addBtn").addEventListener("click", addTask);
document.getElementById("taskInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        addTask();
    }
});

loadTasks();