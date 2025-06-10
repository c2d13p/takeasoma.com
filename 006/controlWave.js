document.addEventListener("DOMContentLoaded", () => {
  const waveText = document.querySelector(".wave-text");
  const switcher = document.getElementById("switcher");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const italianMode = document.getElementById("italian");
  const englishMode = document.getElementById("english");

  if (waveText) {
    const savedLang = getCookie("mode") || "italian";
    const initialText =
      savedLang === "italian" ? "PANTA REI" : "Everything flows";
    waveText.dataset.text = initialText;
    applyWaveTextEffect(waveText, initialText);
  }

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
    const newText = mode === "italian" ? "PANTA REI" : "Everything flows";
    if (waveText) {
      waveText.dataset.text = newText;
      applyWaveTextEffect(waveText, newText);
    }
    dropdownMenu.classList.remove("active");
  };

  italianMode.addEventListener("click", () => toggleMode("italian"));
  englishMode.addEventListener("click", () => toggleMode("english"));

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

function loadMode() {
  const theme =
    new Date().getHours() >= 20 || new Date().getHours() < 8 ? "dark" : "light";
  document.body.classList.toggle("dark", theme === "dark");
}

function applyWaveTextEffect(element, text) {
  element.innerHTML = [...text]
    .map((char, i) => {
      const delay = i * 0.1;
      return `<span class="wave-letter" style="animation-delay: ${delay}s">${
        char === " " ? "&nbsp;" : char
      }</span>`;
    })
    .join("");
}

setInterval(loadMode, 300000);
