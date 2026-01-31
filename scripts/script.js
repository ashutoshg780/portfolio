scripts js

// =====================
// Theme Toggle Functionality
// =====================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// =====================
// Mobile Navigation Toggle
// =====================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            span.style.transform = '';
            span.style.opacity = '';
        }
    });
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '';
        });
    });
});

// =====================
// Smooth Scrolling for Navigation Links
// =====================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =====================
// Active Navigation Link on Scroll
// =====================
const sections = document.querySelectorAll('section[id]');

function setActiveNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// =====================
// Navbar Background on Scroll
// =====================
const navbar = document.querySelector('.navbar');

function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.boxShadow = 'none';
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// =====================
// Animate Skill Bars on Scroll
// =====================
const skillBars = document.querySelectorAll('.skill-progress');

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
            skillBarObserver.unobserve(bar);
        }
    });
}, observerOptions);

skillBars.forEach(bar => {
    skillBarObserver.observe(bar);
});

// =====================
// Animate Elements on Scroll
// =====================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skill-category, .timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// Run animation on page load
window.addEventListener('load', animateOnScroll);

// =====================
// Firebase Initialization
// =====================
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// =====================
// Contact Form Handling with Firestore
// =====================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        // Save to Firestore
        await db.collection('contact_forms').add({
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Success state
        submitBtn.textContent = 'Message Sent! ✓';
        submitBtn.style.background = 'linear-gradient(135deg, #6750a4 0%, #7f67be 100%)';
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
        
    } catch (error) {
        console.error('Firebase Error:', error);
        alert('Failed to send message. Please try again.');
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// =====================
// Scroll to Top on Page Load
// =====================
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// =====================
// Hide Scroll Indicator on Scroll
// =====================
const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        if (scrollIndicator) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        }
    } else {
        if (scrollIndicator) {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'all';
        }
    }
});

// =====================
// Parallax Effect for Hero Section
// =====================
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        heroSection.style.opacity = 1 - (scrollPosition / 600);
    }
});

// =====================
// Typing Effect for Hero Title (Optional)
// =====================
/*
const heroTitle = document.querySelector('.hero-title');
const titleText = heroTitle.textContent;
heroTitle.textContent = '';

let charIndex = 0;
function typeWriter() {
    if (charIndex < titleText.length) {
        heroTitle.textContent += titleText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});
*/

// =====================
// Project Card Tilt Effect (Advanced)
// =====================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// =====================
// Copy Email to Clipboard (Optional Enhancement)
// =====================
const emailElements = document.querySelectorAll('.contact-item p');

emailElements.forEach(element => {
    if (element.textContent.includes('@')) {
        element.style.cursor = 'pointer';
        element.title = 'Click to copy email';
        
        element.addEventListener('click', () => {
            const email = element.textContent;
            navigator.clipboard.writeText(email).then(() => {
                const originalText = element.textContent;
                element.textContent = 'Email copied!';
                element.style.color = 'var(--accent-primary)';
                
                setTimeout(() => {
                    element.textContent = originalText;
                    element.style.color = '';
                }, 2000);
            });
        });
    }
});

// =====================
// Lazy Loading Images (if you add images later)
// =====================
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

// =====================
// Prevent Right Click on Contact Form (Optional Security)
// =====================
/*
contactForm.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
*/

// =====================
// Console Message for Developers
// =====================
console.log('%c👋 Hi there, developer!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cLooking for something? Feel free to reach out!', 'font-size: 14px; color: #666;');
console.log('%c🚀 Built with HTML, CSS, and Vanilla JavaScript', 'font-size: 12px; color: #999;');

// =====================
// Performance Optimization
// =====================
// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
window.addEventListener('scroll', debounce(setActiveNavLink, 10));
window.addEventListener('scroll', debounce(handleNavbarScroll, 10));

// Certificate Inline View - WITH CLOSE BUTTON

// Get all certificate cards
const certificateCards = document.querySelectorAll('.certificate-card');

// Handle certificate card click
certificateCards.forEach(card => {
    card.addEventListener('click', function() {
        const title = this.dataset.title;
        const issuer = this.dataset.issuer;
        const imagePath = this.dataset.image;
        
        // Get parent container
        const container = this.closest('.certificates-grid-container');
        const detailView = container.querySelector('.certificate-detail-view');
        const detailTitle = detailView.querySelector('[id^="detailTitle"]');
        const detailIssuer = detailView.querySelector('[id^="detailIssuer"]');
        const detailImage = detailView.querySelector('[id^="detailImage"]');
        
        // Remove selected class from all cards in this container
        container.querySelectorAll('.certificate-card').forEach(c => {
            c.classList.remove('selected');
        });
        
        // Add selected class to clicked card
        this.classList.add('selected');
        
        // Update detail view
        detailTitle.textContent = title;
        detailIssuer.textContent = issuer;
        detailImage.src = imagePath;
        
        // Switch to split view
        container.classList.remove('normal-view');
        detailView.classList.add('active');
    });
});

// Handle close button clicks
const closeButtons = document.querySelectorAll('.detail-close-btn');

closeButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        
        // Get parent container
        const container = this.closest('.certificates-grid-container');
        const detailView = container.querySelector('.certificate-detail-view');
        
        // Remove selected class from all cards
        container.querySelectorAll('.certificate-card').forEach(c => {
            c.classList.remove('selected');
        });
        
        // Hide detail view and switch back to normal grid
        detailView.classList.remove('active');
        container.classList.add('normal-view');
    });
});


// ===================================
// NAVIGATION FUNCTIONALITY
// ===================================

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
});

