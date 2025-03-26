document.addEventListener("DOMContentLoaded", () => {
  const switcher = document.getElementById("switcher");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const analogueMode = document.getElementById("analogue");
  const digitalMode = document.getElementById("digital");

  switcher.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!dropdownMenu.contains(e.target) && !switcher.contains(e.target)) {
      dropdownMenu.classList.remove("active");
    }
  });

  const toggleMode = (mode) => {
    setCookie("mode", mode, 365);
    loadMode();
    dropdownMenu.classList.remove("active");
  };

  analogueMode.addEventListener("click", () => toggleMode("analogue"));
  digitalMode.addEventListener("click", () => toggleMode("digital"));

  loadMode();
});

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

function toggleMode(mode) {
  if (mode === "analogue") {
    setCookie("mode", "analogue", 365);
    loadMode();
  } else {
    setCookie("mode", "digital", 365);
    loadMode();
  }
}

function loadMode() {
  const mode = getCookie("mode") || "digital";
  const theme =
    new Date().getHours() >= 20 || new Date().getHours() < 8 ? "dark" : "light";

  document.body.classList.toggle("dark", theme === "dark");

  ["background", "time", "second"].forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.src = `images/${mode}-${id}-${theme}.png`;
      element.className = "";
      element.classList.add(mode);
    }
  });
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
    second.style.transform = "rotate(5deg)";
    setTimeout(() => {
      second.style.transform = "rotate(0deg)";
    }, 100); // Adjust this timing for how long you want the "attempt" to last
  }
}

setInterval(loadMode, 300000);
setInterval(manageSecond, 1000);
