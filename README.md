# Ashutosh's Portfolio Website 🚀

A modern, minimal, and futuristic portfolio website showcasing mobile development expertise in Kotlin Multiplatform, Android, and cross-platform development.

## ✨ Features

- **🌓 Dark/Light Mode Toggle** - Seamless theme switching with persistent preferences
- **📱 Fully Responsive** - Optimized for all devices (mobile, tablet, desktop)
- **⚡ Fast & Lightweight** - Pure HTML, CSS, and JavaScript (no frameworks)
- **🎨 Modern Design** - Clean, minimal, tech-focused aesthetic
- **🔄 Smooth Animations** - Professional transitions and scroll effects
- **♿ Accessible** - WCAG compliant with keyboard navigation support
- **🎯 SEO Optimized** - Meta tags and semantic HTML

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid, Flexbox, and CSS Variables
- **Vanilla JavaScript** - No dependencies, pure JS
- **Google Fonts** - Inter & Space Grotesk typography

## 📂 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styles with theme variables
├── script.js           # Interactive functionality
└── README.md           # Documentation (this file)
```

## 🚀 Deployment to GitHub Pages (FREE Hosting)

### Step 1: Prepare Your Repository

1. **Create a new GitHub repository**
   ```bash
   # Go to github.com and create a new repository
   # Name it: <your-username>.github.io
   # For example: ashutosh-dev.github.io
   ```

2. **Clone the repository locally**
   ```bash
   git clone https://github.com/<your-username>/<your-username>.github.io.git
   cd <your-username>.github.io
   ```

### Step 2: Add Your Portfolio Files

1. **Copy all portfolio files to the repository**
   ```bash
   # Copy index.html, styles.css, script.js to the repository folder
   ```

2. **Customize your content** (See customization section below)

### Step 3: Push to GitHub

```bash
git add .
git commit -m "Initial portfolio deployment"
git push origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **main** branch
4. Click **Save**
5. Your site will be live at: `https://<your-username>.github.io`

**🎉 Done! Your portfolio is now live!**

## 🎨 Customization Guide

### 1. Personal Information

**Update the following in `index.html`:**

```html
<!-- Hero Section -->
<h1 class="hero-title">Your Name</h1>
<h2 class="hero-subtitle">Your Title</h2>
<p class="hero-description">Your description...</p>

<!-- About Section -->
<p class="about-intro">Your introduction...</p>

<!-- Contact Section -->
<p>Your Location</p>
<p>your.email@example.com</p>
```

### 2. Projects

**Add/Edit projects in the Featured Projects section:**

```html
<div class="project-card featured">
    <div class="project-badge">Featured</div>
    <div class="project-content">
        <h3 class="project-title">Project Name</h3>
        <p class="project-description">Description...</p>
        <!-- Add your project details -->
    </div>
</div>
```

### 3. Skills

**Update skill levels in the Skills section:**

```html
<div class="skill-item">
    <span class="skill-name">Your Skill</span>
    <div class="skill-bar">
        <div class="skill-progress" style="width: 95%"></div>
    </div>
</div>
```

### 4. Social Links

**Update social media links in the footer:**

```html
<a href="https://github.com/yourusername" target="_blank">GitHub</a>
<a href="https://linkedin.com/in/yourusername" target="_blank">LinkedIn</a>
<a href="mailto:your.email@example.com">Email</a>
```

### 5. Color Scheme

**Customize colors in `styles.css` (CSS Variables):**

```css
:root {
    --accent-primary: #6366f1;      /* Primary accent color */
    --accent-secondary: #8b5cf6;    /* Secondary accent color */
    /* Modify other colors as needed */
}
```

### 6. Contact Form

**To make the contact form functional, integrate with:**

- **EmailJS** - [emailjs.com](https://www.emailjs.com/) (Free tier available)
- **Formspree** - [formspree.io](https://formspree.io/) (Free tier available)
- **Your own backend API**

**Example EmailJS integration in `script.js`:**

```javascript
// Uncomment and configure in script.js
emailjs.send('your_service_id', 'your_template_id', formData)
    .then(() => {
        alert('Message sent successfully!');
    });
```

## 📱 Responsive Breakpoints

- **Desktop**: > 968px
- **Tablet**: 768px - 968px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🎯 Performance Tips

1. **Optimize Images** (when you add them)
   - Use WebP format
   - Compress images with TinyPNG
   - Implement lazy loading (already included in script.js)

2. **Minify Files for Production**
   ```bash
   # Use online tools or:
   npm install -g minify
   minify index.html > index.min.html
   minify styles.css > styles.min.css
   minify script.js > script.min.js
   ```

3. **Enable Caching**
   - GitHub Pages automatically caches static assets

## 🔧 Local Development

To preview your portfolio locally:

1. **Option 1: Simple HTTP Server (Python)**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Then open: http://localhost:8000
   ```

2. **Option 2: Live Server (VS Code Extension)**
   - Install "Live Server" extension in VS Code
   - Right-click `index.html` → "Open with Live Server"

3. **Option 3: Browser (Limited)**
   - Simply open `index.html` in your browser
   - Note: Some features may not work without a server

## 🌐 Alternative Free Hosting Options

If you don't want to use GitHub Pages:

1. **Netlify** - [netlify.com](https://www.netlify.com/)
   - Drag & drop deployment
   - Custom domain support
   - Automatic HTTPS

2. **Vercel** - [vercel.com](https://vercel.com/)
   - Git integration
   - Instant deployments
   - Edge network

3. **Cloudflare Pages** - [pages.cloudflare.com](https://pages.cloudflare.com/)
   - Fast global CDN
   - Unlimited bandwidth
   - Built-in analytics

## ✅ Pre-Deployment Checklist

- [ ] Update all personal information
- [ ] Add your projects with descriptions
- [ ] Update skill levels
- [ ] Add your social media links
- [ ] Replace placeholder email
- [ ] Test on mobile devices
- [ ] Test dark/light mode toggle
- [ ] Verify all links work
- [ ] Check grammar and spelling
- [ ] Test contact form (if integrated)

## 🐛 Common Issues & Fixes

**Issue**: GitHub Pages not showing updated content
- **Fix**: Hard refresh (Ctrl+Shift+R) or wait 5-10 minutes for cache to clear

**Issue**: Theme toggle not working
- **Fix**: Make sure JavaScript is enabled and script.js is loaded

**Issue**: Mobile menu not closing
- **Fix**: Clear browser cache and reload

**Issue**: Styles not loading
- **Fix**: Check file paths are correct (case-sensitive on Linux servers)

## 📄 License

This portfolio template is free to use. Feel free to customize it for your own portfolio!

## 🤝 Contributing

Found a bug or have a suggestion? Feel free to:
1. Open an issue
2. Submit a pull request
3. Contact me directly

## 💡 Future Enhancements

- [ ] Add project images/screenshots
- [ ] Implement blog section
- [ ] Add testimonials section
- [ ] Create multi-language support
- [ ] Add animations with AOS library
- [ ] Implement progressive web app (PWA)
- [ ] Add analytics (Google Analytics, Plausible)

## 📞 Support

If you need help customizing or deploying your portfolio:
- Email: your.email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourusername)

---

**Built with ❤️ by Ashutosh**

*Last Updated: January 2025*
