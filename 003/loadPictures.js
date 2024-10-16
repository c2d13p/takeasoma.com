const imageIDs = [
    { id: '1Fm2R_TjqsiG-sNxiWp1onZJzqn0IqYsf', title: '20-06-1991' },
    { id: '1k9C633M8PNB6hFZF4ijhj4jD9x2vbXUA', title: '24-04-2024' },
    { id: '1-E-ggzoQz1lXlzHhtDjhbFseIJZBUcKO', title: '2016-08-11' },
    { id: '1lSEIiig3EjoekfNszt3AmlpdoEWDuoj4', title: '2022-01-01' },
    { id: '1-E-ggzoQz1lXlzHhtDjhbFseIJZBUcKO', title: '2016-08-11' }
];

const container = document.getElementById('image-container');

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
    img.setAttribute('data-ambient', '');
    
    const title = document.createElement('div');
    title.textContent = image.title;
    title.className = 'img-title';
    
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'img-wrapper';
    imgWrapper.id = `img-${index + 1}`;

    imgWrapper.appendChild(img);
    imgWrapper.appendChild(title);
    
    container.appendChild(imgWrapper);
});

window.addEventListener('scroll', function() {
    const footer = document.getElementById('footer');
    const scrollPosition = window.scrollY || window.pageYOffset;

    if (scrollPosition > 1) {
        footer.classList.add('footer-visible');
    } else {
        footer.classList.remove('footer-visible');
    }
});

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

var ambient = new Ambient ({blur: 20, retainAttributes: true, includeCSS: false});
ambient.mount ();