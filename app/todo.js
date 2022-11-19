let id = 0; // タスク管理用ID(初期値0)
let tasksStore = []; // 各タスク格納用配列

const inputTaskContent = document.getElementById("inputTaskContent");
const saveButton = document.getElementById("saveButton");
const taskList = document.getElementById("taskList");

// タスク保存
saveButton.addEventListener("click", () => {
  createTask();
});

// タスク単体の生成
const createTask = () => {
  if (!inputTaskContent.value) {
    alert("タスク内容を入力してください");
  } else {
    tasksStore.push(
      // タスクID、タスク内容、タスクステータス（デフォルトは未完了）を格納
      { id, taskValue: inputTaskContent.value, isChecked: false }
    );
    renderTask(id, inputTaskContent.value);
    id++;
    inputTaskContent.value = "";

    taskStatuses[0].count++; // 全タスクに加算
    taskStatuses[2].count++; // 未完了タスクに加算

    updateTaskList();
  }
};

// タスクステータス管理用配列
const taskStatuses = [
  { label: "全タスク", count: 0 },
  { label: "済", count: 0 },
  { label: "未完了", count: 0 },
];

// タスク一覧の更新
const updateTaskList = () => {
  const taskStatusPanel = document.getElementById("taskStatusPanel");

  // タスク追加毎にステータスパネルが増えないようにする
  while (taskStatusPanel.firstChild) {
    taskStatusPanel.removeChild(taskStatusPanel.firstChild);
  }

  taskStatuses.forEach((taskStatus) => {
    const taskState = document.createElement("li");

    // 各ステータス情報をそれぞれ上書き
    taskState.innerText = `${taskStatus.label} \n ${taskStatus.count}`;
    // タスクステータスを反映
    taskStatusPanel.appendChild(taskState);
  });
};

const confirmCheckBox = (id) => {
  const currentTaskContent = tasksStore.find((targetTask) => {
    return targetTask.id === id;
  });

  currentTaskContent.isChecked = !currentTaskContent.isChecked;

  // チェックボックスのチェック有無判定
  if (currentTaskContent.isChecked) {
    taskStatuses[1].count++; // 完了タスクに加算
    taskStatuses[2].count--; // 未完了タスクから減算
    // !currentTaskContent.isCheckedの場合
  } else {
    taskStatuses[1].count--; // 未完了タスクに加算
    taskStatuses[2].count++; // 完了タスクから減算
  }

  // タスク数を反映
  updateTaskList();
};

// タスクの描画
const renderTask = (id, taskValue) => {
  const eachTask = document.createElement("div");
  eachTask.setAttribute("id", `eachTask${id}`); // タスク追加時にIDをふる
  eachTask.classList.add("each-task");

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.setAttribute("onclick", `confirmCheckBox(${id})`);

  const taskContent = document.createElement("li");
  taskContent.innerHTML = taskValue;
  taskContent.id = "taskContent";

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.innerText = "編集";
  editButton.setAttribute("onclick", `updateTask(${id})`);
  editButton.id = "editButton";

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.innerText = "削除";
  deleteButton.setAttribute("onclick", `deleteTask(${id})`);
  deleteButton.id = "deleteButton";

  eachTask.appendChild(checkBox);
  eachTask.appendChild(taskContent);
  eachTask.appendChild(editButton);
  eachTask.appendChild(deleteButton);
  taskList.appendChild(eachTask);
};

// タスク編集
const updateTask = (id) => {
  // 編集対象タスクidと一致するタスクのみを取得
  const currentTaskContent = tasksStore.find((targetTask) => {
    return targetTask.id === id;
  });

  eachTaskElement = document.getElementById(`eachTask${id}`);

  const editTaskForm = document.createElement("input");
  editTaskForm.setAttribute("id", "editTaskForm");

  const editTargetTask = eachTaskElement.children[1];

  editButton = eachTaskElement.children[2];
  editButton.style.display = "none";
  deleteButton = eachTaskElement.children[3];
  deleteButton.style.display = "none";

  const backButton = document.createElement("button");
  backButton.type = "button";
  backButton.innerHTML = "戻る";
  backButton.id = "backButton";

  const editSaveButton = document.createElement("button");
  editSaveButton.type = "button";
  editSaveButton.innerText = "保存";
  editSaveButton.id = "editSaveButton";

  eachTaskElement.replaceChild(editTaskForm, editTargetTask);
  eachTaskElement.appendChild(backButton);
  eachTaskElement.appendChild(editSaveButton);

  // 編集済タスク保存
  editSaveButton.addEventListener("click", () => {
    if (!editTaskForm.value) {
      alert("タスク内容を入力してください");
    } else {
      currentTaskContent.value = editTaskForm.value;
      const editedTask = document.createElement("li");
      editedTask.innerHTML = currentTaskContent.value;
      editedTask.setAttribute("id", "taskContent");

      eachTaskElement.replaceChild(editedTask, editTaskForm);
      eachTaskElement.removeChild(editSaveButton);
      eachTaskElement.removeChild(backButton);
      editButton.style.display = "block";
      deleteButton.style.display = "block";
    }
  });

  // 編集中タスク内容を破棄して戻る
  backButton.addEventListener("click", () => {
    const currentTaskContent = tasksStore.find((targetTask) => {
      return targetTask.id === id;
    });

    const originalTask = document.createElement("li");
    originalTask.innerHTML = currentTaskContent.taskValue;
    originalTask.id = "taskContent";

    eachTaskElement.replaceChild(originalTask, editTaskForm);
    eachTaskElement.removeChild(editSaveButton);
    eachTaskElement.removeChild(backButton);
    editButton.style.display = "block";
    deleteButton.style.display = "block";
  });
};

// タスク削除
const deleteTask = (id) => {
  if (confirm("本当によろしいですか？")) {
    const currentTaskContent = tasksStore.find((targetTask) => {
      return targetTask.id === id;
    });

    const eachTask = document.getElementById(`eachTask${id}`);
    eachTask.remove();

    taskStatuses[0].count--; // 全タスクから減算
    if (currentTaskContent.isChecked) {
      taskStatuses[1].count--; // 完了タスクから減算
    } else {
      taskStatuses[2].count--; // 未完了タスクから減算
    }
    updateTaskList();
  }
};
