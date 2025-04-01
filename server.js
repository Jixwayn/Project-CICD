const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// ใช้งาน JSON parsing middleware
app.use(express.json());

// ตั้งค่า public directory สำหรับไฟล์ static (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// โหลด tasks จากไฟล์ JSON
function loadTasks() {
  const data = fs.readFileSync('tasks.json', 'utf8');
  return JSON.parse(data);
}

// บันทึก tasks ลงในไฟล์ JSON
function saveTasks(tasks) {
  fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
}

// Route: รับข้อมูล tasks
app.get('/api/tasks', (req, res) => {
  const tasks = loadTasks();
  res.json(tasks);
});

// Route: เพิ่ม task ใหม่
app.post('/api/tasks', (req, res) => {
  const newTask = req.body;
  const tasks = loadTasks();
  tasks.push(newTask);
  saveTasks(tasks);
  res.status(201).json(newTask);
});

// Route: ลบ task
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  let tasks = loadTasks();
  tasks = tasks.filter(task => task.id !== taskId);
  saveTasks(tasks);
  res.status(200).send('Task deleted');
});

// Route: เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
