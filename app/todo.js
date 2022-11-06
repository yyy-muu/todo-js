// window.addEventListener("load", () => {
//   const form = document.querySelector("#js-form");
//   const input = document.querySelector("#js-form-input");
//   const tasks = document.querySelector("#js-each-tasks");
//   // 完了済みタスク数
//   let doneTasksCount = document.getElementById("js-todo-count-done");
//   // 未完了タスク数
//   let notYetTasksCount = document.getElementById("js-todo-count-not-yet");

//   // 保存ボタンを押すと発火
//   form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     // タスク入力内容を変数として定義
//     const newTask = input.value;

//     // タスク未入力の場合は保存せずアラートを出す
// if (!newTask) {
//   alert("タスク内容を入力してください");
//   return false;
// }

//     // 未完了タスク数に加算
//     notYetTasksCount.innerHTML++;

//     // 新規保存したタスクをdiv要素として生成
//     const taskElement = document.createElement("div");
//     taskElement.classList.add("task");

//     const taskContentElement = document.createElement("div");
//     taskContentElement.classList.add("content");

//     const taskCheckFormElement = document.createElement("form");
//     taskCheckFormElement.setAttribute("name", "checkForm");

//     // タスク内容を子要素として親要素に追加
//     const taskInputElement = document.createElement("input");
//     taskInputElement.classList.add("task-text");
//     taskInputElement.type = "text";
//     taskInputElement.setAttribute("readonly", "readonly");
//     taskInputElement.value = newTask;

//     // チェックボックスを追加
//     const taskCheckBoxElement = document.createElement("input");
//     taskCheckBoxElement.classList.add("task-checkbox");
//     taskCheckBoxElement.type = "checkbox";
//     taskCheckBoxElement.setAttribute("id", "js-checkbox");

//     taskCheckFormElement.appendChild(taskCheckBoxElement);
//     taskCheckFormElement.appendChild(taskInputElement);

//     taskContentElement.appendChild(taskCheckFormElement);
//     taskElement.appendChild(taskContentElement);

//     // 編集・削除ボタン周りの要素を追加
//     const taskActionsElement = document.createElement("div");
//     taskActionsElement.classList.add("actions");

//     // ボタン要素を追加
//     const taskEditElement = document.createElement("button");
//     taskEditElement.classList.add("edit-button");
//     taskEditElement.innerHTML = "編集";

//     const taskDeleteElement = document.createElement("button");
//     taskDeleteElement.classList.add("delete-button");
//     taskDeleteElement.innerHTML = "削除";

//     taskActionsElement.appendChild(taskEditElement);
//     taskActionsElement.appendChild(taskDeleteElement);

//     taskElement.appendChild(taskActionsElement);

//     tasks.appendChild(taskElement);

//     // タスク保存後、入力欄をクリアにする
//     input.value = "";

//     // タスク編集
//     taskEditElement.addEventListener("click", () => {
//       if (taskEditElement.innerText === "編集") {
//         taskInputElement.removeAttribute("readonly");
//         taskInputElement.focus();
//         taskEditElement.innerText = "保存";
//       } else {
//         taskInputElement.setAttribute("readonly", "readonly");
//         taskEditElement.innerText = "編集";
//       }
//     });
//     // 全タスク数
//     let allTasks = document.querySelector("#js-todo-count-all");
//     let allTasksCount =
//       document.querySelector("#js-each-tasks").children.length;
//     allTasks.innerText = allTasksCount;

//     // タスク削除
//     taskDeleteElement.addEventListener("click", () => {
//       // confirm("本当によろしいですか？");
//       const checkStatus = document.getElementById("js-checkbox");
//       tasks.removeChild(taskElement);
//       // console.log(checkStatus.checked);
//       if (checkStatus.checked === true) {
//         doneTasksCount.innerHTML--;
//       } else {
//         notYetTasksCount.innerHTML--;
//       }
//       allTasks.innerHTML--;
//     });

//     // タスクチェック管理
//     const checkBoxes = document.querySelectorAll(".task-checkbox");

