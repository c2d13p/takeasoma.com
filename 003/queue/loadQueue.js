document.addEventListener("DOMContentLoaded", () => {
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
    if (event.key === "+") {
      fileInput.click();
    }
  });
});
