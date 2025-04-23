// Smooth scrolling with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.querySelector('.mobile-menu-toggle i').classList.remove('fa-times');
                document.querySelector('.mobile-menu-toggle i').classList.add('fa-bars');
            }
        }
    });
});

// Update current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate progress bars
            if (entry.target.classList.contains('skill-progress')) {
                const percent = entry.target.getAttribute('data-percent');
                const progressFill = entry.target.querySelector('.progress-fill');
                progressFill.style.width = percent + '%';
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll, .skill-progress').forEach(el => {
    observer.observe(el);
});

// Back to top button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

// Form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let isValid = true;
        
        if (name.value.trim() === '') {
            isValid = false;
            name.style.borderColor = 'var(--error)';
        }
        
        if (email.value.trim() === '' || !email.value.includes('@')) {
            isValid = false;
            email.style.borderColor = 'var(--error)';
        }
        
        if (message.value.trim() === '') {
            isValid = false;
            message.style.borderColor = 'var(--error)';
        }
        
        if (isValid) {
            // Form is valid, you can submit via AJAX or Netlify will handle it
            this.submit();
        }
    });
}

// Reset form field errors on focus
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = '';
    });
});

// Simple console message
console.log('Website loaded successfully! 🎻');