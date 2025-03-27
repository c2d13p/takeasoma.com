const dialog = document.querySelector("dialog");
const birthInput = document.querySelector(
  "dialog input[type='datetime-local']"
);
const enterButton = document.querySelector(".enter-button");
const settingsButton = document.getElementById("settings");

let birthDatetimeCookie = getCookie("birthDatetime");
let currentMode = "days";

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "Expires=" + d.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

if (!birthDatetimeCookie) {
  dialog.showModal();
} else {
  const birthDatetime = new Date(birthDatetimeCookie);
  updateTimeDisplay(birthDatetime, currentMode);
}

settingsButton.addEventListener("click", () => {
  dialog.showModal();

  const birthDatetime = getCookie("birthDatetime");
  if (birthDatetime) {
    const date = new Date(birthDatetime);
    const formattedDatetime = formatDateForInput(date);
    birthDatetimeInput.value = formattedDatetime;
    enterButton.disabled = !birthDatetimeInput.value;
  } else {
    birthDatetimeInput.value = "";
  }
});

function formatDateForInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

birthDatetimeInput.addEventListener("input", function () {
  enterButton.disabled = !birthDatetimeInput.value;
});

enterButton.addEventListener("click", handleEnterButton);

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && document.activeElement.tagName !== "BUTTON") {
    event.preventDefault();
    handleEnterButton();
  }
});

function handleEnterButton() {
  const birthDatetime = new Date(birthDatetimeInput.value);
  if (isNaN(birthDatetime)) return;

  setCookie("birthDatetime", birthDatetime.toISOString(), 365);
  updateTimeDisplay(birthDatetime, currentMode);
}

function updateTimeDisplay(birthDatetime, mode) {
  const now = new Date();
  let diff;
  const timeDisplay = document.querySelector(".time-bigger");

  switch (mode) {
    case "days":
      diff = Math.floor((now - birthDatetime) / (1000 * 60 * 60 * 24));
      timeDisplay.innerHTML = `<span class="time-bigger">${diff.toLocaleString()} Days</span>`;
      break;
    case "hours":
      diff = Math.floor((now - birthDatetime) / (1000 * 60 * 60));
      timeDisplay.innerHTML = `<span class="time-bigger">${diff.toLocaleString()} Hours</span>`;
      break;
    case "minutes":
      diff = Math.floor((now - birthDatetime) / (1000 * 60));
      timeDisplay.innerHTML = `<span class="time-bigger">${diff.toLocaleString()} Minutes</span>`;
      break;
    case "years":
      diff = now.getFullYear() - birthDatetime.getFullYear();
      if (
        now <
        new Date(
          now.getFullYear(),
          birthDatetime.getMonth(),
          birthDatetime.getDate()
        )
      ) {
        diff--;
      }
      timeDisplay.innerHTML = `<span class="time-bigger">${diff.toLocaleString()} Years</span>`;
      break;
    case "months":
      diff =
        (now.getFullYear() - birthDatetime.getFullYear()) * 12 +
        (now.getMonth() - birthDatetime.getMonth());
      if (now.getDate() < birthDatetime.getDate()) {
        diff--;
      }
      timeDisplay.innerHTML = `<span class="time-bigger">${diff.toLocaleString()} Months</span>`;
      break;
    case "weeks":
      diff = Math.floor((now - birthDatetime) / (1000 * 60 * 60 * 24 * 7));
      timeDisplay.innerHTML = `<span class="time-bigger">${diff.toLocaleString()} Weeks</span>`;
      break;
  }
}

function cycleTimeDisplay(direction) {
  const modes = ["days", "hours", "minutes", "years", "months", "weeks"];
  const currentIndex = modes.indexOf(currentMode);

  if (direction === "down") {
    currentMode = modes[(currentIndex + 1) % modes.length];
  } else if (direction === "up") {
    currentMode = modes[(currentIndex - 1 + modes.length) % modes.length];
  }

  const birthDatetime = new Date(getCookie("birthDatetime"));
  updateTimeDisplay(birthDatetime, currentMode);
}

upArrow.addEventListener("click", function () {
  cycleTimeDisplay("up");
});

downArrow.addEventListener("click", function () {
  cycleTimeDisplay("down");
});

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp") {
    cycleTimeDisplay("up");
  } else if (event.key === "ArrowDown") {
    cycleTimeDisplay("down");
  }
});

let originalTimeText = "";

timeDisplay.addEventListener("click", () => {
  if (timeDisplay.innerHTML.includes("quote")) {
    restoreTime();
  } else {
    showQuote();
  }
});

function showQuote() {
  originalTimeText = timeDisplay.innerHTML;
  timeDisplay.innerHTML = `<span class="quote">It's not the ${currentMode}<br> in your life that counts;<br> it's the life in your ${currentMode}</span>`;
}

function restoreTime() {
  timeDisplay.innerHTML = originalTimeText;
}

document.addEventListener(
  "dblclick",
  function (event) {
    event.preventDefault();
  },
  { passive: false }
);
