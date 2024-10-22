const divider = document.getElementById('divider');

function toggleDivider() {
    if (divider.style.visibility === 'hidden') {
        divider.style.visibility = 'visible';
    } else {
        divider.style.visibility = 'hidden';
    }
}

setInterval(toggleDivider, 1000);

function toggleDarkMode() {
    const now = new Date();
    const hour = now.getHours();

    const isNightTime = hour >= 20 || hour < 8;

    const placeholder = document.getElementById('placeholder');
    const time = document.getElementById('time');
    const divider = document.getElementById('divider');

    if (isNightTime) {
        placeholder.src = 'placeholder-dark-mode.png';
        time.src = 'time-dark-mode.png';
        divider.src = 'divider-dark-mode.png';

        
        document.body.style.backgroundColor = '#000000';
        document.querySelectorAll('.controls a').forEach(a => a.style.color = '#F92C27');
        document.querySelectorAll('button').forEach(button => button.style.color = '#F92C27');
    } else {
        placeholder.src = 'placeholder-light-mode.png';
        time.src = 'time-light-mode.png';
        divider.src = 'divider-light-mode.png';

        document.body.style.backgroundColor = '#E7E7E7'; 
        document.querySelectorAll('.controls a').forEach(a => a.style.color = '#333333');
        document.querySelectorAll('button').forEach(button => button.style.color = '#333333');
    }
}

window.onload = toggleDarkMode;
setInterval(toggleDarkMode, 300000); 