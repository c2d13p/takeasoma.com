const imageIDs = [
    '1Fm2R_TjqsiG-sNxiWp1onZJzqn0IqYsf',
    '1k9C633M8PNB6hFZF4ijhj4jD9x2vbXUA',
    '1lSEIiig3EjoekfNszt3AmlpdoEWDuoj4',
    '1-E-ggzoQz1lXlzHhtDjhbFseIJZBUcKO'
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

window.addEventListener('scroll', function() {
    const footer = document.getElementById('footer');
    const header = document.querySelector('.header');
    const headerLogo = document.getElementById('header-logo');
    const instagramLogo = document.getElementById('instagram-logo');
    const scrollPosition = window.scrollY || window.pageYOffset;

    if (scrollPosition > 1) {
        footer.classList.add('footer-visible');
        headerLogo.src = "logo-half-1.png";
        if (window.innerWidth <= 767) {
            header.style.height = '4vh';
            instagramLogo.style.height = '60%';
        } else if (window.innerWidth <= 1023){
            header.style.height = '6vh';
            instagramLogo.style.height = '50%';
        } else {
            header.style.height = '7.5vh';
            instagramLogo.style.height = '80%';
        }
    } else {
        footer.classList.remove('footer-visible');
        headerLogo.src = "logo.png";
        if (window.innerWidth <= 767) {
            header.style.height = '8vh';
            instagramLogo.style.height = '45%';
        } else if (window.innerWidth <= 1023) {
            header.style.height = '12vh';
            instagramLogo.style.height = '45%';
        } else {
            header.style.height = '15vh';
            instagramLogo.style.height = '50%';
        }
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