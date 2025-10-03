const MODES = {
  work: { minutes: 25, color: '#d95550' },
  short: { minutes: 5, color: '#4c9195' },
  long: { minutes: 15, color: '#457ca3' }
};

let currentMode = 'work';
let timer = null;
let timeLeft = MODES[currentMode].minutes * 60;
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const tabs = document.querySelectorAll('.tab');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const buzzer = document.getElementById('buzzer');
const pomodoroContainer = document.querySelector('.pomodoro-container');

function updateTimerDisplay() {
  const min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const sec = String(timeLeft % 60).padStart(2, '0');
  timerDisplay.textContent = `${min}:${sec}`;
  // Change color based on mode
  timerDisplay.style.color = MODES[currentMode].color;
}

function switchMode(mode) {
  if (currentMode === mode) return;
  currentMode = mode;
  // Remove active from all tabs, add to current
  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.mode === mode);
  });
  // Reset timer for new mode
  resetTimer();
  // Change background color
  pomodoroContainer.style.background = MODES[mode].color + '10';
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  startBtn.textContent = 'Pause';
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      startBtn.textContent = 'Start';
      buzzer.play();
    }
  }, 1000);
}

function pauseTimer() {
  if (timer) clearInterval(timer);
  isRunning = false;
  startBtn.textContent = 'Start';
}

function resetTimer() {
  pauseTimer();
  timeLeft = MODES[currentMode].minutes * 60;
  updateTimerDisplay();
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    switchMode(tab.dataset.mode);
  });
});

startBtn.addEventListener('click', () => {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
});

resetBtn.addEventListener('click', resetTimer);

// Initial setup
updateTimerDisplay();
pomodoroContainer.style.background = MODES[currentMode].color + '10';

// --- Tasks Section Logic ---
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

function createTaskElement(text) {
  const li = document.createElement('li');
  li.className = 'task-item';

  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = text;

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'edit-input';
  editInput.value = text;

  const actions = document.createElement('div');
  actions.className = 'task-actions';

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.className = 'edit';
  editBtn.onclick = () => {
    if (!li.classList.contains('editing')) {
      li.classList.add('editing');
      editInput.value = span.textContent;
      editInput.focus();
    } else {
      // Save edit
      const newText = editInput.value.trim();
      if (newText) {
        span.textContent = newText;
      }
      li.classList.remove('editing');
    }
  };

  editInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      editBtn.click();
    } else if (e.key === 'Escape') {
      li.classList.remove('editing');
    }
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete';
  deleteBtn.onclick = () => {
    li.remove();
  };

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(editInput);
  li.appendChild(actions);

  return li;
}

addTaskBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text) {
    const taskEl = createTaskElement(text);
    taskList.appendChild(taskEl);
    taskInput.value = '';
    taskInput.focus();
  }
});

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTaskBtn.click();
  }
});