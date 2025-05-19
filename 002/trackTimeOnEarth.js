const TimeTracker = {
  elements: {
    arrowDown: document.getElementById("arrow-down"),
    arrowUp: document.getElementById("arrow-up"),
    dialog: document.querySelector("dialog"),
    birthInput: document.querySelector("dialog input[type='datetime-local']"),
    enterButton: document.querySelector(".enter-button"),
    settingsButton: document.getElementById("settings"),
    timeDisplay: document.querySelector(".time"),
  },

  modes: ["days", "hours", "minutes", "years", "months", "weeks"],
  currentMode: "days",
  originalTimeText: "",

  init() {
    this.setupEventListeners();
    this.checkInitialState();
  },

  setupEventListeners() {
    this.elements.settingsButton.addEventListener("click", () =>
      this.openSettingsDialog()
    );
    this.elements.birthInput.addEventListener("input", () =>
      this.validateInput()
    );
    this.elements.enterButton.addEventListener("click", () =>
      this.handleEnterButton()
    );
    this.elements.arrowUp.addEventListener("click", () =>
      this.cycleTimeDisplay("up")
    );
    this.elements.arrowDown.addEventListener("click", () =>
      this.cycleTimeDisplay("down")
    );
    this.elements.timeDisplay.addEventListener("click", () =>
      this.toggleQuote()
    );

    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Enter" &&
        document.activeElement.tagName !== "BUTTON"
      ) {
        event.preventDefault();
        this.handleEnterButton();
      }
      if (event.key === "ArrowUp") this.cycleTimeDisplay("up");
      if (event.key === "ArrowDown") this.cycleTimeDisplay("down");
    });

    document.addEventListener("dblclick", (event) => event.preventDefault(), {
      passive: false,
    });
  },

  checkInitialState() {
    const birthDatetimeCookie = this.getCookie("birthDatetime");

    if (!birthDatetimeCookie) {
      this.elements.dialog.showModal();
      this.validateInput();
    } else {
      const birthDatetime = new Date(birthDatetimeCookie);
      this.updateTimeDisplay(birthDatetime, this.currentMode);
    }
  },

  setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "Expires=" + d.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  },

  getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },

  openSettingsDialog() {
    this.elements.birthInput.disabled = true;
    this.elements.enterButton.disabled = true;
    this.elements.dialog.showModal();
    setTimeout(() => {
      this.elements.birthInput.disabled = false;
    }, 10);

    const birthDatetime = this.getCookie("birthDatetime");
    if (birthDatetime) {
      const date = new Date(birthDatetime);
      this.elements.birthInput.value = this.formatDateForInput(date);
      setTimeout(() => {
        this.elements.enterButton.disabled = false;
      }, 5000);
    } else {
      this.elements.birthInput.value = "";
    }
  },

  validateInput() {
    this.elements.enterButton.disabled = !this.elements.birthInput.value;
  },

  formatDateForInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  },

  handleEnterButton() {
    if (!this.elements.birthInput.checkValidity()) {
      this.elements.birthInput.reportValidity();
      return;
    }

    const birthDatetime = new Date(this.elements.birthInput.value);
    this.setCookie("birthDatetime", birthDatetime.toISOString());
    this.updateTimeDisplay(birthDatetime, this.currentMode);
    this.elements.dialog.close();
  },

  updateTimeDisplay(birthDatetime, mode) {
    const timeBiggerDisplay = document.querySelector(".time-bigger");
    const now = new Date();
    let diff;

    switch (mode) {
      case "days":
        diff = Math.floor((now - birthDatetime) / (1000 * 60 * 60 * 24));
        break;
      case "hours":
        diff = Math.floor((now - birthDatetime) / (1000 * 60 * 60));
        break;
      case "minutes":
        diff = Math.floor((now - birthDatetime) / (1000 * 60));
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
        break;
      case "months":
        diff =
          (now.getFullYear() - birthDatetime.getFullYear()) * 12 +
          (now.getMonth() - birthDatetime.getMonth());
        if (now.getDate() < birthDatetime.getDate()) {
          diff--;
        }
        break;
      case "weeks":
        diff = Math.floor((now - birthDatetime) / (1000 * 60 * 60 * 24 * 7));
        break;
    }

    timeBiggerDisplay.innerHTML = `${diff.toLocaleString()} ${
      mode.charAt(0).toUpperCase() + mode.slice(1)
    }`;
  },

  cycleTimeDisplay(direction) {
    if (this.elements.timeDisplay.innerHTML.includes("quote")) {
      this.restoreTime();
    }
    const currentIndex = this.modes.indexOf(this.currentMode);
    const newIndex =
      direction === "down"
        ? (currentIndex + 1) % this.modes.length
        : (currentIndex - 1 + this.modes.length) % this.modes.length;

    this.currentMode = this.modes[newIndex];
    const birthDatetime = new Date(this.getCookie("birthDatetime"));
    this.updateTimeDisplay(birthDatetime, this.currentMode);
  },

  toggleQuote() {
    if (this.elements.timeDisplay.innerHTML.includes("quote")) {
      this.restoreTime();
    } else {
      this.showQuote();
    }
  },

  showQuote() {
    this.originalTimeText = this.elements.timeDisplay.innerHTML;
    this.elements.timeDisplay.innerHTML = `
      <span class="quote">
        It's not the ${this.currentMode}<br> 
        in your life that counts;<br> 
        it's the life in your ${this.currentMode}
      </span>`;
  },

  restoreTime() {
    this.elements.timeDisplay.innerHTML = this.originalTimeText;
  },
};

// Initialize the TimeTracker
document.addEventListener("DOMContentLoaded", () => TimeTracker.init());
