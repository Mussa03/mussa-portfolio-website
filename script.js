document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme from localStorage or prefer-color-scheme
    initTheme();
    
    // Set up event listeners
    setupEventListeners();
    
    // Set time-based greeting
    setGreeting();
    
    // Update footer year
    updateFooterYear();
    
    // Initialize image map
    initImageMap();
});

// Theme Functions
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
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    }
}

function enableLightMode() {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    }
}

/* Event Listeners*/
function setupEventListeners() {
    // Theme toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            document.getElementById('main-nav').classList.toggle('show');
        });
    }
    
    // Close mobile menu when clicking outside
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

// Time-based Greeting
function setGreeting() {
    const hour = new Date().getHours();
    const greeting = document.getElementById('greeting');
    let message = '';
    
    if (hour < 12) {
        message = 'Good Morning!';
    } else if (hour < 18) {
        message = 'Good Afternoon!';
    } else {
        message = 'Good Evening!';
    }
    
    if (greeting) {
        greeting.textContent = message;
    }
}

// Footer Year
function updateFooterYear() {
    const yearElement = document.querySelector('footer p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }
}

// Image Map
function initImageMap() {
    const image = document.querySelector('img[usemap]');
    if (image) {
        image.addEventListener('click', function(e) {
            // Handle image map clicks if needed
        });
    }
}

// Form Validation (for contact.html)
function validateContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Phone validation
        const phone = document.getElementById('phone').value;
        if (phone && !/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
            alert('Please enter a valid phone number in the format 123-456-7890.');
            return;
        }

        // Email validation with regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // If validation passes
        alert('Thank you for your message! I will get back to you soon.');
        form.reset();
    });
}

// Survey Form Handling (for survey.html)
function handleSurveyForm() {
    const form = document.getElementById('survey-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const projectType = form.querySelector('input[name="project-type"]:checked');
        if (!projectType) {
            alert('Please select a project type.');
            return;
        }
        
        alert('Thank you for completing the survey! Your responses have been recorded.');
        form.reset();
    });
}
