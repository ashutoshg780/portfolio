// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBju66RMPPYJYLcM5Cco6m_Ase9QVI9hFM",
  authDomain: "developerashutoshgupta.firebaseapp.com",
  databaseURL: "https://developerashutoshgupta-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "developerashutoshgupta",
  storageBucket: "developerashutoshgupta.firebasestorage.app",
  messagingSenderId: "472861926693",
  appId: "1:472861926693:web:c57f7b7e9fe707582126cc",
  measurementId: "G-FP247VCX68"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Blog Post Configuration
// WARNING: username/password below are plain text in client-side JS — visible to
// anyone via "View Source". This is a local-only gate, not real authentication.
const blog_post = {
    postcode: 121212,       // 6-digit confirmation code
    username: "devashu",
    password: "ashudev"
};

console.log('✅ Firebase initialized successfully!');