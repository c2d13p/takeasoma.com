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

    //const month = new Date().getMonth();
    const month = 0;
    const monthClass = monthClasses[month];

    document.body.classList.add(monthClass);
    
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.classList.add(monthClass);
    });

    const footer = document.querySelector('.footer');
    footer.classList.add(monthClass);
});