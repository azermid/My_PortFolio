<script setup lang="ts">
import Navigation from './components/Navigation.vue'
</script>

<template>
  <div class="min-h-screen bg-apple-dark">
    <Navigation />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>