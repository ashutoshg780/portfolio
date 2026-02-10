// ===================================
// BLOG POST CREATOR WITH AUTHENTICATION
// ===================================

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

let tagsArray = [];
let uploadedImageFile = null;
let uploadedImageURL = '';

// ===================================
// AUTHENTICATION
// ===================================

const loginSection = document.getElementById('login-section');
const blogFormSection = document.getElementById('blog-form-section');
const loginForm = document.getElementById('login-form');

// Check if user is already logged in
auth.onAuthStateChanged((user) => {
    if (user) {
        showBlogForm();
    } else {
        showLoginForm();
    }
});

// Login form submission
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        
        // Append @tgbagupta.in to username
        const email = username + '@tgbagupta.in';
        
        const submitBtn = loginForm.querySelector('button');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<div class="spinner"></div> Logging in...';
        
        try {
            await auth.signInWithEmailAndPassword(email, password);
            showSuccess('Login successful!');
            showBlogForm();
        } catch (error) {
            console.error('Login error:', error);
            showError('Invalid credentials. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

function showLoginForm() {
    loginSection.style.display = 'block';
    blogFormSection.classList.remove('active');
}

function showBlogForm() {
    loginSection.style.display = 'none';
    blogFormSection.classList.add('active');
}

// ===================================
// IMAGE UPLOAD
// ===================================

const imageInput = document.getElementById('blog-image');
const imagePreview = document.getElementById('image-preview');
const previewImg = document.getElementById('preview-img');
const fileName = document.getElementById('file-name');

if (imageInput) {
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        
        if (file) {
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showError('Image size must be less than 5MB');
                imageInput.value = '';
                return;
            }
            
            // Validate file type
            if (!file.type.startsWith('image/')) {
                showError('Please select an image file');
                imageInput.value = '';
                return;
            }
            
            uploadedImageFile = file;
            
            // Show preview
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImg.src = e.target.result;
                fileName.textContent = file.name;
                imagePreview.classList.add('active');
            };
            reader.readAsDataURL(file);
        }
    });
}

// Upload image to Firebase Storage
async function uploadImage(file) {
    try {
        // Create unique filename with timestamp
        const timestamp = Date.now();
        const extension = file.name.split('.').pop();
        const filename = `blog_${timestamp}.${extension}`;
        
        // Upload to Firebase Storage
        const storageRef = storage.ref();
        const imageRef = storageRef.child(`blog/${filename}`);
        
        const snapshot = await imageRef.put(file);
        const downloadURL = await snapshot.ref.getDownloadURL();
        
        console.log('✅ Image uploaded:', downloadURL);
        return downloadURL;
    } catch (error) {
        console.error('Image upload error:', error);
        throw new Error('Failed to upload image');
    }
}

// ===================================
// TAGS FUNCTIONALITY
// ===================================

const tagsContainer = document.getElementById('tags-container');
const tagsInput = document.getElementById('blog-tags-input');

if (tagsInput) {
    tagsInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const tag = tagsInput.value.trim();
            
            if (tag && !tagsArray.includes(tag)) {
                addTag(tag);
                tagsInput.value = '';
            }
        }
    });
}

function addTag(tag) {
    tagsArray.push(tag);
    renderTags();
}

window.removeTag = function(tag) {
    tagsArray = tagsArray.filter(t => t !== tag);
    renderTags();
};

function renderTags() {
    const existingTags = tagsContainer.querySelectorAll('.tag-item');
    existingTags.forEach(tag => tag.remove());
    
    tagsArray.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'tag-item';
        tagElement.innerHTML = `
            ${escapeHtml(tag)}
            <button type="button" onclick="removeTag('${escapeHtml(tag)}')">&times;</button>
        `;
        tagsContainer.insertBefore(tagElement, tagsInput);
    });
}

// ===================================
// FORM SUBMISSION
// ===================================

const blogForm = document.getElementById('blog-form');
const publishBtn = document.getElementById('publish-btn');
const confirmationModal = document.getElementById('confirmation-modal');
const confirmationCodeInput = document.getElementById('confirmation-code');
const confirmPublishBtn = document.getElementById('confirm-publish');
const cancelConfirmBtn = document.getElementById('cancel-confirm');

let pendingBlogData = null;

if (blogForm) {
    console.log('✅ Blog form found, adding submit listener');
    
    blogForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('🔥 Form submitted!');
        
        // Validate form
        if (!validateForm()) {
            console.log('❌ Validation failed');
            showError('Please fill in all required fields');
            return;
        }
        
        console.log('✅ Validation passed');
        
        // Get form data
        pendingBlogData = getFormData();
        console.log('📦 Form data:', pendingBlogData);
        
        // Show confirmation modal
        confirmationModal.classList.add('active');
        confirmationCodeInput.value = '';
        confirmationCodeInput.focus();
        console.log('✅ Modal opened');
    });
} else {
    console.error('❌ Blog form not found!');
}

