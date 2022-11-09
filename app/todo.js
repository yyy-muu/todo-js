// 編集ボタン作成
function createEditButton() {
  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.innerText = "編集";
  editButton.setAttribute("onclick", "editTask(event)");
  editButton.setAttribute("id", "editButton");
  return editButton;
}

// タスク単体の生成
function createTask(inputTaskValue, eachTask) {
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.setAttribute("onclick", "taskStatusCheck()");

  // タスク内容をチェックボックスボックスの値（label）とする
  const taskContent = document.createElement("label");
  taskContent.appendChild(document.createTextNode(inputTaskValue));

  const editButton = createEditButton();

  const deleteButton = createEditButton(); // 編集ボタンを削除ボタンに上書き生成
  deleteButton.innerText = "削除";
  deleteButton.setAttribute("onclick", "deleteTask(event)");
  deleteButton.setAttribute("id", "deleteButton");

  eachTask.appendChild(checkBox);
  eachTask.appendChild(taskContent);
  eachTask.appendChild(editButton);
  eachTask.appendChild(deleteButton);
}

// タスク保存
function saveTask(taskValue) {
  const inputTaskValue = document.getElementById(taskValue).value;
  if (!inputTaskValue) {
    // タスク未入力の場合は保存せずアラートを出す
    alert("タスク内容を入力してください");
  } else {
    const parentTaskList = document.getElementById("taskList");
    const eachTask = document.createElement("form");
    eachTask.setAttribute("id", "eachTask");
    createTask(inputTaskValue, eachTask);
    parentTaskList.appendChild(eachTask);
    taskStatusCheck();
    // タスク保存後、入力欄をクリアにする
    document.getElementById("inputTaskForm").reset();
  }
}

// タスク編集
function editTask(event) {
  // クリックイベント時にタスク親要素を取得
  const eachTaskElement = event.target.parentElement;
  const editValue = eachTaskElement.childNodes[1].textContent;
  const inputEditValue = document.createElement("input");

  // タスク表示部分の要素を編集可能にする
  inputEditValue.setAttribute("type", "text");
  inputEditValue.setAttribute("id", "editTask");
  inputEditValue.value = editValue;

  // 編集中は元のタスク内容を削除する
  while (eachTaskElement.hasChildNodes()) {
    eachTaskElement.removeChild(eachTaskElement.firstChild);
  }
  const editSaveButton = createEditButton();
  editSaveButton.innerText = "保存";

  // 保存ボタンクリックで、編集タスク内容を保存
  editSaveButton.setAttribute("onclick", "inputEditedTaskValue(event)");

  eachTaskElement.appendChild(inputEditValue);
  eachTaskElement.appendChild(editSaveButton);
}

function inputEditedTaskValue(event) {
  const inputEditedValue = document.getElementById("editTask").value;
  if (!inputEditedValue) {
    // タスク未入力の場合は保存せずアラートを出す
    alert("編集中のタスク内容を入力してください");
  } else {
    const eachTaskElement = event.target.parentElement;

    while (eachTaskElement.hasChildNodes()) {
      eachTaskElement.removeChild(eachTaskElement.firstChild);
    }
    createTask(inputEditedValue, eachTaskElement);
    taskStatusCheck();
  }
}

function deleteTask(event) {
  if (confirm("本当によろしいですか？")) {
    const eachTaskElement = event.target.parentElement;
    eachTaskElement.remove();
    taskStatusCheck();
  } else {
    return;
  }
}

function taskStatusCheck() {
  // タスク数を取得
  let countAll = document.getElementById("countAll");
  let countDone = document.getElementById("countDone");
  let countNotYet = document.getElementById("countNotYet");

  // チェックボックスのチェック有無判定
  const checkedTask = document.querySelectorAll("input[type=checkbox]:checked");
  const unCheckedTask = document.querySelectorAll(
    "input[type=checkbox]:not(:checked)"
  );

  // タスク数を反映
  countAll.innerHTML = checkedTask.length + unCheckedTask.length;
  countDone.innerHTML = checkedTask.length;
  countNotYet.innerHTML = unCheckedTask.length;
}
