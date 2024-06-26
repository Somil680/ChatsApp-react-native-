// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence, initializeAuth } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getFirestore, collection } from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDnfYKPn7JFBprZhay-eDjIUbk2fFPY6IU",
    authDomain: "fir-chatapp-12436.firebaseapp.com",
    projectId: "fir-chatapp-12436",
    storageBucket: "fir-chatapp-12436.appspot.com",
    messagingSenderId: "577299416252",
    appId: "1:577299416252:web:1d1f0a59393667b6687cb9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)

})

export const db = getFirestore(app)
export const userRef = collection(db, "users")
export const roomRef = collection(db, "rooms")