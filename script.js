// Select elements
let timer;
let startTime = 0;
let running = false;
let lapCounter = 1;
const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsList = document.getElementById("laps");
const lapNoteInput = document.getElementById("lapNote");

// Start/Pause Function
function startStop() {
    if (!running) {
        startTime = Date.now() - (startTime || 0);
        timer = setInterval(updateTime, 1000);
        running = true;
        startStopBtn.innerText = "Pause";
        startStopBtn.classList.remove("start");
        startStopBtn.classList.add("pause");
    } else {
        clearInterval(timer);
        running = false;
        startStopBtn.innerText = "Start";
        startStopBtn.classList.remove("pause");
        startStopBtn.classList.add("start");
    }
}

// Update Timer Display
function updateTime() {
    let elapsedTime = Date.now() - startTime;
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

    display.innerText =
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds;
}

// Reset Function
function resetTimer() {
    clearInterval(timer);
    running = false;
    startTime = 0;
    display.innerText = "00:00:00";
    startStopBtn.innerText = "Start";
    startStopBtn.classList.remove("pause");
    startStopBtn.classList.add("start");
    lapsList.innerHTML = "";
    lapCounter = 1;
}

// Record Lap with Note
function recordLap() {
    if (running) {
        const lapTime = display.innerText;
        const lapNote = lapNoteInput.value.trim(); // Get user note
        const lapItem = document.createElement("li");
        
        // Check if a note was entered
        if (lapNote) {
            lapItem.innerHTML = `<strong>Lap ${lapCounter}:</strong> ${lapTime} - <em>${lapNote}</em>`;
        } else {
            lapItem.innerHTML = `<strong>Lap ${lapCounter}:</strong> ${lapTime}`;
        }
        
        lapsList.appendChild(lapItem);
        lapCounter++;
        lapNoteInput.value = ""; // Clear input field
    }
}

// Event Listeners
startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);
