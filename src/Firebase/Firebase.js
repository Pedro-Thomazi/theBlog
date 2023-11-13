import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyDa4KFDGGJqivFi7Pr3_7PEUVO5P_HUqew",
  authDomain: "the-blog-399712.firebaseapp.com",
  projectId: "the-blog-399712",
  storageBucket: "the-blog-399712.appspot.com",
  messagingSenderId: "555753488556",
  appId: "1:555753488556:web:c41508d35ba5f10fd95f09"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)