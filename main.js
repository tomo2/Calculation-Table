'use strict';

{
    // タイマーの機能
    const timer = document.getElementById('timer');
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
    const reset = document.getElementById('reset');

    let startTime;
    let timeoutId;
    let elapsedTime = 0;

    function countUp() {
   
        const d = new Date(Date.now() - startTime + elapsedTime);
        const m = String(d.getMinutes()).padStart(2, 0);
        const s = String(d.getSeconds()).padStart(2, 0);
        const ms = String(d.getMilliseconds()).padStart(3, 0);
        // 時間の表示
        timer.textContent = `${m}:${s}.${ms}`;

        timeoutId = setTimeout(() => {
            countUp();
        }, 10);
    }

    function setButtonStateInitial() {
        start.classList.remove('inactive');
        stop.classList.add('inactive');
        reset.classList.add('inactive');
    }

    function setButtonStateRunning() {
        start.classList.add('inactive');
        stop.classList.remove('inactive');
        reset.classList.add('inactive');
    }

    function setButtonStateStopped() {
        start.classList.remove('inactive');
        stop.classList.add('inactive');
        reset.classList.remove('inactive');
    }

    setButtonStateInitial();

    start.addEventListener('click', () => {
        if (start.classList.contains('inactive') === true) {
            return;
        }
        setButtonStateRunning();
        startTime = Date.now();
        countUp();
    });

    stop.addEventListener('click', () => {
        if (stop.classList.contains('inactive') === true) {
            return;
        }
        setButtonStateStopped();
       clearTimeout(timeoutId);
        elapsedTime = Date.now() - startTime;

    });

    reset.addEventListener('click', () => {
        if (reset.classList.contains('inactive') === true) {
            return;
        }
        setButtonStateInitial();
        timer.textContent = '00:00.000';
    });
    


    // todo機能
    const taskValue = document.getElementsByClassName('task_value')[0];
    const taskSubmit = document.getElementsByClassName('task_submit')[0];
    const taskList = document.getElementsByClassName('task_list')[0];

    // 追加ボタンを作成
    const addTask = (task) => {
        // 入力したタスクを追加・表示
        const listItem = document.createElement('li');
        const showItem = taskList.appendChild(listItem);
        showItem.innerHTML = task;

        // タスクに消去ボタンを付与
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        listItem.appendChild(deleteButton);

        // 消去ボタンをクリックし、イベントを発動(タスクが消去)
        deleteButton.addEventListener('click', evt => {
            evt.preventDefault();
            deleteTasks(deleteButton);
        });
    };

    // 消去ボタンをタスクを消す機能を付与
    const deleteTasks = (deleteButton) => {
        const chosenTask = deleteButton.closest('li');
        taskList.removeChild(chosenTask);
    }

    // 追加ボタンをクリックし、イベントを発動(タスクが追加)
    taskSubmit.addEventListener('click', evt => {
        evt.preventDefault();
        const task = taskValue.value;
        addTask(task);
        taskValue.value = '';
    });

}
