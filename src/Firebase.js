import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9UBwdwZqK8CMUX0tJqI7CNEbvwryiUj8",
  authDomain: "srb-chatroom-reactjs.firebaseapp.com",
  projectId: "srb-chatroom-reactjs",
  storageBucket: "srb-chatroom-reactjs.appspot.com",
  messagingSenderId: "883201047954",
  appId: "1:883201047954:web:248a1cde38d7ff5568d54b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
const auth = getAuth(app);
export { auth, db};