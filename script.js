document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    setupEventListeners();
    setGreeting();
    updateFooterYear();
    initImageMap();
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        enableDarkMode();
    } else {
        enableLightMode();
    }
}

function toggleTheme() {
    if (document.body.classList.contains('dark-mode')) {
        enableLightMode();
    } else {
        enableDarkMode();
    }
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark');
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>'; // sun icon for dark mode (to switch to light)
    }
}

function enableLightMode() {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>'; // moon icon for light mode (to switch to dark)
    }
}

function setupEventListeners() {
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
    
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const nav = document.getElementById('main-nav');
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('show');
        });
    }
    
    document.addEventListener('click', function(e) {
        const nav = document.getElementById('main-nav');
        const mobileBtn = document.getElementById('mobile-menu-button');
        if (nav && nav.classList.contains('show') && 
            e.target !== mobileBtn && 
            !mobileBtn?.contains(e.target) && 
            e.target !== nav && 
            !nav.contains(e.target)) {
            nav.classList.remove('show');
        }
    });
}

function setGreeting() {
    const hour = new Date().getHours();
    const greeting = document.getElementById('greeting');
    let message = '';
    if (hour < 12) message = 'Good Morning!';
    else if (hour < 18) message = 'Good Afternoon!';
    else message = 'Good Evening!';
    if (greeting) greeting.textContent = message;
}

function updateFooterYear() {
    const yearElement = document.querySelector('footer p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }
}

function initImageMap() {
    const image = document.querySelector('img[usemap]');
    if (image) {
        image.addEventListener('click', function(e) {});
    }
}
