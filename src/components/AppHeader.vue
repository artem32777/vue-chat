<script setup lang="ts">
import { useUserStore } from "@/stores/user"

const isDrawerOpen = defineModel<boolean>({ required: true })

const store = useUserStore()
</script>

<template>
  <v-app-bar
    absolute
    color="indigo lighten-4"
    shrink-on-scroll
    prominent
    scroll-target="#scrolling-techniques">
    <v-app-bar-nav-icon
      v-if="store.getCurrentUser"
      @click="isDrawerOpen = !isDrawerOpen" />

    <v-app-bar-title>Pet-project "vue-chat" with firebase db and google auth</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn
      v-if="store.getCurrentUser"
      icon
      @click="store.logOut()">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<style scoped lang="sass"></style>
