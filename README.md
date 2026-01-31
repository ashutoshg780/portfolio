# Ashutosh - Mobile Developer Portfolio 🚀

A modern, responsive portfolio website showcasing mobile development expertise with a focus on Kotlin Multiplatform (KMP) development.

## 🌟 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Single Page Navigation**: Smooth scrolling between sections on homepage
- **Detailed Project Showcase**: Individual project pages with lifecycle, screenshots, and metrics
- **Blog Platform**: Publish technical articles and tutorials
- **Interactive Elements**: Animations, hover effects, and smooth transitions
- **Contact Form**: Easy way for potential clients/employers to reach out
- **SEO Optimized**: Meta tags and semantic HTML for better search engine visibility
- **Performance Optimized**: Lazy loading, debounced scroll events, optimized assets

## 📁 File Structure

```
portfolio/
├── index.html              # Main homepage (single page with all sections)
├── projects.html           # Detailed project showcase
├── blog.html              # Blog listing page
├── blog-post-kmp-code-sharing.html  # Sample blog post (template)
├── styles.css             # Complete stylesheet
├── script.js              # Interactive JavaScript
├── assets/                # Media files (create this folder)
│   ├── profile.jpg        # Your profile picture
│   ├── resume.pdf         # Your resume/CV
│   ├── projects/          # Project images
│   │   ├── eva2z.jpg
│   │   ├── niharika.jpg
│   │   └── phonepe.jpg
│   ├── screenshots/       # Detailed project screenshots
│   │   ├── eva2z-home.jpg
│   │   ├── eva2z-map.jpg
│   │   ├── niharika-login.jpg
│   │   └── ...
│   └── blog/             # Blog featured images
│       ├── kmp-code-sharing.jpg
│       ├── ml-kit-migration.jpg
│       └── ...
└── README.md             # This file
```

## 🎨 Customization Guide

### 1. Personal Information

**Update in `index.html`:**

- Line ~50-60: Change name and title in hero section
- Line ~70-75: Update social media links (GitHub, LinkedIn, Twitter, Email)
- Line ~100-120: Modify about section text with your details
- Line ~500-520: Update contact information (email, phone, location)

**Update in `projects.html`:**

- Replace project details with your actual projects
- Add your project screenshots
- Update technology stacks
- Modify achievements and metrics

**Update in `blog.html`:**

- Add your blog posts
- Update categories
- Change featured images

### 2. Colors & Branding

**In `styles.css` (lines 6-20):**

```css
:root {
    --primary-color: #6366f1;      /* Main brand color */
    --primary-dark: #4f46e5;       /* Darker variant */
    --secondary-color: #10b981;    /* Success/accent color */
    --accent-color: #f59e0b;       /* Warning/highlight color */
}
```

Change these to match your personal brand!

### 3. Images

Create an `assets` folder and add:

1. **profile.jpg** - Your professional photo (square, min 500x500px)
2. **resume.pdf** - Your CV/Resume
3. **Project images** in `assets/projects/`
4. **Screenshots** in `assets/screenshots/`
5. **Blog images** in `assets/blog/`

### 4. Social Media Links

Update all occurrences of:
- `https://github.com/yourusername` → Your GitHub
- `https://linkedin.com/in/yourusername` → Your LinkedIn
- `https://twitter.com/yourusername` → Your Twitter
- `your.email@example.com` → Your email
- `+91 98765 43210` → Your phone

### 5. Google Fonts (Optional)

Add this in the `<head>` section if you want custom fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

## 🚀 Deployment

### Option 1: GitHub Pages (Free)

1. Create a new repository on GitHub
2. Push all files to the repository
3. Go to Settings → Pages
4. Select main branch and root folder
5. Save and wait for deployment
6. Your site will be live at `https://yourusername.github.io/repo-name`

### Option 2: Netlify (Free)

1. Create account on [Netlify](https://netlify.com)
2. Drag and drop your portfolio folder
3. Done! Your site is live

### Option 3: Vercel (Free)

1. Create account on [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Deploy with one click

### Option 4: Custom Domain

After deploying to any platform above:
1. Purchase a domain (namecheap.com, godaddy.com, etc.)
2. Configure DNS settings in platform dashboard
3. Point your custom domain to the platform

## 📝 Creating New Blog Posts

1. Copy `blog-post-kmp-code-sharing.html`
2. Rename to your post slug (e.g., `blog-post-my-new-article.html`)
3. Update:
   - Title and meta tags
   - Post header (title, date, category)
   - Content inside `.post-content`
   - Tags in post footer
   - Related posts section
4. Add new post card in `blog.html`

## 🔧 Features to Add (Optional)

- [ ] Dark mode toggle
- [ ] Google Analytics
- [ ] Contact form backend (EmailJS, Formspree, or custom)
- [ ] Blog search functionality
- [ ] RSS feed for blog
- [ ] Comments system (Disqus, utterances)
- [ ] Portfolio filtering by technology
- [ ] Loading animations
- [ ] Progressive Web App (PWA)

## 📱 Testing Checklist

- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on mobile devices (iOS, Android)
- [ ] Check responsive breakpoints (480px, 768px, 1024px, 1440px)
- [ ] Verify all links work
- [ ] Test contact form
- [ ] Check image loading
- [ ] Validate HTML (validator.w3.org)
- [ ] Check accessibility (WAVE, Lighthouse)
- [ ] Test page load speed (PageSpeed Insights)

## 🎯 SEO Checklist

- [ ] Add meta descriptions to all pages
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Set up Google Search Console
- [ ] Add Open Graph tags for social sharing
- [ ] Optimize images (compress, add alt text)
- [ ] Add schema.org structured data
- [ ] Submit to search engines

## 💡 Tips

1. **Keep it Updated**: Regular updates show you're active
2. **Write Blog Posts**: Demonstrates expertise and improves SEO
3. **Add Real Projects**: Quality > Quantity
4. **Optimize Images**: Compress before uploading (TinyPNG, Squoosh)
5. **Mobile First**: Most visitors will be on mobile
6. **Fast Loading**: Keep page size under 3MB
7. **Analytics**: Add Google Analytics to track visitors

## 🐛 Common Issues

**Images not showing:**
- Check file paths are correct
- Ensure images are in the assets folder
- File names are case-sensitive

**Styles not applying:**
- Verify styles.css is in the same directory
- Check for typos in class names
- Clear browser cache

**Mobile menu not working:**
- Ensure script.js is loaded
- Check browser console for errors

## 📧 Support

If you have questions or need help:
- Email: your.email@example.com
- LinkedIn: [Your Profile](https://linkedin.com/in/yourusername)
- GitHub: [Your Profile](https://github.com/yourusername)

## 📄 License

This portfolio template is free to use for personal projects. Attribution appreciated but not required.

## 🙏 Credits

- Icons: [Font Awesome](https://fontawesome.com)
- Fonts: [Google Fonts](https://fonts.google.com)
- Code Highlighting: [Prism.js](https://prismjs.com)

---

**Built with ❤️ by Ashutosh** | Mobile Application Developer specializing in Kotlin Multiplatform

Last Updated: January 2025