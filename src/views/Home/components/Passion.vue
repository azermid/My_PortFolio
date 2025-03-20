<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";
import { Dumbbell, Users, Waves, Mountain } from "lucide-vue-next";
import PassionCard from "./PassionCard.vue";

gsap.registerPlugin(gsap.plugins.ScrollTrigger);

const passions = [
  {
    title: "Sports de Combat",
    description: "13 ans de karaté, développant discipline et maîtrise de soi",
    image:
      "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=2070",
    icon: Dumbbell,
  },
  {
    title: "Sports Collectifs",
    description: "7 ans de handball, esprit d'équipe et stratégie",
    image:
      "https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?auto=format&fit=crop&q=80&w=2071",
    icon: Users,
  },
  {
    title: "Natation",
    description: "6 ans de natation, endurance et persévérance",
    image:
      "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=2070",
    icon: Waves,
  },
  {
    title: "Sports d'Aventure",
    description:
      "Kayak, escalade, voile - Toujours prêt pour de nouveaux défis",
    image:
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=2093",
    icon: Mountain,
  },
];

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".passions-section",
      start: "top center+=100",
      once: true,
    },
  });

  tl.from(".passions-title", {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
  }).from(
    ".passion-card",
    {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: "power3.out",
    },
    "-=0.5"
  );
});
</script>

<template>
  <div class="passions-section bg-gray-900 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2
        class="passions-title text-4xl font-bold text-white text-center mb-12"
      >
        Mes Passions
      </h2>
      <div
        class="passions-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        <PassionCard
          v-for="(passion, index) in passions"
          :key="index"
          v-bind="passion"
          class="passion-card"
        />
      </div>
    </div>
  </div>
</template>
