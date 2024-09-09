const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const increaseSpeedBtn = document.getElementById('increaseSpeed');
const decreaseSpeedBtn = document.getElementById('decreaseSpeed');
const invertSpinBtn = document.getElementById('invertSpin');

let currentDuration = 61;
let intervalId;
let isClockwise1 = true;
let isClockwise2 = false;

// Function to determine speed step based on currentDuration
function getSpeedStep() {
    if (currentDuration <= 10) return 1;
    else if (currentDuration <= 20) return 2;
    else if (currentDuration <= 60) return 3;
    else if (currentDuration <= 120) return 5;
    else return 10;
}

// Function to update animation duration
function updateAnimationDuration(duration) {
    image1.style.animationDuration = `${duration}s`;
    image2.style.animationDuration = `${duration}s`;
}

// Function to increase speed (decrease duration)
function increaseSpeed() {
    let speedStep = getSpeedStep();
    if (currentDuration > 1) { // Ensure duration doesn't go below minimum
        currentDuration -= speedStep;
        updateAnimationDuration(currentDuration);
    }
}

// Function to decrease speed (increase duration)
function decreaseSpeed() {
    let speedStep = getSpeedStep();
    if (currentDuration < 300) { // Ensure duration doesn't exceed maximum
        currentDuration += speedStep;
        updateAnimationDuration(currentDuration);
    }
}

// Start increasing or decreasing speed when holding down the button
function startIncreasingSpeed() {
    clearInterval(intervalId);
    intervalId = setInterval(increaseSpeed, 100);
}
function startDecreasingSpeed() {
    clearInterval(intervalId);
    intervalId = setInterval(decreaseSpeed, 100);
}

// Stop changing speed when releasing the button
function stopChangingSpeed() {
    clearInterval(intervalId);
}

// Event listeners for the + and - buttons
increaseSpeedBtn.addEventListener('click', increaseSpeed);
decreaseSpeedBtn.addEventListener('click', decreaseSpeed);

// For hold functionality
increaseSpeedBtn.addEventListener('mousedown', startIncreasingSpeed);
increaseSpeedBtn.addEventListener('mouseup', stopChangingSpeed);
increaseSpeedBtn.addEventListener('mouseleave', stopChangingSpeed);
decreaseSpeedBtn.addEventListener('mousedown', startDecreasingSpeed);
decreaseSpeedBtn.addEventListener('mouseup', stopChangingSpeed);
decreaseSpeedBtn.addEventListener('mouseleave', stopChangingSpeed);
increaseSpeedBtn.addEventListener('touchstart', startIncreasingSpeed);
increaseSpeedBtn.addEventListener('touchend', stopChangingSpeed);
increaseSpeedBtn.addEventListener('touchcancel', stopChangingSpeed);
decreaseSpeedBtn.addEventListener('touchstart', startDecreasingSpeed);
decreaseSpeedBtn.addEventListener('touchend', stopChangingSpeed);
decreaseSpeedBtn.addEventListener('touchcancel', stopChangingSpeed);

// Function to stop rotation
function stopRotation() {
    image1.style.animationPlayState = 'paused';
    image2.style.animationPlayState = 'paused';
}

// Function to resume rotation
function resumeRotation() {
    image1.style.animationPlayState = 'running';
    image2.style.animationPlayState = 'running';
}

// Function to invert spinning direction
function invertSpin() {
    if (isClockwise1) {
        image1.classList.remove('clockwise');
        image1.classList.add('anticlockwise');
    } else {
        image1.classList.remove('anticlockwise');
        image1.classList.add('clockwise');
    }

    if (isClockwise2) {
        image2.classList.remove('clockwise');
        image2.classList.add('anticlockwise');
    } else {
        image2.classList.remove('anticlockwise');
        image2.classList.add('clockwise');
    }

    isClockwise1 = !isClockwise1;
    isClockwise2 = !isClockwise2;
}

// Event listeners for desktop (mouse events)
image1.addEventListener('mousedown', stopRotation);
image1.addEventListener('mouseup', resumeRotation);
image2.addEventListener('mousedown', stopRotation);
image2.addEventListener('mouseup', resumeRotation);

// Event listeners for mobile (touch events)
image1.addEventListener('touchstart', stopRotation);
image1.addEventListener('touchend', resumeRotation);
image2.addEventListener('touchstart', stopRotation);
image2.addEventListener('touchend', resumeRotation);

// Event listener for the invert spin button
invertSpinBtn.addEventListener('click', invertSpin);

document.body.style.webkitTouchCallout='none';
document.body.style.webkitUserSelect='none';

document.addEventListener(
    "dblclick",
    function (event) {
      event.preventDefault();
    },
    { passive: false }
  );

  window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};

document.getElementById('image1').ondragstart = function() { return false; };
document.getElementById('image2').ondragstart = function() { return false; };