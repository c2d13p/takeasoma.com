// Share button functionality
const shareButton = document.getElementById("share");

// Create notification element
function createNotification() {
  const notification = document.createElement("div");
  notification.textContent = "Link copiato!";
  notification.className = "copy-notification";

  // Position it above the share button
  const rect = shareButton.getBoundingClientRect();
  notification.style.cssText = `
    position: fixed;
    top: ${rect.top - 50}px;
    left: ${rect.left + rect.width / 2}px;
    transform: translateX(-50%);
    background: var(--light-clr, #333);
    border: 1px solid var(--font-clr);
    color: var(--font-clr, #fff);
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    white-space: nowrap;
  `;

  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => (notification.style.opacity = "1"), 10);

  // Hide and remove notification after 2 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 2000);
}

// Copy URL to clipboard
async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    createNotification();
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = window.location.href;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
      createNotification();
    } catch (fallbackErr) {
      console.error("Failed to copy URL:", fallbackErr);
    }

    document.body.removeChild(textArea);
  }
}

// Add event listener
shareButton.addEventListener("click", copyToClipboard);
