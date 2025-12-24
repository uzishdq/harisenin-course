// Data
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let profile = {
  name: localStorage.getItem("profileName") || "Harisenin",
  job: localStorage.getItem("profileJob") || "Student",
};

// Load profile
document.getElementById("profileName").textContent = profile.name;
document.getElementById("profileJob").textContent = profile.job;

const today = new Date().toISOString().split("T")[0];
document.getElementById("dueDate").value = today;
document.getElementById("filterDate").value = today;

document.getElementById("date").textContent = new Date().toLocaleDateString(
  "id-ID",
  {
    weekday: "long",
    day: "numeric",
    month: "long",
  }
);

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveProfile() {
  const newName = document.getElementById("editName").value.trim();
  const newJob = document.getElementById("editJob").value.trim();

  if (newName) profile.name = newName;
  if (newJob) profile.job = newJob;

  localStorage.setItem("profileName", profile.name);
  localStorage.setItem("profileJob", profile.job);

  document.getElementById("profileName").textContent = profile.name;
  document.getElementById("profileJob").textContent = profile.job;

  closeProfileModal();
}

// Modal Control
let pendingAction = null;

function showModal(action) {
  pendingAction = action;
  const overlay = document.getElementById("confirmModal");
  const task = document.getElementById("confirmTitle");
  const message = document.getElementById("confirmMessage");

  if (action === "clearAll") {
    task.textContent = "Delete All Todos";
    message.textContent = "Are you sure you want to delete all todos?";
  } else if (action.startsWith("delete:")) {
    task.textContent = "Delete Todo";
    message.textContent = "Are you sure you want to delete this todo?";
  }

  overlay.style.display = "flex";
}

function closeConfirmModal() {
  document.getElementById("confirmModal").style.display = "none";
  pendingAction = null;
}

function confirmAction() {
  if (pendingAction === "clearAll") {
    tasks = [];
    saveTasks();
    render();
  } else if (pendingAction.startsWith("delete:")) {
    const index = parseInt(pendingAction.split(":")[1]);
    tasks.splice(index, 1);
    saveTasks();
    render();
  }
  closeConfirmModal();
}

document.getElementById("confirmActionBtn").onclick = confirmAction;

// Profile Modal
function showProfileModal() {
  document.getElementById("editName").value = profile.name;
  document.getElementById("editJob").value = profile.job;
  document.getElementById("profileModal").style.display = "flex";
}

function closeProfileModal() {
  document.getElementById("profileModal").style.display = "none";
}

// Core Functions
function addTask() {
  const task = document.getElementById("task").value.trim();
  const dueDate = document.getElementById("dueDate").value;
  const priority = document.getElementById("priority").value;

  if (!task || !dueDate) {
    alert("Task and Date must be filled in!");
    return;
  }

  tasks.push({ task, dueDate, priority, done: false });
  document.getElementById("task").value = "";
  saveTasks();
  render();
}

// Overdue
function isOverdue(task) {
  if (task.done) return false;

  const today = new Date().toISOString().split("T")[0];
  return task.dueDate < today;
}

function formatDate(dateStr, includeDayName = true) {
  if (!dateStr) return "-";

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr; // fallback jika format salah

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  if (includeDayName) {
    options.weekday = "long";
  }

  return date.toLocaleDateString("id-ID", options);
}

function toggle(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  render();
}

function render() {
  const filterDate = document.getElementById("filterDate").value || today;
  const todoEl = document.getElementById("todoList");
  const doneEl = document.getElementById("doneList");
  const overdueEl = document.getElementById("overdueList");

  todoEl.innerHTML = "";
  doneEl.innerHTML = "";
  overdueEl.innerHTML = "";

  const overdueTasks = tasks.filter(isOverdue);

  if (overdueTasks.length > 0) {
    overdueTasks.forEach((task) => {
      const globalIndex = tasks.indexOf(task);
      const item = document.createElement("div");
      item.className = `todo-item overdue-item${task.done ? " completed" : ""}`;

      item.innerHTML = `
        <input type="checkbox" class="checkbox" 
               ${task.done ? "checked" : ""} 
               onchange="toggle(${globalIndex})">
        <div style="flex:1">
          <div class="task">${task.task}</div>
          <div class="meta">Priority: ${task.priority} - Overdue: ${formatDate(
        task.dueDate
      )}</div>
        </div>
        <button class="btn-delete" onclick="showModal('delete:${globalIndex}')">×</button>
      `;

      overdueEl.appendChild(item);
    });
  } else {
    overdueEl.innerHTML =
      '<div class="empty">No tasks are overdue / late ✓</div>';
  }

  const filtered = tasks.filter(
    (t) => t.dueDate === filterDate && !isOverdue(t)
  );

  if (filtered.length === 0) {
    todoEl.innerHTML =
      '<div class="empty">There are no tasks for this date...</div>';
  } else {
    filtered.forEach((task) => {
      const globalIndex = tasks.indexOf(task);
      const item = document.createElement("div");
      item.className = `todo-item${task.done ? " completed" : ""}`;

      item.innerHTML = `
        <input type="checkbox" class="checkbox" 
               ${task.done ? "checked" : ""} 
               onchange="toggle(${globalIndex})">
        <div style="flex:1">
          <div class="task">${task.task}</div>
          <div class="meta priority-${task.priority}">Priority: ${
        task.priority
      }</div>
        </div>
        <button class="btn-delete" onclick="showModal('delete:${globalIndex}')">×</button>
      `;

      if (task.done) doneEl.appendChild(item);
      else todoEl.appendChild(item);
    });
  }

  // Empty state untuk done
  if (doneEl.children.length === 0) {
    doneEl.innerHTML = '<div class="empty">No Tasks Completed Yet</div>';
  }
}

// Enter key support
document.getElementById("task").addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

render();