//     let count = 0;

//     for (let i = 0; i < checkBoxes.length; i++) {
//       checkBoxes[i].addEventListener("click", function () {
//         if (this.checked == true) {
//           count++;
//         } else {
//           count--;
//         }

//         document.getElementById("js-todo-count-done").innerHTML = count;
//         document.getElementById("js-todo-count-not-yet").innerHTML =
//           allTasksCount - count;
//       });
//     }
//   });
// });

function taskStatusCheck() {
  // タスク数を取得
  let countAll = document.getElementById("countAll");
  let countDone = document.getElementById("countDone");
  let countNotYet = document.getElementById("countNotYet");

  // チェックボックスのチェック有無判定
  let checkedTask = document.querySelectorAll("input[type=checkbox]:checked");
  let unCheckedTask = document.querySelectorAll(
    "input[type=checkbox]:not(:checked)"
  );

  // タスク数を反映
  countAll.innerHTML = checkedTask.length + unCheckedTask.length;
  countDone.innerHTML = checkedTask.length;
  countNotYet.innerHTML = unCheckedTask.length;
}

// タスク単体の生成
function createTask(inputTaskValue, taskCheckForm) {
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.setAttribute("onclick", "taskStatusCheck()");

  const taskContent = document.createElement("label");
  taskContent.appendChild(document.createTextNode(inputTaskValue));

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.innerText = "編集";
  editButton.setAttribute("onclick", "editTask(event)");
  editButton.setAttribute("id", "editButton");

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.innerText = "削除";
  deleteButton.setAttribute("onclick", "deleteTask(event)");
  deleteButton.setAttribute("id", "deleteButton");

  taskCheckForm.appendChild(checkBox);
  taskCheckForm.appendChild(taskContent);
  taskCheckForm.appendChild(editButton);
  taskCheckForm.appendChild(deleteButton);
}

// タスク保存
function saveTask(taskValue) {
  const inputTaskValue = document.getElementById(taskValue).value;
  if (!inputTaskValue) {
    // タスク未入力の場合は保存せずアラートを出す
    alert("タスク内容を入力してください");
  } else {
    const parentTaskList = document.getElementById("taskList");
    const taskCheckForm = document.createElement("form");
    taskCheckForm.setAttribute("id", "taskCheckForm");
    createTask(inputTaskValue, taskCheckForm);
    parentTaskList.appendChild(taskCheckForm);
    taskStatusCheck();
    // タスク保存後、入力欄をクリアにする
    document.getElementById("inputTaskForm").reset();
  }
}

function editTask(event) {
  let parent = event.target.parentElement;
  let editValue = parent.childNodes[1].textContent;
  let inputEditValue = document.createElement("input");
  // タスク表示部分の要素を編集可能にする
  inputEditValue.setAttribute("type", "text");
  inputEditValue.id = "edit";
  inputEditValue.value = editValue;

  while (parent.hasChildNodes()) {
    parent.removeChild(parent.firstChild);
  }
  let editButton = document.createElement("button");
  editButton.type = "button";
  editButton.innerText = "保存";
  editButton.id = "editButton";
  editButton.setAttribute("onclick", "inputEditedTaskValue(event)");

  parent.appendChild(inputEditValue);
  parent.appendChild(editButton);
}

function inputEditedTaskValue(event) {
  const inputValue = document.getElementById("edit").value;
  if (!inputValue) {
    // タスク未入力の場合は保存せずアラートを出す
    alert("タスク内容を入力してください");
  } else {
    const parent = event.target.parentElement;

    while (parent.hasChildNodes()) {
      parent.removeChild(parent.firstChild);
    }
    createTask(inputValue, parent);
    taskStatusCheck();
  }
}

function deleteTask(event) {
  if (confirm("本当によろしいですか？")) {
    let parent = event.target.parentElement;
    let checkbox = parent.parentElement;
    parent.remove();
    taskStatusCheck();
  } else {
    return;
  }
}

taskStatusCheck();
