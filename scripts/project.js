// ===================================
// PROJECTS PAGE FUNCTIONALITY
// ===================================

// Load projects from JSON
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Render featured projects
        if (data.featured && data.featured.length > 0) {
            renderFeaturedProjects(data.featured);
        }
        
        // Render other projects
        if (data.other) {
            renderOtherProjects(data.other);
        }
        
    } catch (error) {
        console.error('Error loading projects:', error);
        showErrorMessage();
    }
}

// Render featured projects
function renderFeaturedProjects(projects) {
    const container = document.getElementById('featured-projects-container');
    if (!container) {
        console.error('Featured projects container not found');
        return;
    }
    
    container.innerHTML = projects.map(project => `
        <div class="project-card featured">
            <div class="project-badge">Featured</div>
            <div class="project-content">
                <div class="project-header">
                    <h3 class="project-title">${escapeHtml(project.title)}</h3>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
                    </div>
                </div>
                <p class="project-description">${escapeHtml(project.description)}</p>
                <div class="project-highlights">
                    ${project.highlights.map(h => `
                        <div class="highlight">
                            <strong>${escapeHtml(h.value)}</strong>
                            <span>${escapeHtml(h.label)}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="project-tech">
                    ${project.tech.map(t => `<span>${escapeHtml(t)}</span>`).join('')}
                </div>
                ${project.playStoreLink ? `
                    <a href="${escapeHtml(project.playStoreLink)}" target="_blank" rel="noopener noreferrer" class="project-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                        </svg>
                        View on Play Store
                    </a>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// Render other projects by category
function renderOtherProjects(categories) {
    const categoryMapping = {
        kmp: { title: 'Kotlin Multiplatform Projects', icon: '📱' },
        android: { title: 'Android Applications', icon: '🤖' },
        firebase: { title: 'Firebase & Cloud Integration', icon: '☁️' },
        payments: { title: 'Payment Systems', icon: '💳' },
        web_desktop: { title: 'Web & Desktop Projects', icon: '🌐' }
    };
    
    const container = document.getElementById('other-projects-container');
    if (!container) {
        console.error('Other projects container not found');
        return;
    }
    
    container.innerHTML = Object.entries(categories).map(([key, projects]) => {
        const category = categoryMapping[key];
        if (!category) return '';
        
        return `
            <div class="tech-category">
                <h4 class="tech-category-title">
                    <span class="category-icon">${category.icon}</span>
                    ${category.title}
                </h4>
                <div class="projects-grid">
                    ${projects.map(project => `
                        <div class="project-card-small">
                            <h4>${escapeHtml(project.title)}</h4>
                            <p>${escapeHtml(project.description)}</p>
                            <div class="small-tags">
                                ${project.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

// Show error message
function showErrorMessage() {
    const featuredContainer = document.getElementById('featured-projects-container');
    const otherContainer = document.getElementById('other-projects-container');
    
    const errorHTML = `
        <div style="text-align: center; padding: 60px 20px; color: var(--text-secondary); grid-column: 1/-1;">
            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ef4444; margin-bottom: 20px;"></i>
            <p style="font-size: 1.125rem;">Failed to load projects. Please try refreshing the page.</p>
        </div>
    `;
    
    if (featuredContainer) {
        featuredContainer.innerHTML = errorHTML;
    }
    if (otherContainer) {
        otherContainer.innerHTML = errorHTML;
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load projects on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Projects page loaded, fetching data...');
    loadProjects();
});

console.log('✅ Projects JavaScript loaded successfully!');