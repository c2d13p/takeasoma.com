// Helper function for cookie management
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

// Add hearts to favorite poems on page load
function addHeartsToFavorites() {
  const favoritesCookie = getCookie("favourite-poems");

  if (!favoritesCookie) return; // No favorites cookie exists

  const favoritesList = favoritesCookie.split(",");

  favoritesList.forEach((poemId) => {
    const poemLink = document.getElementById(poemId);
    if (poemLink) {
      // Create heart icon
      const heartIcon = document.createElement("i");
      heartIcon.className = "fa-regular fa-heart heart-poem";

      // Add heart at the beginning of the link
      poemLink.insertBefore(heartIcon, poemLink.firstChild);
    }
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", addHeartsToFavorites);
