# GitHub Pages Deployment Guide 🚀

## Quick Start (5 Minutes)

Follow these steps to get your portfolio live for FREE on GitHub Pages.

---

## Prerequisites

- A GitHub account (free) - [Sign up here](https://github.com/signup)
- Git installed on your computer - [Download here](https://git-scm.com/downloads)
- Your portfolio files (index.html, styles.css, script.js)

---

## Step-by-Step Deployment

### Step 1: Create GitHub Repository

1. **Go to GitHub** → [github.com](https://github.com)

2. **Click the "+" icon** (top right) → **"New repository"**

3. **Repository Settings:**
   ```
   Repository name: <your-username>.github.io
   
   Example: ashutosh-dev.github.io
   
   ⚠️ IMPORTANT: The repository name MUST be exactly:
   <your-github-username>.github.io
   ```

4. **Settings to select:**
   - ✅ Public (required for free GitHub Pages)
   - ✅ Add a README file (optional, we have our own)
   - ❌ Don't add .gitignore
   - ❌ Don't choose a license (you can add later)

5. **Click "Create repository"**

---

### Step 2: Upload Your Portfolio Files

#### Option A: Upload via GitHub Web Interface (Easiest)

1. **Go to your new repository** on GitHub

2. **Click "Add file"** → **"Upload files"**

3. **Drag and drop these files:**
   - index.html
   - styles.css
   - script.js
   - README.md

4. **Scroll down** and click **"Commit changes"**

**✅ Done! Skip to Step 3.**

---

#### Option B: Upload via Git Command Line (Recommended)

1. **Open Terminal/Command Prompt**

2. **Clone your repository:**
   ```bash
   git clone https://github.com/<your-username>/<your-username>.github.io.git
   cd <your-username>.github.io
   ```

3. **Copy your portfolio files** into this folder:
   - index.html
   - styles.css
   - script.js
   - README.md

4. **Add and commit files:**
   ```bash
   git add .
   git commit -m "Initial portfolio deployment"
   git push origin main
   ```

**✅ Done! Continue to Step 3.**

---

### Step 3: Enable GitHub Pages

1. **Go to your repository** on GitHub

2. **Click "Settings"** (top menu)

3. **Click "Pages"** (left sidebar, under "Code and automation")

4. **Configure Source:**
   ```
   Source: Deploy from a branch
   Branch: main
   Folder: / (root)
   ```

5. **Click "Save"**

6. **Wait 2-5 minutes** for deployment

7. **Refresh the page** - You'll see:
   ```
   Your site is live at https://<your-username>.github.io/
   ```

**🎉 Your portfolio is now LIVE!**

---

## Verification

1. **Visit your site:** `https://<your-username>.github.io`

2. **Check everything works:**
   - ✅ Dark/Light mode toggle
   - ✅ Navigation menu
   - ✅ Mobile responsiveness
   - ✅ All sections load
   - ✅ Smooth scrolling

---

## Making Updates

### Quick Updates (Web Interface)

1. **Go to your repository**
2. **Click on the file** you want to edit
3. **Click the pencil icon** (Edit)
4. **Make changes**
5. **Scroll down** → **"Commit changes"**
6. **Wait 2-3 minutes** for changes to appear

### Advanced Updates (Git)

```bash
# Make changes to your files locally

# Add changes
git add .

# Commit with a message
git commit -m "Updated projects section"

# Push to GitHub
git push origin main

# Wait 2-3 minutes for deployment
```

---

## Custom Domain (Optional)

Want to use your own domain instead of github.io?

### Step 1: Buy a Domain
- **Namecheap** - [namecheap.com](https://www.namecheap.com/) (~$10/year)
- **Google Domains** - [domains.google](https://domains.google/)
- **GoDaddy** - [godaddy.com](https://www.godaddy.com/)

### Step 2: Configure DNS

**Add these DNS records at your domain registrar:**

```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     <your-username>.github.io
```

### Step 3: Add Custom Domain to GitHub

1. **Go to repository Settings → Pages**
2. **Under "Custom domain"**, enter: `yourdomain.com`
3. **Click "Save"**
4. **Wait 24-48 hours** for DNS propagation
5. **Enable "Enforce HTTPS"** (after DNS is active)

---

## Troubleshooting

### Issue: "404 - Page not found"

**Solutions:**
1. Check repository name is exactly: `<username>.github.io`
2. Verify `index.html` is in the root directory (not in a folder)
3. Wait 5-10 minutes after first deployment
4. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

---

### Issue: "Changes not showing up"

**Solutions:**
1. **Wait 2-5 minutes** after pushing changes
2. **Hard refresh** your browser
3. **Clear browser cache**
4. **Check GitHub Actions:**
   - Go to repository → "Actions" tab
   - Check if deployment succeeded (green checkmark)

---

### Issue: "CSS/JavaScript not loading"

**Solutions:**
1. Check file paths in `index.html`:
   ```html
   <link rel="stylesheet" href="styles.css">
   <script src="script.js"></script>
   ```
2. File names are **case-sensitive**
3. No folders - all files should be in root directory

---

### Issue: "Build failed"

**Solutions:**
1. Check for **syntax errors** in HTML/CSS/JavaScript
2. Validate HTML: [validator.w3.org](https://validator.w3.org/)
3. Validate CSS: [jigsaw.w3.org/css-validator](https://jigsaw.w3.org/css-validator/)

---

## GitHub Pages Limitations

**Free Tier Limits:**
- ✅ 1 GB storage
- ✅ 100 GB bandwidth/month
- ✅ Custom domain support
- ✅ Free SSL certificate
- ❌ No backend/server-side code
- ❌ No databases
- ❌ Static sites only

**Perfect for:**
- Portfolio websites ✅
- Landing pages ✅
- Documentation sites ✅
- Project showcases ✅

**Not suitable for:**
- E-commerce sites ❌
- Dynamic web apps ❌
- Anything needing a database ❌

---

## Performance Optimization

### 1. Enable HTTPS (Free SSL)
Already enabled by GitHub Pages automatically!

### 2. Compress Images (when you add them)
```bash
# Use online tools:
- TinyPNG: tinypng.com
- Squoosh: squoosh.app
- ImageOptim: imageoptim.com
```

### 3. Minify Files (Optional)
```bash
# Install minifier
npm install -g minify

# Minify files
minify styles.css > styles.min.css
minify script.js > script.min.js

# Update references in index.html
```

### 4. Use CDN for Libraries
Already using Google Fonts CDN!

---

## Security Tips

1. **Never commit:**
   - API keys
   - Passwords
   - Email service credentials
   - Database credentials

2. **Use environment variables** for sensitive data

3. **Enable 2FA** on your GitHub account

4. **Keep repository public** (required for free GitHub Pages)

---

## Advanced: GitHub Actions (CI/CD)

Want automatic deployments with build steps?

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Portfolio

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

---

## Monitoring & Analytics

### Add Google Analytics (Optional)

1. **Create account**: [analytics.google.com](https://analytics.google.com/)

2. **Get tracking ID**

3. **Add to `index.html`** (before `</head>`):
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

---

## Backup Your Portfolio

### Option 1: Download Repository
1. Go to repository
2. Click "Code" → "Download ZIP"
3. Save locally

### Option 2: Clone Locally
```bash
git clone https://github.com/<username>/<username>.github.io.git
```

### Option 3: Fork Repository
1. Click "Fork" button
2. Creates a copy in your account

---

## Next Steps

After deployment:

1. **✅ Test on multiple devices**
   - Desktop (Chrome, Firefox, Safari, Edge)
   - Mobile (iOS, Android)
   - Tablet

2. **✅ Share your portfolio**
   - LinkedIn
   - Twitter
   - Resume
   - Email signature

3. **✅ Add to resume**
   ```
   Portfolio: https://<your-username>.github.io
   ```

4. **✅ Update regularly**
   - Add new projects
   - Update skills
   - Refresh content

---

## Resources

- **GitHub Pages Docs**: [docs.github.com/pages](https://docs.github.com/pages)
- **Git Tutorial**: [git-scm.com/docs/gittutorial](https://git-scm.com/docs/gittutorial)
- **HTML Validator**: [validator.w3.org](https://validator.w3.org/)
- **CSS Validator**: [jigsaw.w3.org/css-validator](https://jigsaw.w3.org/css-validator/)

---

## Need Help?

**Common Questions:**

Q: How much does GitHub Pages cost?
A: **100% FREE** for public repositories

Q: Can I use a custom domain?
A: **Yes!** Follow the custom domain section above

Q: How long does deployment take?
A: **2-5 minutes** for initial deployment, **1-3 minutes** for updates

Q: Can I make the repository private?
A: **No** - Free GitHub Pages requires public repositories

Q: What if my username changes?
A: You'll need to rename the repository to match

---

**🎉 Congratulations! Your portfolio is now live!**

Share it: `https://<your-username>.github.io`

---

*Last Updated: January 2025*
