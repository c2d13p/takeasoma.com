document.addEventListener("DOMContentLoaded", () => {
  load();
});

function load() {
  const theme =
    new Date().getHours() >= 20 || new Date().getHours() < 8 ? "dark" : "light";

  document.body.classList.toggle("dark", theme === "dark");

  ["background", "wind-rose", "needle"].forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.src = `images/${id}-${theme}.png`;
    }
  });
}

setInterval(load, 300000);
