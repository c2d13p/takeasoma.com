const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const increaseSpeedBtn = document.getElementById('increaseSpeed');
const decreaseSpeedBtn = document.getElementById('decreaseSpeed');
const invertSpinBtn = document.getElementById('invertSpin');

let currentDuration = 61;
let intervalId;
let isClockwise1 = true;
let isClockwise2 = false;

function getSpeedStep() {
    if (currentDuration <= 10) return 1;
    else if (currentDuration <= 20) return 2;
    else if (currentDuration <= 60) return 3;
    else if (currentDuration <= 120) return 5;
    else return 10;
}

function updateAnimationDuration(duration) {
    image1.style.animationDuration = `${duration}s`;
    image2.style.animationDuration = `${duration}s`;
}

function increaseSpeed() {
    let speedStep = getSpeedStep();
    if (currentDuration > 1) {
        currentDuration -= speedStep;
        updateAnimationDuration(currentDuration);
    }
}

function decreaseSpeed() {
    let speedStep = getSpeedStep();
    if (currentDuration < 300) {
        currentDuration += speedStep;
        updateAnimationDuration(currentDuration);
    }
}

function startIncreasingSpeed() {
    clearInterval(intervalId);
    intervalId = setInterval(increaseSpeed, 100);
}
function startDecreasingSpeed() {
    clearInterval(intervalId);
    intervalId = setInterval(decreaseSpeed, 100);
}

function stopChangingSpeed() {
    clearInterval(intervalId);
}

increaseSpeedBtn.addEventListener('click', increaseSpeed);
decreaseSpeedBtn.addEventListener('click', decreaseSpeed);
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

function stopRotation() {
    image1.style.animationPlayState = 'paused';
    image2.style.animationPlayState = 'paused';
}

function resumeRotation() {
    image1.style.animationPlayState = 'running';
    image2.style.animationPlayState = 'running';
}

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

image1.addEventListener('mousedown', stopRotation);
image1.addEventListener('mouseup', resumeRotation);
image2.addEventListener('mousedown', stopRotation);
image2.addEventListener('mouseup', resumeRotation);
image1.addEventListener('touchstart', stopRotation);
image1.addEventListener('touchend', resumeRotation);
image2.addEventListener('touchstart', stopRotation);
image2.addEventListener('touchend', resumeRotation);

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

document.getElementById('image1').ondragstart = function() { return false; };
document.getElementById('image2').ondragstart = function() { return false; };

window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};