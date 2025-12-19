import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBshIYKmoi8wnz4AKR9dLye2fxfjRcH_T8",
    authDomain: "girivalamapp-8ab63.firebaseapp.com",
    projectId: "girivalamapp-8ab63",
    storageBucket: "girivalamapp-8ab63.firebasestorage.app",
    messagingSenderId: "876382539592",
    appId: "1:876382539592:web:ef7e81234768e50debad7d"

};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
