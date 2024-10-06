document.addEventListener("DOMContentLoaded", () => {
    const folderId = 'your-google-folder-id';  // Replace with your folder's ID
    const imageContainer = document.getElementById('image-container');

    fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=your-api-key`)  // Replace with your API key
        .then(response => response.json())
        .then(data => {
            data.files.forEach(file => {
                const img = document.createElement('img');
                img.src = `https://drive.google.com/uc?id=${file.id}`;
                img.alt = file.name;
                img.classList.add('img');
                imageContainer.appendChild(img);
            });
        })
        .catch(error => console.error('Error loading images:', error));
});