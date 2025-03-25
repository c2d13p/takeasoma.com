const modeToggle = document.getElementById("mode-toggle");

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

function toggleMode() {
  if (modeToggle.textContent === "ANALOGUE") {
    setCookie("mode", "analogue", 365);
    loadMode();
    modeToggle.textContent = "DIGITAL";
  } else {
    setCookie("mode", "digital", 365);
    loadMode();
    modeToggle.textContent = "ANALOGUE";
  }
}

modeToggle.addEventListener("click", toggleMode);

function loadMode() {
  const mode = getCookie("mode") || "digital";

  const now = new Date();
  const hour = now.getHours();
  const isNightTime = hour >= 20 || hour < 8;
  const theme = isNightTime ? "dark" : "light";

  const fontFamily = mode === "digital" ? "Ticking Timebomb BB" : "Roboto Mono";
  const fontWeight = mode === "digital" ? 500 : 700;

  const background = document.getElementById("background");
  const time = document.getElementById("time");
  const second = document.getElementById("second");

  background.src = "img/" + mode + "-background-" + theme + ".png";
  time.src = "img/" + mode + "-time-" + theme + ".png";
  second.src = "img/" + mode + "-second-" + theme + ".png";

  modeToggle.textContent = mode === "digital" ? "ANALOGUE" : "DIGITAL";
  document.body.style.fontFamily = fontFamily;
  document.querySelectorAll("button").forEach((button) => {
    button.style.fontFamily = fontFamily;
    button.style.fontWeight = fontWeight;
  });
  document.body.style.fontWeight = fontWeight;

  if (theme === "dark") {
    document.body.style.backgroundColor =
      mode === "digital" ? "#000000" : "#242124";
    document
      .querySelectorAll("a")
      .forEach(
        (a) => (a.style.color = mode === "digital" ? "#F92C27" : "#ffffff")
      );
    document
      .querySelectorAll("button")
      .forEach(
        (button) =>
          (button.style.color = mode === "digital" ? "#F92C27" : "#ffffff")
      );
  } else {
    document.body.style.backgroundColor = "#E7E7E7";
    document.querySelectorAll("a").forEach((a) => (a.style.color = "#333333"));
    document
      .querySelectorAll("button")
      .forEach((button) => (button.style.color = "#333333"));
  }
}

function manageSecond() {
  const mode = getCookie("mode") || "digital";
  const second = document.getElementById("second");

  if (mode === "digital") {
    if (second.style.visibility === "hidden") {
      second.style.visibility = "visible";
    } else {
      second.style.visibility = "hidden";
    }
  } else {
    second.style.visibility = "visible";
    second.style.transform = "translate(-50%, -50%) rotate(5deg)";
    setTimeout(() => {
      second.style.transform = "translate(-50%, -50%) rotate(0deg)";
    }, 100); // Adjust this timing for how long you want the "attempt" to last
  }
}

window.onload = loadMode;
setInterval(loadMode, 300000);
setInterval(manageSecond, 1000);
