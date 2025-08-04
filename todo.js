 let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const form = document.getElementById("task-form");
    const list = document.getElementById("task-list");
    const search = document.getElementById("search");
    const statusFilter = document.getElementById("status-filter");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const task = document.getElementById("task-input").value.trim();
      const dueDate = document.getElementById("due-date").value;
      const category = document.getElementById("category").value;
      const priority = document.getElementById("priority").value;

      if (task === "") return;
      tasks.push({ text: task, dueDate, category, priority, completed: false });
      document.getElementById("task-input").value = "";
      saveTasks();
    });

    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    }

    function renderTasks() {
      list.innerHTML = "";
      let filtered = tasks.filter((t) =>
        t.text.toLowerCase().includes(search.value.toLowerCase())
      );
      if (statusFilter.value === "completed") {
        filtered = filtered.filter((t) => t.completed);
      } else if (statusFilter.value === "pending") {
        filtered = filtered.filter((t) => !t.completed);
      }

      filtered.forEach((t, i) => {
        const li = document.createElement("li");
        li.className = `task-item ${t.completed ? "completed" : ""}`;
        li.innerHTML = `
          <div class="details">
            <strong>${t.text}</strong>
            <small>${t.dueDate || "No date"}</small>
          </div>
          <div class="task-tags">${t.category} | Priority: ${t.priority}</div>
          <div class="task-controls">
            <button onclick="toggleComplete(${i})">✔</button>
            <button onclick="editTask(${i})">✏</button>
            <button onclick="deleteTask(${i})">🗑</button>
          </div>
        `;
        list.appendChild(li);
      });

      document.getElementById("total-tasks").textContent = tasks.length;
      document.getElementById("completed-tasks").textContent =
        tasks.filter((t) => t.completed).length;
      document.getElementById("pending-tasks").textContent =
        tasks.filter((t) => !t.completed).length;
    }

    function deleteTask(i) {
      tasks.splice(i, 1);
      saveTasks();
    }

    function toggleComplete(i) {
      tasks[i].completed = !tasks[i].completed;
      saveTasks();
    }

    function editTask(i) {
      const newText = prompt("Edit task:", tasks[i].text);
      if (newText !== null && newText.trim() !== "") {
        tasks[i].text = newText.trim();
        saveTasks();
      }
    }

    function filterTasks() {
      renderTasks();
    }

    function clearTasks() {
      if (confirm("Are you sure you want to delete all tasks?")) {
        tasks = [];
        saveTasks();
      }
    }

    renderTasks();
  

