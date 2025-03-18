<script setup lang="ts">
import { computed } from "vue";
import type { Repository } from "../types";
import { useLanguages } from "../composables/useLanguages";

const props = defineProps<{
  repositories: Repository[];
}>();

const { getLanguageColor } = useLanguages();

const globalLanguageStats = computed(() => {
  const stats: { [key: string]: number } = {};
  let globalTotalBytes = 0;

  // Récupérer les données brutes de chaque repo
  props.repositories.forEach((repo) => {
    const rawLanguageData = localStorage.getItem(`repo_languages_${repo.name}`);
    if (rawLanguageData) {
      const languagesData = JSON.parse(rawLanguageData);

      // Accumuler les bytes pour chaque langage
      Object.entries(languagesData).forEach(
        ([language, bytes]: [string, number]) => {
          if (!stats[language]) {
            stats[language] = 0;
          }
          stats[language] += bytes;
          globalTotalBytes += bytes;
        }
      );
    }
  });

  // Convertir les bytes en pourcentages et trier
  return Object.entries(stats)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: Math.round((bytes / globalTotalBytes) * 1000) / 10,
    }))
    .sort((a, b) => b.percentage - a.percentage);
});

// Fonction pour formater les bytes en taille lisible
const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
</script>

<template>
  <div class="global-languages mb-12">
    <h2 class="text-2xl font-semibold text-white mb-4 text-center">
      Distribution Globale des Langages
    </h2>

    <!-- Barre de progression -->
    <div class="flex mb-4">
      <div class="w-full h-8 bg-gray-700 rounded-full overflow-hidden flex">
        <div
          v-for="lang in globalLanguageStats"
          :key="lang.name"
          :style="{
            width: `${lang.percentage}%`,
            backgroundColor: getLanguageColor(lang.name),
            minWidth: lang.percentage > 0.5 ? '4px' : '0',
          }"
          class="h-full transition-all duration-300"
          :title="`${lang.name}: ${formatBytes(lang.bytes)} (${
            lang.percentage
          }%)`"
        />
      </div>
    </div>

    <!-- Légende des langages -->
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-4"
    >
      <div
        v-for="lang in globalLanguageStats"
        :key="lang.name"
        class="flex items-center space-x-2 bg-gray-800 p-2 rounded-md"
      >
        <div
          class="w-4 h-4 rounded-full"
          :style="{ backgroundColor: getLanguageColor(lang.name) }"
        />
        <div class="flex flex-col overflow-hidden">
          <span class="text-gray-300 text-sm font-medium truncate">
            {{ lang.name }}
          </span>
          <span class="text-gray-400 text-xs">
            {{ formatBytes(lang.bytes) }} ({{ lang.percentage }}%)
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.global-languages {
  background: rgba(34, 56, 72, 0.67);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.4px);
  -webkit-backdrop-filter: blur(5.4px);
  border: 1px solid rgba(34, 56, 72, 0.36);
}

.global-languages .h-8 {
  height: 32px;
}

.global-languages .grid {
  margin-top: 16px;
}

.global-languages .rounded-full {
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
