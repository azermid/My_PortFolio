<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

defineProps<{
  title: string;
  description: string;
  image: string;
  icon: any;
}>();

const cardRef = ref(null);

onMounted(() => {
  gsap.from(cardRef.value, {
    scrollTrigger: {
      trigger: cardRef.value,
      start: "top bottom-=100",
      toggleActions: "play none none reverse",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });
});
</script>

<template>
  <div
    ref="cardRef"
    class="passion-card group relative bg-gray-800 rounded-xl overflow-hidden shadow-xl"
  >
    <div class="h-48 overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        :style="{ backgroundImage: `url('${image}')` }"
      >
        <div
          class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70"
        ></div>
      </div>
    </div>
    <div class="relative p-6">
      <div class="flex items-center gap-3 mb-4">
        <div
          class="p-3 bg-blue-500/10 backdrop-blur-sm rounded-lg text-blue-400"
        >
          <component :is="icon" :size="24" />
        </div>
        <h3 class="text-xl font-semibold text-white">{{ title }}</h3>
      </div>
      <p class="text-gray-400">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.passion-card {
  transition: transform 0.3s ease;
}

.passion-card:hover {
  transform: scale(1.05);
}

@media (max-width: 640px) {
  .passion-card {
    height: auto;
  }
  .h-48 {
    height: 24rem;
  }
}
</style>
