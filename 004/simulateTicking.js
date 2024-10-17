const divider = document.getElementById('divider');

function toggleDivider() {
    if (divider.style.visibility === 'hidden') {
        divider.style.visibility = 'visible';
    } else {
        divider.style.visibility = 'hidden';
    }
}

setInterval(toggleDivider, 1000);
