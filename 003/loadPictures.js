const imageIDs = [
    /*{ id: '13evbU-anKkbSqMbsj3yx1VM87hcLYrT8', title: '' }*/
];

function updateTimeLeft() {
    const daysUntilNextMonday = {
        1: "OUT TODAY",
        2: "OUT IN 6 DAYS",
        3: "OUT IN 5 DAYS",
        4: "OUT IN 4 DAYS",
        5: "OUT IN 3 DAYS",
        6: "OUT IN 2 DAYS",
        0: "OUT IN 1 DAY"
    };

    const today = new Date().getDay();
    document.getElementById('time-left').innerText = daysUntilNextMonday[today];
}

updateTimeLeft();

window.addEventListener('scroll', function() {
    const footer = document.getElementById('footer');
    const scrollPosition = window.scrollY || window.pageYOffset;

    if (scrollPosition > 1) {
        footer.classList.add('footer-visible');
    } else {
        footer.classList.remove('footer-visible');
    }
});

const container = document.getElementById('container');

imageIDs.forEach((image, index) => {
    /*
    sz=s32: 32x32 pixels
    sz=s64: 64x64 pixels
    sz=s128: 128x128 pixels
    sz=s256: 256x256 pixels
    sz=s512: 512x512 pixels
    sz=s1024: 1024 pixels in width (height is adjusted to maintain aspect ratio)
    sz=s4000: 4000 pixels in width (height is adjusted to maintain aspect ratio)
    */
    const img = document.createElement('img');
    img.src = `https://drive.google.com/thumbnail?id=${image.id}&sz=s1024`;
    img.className = 'img';
    
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'img-wrapper';
    imgWrapper.id = `img-${index + 1}`;
    imgWrapper.style.backgroundImage = `url('https://drive.google.com/thumbnail?id=${image.id}&sz=s1024')`;

    imgWrapper.appendChild(img);
    
    const imgTitle = document.createElement('div');
    imgTitle.textContent = image.title;
    imgTitle.className = 'img-title';

    const imgContainer = document.createElement('div');
    imgContainer.className = 'img-container';

    imgContainer.appendChild(imgWrapper);
    imgContainer.appendChild(imgTitle);

    container.appendChild(imgContainer);
});