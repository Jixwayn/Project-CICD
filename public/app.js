// ฟังก์ชันสำหรับโหลดรายการงานจากเซิร์ฟเวอร์
function loadTasks() {
    fetch('/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';

            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.task;

                if (task.completed) {
                    li.classList.add('completed');
                }

                // เมื่อคลิกที่รายการ จะเปลี่ยนสถานะเสร็จ/ไม่เสร็จ
                li.onclick = function () {
                    toggleTaskCompletion(task.id, !task.completed);
                };

                // ปุ่มลบงาน
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'ลบ';
                deleteButton.onclick = function (event) {
                    event.stopPropagation(); // ป้องกันการคลิกที่ `li`
                    deleteTask(task.id);
                };

                li.appendChild(deleteButton);
                taskList.appendChild(li);
            });
        });
}

// ฟังก์ชันสำหรับเพิ่มงานใหม่
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const newTask = { id: Date.now().toString(), task: taskText, completed: false };

        fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask),
        })
        .then(response => response.json())
        .then(() => {
            taskInput.value = ''; // ล้างช่องอินพุต
            loadTasks(); // โหลดรายการใหม่
        });
    }
}

// ฟังก์ชันสำหรับเปลี่ยนสถานะเสร็จ/ไม่เสร็จของงาน
function toggleTaskCompletion(taskId, isCompleted) {
    fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: isCompleted }),
    })
    .then(() => loadTasks());
}

// ฟังก์ชันสำหรับลบงาน
function deleteTask(taskId) {
    fetch(`/api/tasks/${taskId}`, { method: 'DELETE' })
        .then(() => loadTasks());
}

// โหลดรายการงานเมื่อหน้าเว็บถูกโหลด
document.addEventListener('DOMContentLoaded', loadTasks);
