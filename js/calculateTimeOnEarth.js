// Declare variables
let currentMode = 'days';

// Get elements
const birthDatetimeInput = document.getElementById('birth-datetime');
const enterButton = document.getElementById('enter-button');
const inputScreen = document.getElementById('input-screen');
const resultScreen = document.getElementById('result-screen');
const timeDisplay = document.getElementById('time-on-earth');
const upArrow = document.getElementById('up-arrow');
const downArrow = document.getElementById('down-arrow');
const cog = document.getElementById('cog');

// Check if birth datetime is stored in cookie on page load
/*let birthDatetimeCookie = getCookie('birthDatetime');
if (birthDatetimeCookie) {
  const birthDatetime = new Date(birthDatetimeCookie);
  displayResultScreen(birthDatetime);
} else {
  inputScreen.classList.remove('hidden');
}*/

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

// Add event listeners for arrow clicks
upArrow.addEventListener('click', function () {
  cycleTimeDisplay('up');
});

downArrow.addEventListener('click', function () {
  cycleTimeDisplay('down');
});

document.addEventListener('wheel', function(event) {
  if (event.deltaY < 0) {
    cycleTimeDisplay('up'); // Scroll up
  } else {
    cycleTimeDisplay('down'); // Scroll down
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowUp') {
    cycleTimeDisplay('up'); // Arrow up key pressed
  } else if (event.key === 'ArrowDown') {
    cycleTimeDisplay('down'); // Arrow down key pressed
  }
});

let touchStartY = 0;
let touchEndY = 0;

// Capture the start of the touch
document.addEventListener('touchstart', function(event) {
  touchStartY = event.changedTouches[0].screenY;
});

// Capture the end of the touch and determine direction
document.addEventListener('touchend', function(event) {
  touchEndY = event.changedTouches[0].screenY;
  handleSwipeGesture();
});

// Function to handle swipe gesture
function handleSwipeGesture() {
  const swipeThreshold = 50; // Minimum distance in pixels for a swipe

  if (touchStartY - touchEndY > swipeThreshold) {
    cycleTimeDisplay('up'); // Swipe up
  } else if (touchEndY - touchStartY > swipeThreshold) {
    cycleTimeDisplay('down'); // Swipe down
  }
}

// Clicking the cog brings back the input screen
cog.addEventListener('click', function () {
  resultScreen.classList.add('hidden');
  inputScreen.classList.remove('hidden');
  document.body.style.background = 'linear-gradient(-45deg, #171717, #99FFFF, #171717, #171717)';
  document.body.style.backgroundSize = '400% 400%';
  document.body.style.animation = 'gradient 20s cubic-bezier(0.5, 0, 0.5, 1) infinite';
  birthDatetimeInput.value = getCookie('birthDatetime') ? new Date(getCookie('birthDatetime')).toISOString().substring(0, 10) : '';
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

timeDisplay.addEventListener('mousedown', showQuote);
timeDisplay.addEventListener('mouseup', restoreTime);
timeDisplay.addEventListener('touchstart', showQuote);
timeDisplay.addEventListener('touchend', restoreTime);

let originalTimeText = '';

// Function to show the quote when the mouse or finger is held down
function showQuote() {
  // Store the original text before changing it
  originalTimeText = timeDisplay.innerHTML;

  // Set the quote based on the current mode (days, years, etc.)
  timeDisplay.innerHTML = `It's not the ${currentMode}<br> in your life that count;<br> it's the life in your ${currentMode}`;
}

// Function to restore the original time when the mouse or finger is released
function restoreTime() {
  timeDisplay.innerHTML = originalTimeText;
}

// Function to calculate and display age in days, hours, minutes, years, months
function displayResultScreen(birthDatetime) {
  inputScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  document.body.style.background = 'linear-gradient(-45deg, #f9f8f5, #f9f8f5, #f9f8f5, #f9f8f5)';
  document.body.style.backgroundSize = '400% 400%';
  document.body.style.animation = 'gradient 20s cubic-bezier(0.5, 0, 0.5, 1) infinite';
  updateTimeDisplay(birthDatetime, currentMode);
}

function cycleTimeDisplay(direction) {
  const modes = ['days', 'hours', 'minutes', 'years', 'months'];
  const currentIndex = modes.indexOf(currentMode);

  if (direction === 'up') {
    currentMode = modes[(currentIndex + 1) % modes.length];
  } else if (direction === 'down') {
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
      timeDisplay.innerHTML = `You Have <br><span class="time-bigger">${diff} Days</span><br> On Earth`;
      break;
    case 'hours':
      diff = Math.floor((now - birthDatetime) / (1000 * 60 * 60));
      timeDisplay.innerHTML = `You Have <br><span class="time-bigger">${diff} Hours</span><br> On Earth`;
      break;
    case 'minutes':
      diff = Math.floor((now - birthDatetime) / (1000 * 60));
      timeDisplay.innerHTML = `You Have <br><span class="time-bigger">${diff} Minutes</span><br> On Earth`;
      break;
    case 'years':
      diff = now.getFullYear() - birthDatetime.getFullYear();
      timeDisplay.innerHTML = `You Have <br><span class="time-bigger">${diff} Years</span><br> On Earth`;
      break;
    case 'months':
      diff = (now.getFullYear() - birthDatetime.getFullYear()) * 12 + (now.getMonth() - birthDatetime.getMonth());
      timeDisplay.innerHTML = `You Have <br><span class="time-bigger">${diff} Months</span><br> On Earth`;
      break;
  }
}