// Declare variables
let currentMode = 'days';

// Get elements
const birthDatetimeInput = document.getElementById('birth-datetime');
const enterButton = document.getElementById('enter-button');
const inputScreen = document.getElementById('input-screen');
const resultScreen = document.getElementById('result-screen');
const timeDisplay = document.getElementById('time-on-earth');
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

// Clicking anywhere cycles the display
document.addEventListener('click', function (event) {
  if (!resultScreen.classList.contains('hidden') && event.target.id !== 'cog') {
    cycleTimeDisplay();
  }
});

// Clicking the cog brings back the input screen
cog.addEventListener('click', function () {
  resultScreen.classList.add('hidden');
  inputScreen.classList.remove('hidden');
  document.body.style.backgroundColor = '#000000';
  document.body.style.color = '#ffffff';
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

// Function to calculate and display age in days, hours, minutes, years, months
function displayResultScreen(birthdate) {
  inputScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  document.body.style.backgroundColor = '#ffffff';
  document.body.style.color = '#000000';
  updateTimeDisplay(birthDatetime, currentMode);
}

function cycleTimeDisplay() {
  const modes = ['days', 'hours', 'minutes', 'years', 'months'];
  currentMode = modes[(modes.indexOf(currentMode) + 1) % modes.length];
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