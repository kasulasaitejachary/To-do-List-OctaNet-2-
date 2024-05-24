const container = document.getElementById("container");
const clearBtn = document.getElementById("clearBtn");

// Function to load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task, index) => {
    addTaskElement(task.text, task.checked, index);
  });
}


// Function to save tasks to local storage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".todo").forEach((todo, index) => {
    const text = todo.querySelector(`#input-value-${index}`).value;
    const checked = todo.querySelector(`#checkbox-${index}`).checked;
    tasks.push({ text, checked });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Function to handle checkbox click
function handleCheckboxClick(event, index) {
  const input = document.querySelector(`#input-value-${index}`);
  if (input.value.trim() === '') {
      alert('Please enter a task before checking the box.');
      event.target.checked = false;
  } else {
      saveTasks();
  }
}


// Function to create a task element and append it to the container
function addTaskElement(text = "", checked = false, index) {
  const todoDiv = document.createElement("div");
  todoDiv.className = "todo";

  const inputValue = document.createElement("input");
  inputValue.className = "input-value";
  inputValue.type = "text";
  inputValue.placeholder = "(empty)";
  inputValue.id = `input-value-${index}`;
  inputValue.value = text;
  inputValue.oninput = saveTasks;

  const checkbox = document.createElement("input");
  checkbox.className = "checkbox";
  checkbox.type = "checkbox";
  checkbox.id = `checkbox-${index}`;
  checkbox.checked = checked;
  
  // checkbox.onclick = saveTasks;
  checkbox.onclick = (event) => handleCheckboxClick(event, index);

  todoDiv.appendChild(inputValue);
  todoDiv.appendChild(checkbox);

  container.appendChild(todoDiv);

}

function deleteAll() {
  localStorage.removeItem('tasks');
  while (container.firstChild) {
      container.removeChild(container.firstChild);
  }
  initialize();
}

// Initial setup to load tasks and create empty inputs if necessary
function initialize() {
  loadTasks();
  const tasksCount = document.querySelectorAll(".todo").length;
  for (let i = tasksCount; i < 9; i++) {
    addTaskElement("", false, i);
  }
}

// Initialize the to-do list
initialize();
