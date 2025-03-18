<script setup lang="ts">
import { ref } from "vue";
import emailjs from "emailjs-com";

const form = ref({
  company: "",
  reason: "",
  email: "",
  message: "",
});

const loading = ref(false);
const success = ref(false);
const error = ref("");

const sendEmail = async (e: Event) => {
  e.preventDefault();
  loading.value = true;
  error.value = "";

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name: form.value.company,
        email: form.value.email,
        title: form.value.reason,
        message: form.value.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    success.value = true;
    form.value = {
      company: "",
      reason: "",
      email: "",
      message: "",
    };
  } catch (err) {
    error.value = "Failed to send message. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen pt-16">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="text-3xl font-bold text-white mb-8">Contact</h2>

      <form @submit="sendEmail" class="space-y-6">
        <div>
          <label for="company" class="block text-sm font-medium text-gray-300">
            Nom de l'entreprise
          </label>
          <input
            type="text"
            id="company"
            v-model="form.company"
            required
            class="mt-1 block w-full rounded-md bg-apple-gray border-gray-600 text-white shadow-sm focus:border-apple-blue focus:ring focus:ring-apple-blue focus:ring-opacity-50"
          />
        </div>

        <div>
          <label for="reason" class="block text-sm font-medium text-gray-300">
            Motif du contact
          </label>
          <input
            type="text"
            id="reason"
            v-model="form.reason"
            required
            class="mt-1 block w-full rounded-md bg-apple-gray border-gray-600 text-white shadow-sm focus:border-apple-blue focus:ring focus:ring-apple-blue focus:ring-opacity-50"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-300">
            Email du contact
          </label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            required
            class="mt-1 block w-full rounded-md bg-apple-gray border-gray-600 text-white shadow-sm focus:border-apple-blue focus:ring focus:ring-apple-blue focus:ring-opacity-50"
          />
        </div>

        <div>
          <label for="message" class="block text-sm font-medium text-gray-300">
            Message
          </label>
          <textarea
            id="message"
            v-model="form.message"
            rows="4"
            required
            class="mt-1 block w-full rounded-md bg-apple-gray border-gray-600 text-white shadow-sm focus:border-apple-blue focus:ring focus:ring-apple-blue focus:ring-opacity-50"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-apple-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-apple-blue disabled:opacity-50"
          >
            <span v-if="loading">Envoi en cours...</span>
            <span v-else>Envoyer</span>
          </button>
        </div>

        <div v-if="success" class="text-green-400 text-center">
          Message envoyé avec succès!
        </div>

        <div v-if="error" class="text-red-400 text-center">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>
