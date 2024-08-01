const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const resetButton = document.querySelector('.reset');
const lapButton = document.querySelector('.lap');

const minutesDisplay = document.querySelector('.minutes');
const secondsDisplay = document.querySelector('.seconds');
const millisecondsDisplay = document.querySelector('.milliseconds');

const hoursHand = document.querySelectorAll('.hand.hours');
const minutesHand = document.querySelectorAll('.hand.minutes');
const secondsHand = document.querySelectorAll('.hand.seconds');

const lapList = document.querySelector('.lap-list');

let intervalId;
let stopwatchStartTime;
let elapsedTime = 0;
let running = false;

// Function to format time for the stopwatch
function formatTime(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;

  return {
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    milliseconds: String(Math.floor(milliseconds / 10)).padStart(3, '0')
  };
}

// Function to update the digital stopwatch
function updateDigitalDisplay() {
  const { minutes, seconds, milliseconds } = formatTime(elapsedTime);
  minutesDisplay.textContent = minutes;
  secondsDisplay.textContent = seconds;
  millisecondsDisplay.textContent = milliseconds;
}

// Function to update the analog stopwatch
function updateAnalogStopwatch() {
  const secondsAngle = (elapsedTime / 1000) * 360;
  const minutesAngle = (elapsedTime / (1000 * 60)) * 360;
  const hoursAngle = (elapsedTime / (1000 * 60 * 60)) * 360;

  secondsHand[0].style.transform = `rotate(${secondsAngle}deg)`; // Update stopwatch clock
  minutesHand[0].style.transform = `rotate(${minutesAngle}deg)`;
  hoursHand[0].style.transform = `rotate(${hoursAngle}deg)`;
}

// Function to start the stopwatch
function start() {
  if (!running) {
    stopwatchStartTime = Date.now() - elapsedTime;
    intervalId = setInterval(() => {
      elapsedTime = Date.now() - stopwatchStartTime;
      updateDigitalDisplay();
      updateAnalogStopwatch();
    }, 10);
    running = true;
  }
}

// Function to stop the stopwatch
function stop() {
  if (running) {
    clearInterval(intervalId);
    elapsedTime = Date.now() - stopwatchStartTime;
    running = false;
  }
}

// Function to reset the stopwatch
function reset() {
  stop();
  elapsedTime = 0;
  updateDigitalDisplay();
  updateAnalogStopwatch();
  lapList.innerHTML = ''; // Clear lap times
}

// Function to record a lap
function lap() {
  if (running) {
    const { minutes, seconds, milliseconds } = formatTime(elapsedTime);
    const lapTime = `${minutes}:${seconds}:${milliseconds}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapList.appendChild(lapItem);
  }
}

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);