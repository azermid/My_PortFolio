<script setup lang="ts">
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="min-h-screen bg-apple-dark">
    <Navigation class="mb-8" />
    <main>
      <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>