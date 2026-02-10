// ===================================
// BLOG PAGE FUNCTIONALITY
// ===================================

let allBlogPosts = [];

// Load blogs from JSON
async function loadBlogs() {
    try {
        const response = await fetch('data/blogs.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        allBlogPosts = data.posts;
        
        // Render all blog posts initially
        renderBlogPosts(allBlogPosts);
        
        // Setup filter functionality
        setupFilters();
        
    } catch (error) {
        console.error('Error loading blogs:', error);
        showErrorMessage();
    }
}

// Render blog posts
function renderBlogPosts(posts) {
    const container = document.getElementById('blog-grid-container');
    if (!container) {
        console.error('Blog grid container not found');
        return;
    }
    
    if (posts.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); grid-column: 1/-1;">No posts found for this category.</p>';
        return;
    }
    
    container.innerHTML = posts.map((post, index) => `
        <article class="blog-card" data-category="${post.categories.join(' ')}" style="animation-delay: ${index * 0.1}s">
            <div class="blog-image">
                <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}">
                <span class="blog-category">${escapeHtml(post.category)}</span>
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span><i class="fas fa-calendar"></i> ${escapeHtml(post.date)}</span>
                    <span><i class="fas fa-clock"></i> ${escapeHtml(post.readTime)}</span>
                </div>
                <h2>${escapeHtml(post.title)}</h2>
                <p>${escapeHtml(post.excerpt)}</p>
                <div class="blog-tags">
                    ${post.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
                </div>
                <a href="${escapeHtml(post.url)}" class="blog-link">
                    Read More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    `).join('');
}

// Setup filter buttons
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length === 0) {
        console.warn('No filter buttons found');
        return;
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            // Filter posts
            if (category === 'all') {
                renderBlogPosts(allBlogPosts);
            } else {
                const filteredPosts = allBlogPosts.filter(post => 
                    post.categories.includes(category)
                );
                renderBlogPosts(filteredPosts);
            }
        });
    });
}

// Newsletter form submission
function setupNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (!newsletterForm) {
        console.warn('Newsletter form not found');
        return;
    }
    
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
            // Simulate API call (replace with actual backend call)
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

// Show error message
function showErrorMessage() {
    const container = document.getElementById('blog-grid-container');
    
    if (!container) return;
    
    const errorHTML = `
        <div style="text-align: center; padding: 60px 20px; color: var(--text-secondary); grid-column: 1/-1;">
            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ef4444; margin-bottom: 20px;"></i>
            <p style="font-size: 1.125rem;">Failed to load blog posts. Please try refreshing the page.</p>
        </div>
    `;
    
    container.innerHTML = errorHTML;
}

// Email validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
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
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add notification animations
function addNotificationStyles() {
    if (document.getElementById('notification-animations')) return;
    
    const style = document.createElement('style');
    style.id = 'notification-animations';
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
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Blog page loaded, fetching data...');
    addNotificationStyles();
    loadBlogs();
    setupNewsletter();
    console.log('✅ Blog JavaScript ready!');
});

console.log('✅ Blog JavaScript loaded successfully!');