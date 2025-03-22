const text = document.getElementById("text");
const image = document.getElementById("image");
const increaseSpeedBtn = document.getElementById("increaseSpeed");
const decreaseSpeedBtn = document.getElementById("decreaseSpeed");
const invertSpinBtn = document.getElementById("invertSpin");

let currentDuration = 61;
let intervalId;
let isClockwiseText = true;
let isClockwiseImage = false;

function getSpeedStep() {
  if (currentDuration <= 10) return 1;
  else if (currentDuration <= 20) return 2;
  else if (currentDuration <= 60) return 3;
  else if (currentDuration <= 120) return 5;
  else return 10;
}

function updateAnimationDuration(duration) {
  text.style.animationDuration = `${duration}s`;
  image.style.animationDuration = `${duration}s`;
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

increaseSpeedBtn.addEventListener("click", increaseSpeed);
decreaseSpeedBtn.addEventListener("click", decreaseSpeed);
increaseSpeedBtn.addEventListener("pointerdown", startIncreasingSpeed);
increaseSpeedBtn.addEventListener("pointerup", stopChangingSpeed);
increaseSpeedBtn.addEventListener("pointerleave", stopChangingSpeed);
increaseSpeedBtn.addEventListener("pointercancel", stopChangingSpeed);
decreaseSpeedBtn.addEventListener("pointerdown", startDecreasingSpeed);
decreaseSpeedBtn.addEventListener("pointerup", stopChangingSpeed);
decreaseSpeedBtn.addEventListener("pointerleave", stopChangingSpeed);
decreaseSpeedBtn.addEventListener("pointercancel", stopChangingSpeed);

function stopRotation() {
  text.style.animationPlayState = "paused";
  image.style.animationPlayState = "paused";
}

function resumeRotation() {
  text.style.animationPlayState = "running";
  image.style.animationPlayState = "running";
}

function invertSpin() {
  if (isClockwiseText) {
    text.classList.remove("clockwise");
    text.classList.add("anticlockwise");
  } else {
    text.classList.remove("anticlockwise");
    text.classList.add("clockwise");
  }

  if (isClockwiseImage) {
    image.classList.remove("clockwise");
    image.classList.add("anticlockwise");
  } else {
    image.classList.remove("anticlockwise");
    image.classList.add("clockwise");
  }

  isClockwiseText = !isClockwiseText;
  isClockwiseImage = !isClockwiseImage;
}

text.addEventListener("pointerdown", stopRotation);
text.addEventListener("pointerup", resumeRotation);
text.addEventListener("pointercancel", resumeRotation);
text.addEventListener("pointerleave", resumeRotation);
image.addEventListener("pointerdown", stopRotation);
image.addEventListener("pointerup", resumeRotation);
image.addEventListener("pointercancel", resumeRotation);
image.addEventListener("pointerleave", resumeRotation);

invertSpinBtn.addEventListener("click", invertSpin);

document.body.style.webkitTouchCallout = "none";
document.body.style.webkitUserSelect = "none";

document.addEventListener(
  "dblclick",
  function (event) {
    event.preventDefault();
  },
  { passive: false }
);

document.getElementById("text").ondragstart = function () {
  return false;
};
document.getElementById("image").ondragstart = function () {
  return false;
};

window.oncontextmenu = function (event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

window.addEventListener("load", () => {
  document.querySelectorAll("img").forEach((img) => {
    img.style.display = "none";
    void img.offsetHeight;
    img.style.display = "block";
  });
});
