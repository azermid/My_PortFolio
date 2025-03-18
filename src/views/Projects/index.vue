<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useGithub } from "./composables/useGithub";
import { useLanguages } from "./composables/useLanguages";
import LoadingSpinner from "./components/LoadingSpinner.vue";
import ProjectCard from "./components/ProjectCard.vue";
import GlobalLanguages from "./components/GlobalLanguages.vue";

const { repositories, isLoading, errorMessage, fetchRepositories } =
  useGithub();
const { languageColors } = useLanguages();

// Ajout du state pour le filtre
const selectedLanguage = ref<string>("");

// Liste des langages disponibles dans tous les projets
const availableLanguages = computed(() => {
  const languages = new Set<string>();
  repositories.value.forEach((repo) => {
    repo.languages?.forEach((lang) => languages.add(lang));
  });
  return Array.from(languages).sort();
});

// Filtrer les repositories en fonction du langage sélectionné
const filteredRepositories = computed(() => {
  if (!selectedLanguage.value) return repositories.value;

  return repositories.value.filter((repo) =>
    repo.languages?.includes(selectedLanguage.value)
  );
});

onMounted(() => {
  fetchRepositories();
});
</script>

<template>
  <div class="container mx-auto px-4 pt-28">
    <h1 class="text-4xl font-bold mb-8 text-white text-center">
      🚀 Mes Projets
    </h1>

    <LoadingSpinner v-if="isLoading" />

    <div v-else>
      <div
        v-if="errorMessage"
        class="error-message text-red-400 bg-gray-900 p-4 rounded-md mb-6 text-center"
        v-html="errorMessage"
      />

      <template v-else>
        <!-- Menu déroulant des langages -->
        <div class="mb-8 flex justify-center">
          <div class="relative w-64">
            <select
              v-model="selectedLanguage"
              class="block w-full bg-gray-800 text-white rounded-lg border border-gray-700 px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les langages</option>
              <option
                v-for="language in availableLanguages"
                :key="language"
                :value="language"
                class="py-2"
              >
                {{ language }}
              </option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
            </div>
          </div>
        </div>

        <GlobalLanguages
          v-if="repositories.length > 0"
          :repositories="filteredRepositories"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProjectCard
            v-for="repo in filteredRepositories"
            :key="repo.name"
            :repository="repo"
          />
        </div>

        <!-- Message si aucun projet trouvé -->
        <div
          v-if="filteredRepositories.length === 0"
          class="text-center text-gray-400 py-10"
        >
          Aucun projet trouvé pour le langage "{{ selectedLanguage }}"
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
select option {
  background-color: #1f2937;
  color: white;
  padding: 8px;
}

select option:hover {
  background-color: #374151;
}
</style>
