<script setup lang="ts">
import { routes } from "vue-router/auto-routes"
// const routes = useRouter()
console.log(routes)
</script>

<template>
  <v-navigation-drawer>
    <v-list>
      <v-list-item
        to="/"
        title="Home" />
      <v-list-item
        to="/chat"
        title="Chat" />
      <v-list-item
        to="/login"
        title="Login" />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped lang="sass"></style>
