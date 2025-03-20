<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";
import { Code, Brain, Trophy } from "lucide-vue-next";

onMounted(() => {
  const tl = gsap.timeline();

  tl.from(".hero-title", {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
  })
    .from(
      ".hero-subtitle",
      {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      },
      "-=0.5"
    )
    .from(
      ".about-section",
      {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.3"
    )
    .from(
      ".feature-card",
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
  <div class="min-h-screen pt-16 bg-apple-dark">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center">
        <h1 class="hero-title text-4xl sm:text-6xl font-bold text-white mb-8">
          Bienvenue sur mon Portfolio
        </h1>
        <p
          class="hero-subtitle text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
        >
          Étudiant en troisième année à Epitech, je suis passionné par le
          développement et en quête d'un stage de 4 mois à partir d'avril...
        </p>
      </div>
    </div>

    <div class="about-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="grid lg:grid-cols-3 gap-6">
        <div class="lg:col-span-3 mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
            À propos de moi
          </h2>
          <div class="space-y-6 text-gray-300 max-w-3xl">
            <p class="text-lg leading-relaxed">
              Je suis une personne solaire et probablement l'une des plus
              enthousiastes que vous rencontrerez. 🌞
            </p>
            <p class="text-lg leading-relaxed">
              Sociable lorsque l'environnement s'y prête, je m'épanouis
              pleinement dans des contextes où je me sens à l'aise. Que ce soit
              dans le développement ou le sport, j'ai besoin de pression pour
              donner le meilleur de moi-même. Être sous tension me motive à
              repousser mes limites et à me surpasser à 200 %.
            </p>
            <p class="text-lg leading-relaxed">
              Passionné par l'apprentissage, je plonge à fond dans chaque défi
              que j'entreprends. Toujours curieux et avide de nouvelles
              connaissances, je cherche constamment à évoluer et à affiner mes
              compétences. 🚀
            </p>
          </div>
        </div>

        <div
          class="feature-card group relative h-[400px] overflow-hidden rounded-2xl"
        >
          <div
            class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style="
              background-image: url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070');
            "
          >
            <div
              class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70"
            ></div>
          </div>
          <div class="relative h-full p-8 flex flex-col justify-end">
            <div class="flex items-center gap-4 mb-4">
              <div
                class="p-3 bg-blue-500/10 backdrop-blur-sm rounded-lg text-blue-400"
              >
                <Code size="{24}" />
              </div>
              <h3 class="text-2xl font-semibold text-white">Développement</h3>
            </div>
            <p class="text-gray-300">
              Passionné par la création et l'innovation technologique
            </p>
          </div>
        </div>

        <div
          class="feature-card group relative h-[400px] overflow-hidden rounded-2xl"
        >
          <div
            class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style="
              background-image: url('https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=2070');
            "
          >
            <div
              class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70"
            ></div>
          </div>
          <div class="relative h-full p-8 flex flex-col justify-end">
            <div class="flex items-center gap-4 mb-4">
              <div
                class="p-3 bg-purple-500/10 backdrop-blur-sm rounded-lg text-purple-400"
              >
                <Trophy size="{24}" />
              </div>
              <h3 class="text-2xl font-semibold text-white">
                Sport & Compétition
              </h3>
            </div>
            <p class="text-gray-300">
              L'esprit de compétition comme moteur de dépassement
            </p>
          </div>
        </div>

        <div
          class="feature-card group relative h-[400px] overflow-hidden rounded-2xl"
        >
          <div
            class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style="
              background-image: url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=2070');
            "
          >
            <div
              class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70"
            ></div>
          </div>
          <div class="relative h-full p-8 flex flex-col justify-end">
            <div class="flex items-center gap-4 mb-4">
              <div
                class="p-3 bg-green-500/10 backdrop-blur-sm rounded-lg text-green-400"
              >
                <Brain size="{24}" />
              </div>
              <h3 class="text-2xl font-semibold text-white">
                Apprentissage Continu
              </h3>
            </div>
            <p class="text-gray-300">
              Toujours en quête de nouvelles connaissances
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  .feature-card {
    height: 24rem;
  }
}
</style>
