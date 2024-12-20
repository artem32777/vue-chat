import { withErrorHandling } from "@/helpers"
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth"
import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { useRouter } from "vue-router"

export const useUserStore = defineStore("userStore", () => {
  const router = useRouter()
  const user = ref<User | null>(null)
  const getCurrentUser = computed(() => user.value)

  const logOut = () =>
    withErrorHandling(async () => {
      await signOut(getAuth())
      await router.push("/login")
    })

  const loginGoogle = () =>
    withErrorHandling(async () => {
      await signInWithPopup(getAuth(), new GoogleAuthProvider())
      await router.push("/chat")
    })

  const login = (values: { email: string; password: string }) =>
    withErrorHandling(async () => {
      await signInWithEmailAndPassword(getAuth(), values.email, values.password)
      await router.push("/")
    })

  const register = (values: { email: string; password: string }) =>
    withErrorHandling(async () => {
      await createUserWithEmailAndPassword(getAuth(), values.email, values.password)
      await router.push("/chat")
    })

  return {
    user,
    getCurrentUser,
    logOut,
    login,
    loginGoogle,
    register,
  }
})