// Cancel confirmation
if (cancelConfirmBtn) {
    cancelConfirmBtn.addEventListener('click', () => {
        confirmationModal.classList.remove('active');
        pendingBlogData = null;
    });
}

// Confirm and publish
if (confirmPublishBtn) {
    confirmPublishBtn.addEventListener('click', async () => {
        const enteredCode = confirmationCodeInput.value.trim();
        
        // Validate code
        if (enteredCode !== String(blog_post.postcode)) {
            showError('Invalid confirmation code');
            confirmationCodeInput.value = '';
            return;
        }
        
        // Close modal
        confirmationModal.classList.remove('active');
        
        // Publish post
        await publishPost(pendingBlogData);
    });
}

// Publish post to Firestore
async function publishPost(data) {
    publishBtn.disabled = true;
    publishBtn.innerHTML = '<div class="spinner"></div> Publishing...';
    
    try {
        // Upload image first
        showSuccess('Uploading image...');
        const imageURL = await uploadImage(uploadedImageFile);
        data.image = imageURL;
        
        // Generate unique document ID
        const docRef = db.collection('blogs').doc();
        data.id = docRef.id;
        data.url = `blog-post.html?id=${docRef.id}`;
        
        // Save to Firestore
        showSuccess('Saving post...');
        await docRef.set({
            ...data,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showSuccess('Blog post published successfully! 🎉');
        
        // Reset form after 2 seconds
        setTimeout(() => {
            blogForm.reset();
            tagsArray = [];
            renderTags();
            uploadedImageFile = null;
            imagePreview.classList.remove('active');
            
            // Optionally redirect
            setTimeout(() => {
                window.location.href = 'blog.html';
            }, 1000);
        }, 2000);
        
    } catch (error) {
        console.error('Publish error:', error);
        showError('Failed to publish: ' + error.message);
    } finally {
        publishBtn.disabled = false;
        publishBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Publish Post';
    }
}

// ===================================
// FORM VALIDATION & DATA
// ===================================

function validateForm() {
    console.log('🔍 Starting validation...');
    
    const title = document.getElementById('blog-title').value.trim();
    const category = document.getElementById('blog-category').value;
    const excerpt = document.getElementById('blog-excerpt').value.trim();
    const author = document.getElementById('blog-author').value.trim();
    const date = document.getElementById('blog-date').value.trim();
    const readTime = document.getElementById('blog-read-time').value.trim();
    
    console.log('Title:', title);
    console.log('Category:', category);
    console.log('Excerpt:', excerpt);
    console.log('Author:', author);
    console.log('Date:', date);
    console.log('Read Time:', readTime);
    
    const categories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => cb.value);
    
    console.log('Selected categories:', categories);
    console.log('Tags array:', tagsArray);
    console.log('Uploaded image file:', uploadedImageFile);
    
    if (!title || !category || !excerpt || !author || !date || !readTime) {
        console.log('❌ Basic fields validation failed');
        return false;
    }
    
    if (categories.length === 0) {
        console.log('❌ No categories selected');
        showError('Please select at least one filter category');
        return false;
    }
    
    if (tagsArray.length === 0) {
        console.log('❌ No tags added');
        showError('Please add at least one tag');
        return false;
    }
    
    if (!uploadedImageFile) {
        console.log('❌ No image uploaded');
        showError('Please upload a featured image');
        return false;
    }
    
    console.log('✅ All validation passed');
    return true;
}

function getFormData() {
    const categories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => cb.value);
    
    return {
        title: document.getElementById('blog-title').value.trim(),
        category: document.getElementById('blog-category').value,
        categories: categories,
        excerpt: document.getElementById('blog-excerpt').value.trim(),
        author: document.getElementById('blog-author').value.trim(),
        date: document.getElementById('blog-date').value.trim(),
        readTime: document.getElementById('blog-read-time').value.trim(),
        tags: tagsArray,
        content: document.getElementById('blog-content').value.trim(),
        image: '' // Will be filled after upload
    };
}

// ===================================
// UTILITIES
// ===================================

function showSuccess(message) {
    const successMsg = document.getElementById('success-message');
    successMsg.querySelector('span').textContent = message;
    successMsg.classList.add('active');
    
    document.getElementById('error-message').classList.remove('active');
    
    setTimeout(() => {
        successMsg.classList.remove('active');
    }, 5000);
}

function showError(message) {
    const errorMsg = document.getElementById('error-message');
    errorMsg.querySelector('span').textContent = message;
    errorMsg.classList.add('active');
    
    document.getElementById('success-message').classList.remove('active');
    
    setTimeout(() => {
        errorMsg.classList.remove('active');
    }, 5000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===================================
// AUTO-FILL DATE
// ===================================

window.addEventListener('load', () => {
    const dateInput = document.getElementById('blog-date');
    if (dateInput && !dateInput.value) {
        const now = new Date();
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
        dateInput.value = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    }
});

console.log('✅ Blog Post Creator loaded successfully!');