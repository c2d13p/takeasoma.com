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

// Clicking the cog brings back the input screen
cog.addEventListener('click', function () {
  resultScreen.classList.add('hidden');
  inputScreen.classList.remove('hidden');
  document.body.style.background = 'linear-gradient(-45deg, #2A3439, #22282C, #191D1E, #111111)';
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
timeDisplay.addEventListener('mouseleave', restoreTime); // In case the mouse leaves the element
timeDisplay.addEventListener('touchstart', showQuote); // For mobile devices
timeDisplay.addEventListener('touchend', restoreTime); // For mobile devices

let originalTimeText = '';

// Function to show the quote when the mouse or finger is held down
function showQuote() {
  // Store the original text before changing it
  originalTimeText = timeDisplay.innerHTML;

  // Set the quote based on the current mode (days, years, etc.)
  timeDisplay.innerHTML = `It's not the ${currentMode} in your life that count, it's the life in your ${currentMode}`;
}

// Function to restore the original time when the mouse or finger is released
function restoreTime() {
  timeDisplay.innerHTML = originalTimeText;
}

// Function to calculate and display age in days, hours, minutes, years, months
function displayResultScreen(birthDatetime) {
  inputScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  document.body.style.background = 'linear-gradient(-45deg, #ffffff, #ffffff, #ffffff, #ffffff)';
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
      timeDisplay.innerHTML = `You are ${diff} days old`;
      break;
    case 'hours':
      diff = Math.floor((now - birthDatetime) / (1000 * 60 * 60));
      timeDisplay.innerHTML = `You are ${diff} hours old`;
      break;
    case 'minutes':
      diff = Math.floor((now - birthDatetime) / (1000 * 60));
      timeDisplay.innerHTML = `You are ${diff} minutes old`;
      break;
    case 'years':
      diff = now.getFullYear() - birthDatetime.getFullYear();
      timeDisplay.innerHTML = `You are ${diff} years old`;
      break;
    case 'months':
      diff = (now.getFullYear() - birthDatetime.getFullYear()) * 12 + (now.getMonth() - birthDatetime.getMonth());
      timeDisplay.innerHTML = `You are ${diff} months old`;
      break;
  }
}