// ===================================
// SMOOTH SCROLLING
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for empty hash or just #
        if (href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// CONTACT FORM HANDLING
// ===================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Get the submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        try {
            // Simulate API call (replace with your actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// Notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// BLOG FILTERING
// ===================================

const filterButtons = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            blogCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category').split(' ');
                
                if (category === 'all' || cardCategories.includes(category)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===================================
// SKILLS ANIMATION ON SCROLL
// ===================================

const skillBars = document.querySelectorAll('.skill-progress');

const animateSkills = () => {
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (barTop < windowHeight - 100) {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }
    });
};

// Run on scroll
let skillsAnimated = false;
window.addEventListener('scroll', () => {
    if (!skillsAnimated) {
        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            const sectionTop = skillsSection.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 200) {
                animateSkills();
                skillsAnimated = true;
            }
        }
    }
});

// ===================================
// NEWSLETTER FORM
// ===================================

const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitBtn = newsletterForm.querySelector('button');
        const originalBtnText = submitBtn.textContent;
        
        // Validate email
        if (!emailInput.value || !isValidEmail(emailInput.value)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Subscribing...';
        
        try {
            // Simulate API call (replace with your actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showNotification('Successfully subscribed to newsletter!', 'success');
            newsletterForm.reset();
        } catch (error) {
            showNotification('Failed to subscribe. Please try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===================================
// COPY TO CLIPBOARD (Share Functionality)
// ===================================

const copyLinkBtn = document.querySelector('.share-btn.copy');

if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        try {
            await navigator.clipboard.writeText(window.location.href);
            showNotification('Link copied to clipboard!', 'success');
        } catch (error) {
            showNotification('Failed to copy link', 'error');
        }
    });
}

// ===================================
// LAZY LOADING IMAGES
// ===================================

const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===================================
// STATS COUNTER ANIMATION
// ===================================

const stats = document.querySelectorAll('.stat-card h3');

const animateCounter = (element) => {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = element.textContent; // Keep original text
        }
    };
    
    updateCounter();
};

let statsAnimated = false;
window.addEventListener('scroll', () => {
    if (!statsAnimated) {
        const aboutSection = document.querySelector('.about-stats');
        if (aboutSection) {
            const sectionTop = aboutSection.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                stats.forEach(stat => {
                    if (stat.textContent.match(/\d/)) {
                        animateCounter(stat);
                    }
                });
                statsAnimated = true;
            }
        }
    }
});

// ===================================
// BACK TO TOP BUTTON
// ===================================

// Create back to top button
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.className = 'back-to-top';
backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.25rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

document.body.appendChild(backToTop);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
    }
});

// Scroll to top on click
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTop.addEventListener('mouseenter', () => {
    backToTop.style.transform = 'translateY(-5px)';
    backToTop.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
});

backToTop.addEventListener('mouseleave', () => {
    backToTop.style.transform = 'translateY(0)';
    backToTop.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
});

// ===================================
// TYPING EFFECT FOR HERO SUBTITLE
// ===================================

const heroSubtitle = document.querySelector('.hero-subtitle');

if (heroSubtitle && heroSubtitle.textContent === 'Mobile Application Developer') {
    const originalText = heroSubtitle.textContent;
    const typingTexts = [
        'Mobile Application Developer',
        'Kotlin Multiplatform Expert',
        'Android Developer',
        'Cross-Platform Specialist'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = typingTexts[textIndex];
        
        if (isDeleting) {
            heroSubtitle.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            heroSubtitle.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typing effect after a short delay
    setTimeout(type, 1000);
}

// ===================================
// SCROLL REVEAL ANIMATION
// ===================================

const revealElements = document.querySelectorAll('.project-card, .blog-card, .feature-card, .skill-category');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease-out';
    revealObserver.observe(element);
});

// ===================================
// CODE SYNTAX HIGHLIGHTING
// ===================================

// If Prism.js is loaded, highlight code blocks
if (typeof Prism !== 'undefined') {
    Prism.highlightAll();
}

// ===================================
// THEME TOGGLE (Optional - Dark Mode)
// ===================================

// Uncomment if you want to add dark mode functionality
/*
const themeToggle = document.createElement('button');
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
themeToggle.className = 'theme-toggle';
// ... add theme toggle functionality
*/

// ===================================
// CONSOLE LOG (Developer Easter Egg)
// ===================================

console.log('%c👋 Hello, Developer!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%c🚀 Built with Kotlin Multiplatform expertise', 'font-size: 14px; color: #10b981;');
console.log('%c📧 Interested in working together? Reach out!', 'font-size: 14px; color: #f59e0b;');
console.log('%c💼 Portfolio: https://yourwebsite.com', 'font-size: 12px; color: #6b7280;');

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
function debounce(func, wait = 20) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Your scroll event handlers here
}));

// ===================================
// ACCESSIBILITY IMPROVEMENTS
// ===================================

// Add keyboard navigation for mobile menu
if (navToggle) {
    navToggle.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navToggle.click();
        }
    });
}

// Focus trap for mobile menu when open
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    });
}

if (navMenu) {
    trapFocus(navMenu);
}

// ===================================
// FORM VALIDATION
// ===================================

// Real-time form validation
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateInput(input);
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateInput(input);
        }
    });
});

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (input.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email';
    }
    
    if (isValid) {
        input.classList.remove('error');
        removeErrorMessage(input);
    } else {
        input.classList.add('error');
        showErrorMessage(input, errorMessage);
    }
    
    return isValid;
}

function showErrorMessage(input, message) {
    removeErrorMessage(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem;';
    
    input.parentElement.appendChild(errorDiv);
}

function removeErrorMessage(input) {
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

// Add error styles
const errorStyle = document.createElement('style');
errorStyle.textContent = `
    input.error,
    textarea.error {
        border-color: #ef4444 !important;
    }
`;
document.head.appendChild(errorStyle);

console.log('✅ Portfolio JavaScript loaded successfully!');