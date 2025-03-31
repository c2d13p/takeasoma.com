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

function toggleRotationClass(element, isClockwise) {
  element.classList.remove(isClockwise ? "clockwise" : "anticlockwise");
  element.classList.add(isClockwise ? "anticlockwise" : "clockwise");
}

function increaseSpeed() {
  const speedStep = getSpeedStep();
  if (currentDuration > 1) {
    currentDuration = Math.max(1, currentDuration - speedStep);
    updateAnimationDuration(currentDuration);
  }
}

function decreaseSpeed() {
  const speedStep = getSpeedStep();
  if (currentDuration < 300) {
    currentDuration = Math.min(300, currentDuration + speedStep);
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

function setRotationState(state) {
  text.style.animationPlayState = state;
  image.style.animationPlayState = state;
}

function invertSpin() {
  toggleRotationClass(text, isClockwiseText);
  toggleRotationClass(image, isClockwiseImage);

  isClockwiseText = !isClockwiseText;
  isClockwiseImage = !isClockwiseImage;
}

increaseSpeedBtn.addEventListener("click", increaseSpeed);
decreaseSpeedBtn.addEventListener("click", decreaseSpeed);

increaseSpeedBtn.addEventListener("pointerdown", startIncreasingSpeed);
decreaseSpeedBtn.addEventListener("pointerdown", startDecreasingSpeed);

["pointerup", "pointerleave", "pointercancel"].forEach((event) => {
  increaseSpeedBtn.addEventListener(event, stopChangingSpeed);
  decreaseSpeedBtn.addEventListener(event, stopChangingSpeed);
});

[text, image].forEach((element) => {
  element.addEventListener("pointerdown", () => setRotationState("paused"));
  ["pointerup", "pointercancel", "pointerleave"].forEach((event) => {
    element.addEventListener(event, () => setRotationState("running"));
  });
  element.ondragstart = () => false;
});

invertSpinBtn.addEventListener("click", invertSpin);

document.body.style.webkitTouchCallout = "none";
document.body.style.webkitUserSelect = "none";

document.addEventListener("dblclick", (event) => event.preventDefault(), {
  passive: false,
});

window.oncontextmenu = (event) => {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

window.addEventListener("load", () => {
  document.querySelectorAll("img").forEach((img) => {
    img.style.display = "none";
    void img.offsetHeight; // Force reflow
    img.style.display = "block";
  });
});

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function () {
    this.blur();
  });
});
