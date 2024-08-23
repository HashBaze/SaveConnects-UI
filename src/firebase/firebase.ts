// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB56QM9c8Ixo99XcrGLLdvHVXvp9xxOejU",
  authDomain: "saveconnects.firebaseapp.com",
  projectId: "saveconnects",
  storageBucket: "saveconnects.appspot.com",
  messagingSenderId: "137447881634",
  appId: "1:137447881634:web:bb8baee01e8ff783a050fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getStorage(app);