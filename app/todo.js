window.addEventListener("load", () => {
  const form = document.querySelector("#js-form");
  const input = document.querySelector("#js-form-input");
  const tasks = document.querySelector("#js-each-tasks");

  // 保存ボタンを押すと発火
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // タスク入力内容を変数として定義
    const newTask = input.value;

    // タスク未入力の場合は保存せずアラートを出す
    if (!newTask) {
      alert("タスク内容を入力してください");
      return false;
    }

    // 新規保存したタスクをdiv要素として生成
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const taskContentElement = document.createElement("div");
    taskContentElement.classList.add("content");

    // タスク内容を子要素として親要素に追加
    const taskInputElement = document.createElement("input");
    taskInputElement.classList.add("task-text");
    taskInputElement.type = "text";
    taskInputElement.setAttribute("readonly", "readonly");
    taskInputElement.value = newTask;

    // チャックボックスを追加
    const taskCheckBoxElement = document.createElement("input");
    taskCheckBoxElement.classList.add("task-checkbox");
    taskCheckBoxElement.type = "checkbox";

    taskContentElement.appendChild(taskCheckBoxElement);
    taskContentElement.appendChild(taskInputElement);

    taskElement.appendChild(taskContentElement);

    // 編集・削除ボタン周りの要素を追加
    const taskActionsElement = document.createElement("div");
    taskActionsElement.classList.add("actions");

    // ボタン要素を追加
    const taskEditElement = document.createElement("button");
    taskEditElement.classList.add("edit-button");
    taskEditElement.innerHTML = "編集";

    const taskDeleteElement = document.createElement("button");
    taskDeleteElement.classList.add("delete-button");
    taskDeleteElement.innerHTML = "削除";

    taskActionsElement.appendChild(taskEditElement);
    taskActionsElement.appendChild(taskDeleteElement);

    taskElement.appendChild(taskActionsElement);

    tasks.appendChild(taskElement);

    // タスク保存後、入力欄をクリアにする
    input.value = "";

    // タスク編集
    taskEditElement.addEventListener("click", () => {
      if (taskEditElement.innerText === "編集") {
        taskInputElement.removeAttribute("readonly");
        taskInputElement.focus();
        taskEditElement.innerText = "保存";
      } else {
        taskInputElement.setAttribute("readonly", "readonly");
        taskEditElement.innerText = "編集";
      }
    });

    // タスク削除
    taskDeleteElement.addEventListener("click", () => {
      alert("このタスクを削除しますか？");
      tasks.removeChild(taskElement);
    });
  });
});
