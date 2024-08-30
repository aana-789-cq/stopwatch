let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let laps = [];

const timeDisplay = document.getElementById('timeDisplay');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateTime, 10);
        running = true;
        startStopBtn.textContent = 'Stop';
    } else {
        clearInterval(timerInterval);
        running = false;
        startStopBtn.textContent = 'Start';
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    running = false;
    startTime = 0;
    updatedTime = 0;
    difference = 0;
    timeDisplay.textContent = '00:00:00.00';
    startStopBtn.textContent = 'Start';
    laps = [];
    lapsContainer.innerHTML = '';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const time = new Date(difference);

    const hours = time.getUTCHours().toString().padStart(2, '0');
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    const seconds = time.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = time.getUTCMilliseconds().toString().padStart(3, '0');

    timeDisplay.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
    if (running) {
        const lapTime = timeDisplay.textContent;
        laps.push(lapTime);
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${laps.length}: ${lapTime}`;
        lapElement.classList.add('lap');
        lapsContainer.appendChild(lapElement);
    }
}

startStopBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
