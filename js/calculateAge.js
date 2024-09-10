// Declare the currentMode variable at the top, so it's initialized first
let currentMode = 'days';

// Get elements
const birthdateInput = document.getElementById('birthdate');
const goButton = document.getElementById('go-button');
const inputScreen = document.getElementById('input-screen');
const resultScreen = document.getElementById('result-screen');
const ageDisplay = document.getElementById('age-display');
const cog = document.getElementById('cog');

// Check if birthdate is stored in cookie on page load
let birthdateCookie = getCookie('birthdate');
if (birthdateCookie) {
  const birthdate = new Date(birthdateCookie); // Convert the cookie value to a date
  displayResultScreen(birthdate);  // Display the result screen immediately
} else {
  inputScreen.classList.remove('hidden'); // Show input screen if no cookie is found
}

// Enable the "Go" button when valid input
birthdateInput.addEventListener('input', function () {
  const birthdateValue = birthdateInput.value;
  const dateIsValid = /^\d{4}-\d{2}-\d{2}$/.test(birthdateValue); // Validates YYYY-MM-DD format
  goButton.disabled = !dateIsValid;
});

// Calculate age and show result when "Go" button is clicked
goButton.addEventListener('click', function () {
  const birthdate = new Date(birthdateInput.value);
  setCookie('birthdate', birthdate.toISOString(), 365);
  displayResultScreen(birthdate);
});

// Clicking anywhere cycles the display
document.addEventListener('click', function (event) {
  if (!resultScreen.classList.contains('hidden') && event.target.id !== 'cog') {
    cycleAgeDisplay();
  }
});

// Clicking the cog brings back the input screen
cog.addEventListener('click', function () {
  resultScreen.classList.add('hidden');
  inputScreen.classList.remove('hidden');
  birthdateInput.value = getCookie('birthdate') ? new Date(getCookie('birthdate')).toISOString().substring(0, 10) : '';
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
  updateAgeDisplay(birthdate, currentMode);  // Use currentMode which is now properly initialized
}

function cycleAgeDisplay() {
  const modes = ['days', 'hours', 'minutes', 'years', 'months'];
  currentMode = modes[(modes.indexOf(currentMode) + 1) % modes.length];
  const birthdate = new Date(getCookie('birthdate'));
  updateAgeDisplay(birthdate, currentMode);
}

function updateAgeDisplay(birthdate, mode) {
  const now = new Date();
  let diff;
  switch (mode) {
    case 'days':
      diff = Math.floor((now - birthdate) / (1000 * 60 * 60 * 24));
      ageDisplay.textContent = `You are ${diff} days old`;
      break;
    case 'hours':
      diff = Math.floor((now - birthdate) / (1000 * 60 * 60));
      ageDisplay.textContent = `You are ${diff} hours old`;
      break;
    case 'minutes':
      diff = Math.floor((now - birthdate) / (1000 * 60));
      ageDisplay.textContent = `You are ${diff} minutes old`;
      break;
    case 'years':
      diff = now.getFullYear() - birthdate.getFullYear();
      ageDisplay.textContent = `You are ${diff} years old`;
      break;
    case 'months':
      diff = (now.getFullYear() - birthdate.getFullYear()) * 12 + (now.getMonth() - birthdate.getMonth());
      ageDisplay.textContent = `You are ${diff} months old`;
      break;
  }
}
