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

document.body.style.webkitTouchCallout = "none";
document.body.style.webkitUserSelect = "none";

document.addEventListener("dblclick", (event) => event.preventDefault(), {
  passive: false,
});

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
