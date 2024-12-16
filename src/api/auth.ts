import { useUserStore } from "@/stores/user"
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

export const initFirebase = () => {
  const firebaseApp = initializeApp({
    apiKey:  import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: "vue-chat-7135d.firebaseapp.com",
    projectId: "vue-chat-7135d",
    storageBucket: "vue-chat-7135d.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_APP_FIREBASE_SENDER_ID,
    appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  })
  const firebaseDb = getFirestore(firebaseApp);
  initFirebaseAuthWatcher()
}

function initFirebaseAuthWatcher() {
  const userStore = useUserStore()
  const storedUser = localStorage.getItem("user")

  if (storedUser) {
    userStore.user = JSON.parse(storedUser)
  }

  onAuthStateChanged(getAuth(), (firebaseUser) => {
    if (firebaseUser) {
      userStore.user = firebaseUser
      localStorage.setItem("user", JSON.stringify(firebaseUser))
    } else {
      userStore.user = null
      localStorage.removeItem("user")
    }
  })
}
