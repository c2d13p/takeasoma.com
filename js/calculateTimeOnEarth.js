// Declare variables
let currentMode = 'days';

// Get elements
const container = document.querySelector('.container');
const question = document.getElementById('question');
const birthDatetimeInput = document.getElementById('birth-datetime');
const enterButton = document.getElementById('enter-button');
const resultScreen = document.getElementById('result-screen');
const timeDisplay = document.getElementById('time-on-earth');
const controls = document.getElementById('controls');
const upArrow = document.getElementById('up-arrow');
const downArrow = document.getElementById('down-arrow');
const cog = document.getElementById('cog');

// Enable the "Enter" button when valid input
birthDatetimeInput.addEventListener('input', function () {
  enterButton.disabled = !birthDatetimeInput.value;
});

// Calculate time on earth and show result when "Enter" button is clicked
enterButton.addEventListener('click', function () {
  const birthDatetime = new Date(birthDatetimeInput.value);
  setCookie('birthDatetime', birthDatetime.toISOString(), 365);
  displayResultScreen(birthDatetime);
});

// Functions to handle cookie
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Check if birth datetime is stored in cookie on page load
let birthDatetimeCookie = getCookie('birthDatetime');
if (birthDatetimeCookie) {
  const birthDatetime = new Date(birthDatetimeCookie);
  displayResultScreen(birthDatetime);
} else {
  question.classList.remove('hidden');
  birthDatetimeInput.classList.remove('hidden');
  enterButton.classList.remove('hidden');
}

// Function to calculate and display age in days, hours, minutes, years, months
function displayResultScreen(birthDatetime) {
  question.classList.add('hidden');
  birthDatetimeInput.classList.add('hidden');
  enterButton.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  controls.classList.remove('hidden');
  document.body.style.backgroundColor = '#f9f8f5';
  container.style.backgroundColor = '#f9f8f5';
  container.style.boxShadow = '0 0 50px #ffd700';
  updateTimeDisplay(birthDatetime, currentMode);
}

function cycleTimeDisplay(direction) {
  const modes = ['days', 'hours', 'minutes', 'years', 'months'];
  const currentIndex = modes.indexOf(currentMode);

  if (direction === 'down') {
    currentMode = modes[(currentIndex + 1) % modes.length];
  } else if (direction === 'up') {
    currentMode = modes[(currentIndex - 1 + modes.length) % modes.length];
  }

  const birthDatetime = new Date(getCookie('birthDatetime'));
  updateTimeDisplay(birthDatetime, currentMode);
}

function updateTimeDisplay(birthDatetime, mode) {
  const now = new Date();
  let diff;
  const timeDisplay = document.getElementById('time-on-earth');
  
  switch (mode) {
    case 'days':
      diff = Math.floor((now - birthDatetime) / (1000 * 60 * 60 * 24));
      timeDisplay.innerHTML = `You Have <br><span class="time-bigger">${diff.toLocaleString()} Days</span><br> On Earth`;
      break;
    case 'hours':
      diff = Math.floor((now - birthDatetime) / (1000 * 60 * 60));
      timeDisplay.innerHTML = `You Have <br><span class="time-bigger">${diff.toLocaleString()} Hours</span><br> On Earth`;
      break;
    case 'minutes':
      diff = Math.floor((now - birthDatetime) / (1000 * 60));
      timeDisplay.innerHTML = `You Have <br><span class="time-bigger">${diff.toLocaleString()} Minutes</span><br> On Earth`;
      break;
    case 'years':
      diff = now.getFullYear() - birthDatetime.getFullYear();
      timeDisplay.innerHTML = `You Have <br><span class="time-bigger">${diff.toLocaleString()} Years</span><br> On Earth`;
      break;
    case 'months':
      diff = (now.getFullYear() - birthDatetime.getFullYear()) * 12 + (now.getMonth() - birthDatetime.getMonth());
      timeDisplay.innerHTML = `You Have <br><span class="time-bigger">${diff.toLocaleString()} Months</span><br> On Earth`;
      break;
  }
}

// Add event listeners for arrow clicks and scroll wheel
upArrow.addEventListener('click', function () {
  console.log("up")
  cycleTimeDisplay('up');
});

downArrow.addEventListener('click', function () {
  cycleTimeDisplay('down');
});

/*document.addEventListener('wheel', function(event) {
  if (event.deltaY < 0) {
    cycleTimeDisplay('up');
  } else {
    cycleTimeDisplay('down');
  }
});*/

document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowUp') {
    cycleTimeDisplay('up');
  } else if (event.key === 'ArrowDown') {
    cycleTimeDisplay('down');
  }
});

let clicked = false;
let touched = false;
timeDisplay.addEventListener('mousedown', () => {
  showQuote();
  clicked = true;
  console.log(clicked);
});
timeDisplay.addEventListener('mouseup', restoreTime);
timeDisplay.addEventListener('mouseleave', () => {
  if(clicked) {
    restoreTime();
    clicked = false;
  }
  console.log(clicked);
});

timeDisplay.addEventListener('touchstart', (e) => {
  e.stopPropagation();
  e.preventDefault();
  showQuote();
  touched = true;
  console.log(touched);
});
timeDisplay.addEventListener('touchend', (e) => {
  e.stopPropagation();
  restoreTime();
  touched = false;
  console.log(touched);
});
timeDisplay.addEventListener('touchcancel', () => {
  if(touched) {
    restoreTime();
    touched = false;
  }
  console.log(touched);
});

let originalTimeText = '';

// Function to show the quote when the mouse or finger is held down
function showQuote() {
  // Store the original text before changing it
  originalTimeText = timeDisplay.innerHTML;

  // Set the quote based on the current mode (days, years, etc.)
  timeDisplay.innerHTML = `<span class="quote">It's not the ${currentMode}<br> in your life that count;<br> it's the life in your ${currentMode}</span>`;
}

// Function to restore the original time when the mouse or finger is released
function restoreTime() {
  timeDisplay.innerHTML = originalTimeText;
}

// Clicking the cog brings back the input screen
cog.addEventListener('click', function () {
  resultScreen.classList.add('hidden');
  controls.classList.add('hidden');
  question.classList.remove('hidden');
  birthDatetimeInput.classList.remove('hidden');
  enterButton.classList.remove('hidden');
  document.body.style.backgroundColor = '#171717';
  container.style.backgroundColor = '#1f1f1f';
  container.style.boxShadow = '0 0 50px #ffd700';
  const birthDatetime = getCookie('birthDatetime');
  if (birthDatetime) {
    // Convert to the required format YYYY-MM-DDTHH:MM
    const formattedDatetime = new Date(birthDatetime).toISOString().substring(0, 16);
    birthDatetimeInput.value = formattedDatetime;
  } else {
    birthDatetimeInput.value = '';
  }
});

document.body.style.webkitUserSelect='none';
/*
document.body.style.webkitUserDrag = 'none';
document.body.style.webkitUserModify = 'none';
document.body.style.webkitHighlight = 'none';
document.body.style.webkitTouchCallout = 'none';
document.body.style.webkitUserSelect = 'none';
document.body.style.khtmlUserSelect = 'none';
document.body.style.mozUserSelect = 'none';
document.body.style.msUserSelect = 'none';
document.body.style.oUserSelect = 'none';
document.body.style.userSelect = 'none';
*/
document.addEventListener(
    "dblclick",
    function (event) {
      event.preventDefault();
    },
    { passive: false }
);