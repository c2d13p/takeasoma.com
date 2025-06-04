const waveText = document.querySelector(".wave-text");
const text = waveText.dataset.text;

waveText.innerHTML = [...text]
  .map((char, i) => {
    const delay = i * 0.1;
    return `<span class="wave-letter" style="animation-delay: ${delay}s">${
      char === " " ? "&nbsp;" : char
    }</span>`;
  })
  .join("");
