document.addEventListener("DOMContentLoaded", function() {
    const monthClasses = [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december'
    ];

    const monthFonts = {
        'january': "https://fonts.googleapis.com/css?family=Shadows+Into+Light",
        'february': "https://fonts.googleapis.com/css?family=Tomorrow",
        'march': "https://fonts.googleapis.com/css?family=Caveat",
        'april': "https://fonts.googleapis.com/css?family=Kaushan+Script",
        'may': "https://fonts.googleapis.com/css?family=Oleo+Script",
        'june': "https://fonts.googleapis.com/css?family=Playwrite+AT",
        'july': "https://fonts.googleapis.com/css?family=Coiny",
        'august': "https://fonts.googleapis.com/css?family=Notable",
        'september': "https://fonts.googleapis.com/css?family=MuseoModerno",
        'october': "https://fonts.googleapis.com/css?family=Autour+One",
        'november': "https://fonts.googleapis.com/css?family=Matemasie",
        'december': "https://fonts.googleapis.com/css?family=Rubik+Bubbles"
    };

    const month = new Date().getMonth();
    const monthClass = monthClasses[month];

    document.body.classList.add(monthClass);
    
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.classList.add(monthClass);
    });

    const footer = document.querySelector('.footer');
    footer.classList.add(monthClass);
    
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = monthFonts[monthClass];
    document.head.appendChild(fontLink);
});