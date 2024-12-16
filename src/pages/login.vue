<script setup lang="ts">
import { useUserStore } from "@/stores/user"
import { useField, useForm } from "vee-validate"

const store = useUserStore()

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    email(value: string) {
      if (/^[a-z0-9.-]+@[a-z0-9.-]+\.[a-z]+$/i.test(value)) return true
      return "Must be a valid e-mail."
    },
    password(value: string) {
      if (value?.length >= 6) return true
      return "Password needs to be at least 6 characters."
    },
  },
})
const email = useField<string>("email")
const password = useField<string>("password")

const register = handleSubmit(async (values) => {
  await store.register(values as { email: string; password: string })
})
const login = handleSubmit(async (values) => {
  await store.login(values as { email: string; password: string })
})

const tab = ref(null)

watch(tab, () => {
  handleReset()
})
</script>

<template>
  <v-card
    elevation="20"
    width="500px"
    min-height="450"
    class="mx-auto">
    <v-card-title>Login or register</v-card-title>
    <v-tabs
      v-model="tab"
      align-tabs="center"
      bg-color="grey-lighten-3"
      fixed-tabs
      color="deep-purple-accent-4">
      <v-tab value="login">Login</v-tab>
      <v-tab value="register">Register</v-tab>
    </v-tabs>
    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="login">
          <form @submit.prevent="login">
            <v-container>
              <v-text-field
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                variant="outlined"
                label="E-mail"
                class="mb-3">
              </v-text-field>
              <v-text-field
                v-model="password.value.value"
                :counter="20"
                :error-messages="password.errorMessage.value"
                variant="outlined"
                label="Password">
              </v-text-field>
              <div class="d-flex ga-5 justify-space-between pt-5">
                <v-btn type="submit"> Login </v-btn>
                <v-btn
                  v-if="email.value.value || password.value.value"
                  @click="handleReset">
                  Clear
                </v-btn>
              </div>
            </v-container>
          </form>
          <v-card-actions>
            <v-btn
              color="border bg-teal-lighten-2"
              @click="store.loginGoogle()"
              width="100%">
              Login with Google
            </v-btn>
          </v-card-actions>
        </v-tabs-window-item>

        <v-tabs-window-item value="register">
          <form @submit.prevent="register">
            <v-container>
              <v-text-field
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                variant="outlined"
                label="E-mail"
                class="mb-3">
              </v-text-field>
              <v-text-field
                v-model="password.value.value"
                :counter="20"
                :error-messages="password.errorMessage.value"
                variant="outlined"
                label="Password">
              </v-text-field>
              <div class="d-flex ga-5 justify-space-between pt-5">
                <v-btn
                  class="me-3"
                  type="submit">
                  Register
                </v-btn>
                <v-btn
                  v-if="email.value.value || password.value.value"
                  @click="handleReset">
                  Clear
                </v-btn>
              </div>
            </v-container>
          </form>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<style lang="scss"></style>
