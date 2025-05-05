document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  let blurValue = 25;
  let saturationValue = 3;

  function updateCSSVariables() {
    root.style.setProperty("--blur", `${blurValue}px`);
    root.style.setProperty("--saturation", saturationValue);
  }

  updateCSSVariables();

  const imageFilenames = [""];

  function createImageWrapper(url) {
    const wrapper = document.createElement("div");
    wrapper.className = "img-wrapper";
    wrapper.style.backgroundImage = `url(${url})`;

    const img = document.createElement("img");
    img.src = url;
    img.onload = () => {
      wrapper.appendChild(img);
      document.body.appendChild(wrapper);
    };
    img.onerror = () => {
      console.warn(`Image not found or failed to load: ${url}`);
    };
  }

  imageFilenames.forEach(createImageWrapper);

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/png, image/jpeg";
  fileInput.multiple = true;
  fileInput.style.display = "none";
  document.body.appendChild(fileInput);

  fileInput.addEventListener("change", () => {
    Array.from(fileInput.files).forEach((file) => {
      const url = URL.createObjectURL(file);
      createImageWrapper(url);
    });
  });

  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "+":
        fileInput.click();
        break;
      case "a":
        blurValue += 5;
        updateCSSVariables();
        break;
      case "s":
        blurValue = Math.max(0, blurValue - 5);
        updateCSSVariables();
        break;
      case "d":
        saturationValue += 1;
        updateCSSVariables();
        break;
      case "f":
        saturationValue = Math.max(0, saturationValue - 1);
        updateCSSVariables();
        break;
    }
  });
});
