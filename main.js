const inputContainer = document.getElementById("input-container");
const inputBox = document.getElementById("input-box");
const saveEditButton = document.getElementById("saveEdit");
const listContainer = document.getElementById("list-container");
const addTaskButton = document.getElementById("addTaskButton");

const data = [
  {
    taskName: "2222",
    isHidden: false,
    isCompleted: false,
    isEditing: false,
  },
  {
    taskName: "33333",
    isHidden: false,
    isCompleted: false,
    isEditing: false,
  },
];

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something");
  } else {
    data.push({
      taskName: inputBox.value,
      isHidden: false,
      isCompleted: false,
    });
  }
  inputBox.value = "";
  showTask();
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    data[+e.target.id].isCompleted = !data[+e.target.id].isCompleted;
  } else if (e.target.tagName === "SPAN") {
    data.splice(+e.target.parentElement.id, 1);
  } else if (e.target.tagName === "SPAN1") {
    inputBox.value = data[+e.target.parentElement.id].taskName;
    data[+e.target.parentElement.id].isEditing = true;
    const saveEditButton = document.createElement("button");
    const cancelEditButton = document.createElement("button");
    addTaskButton.setAttribute("hidden", true);
    cancelEditButton.innerHTML = "&#9746";
    cancelEditButton.id = "cancelEdit";
    saveEditButton.innerHTML = "&#9745";
    saveEditButton.id = "saveEdit";

    saveEditButton.onclick = () => {
      data[+e.target.parentElement.id].isEditing = false;
      data[+e.target.parentElement.id].taskName = inputBox.value;
      showTask();
      inputBox.value = "";
      cancelEditButton.remove();
      saveEditButton.remove();
      addTaskButton.removeAttribute("hidden");
    };

    cancelEditButton.onclick = () => {
      data[+e.target.parentElement.id].isEditing = false;
      showTask();
      inputBox.value = "";
      cancelEditButton.remove();
      saveEditButton.remove();
      addTaskButton.removeAttribute("hidden");
    };

    inputContainer.appendChild(saveEditButton);
    inputContainer.appendChild(cancelEditButton);
  }
  showTask();
});

function showTask() {
  listContainer.innerHTML = "";
  data.forEach((task, index) => {
    // Create task name
    const taskElement = document.createElement("li");
    // Create content like titles and text
    taskElement.innerHTML = task.taskName;
    taskElement.id = index;

    // Add element to list
    listContainer.appendChild(taskElement);

    let span = document.createElement("span");
    span.innerHTML = "x";
    taskElement.appendChild(span);

    let span1 = document.createElement("span1");
    span1.innerHTML = "&#9998";
    span1.className = 'edit';
    taskElement.appendChild(span1);

    if (task.isCompleted) {
      taskElement.className = "checked";
    }
    if (task.isHidden || task.isEditing) {
      taskElement.setAttribute("hidden", true);
    } else {
      taskElement.removeAttribute("hidden");
    }
  });
}
showTask();

function showCompletedTask() {
  data.forEach(({ isCompleted }, index) => {
    data[index].isHidden = !isCompleted;
  });

  showTask();
}
e.target.id