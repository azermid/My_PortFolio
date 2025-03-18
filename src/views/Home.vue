<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  const tl = gsap.timeline()
  
  tl.from('.hero-title', {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
  })
  .from('.hero-subtitle', {
    y: 20,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
  }, '-=0.5')
})
</script>

<template>
  <div class="min-h-screen pt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center">
        <h1 class="hero-title text-4xl sm:text-6xl font-bold text-white mb-8">
          Bienvenue sur mon Portfolio
        </h1>
        <p class="hero-subtitle text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Étudiant en troisième année à Epitech, je suis passionné par le développement et en quête d'un stage de 4 mois à partir d'avril...
        </p>
      </div>
    </div>
  </div>
</template>