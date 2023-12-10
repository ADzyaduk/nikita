import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firebaseConfig = {
    apiKey: "AIzaSyCNcXgAPW2wpjndcIFbYQKKLBeqDbG0O0U",
    authDomain: "nikfeedback.firebaseapp.com",
    projectId: "nikfeedback",
    storageBucket: "nikfeedback.appspot.com",
    messagingSenderId: "1000562481768",
    appId: "1:1000562481768:web:7d829a345aaccc241d39dd",
    measurementId: "G-Z09LYXZGY6"
  };
