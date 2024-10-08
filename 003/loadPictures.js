const imageIDs = [
    '16ehE6_8ltOuEA6-ZzRaE6RTgjPsmd7ID',
    '16ehE6_8ltOuEA6-ZzRaE6RTgjPsmd7ID',
    '16ehE6_8ltOuEA6-ZzRaE6RTgjPsmd7ID'
];

const container = document.getElementById('image-container');

imageIDs.forEach(id => {
    const img = document.createElement('img');
    img.src = `https://drive.google.com/uc?export=download&id=${id}`;
    img.className = 'img';
    container.appendChild(img);
});