document.addEventListener("DOMContentLoaded", () => {
  initializeThemeSystem();
});

function initializeThemeSystem() {
  updateTheme();

  setupInteractionBehaviors();

  handleImageLoading();

  startBackgroundCycle();

  setInterval(updateTheme, 60000);
}

function getCurrentTheme() {
  const currentHour = new Date().getHours();
  return currentHour >= 20 || currentHour < 8 ? "dark" : "light";
}

function updateTheme() {
  const theme = getCurrentTheme();

  document.body.classList.toggle("dark", theme === "dark");

  updateImages(theme);
}

function updateImages(theme) {
  const staticImages = ["wind-rose", "needle"];

  staticImages.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.src = `images/${id}-${theme}.png`;
    }
  });
}

function startBackgroundCycle() {
  let currentBg = 1;
  const totalBackgrounds = 4;
  const cycleInterval = 1000; // 1 second

  updateBackground(currentBg);

  setInterval(() => {
    currentBg = (currentBg % totalBackgrounds) + 1; // Cycle through 1-4
    updateBackground(currentBg);
  }, cycleInterval);
}

function updateBackground(bgNumber) {
  const theme = getCurrentTheme();
  const bgElement = document.getElementById("background");

  if (bgElement) {
    bgElement.src = `images/background-${theme}-${bgNumber}.png`;
  }
}

function setupInteractionBehaviors() {
  document.body.style.webkitTouchCallout = "none";
  document.body.style.webkitUserSelect = "none";

  document.addEventListener("dblclick", (event) => event.preventDefault(), {
    passive: false,
  });

  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", function () {
      this.blur();
    });
  });
}

function handleImageLoading() {
  window.addEventListener("load", () => {
    document.querySelectorAll("img").forEach((img) => {
      img.style.display = "none";
      void img.offsetHeight; // Force reflow
      img.style.display = "block";
    });
  });
}
