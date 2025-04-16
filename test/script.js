document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM elements
  const img = document.querySelector("img");
  const imgWrapper = document.querySelector(".img-wrapper");
  const previousBtn = document.getElementById("previous");
  const nextBtn = document.getElementById("next");
  const playBtn = document.getElementById("play");

  // Create the dialogs and append to body
  const openingDialog = createOpeningDialog();
  const slideshowDialog = createSlideshowDialog();
  document.body.appendChild(openingDialog);
  document.body.appendChild(slideshowDialog);

  // State management
  let images = [];
  let currentIndex = 0;
  let slideshowInterval = null;
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;

  // Cookie functions
  const cookies = {
    set(name, value, days) {
      const d = new Date();
      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = "Expires=" + d.toUTCString();
      document.cookie = `${name}=${value}; ${expires}; path=/`;
    },

    get(name) {
      const nameEQ = name + "=";
      const ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
      }
      return null;
    },
  };

  // Dialog creation functions
  function createOpeningDialog() {
    const dialog = document.createElement("dialog");
    dialog.className = "opening-dialog";
    dialog.innerHTML = `
      <img src="logo.png" />
      <h1 id="next-image-message"></h1>
    `;
    return dialog;
  }

  function createSlideshowDialog() {
    const dialog = document.createElement("dialog");
    dialog.className = "slideshow-dialog";
    dialog.innerHTML = `
        <img id="slideshow-img" src="">
    `;

    dialog.addEventListener("click", () => {
      stopSlideshow();
      dialog.close();
    });

    return dialog;
  }

  // Opening dialog functions
  function showOpeningDialog() {
    const today = new Date().toDateString();
    const lastShown = cookies.get("openingDialogLastShown");

    // Show dialog only once per day
    if (lastShown == today) {
      const nextImageMessage = document.getElementById("next-image-message");
      nextImageMessage.innerHTML = getNextImageMessage();

      openingDialog.showModal();

      // Close dialog after 3 seconds
      setTimeout(() => {
        openingDialog.close();
      }, 2000);

      cookies.set("openingDialogLastShown", today, 1);
    }
  }

  function getNextImageMessage() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Calculate days until next Monday (1)
    const daysUntilNextMonday = dayOfWeek === 1 ? 0 : (8 - dayOfWeek) % 7;

    if (daysUntilNextMonday === 0) {
      return "New image out<br>today";
    } else if (daysUntilNextMonday === 1) {
      return "New image out<br>tomorrow";
    } else {
      return `New image out<br>in ${daysUntilNextMonday} days`;
    }
  }

  // Slideshow functions
  function startSlideshow() {
    const slideshowImg = document.getElementById("slideshow-img");

    slideshowImg.src = img.src;
    slideshowDialog.showModal();

    // Start automatic image change
    slideshowInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      updateImage();
      slideshowImg.src = img.src;
    }, 5000);
  }

  function stopSlideshow() {
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
      slideshowInterval = null;
    }
  }

  function updateImage() {
    const image = images[currentIndex];
    if (!image) return;

    const url = `https://drive.google.com/thumbnail?id=${image.id}&sz=s1024`;

    // Preload image
    const preloadImg = new Image();
    preloadImg.onload = () => {
      img.src = url;
      imgWrapper.style.backgroundImage = `url('${url}')`;

      // Update slideshow image if slideshow is active
      const slideshowImg = document.getElementById("slideshow-img");
      if (slideshowDialog.open && slideshowImg) {
        slideshowImg.src = url;
      }

      cookies.set("currentIndex", currentIndex, 1);
    };
    preloadImg.onerror = () => {
      console.error(`Failed to load image: ${url}`);
      goToNext();
    };
    preloadImg.src = url;
  }

  function goToPrevious() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
  }

  function goToNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
  }

  // Event listeners for buttons
  previousBtn.addEventListener("click", goToPrevious);
  nextBtn.addEventListener("click", goToNext);
  playBtn.addEventListener("click", startSlideshow);

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    const isLandscape = window.innerWidth > window.innerHeight;

    switch (e.key) {
      case "ArrowLeft":
        if (!isLandscape) goToPrevious();
        break;
      case "ArrowUp":
        if (isLandscape) goToPrevious();
        break;
      case "ArrowRight":
        if (!isLandscape) goToNext();
        break;
      case "ArrowDown":
        if (isLandscape) goToNext();
        break;
      case "Escape":
        if (slideshowDialog.open) {
          stopSlideshow();
          slideshowDialog.close();
        }
        break;
    }
  });

  // Touch swipe handling
  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }

  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    handleSwipe();
  }

  function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for a swipe to register
    const isLandscape = window.innerWidth > window.innerHeight;

    if (isLandscape) {
      // In landscape mode, respond to vertical swipes
      const swipeDistanceY = touchEndY - touchStartY;
      if (Math.abs(swipeDistanceY) < swipeThreshold) return; // Ignore small movements

      if (swipeDistanceY > 0) {
        goToPrevious(); // Swipe down - go to previous image
      } else {
        goToNext(); // Swipe up - go to next image
      }
    } else {
      // In portrait mode, respond to horizontal swipes
      const swipeDistanceX = touchEndX - touchStartX;
      if (Math.abs(swipeDistanceX) < swipeThreshold) return; // Ignore small movements

      if (swipeDistanceX > 0) {
        goToPrevious(); // Swipe right - go to previous image
      } else {
        goToNext(); // Swipe left - go to next image
      }
    }
  }

  // Add touch event listeners
  imgWrapper.addEventListener("touchstart", handleTouchStart, {
    passive: true,
  });
  imgWrapper.addEventListener("touchend", handleTouchEnd, { passive: true });

  // Initialize application
  function init() {
    // Prevent defaults
    document.addEventListener(
      "touchmove",
      function (event) {
        // Prevent default only for touch events that aren't on scrollable elements
        if (!isScrollableElement(event.target)) {
          event.preventDefault();
        }
      },
      { passive: false }
    );

    function isScrollableElement(element) {
      // Check if the element or any of its parents has overflow that allows scrolling
      while (element && element !== document.body) {
        const style = window.getComputedStyle(element);
        const overflow = style.getPropertyValue("overflow");
        const overflowY = style.getPropertyValue("overflow-y");

        if (
          overflow === "auto" ||
          overflow === "scroll" ||
          overflowY === "auto" ||
          overflowY === "scroll"
        ) {
          return true;
        }
        element = element.parentElement;
      }
      return false;
    }
    /*
    document.body.style.webkitTouchCallout = "none";
    document.body.style.webkitUserSelect = "none";

    document.addEventListener("dblclick", (event) => event.preventDefault(), {
      passive: false,
    });

    window.oncontextmenu = (event) => {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };
*/
    fetch("test.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("Invalid data format or empty data");
        }

        images = data;

        // Restore last position from cookie
        const savedIndex = parseInt(cookies.get("currentIndex"), 10);
        currentIndex =
          isNaN(savedIndex) || savedIndex >= images.length ? 0 : savedIndex;

        updateImage();

        // Preload next few images for smoother experience
        preloadNextImages(3);

        // Show welcome dialog if needed
        showOpeningDialog();
      })
      .catch((error) => {
        console.error("Failed to load images:", error);
        imgWrapper.textContent =
          "Failed to load images. Please try again later.";
      });
  }

  function preloadNextImages(count) {
    for (let i = 1; i <= count; i++) {
      const nextIndex = (currentIndex + i) % images.length;
      const nextImage = images[nextIndex];
      if (nextImage) {
        const preloadImg = new Image();
        preloadImg.src = `https://drive.google.com/thumbnail?id=${nextImage.id}&sz=s1024`;
      }
    }
  }

  // Start the app
  init();
});
