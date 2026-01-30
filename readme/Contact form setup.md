# Contact Form Setup Guide 📧

Your portfolio has a contact form but needs a backend to receive messages. Here are **3 FREE options** to make it work:

---

## Option 1: EmailJS (Recommended - Easiest) ⭐

**Why:** Free tier gives you 200 emails/month, no backend needed!

### Setup Steps:

1. **Create Account**
   - Go to [emailjs.com](https://www.emailjs.com/)
   - Sign up for free

2. **Add Email Service**
   - Go to Email Services → Add New Service
   - Choose Gmail (or your email provider)
   - Connect your email

3. **Create Email Template**
   - Go to Email Templates → Create New Template
   - Template content:
   ```
   Name: {{from_name}}
   Email: {{from_email}}
   Message: {{message}}
   ```
   - Save template and copy the **Template ID**

4. **Get Your Keys**
   - Service ID: Found in Email Services
   - Template ID: Found in Email Templates
   - Public Key: Found in Account → API Keys

5. **Update script.js**

Replace the contact form section in `script.js` with:

```javascript
// =====================
// Contact Form Handling with EmailJS
// =====================
const contactForm = document.getElementById('contactForm');

// Initialize EmailJS with your Public Key
emailjs.init('YOUR_PUBLIC_KEY_HERE'); // Replace with your public key

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Prepare form data
    const formData = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
        .then(() => {
            // Success
            submitBtn.textContent = 'Message Sent! ✓';
            submitBtn.style.background = 'var(--success-color)';
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        })
        .catch((error) => {
            // Error
            console.error('EmailJS Error:', error);
            submitBtn.textContent = 'Failed to send';
            submitBtn.style.background = 'var(--error-color)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        });
});
```

6. **Add EmailJS Script**

Add this in `index.html` before `</head>`:

```html
<!-- EmailJS -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

**Done!** Messages will arrive at your email inbox.

---

## Option 2: Formspree (Simple Alternative)

**Why:** Even easier, no JavaScript needed!

### Setup Steps:

1. **Create Account**
   - Go to [formspree.io](https://formspree.io/)
   - Sign up for free (50 submissions/month)

2. **Create Form**
   - Create new form
   - Copy your form endpoint (looks like `https://formspree.io/f/xxxxx`)

3. **Update HTML**

Replace your `<form>` tag in `index.html`:

```html
<form class="contact-form" id="contactForm" 
      action="https://formspree.io/f/YOUR_FORM_ID" 
      method="POST">
    <div class="form-group">
        <input type="text" id="name" name="name" placeholder="Your Name" required>
    </div>
    <div class="form-group">
        <input type="email" id="email" name="email" placeholder="Your Email" required>
    </div>
    <div class="form-group">
        <textarea id="message" name="message" rows="5" placeholder="Your Message" required></textarea>
    </div>
    <button type="submit" class="btn btn-primary btn-block">Send Message</button>
</form>
```

4. **Optional: Add AJAX**

If you want to stay on the page after submit, add this to `script.js`:

```javascript
const form = document.getElementById('contactForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            alert('Message sent successfully!');
            form.reset();
        } else {
            alert('Failed to send message.');
        }
    } catch (error) {
        alert('Error sending message.');
    }
});
```

**Done!** Messages arrive at your email.

---

## Option 3: Google Forms (100% Free Forever)

**Why:** Unlimited submissions, data stored in Google Sheets

### Setup Steps:

1. **Create Google Form**
   - Go to [forms.google.com](https://forms.google.com)
   - Create new form with fields: Name, Email, Message
   - Click Send → Link icon → Copy link

2. **Update HTML**

Replace entire contact section in `index.html`:

```html
<div class="contact-form-container">
    <iframe src="YOUR_GOOGLE_FORM_LINK?embedded=true" 
            width="100%" 
            height="550" 
            frameborder="0" 
            marginheight="0" 
            marginwidth="0">
        Loading…
    </iframe>
</div>
```

**Done!** Responses go to Google Sheets.

---

## Comparison Table

| Feature | EmailJS | Formspree | Google Forms |
|---------|---------|-----------|--------------|
| Free Limit | 200/month | 50/month | Unlimited |
| Setup Time | 10 min | 5 min | 2 min |
| Custom Design | ✅ Yes | ✅ Yes | ❌ No |
| Email Notifications | ✅ Yes | ✅ Yes | ✅ Yes |
| Spam Protection | ✅ Yes | ✅ Yes | ✅ Yes |

---

## Recommended Setup: EmailJS

EmailJS is the best option because:
- ✅ Keeps your beautiful custom design
- ✅ 200 emails/month is more than enough
- ✅ Professional looking
- ✅ Easy to implement

---

## Testing Your Form

After setup:

1. Fill out the form on your portfolio
2. Click "Send Message"
3. Check your email inbox
4. Reply to the sender

---

## Anti-Spam Protection

### Option 1: Simple Honeypot (Recommended)

Add hidden field to catch bots:

```html
<input type="text" name="_gotcha" style="display:none">
```

### Option 2: Google reCAPTCHA

1. Get keys from [google.com/recaptcha](https://www.google.com/recaptcha)
2. Add before `</head>`:
```html
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
```
3. Add to form:
```html
<div class="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>
```

---

## Troubleshooting

**Problem:** Not receiving emails
- Check spam folder
- Verify email service is connected
- Check EmailJS dashboard for errors

**Problem:** Form not submitting
- Check browser console for errors
- Verify all IDs match in HTML and JS
- Make sure EmailJS script is loaded

**Problem:** Getting spam
- Add honeypot field
- Enable reCAPTCHA
- Use Formspree's spam filtering

---

## Need Help?

1. EmailJS Docs: [emailjs.com/docs](https://www.emailjs.com/docs/)
2. Formspree Docs: [help.formspree.io](https://help.formspree.io/)
3. Test your setup on localhost before deploying

---

**Recommendation:** Start with EmailJS, it's the best balance of features and ease-of-use! 🎯

---

*Last Updated: January 2025*