const imageIDs = [
    '16ehE6_8ltOuEA6-ZzRaE6RTgjPsmd7ID',
    '16ehE6_8ltOuEA6-ZzRaE6RTgjPsmd7ID',
    '16ehE6_8ltOuEA6-ZzRaE6RTgjPsmd7ID'
];

const container = document.getElementById('image-container');

imageIDs.forEach(id => {
    const img = document.createElement('img');
    img.src = `https://drive.google.com/thumbnail?id=${id}&sz=s4000`;
    img.className = 'img';
    container.appendChild(img);

    /*
    sz=s32: 32x32 pixels
    sz=s64: 64x64 pixels
    sz=s128: 128x128 pixels
    sz=s256: 256x256 pixels
    sz=s512: 512x512 pixels
    sz=s1024: 1024 pixels in width (height is adjusted to maintain aspect ratio)
    sz=s4000: 4000 pixels in width (height is adjusted to maintain aspect ratio)
    */
});