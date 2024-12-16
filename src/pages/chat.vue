<script setup lang="ts">
import { useUserStore } from "@/stores/user"
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  query,
  getDocs,
  serverTimestamp,
  orderBy,
} from "firebase/firestore"
import { ref, onMounted, onUnmounted, nextTick } from "vue"

const textFiled = ref("")
const loading = ref(false)
const fetchedData = ref<any[]>([])
textFiled.value.trim()

const db = collection(getFirestore(), "chat")
const queryChat = query(db, orderBy("createdAt", "asc"))
const chatContainer = ref<null | HTMLDivElement>(null)

const user = useUserStore().getCurrentUser

const sendMessage = async () => {
  if (!user) return
  textFiled.value = ""
  try {
    const docRef = await addDoc(db, {
      uid: user.uid,
      displayName: user.displayName ?? user.email,
      photoUrl: user.photoURL ?? "",
      message: textFiled.value,
      createdAt: serverTimestamp(),
    })
    console.log("Document written with ID: ", docRef.id)
  } catch (e) {
    console.error("Error adding document: ", e)
  }
}

onMounted(async () => {
  const unsubscribe = onSnapshot(queryChat, (snapshot) => {
    fetchedData.value = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
      photoUrl: doc.photoUrl || "/favicon.ico",
    }))
    nextTick(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
      }
    })
  })
})
</script>

<template>
  <div class="w-50 mx-auto flex text-center">
    <v-progress-circular
      v-if="fetchedData.length === 0"
      indeterminate
      size="50"
      class="mb-10 mx-auto"
      color="primary" />
    <v-card
      v-else-if="fetchedData.length > 0"
      :elevation="10"
      class="pa-2 mb-10">
      <div
        ref="chatContainer"
        class="overflow-y-auto"
        style="max-height: 400px">
        <v-list>
          <v-list-item
            v-for="(message, i) in fetchedData"
            :key="message.uid"
            :prepend-avatar="message.photoUrl"
            :title="message.displayName"
            class="text-start">
            {{ message.message }}
          </v-list-item>
        </v-list>
      </div>
    </v-card>
    <v-form>
      <v-textarea
        auto-grow
        clearable
        dirty
        :loading="loading"
        density="comfortable"
        counter
        clear-icon="mdi-close-circle"
        v-model.trim="textFiled"
        @keydown.enter="sendMessage()"
        label="Напишите сообщение"
        variant="solo-filled"
        class="h-50"></v-textarea>
      <v-btn
        @click="sendMessage()"
        :disabled="loading"
        class="text-end">
        Send
      </v-btn>
    </v-form>
  </div>
</template>
