// Helper functions for cookie management
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

function setCookie(name, value, days = 36500) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Get current poem ID
const mainElement = document.querySelector("main.poem");
const heartButton = document.getElementById("heart");
const heartIcon = heartButton.querySelector("i");
const poemId = mainElement.id;

// Initialize favorites on page load
function initializeFavorites() {
  const favoritesCookie = getCookie("favourite-poems");
  const favoritesList = favoritesCookie ? favoritesCookie.split(",") : [];

  if (favoritesList.includes(poemId)) {
    heartIcon.classList.remove("fa-regular");
    heartIcon.classList.add("fa-solid");
  }
}

// Toggle favorite status
function toggleFavorite() {
  const favoritesCookie = getCookie("favourite-poems");
  let favoritesList = favoritesCookie ? favoritesCookie.split(",") : [];

  if (heartIcon.classList.contains("fa-solid")) {
    // Remove from favorites
    heartIcon.classList.remove("fa-solid");
    heartIcon.classList.add("fa-regular");
    favoritesList = favoritesList.filter((id) => id !== poemId);
  } else {
    // Add to favorites
    heartIcon.classList.remove("fa-regular");
    heartIcon.classList.add("fa-solid");
    favoritesList.push(poemId);
  }

  // Update cookie
  const newCookieValue = favoritesList.join(",");
  setCookie("favourite-poems", newCookieValue);
}

// Event listeners
document.addEventListener("DOMContentLoaded", initializeFavorites);
heartButton.addEventListener("click", toggleFavorite);
