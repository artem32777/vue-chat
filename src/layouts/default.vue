<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue"
import AppNavigation from "@/components/AppNavigation.vue"

const isDrawerOpen = ref(false)

const isLoading = ref(true)

onMounted(() => {
  isLoading.value = false
})
</script>

<template>
  <div
    v-if="isLoading"
    class="w-100 h-100 bg-blue-accent-1 d-flex align-center justify-center">
    <v-progress-circular
      indeterminate
      :size="128"
      :width="12"
      color="indigo-darken-2" />
  </div>
  <div
    v-else
    class="h-100">
    <AppHeader v-model="isDrawerOpen" />
    <v-layout full-height class="rounded rounded-md">
      <AppNavigation v-if="isDrawerOpen" />
      <v-main @click="isDrawerOpen = false">
        <div class="pa-16">
          <RouterView />
        </div>
      </v-main>
    </v-layout>
  </div>
</template>
