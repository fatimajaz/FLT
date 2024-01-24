import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB1BOv6-tHs77DRnXK1cvpVpZ-iqSS_bog",
  authDomain: "flabs-tasks.firebaseapp.com",
  databaseURL: "https://flabs-tasks-default-rtdb.firebaseio.com",
  projectId: "flabs-tasks",
  storageBucket: "flabs-tasks.appspot.com",
  messagingSenderId: "831343552471",
  appId: "1:831343552471:web:eb98ba1a7cb04cd2f20d92",
  measurementId: "G-24LVH2088R"
};



    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth(app);

    // Rest of your script...

const email = "user@example.com";
const password = "password123";

firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // User signed in
    const user = userCredential.user;
    console.log(user);
  })
  .catch((error) => {
    // Handle errors
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
  });
