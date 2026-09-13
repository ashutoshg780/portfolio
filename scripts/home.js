// ===================================
// HOME PAGE SPECIFIC FUNCTIONALITY
// ===================================

// =====================
// Parallax Effect for Hero Section
// =====================
const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        heroSection.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        heroSection.style.opacity = 1 - (scrollPosition / 600);
    });
}

// =====================
// Project Card Tilt Effect
// =====================
// Ported back from the currently-deployed site's script.js — this mouse-tracking
// 3D tilt was never carried over when the site was split into per-page scripts.
const tiltProjectCards = document.querySelectorAll('.project-card');

tiltProjectCards.forEach(card => {
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
// Typing Effect for Hero Subtitle
// =====================
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle && heroSubtitle.textContent.includes('Software Developer')) {
    const typingTexts = [
        'Software Developer',
        'Kotlin Multiplatform Expert',
        'Full-Stack Web Developer',
        'Cross-Platform Specialist'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = typingTexts[textIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        const logoHTML = '<img src="images/fav_icon.png" alt="Logo" class="inline-logo">';
        heroSubtitle.innerHTML = logoHTML + currentText.substring(0, charIndex);

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

    setTimeout(type, 1000);
}

// =====================
// Scroll Reveal Animation
// =====================
const revealElements = document.querySelectorAll(
    '.project-card, .skill-category, .timeline-item, .certificate-card, .hardware-card'
);
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const el = entry.target;
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                // Clear the inline transform/transition once the reveal finishes —
                // otherwise it permanently outranks the CSS :hover transform (e.g.
                // .project-card:hover's lift animation), silently disabling it forever.
                el.addEventListener('transitionend', () => {
                    el.style.transform = '';
                    el.style.transition = '';
                }, { once: true });
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease-out';
    revealObserver.observe(element);
});

// =====================
// Skills Animation on Scroll
// =====================
const skillBars = document.querySelectorAll('.skill-progress');

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
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillBarObserver.observe(bar);
});

// =====================
// Certificate Inline View
// =====================
const certificateCards = document.querySelectorAll('.certificate-card');

certificateCards.forEach(card => {
    card.addEventListener('click', function () {
        const title = this.dataset.title;
        const issuer = this.dataset.issuer;
        const imagePath = this.dataset.image;

        const container = this.closest('.certificates-grid-container');
        const detailView = container.querySelector('.certificate-detail-view');
        const detailTitle = detailView.querySelector('[id^="detailTitle"]');
        const detailIssuer = detailView.querySelector('[id^="detailIssuer"]');
        const detailImage = detailView.querySelector('[id^="detailImage"]');

        container.querySelectorAll('.certificate-card').forEach(c => {
            c.classList.remove('selected');
        });

        this.classList.add('selected');

        detailTitle.textContent = title;
        detailIssuer.textContent = issuer;

        const placeholderSvg = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="240">' +
            '<rect width="100%" height="100%" fill="#ececf1" rx="12"/>' +
            '<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" ' +
            'font-family="Inter, sans-serif" font-size="18" font-style="italic" fill="#79747e">' +
            'Certificate image not yet added</text></svg>'
        );
        detailImage.onerror = () => {
            detailImage.onerror = null;
            detailImage.src = placeholderSvg;
            detailImage.alt = 'Certificate image not yet added';
        };
        detailImage.src = imagePath;

        container.classList.remove('normal-view');
        detailView.classList.add('active');
    });
});

const closeButtons = document.querySelectorAll('.detail-close-btn');

closeButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.stopPropagation();

        const container = this.closest('.certificates-grid-container');
        const detailView = container.querySelector('.certificate-detail-view');

        container.querySelectorAll('.certificate-card').forEach(c => {
            c.classList.remove('selected');
        });

        detailView.classList.remove('active');
        container.classList.add('normal-view');
    });
});

// =====================
// Hardware Section — Read More Toggle
// =====================
document.querySelectorAll('.hardware-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.hardware-card');
        const expanded = card.classList.toggle('expanded');
        btn.setAttribute('aria-expanded', String(expanded));
        btn.textContent = expanded ? 'Show less ↑' : 'Read the full build story ↓';
    });
});

// =====================
// Firebase & Contact Form
// =====================
// firebaseConfig is already initialized once in auth/credentials.js —
// calling initializeApp() again here throws "Firebase App named '[DEFAULT]'
// already exists" and silently breaks the form below.
const db = firebase.firestore();

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        await db.collection('contact_forms').add({
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        submitBtn.textContent = 'Message Sent! ✓';
        submitBtn.style.background = 'linear-gradient(135deg, #6750a4 0%, #7f67be 100%)';
        contactForm.reset();

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

console.log('✅ Home JavaScript loaded successfully!');