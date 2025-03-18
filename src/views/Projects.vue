<script setup lang="ts">
import { ref, onMounted } from "vue";
import { marked } from "marked";

interface Repository {
  name: string;
  description?: string;
  html_url: string;
  readme?: string;
}

// Références pour stocker les dépôts
const repositories = ref<Repository[]>([]);
const CACHE_KEY = "github_repos"; // Clé pour localStorage
const CACHE_EXPIRATION_KEY = "github_repos_expiration";
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24h de cache

// Fonction pour récupérer les données depuis l'API
const fetchRepositories = async () => {
  try {
    console.log("Fetching repositories from API...");

    const response = await fetch("https://api.github.com/users/azermid/repos");
    const repos: Repository[] = await response.json();
    const fetchReadmePromises = repos.map(async (repo) => {
      try {
        const readmeResponse = await fetch(
          `https://api.github.com/repos/azermid/${repo.name}/readme`
        );
        if (!readmeResponse.ok) throw new Error("README not found");

        const { content } = await readmeResponse.json();
        const decodedContent = atob(content);
        repo.readme = await marked.parse(decodedContent);
      } catch (error) {
        console.error(`Error fetching README for ${repo.name}:`, error);
        repo.readme = undefined;
      }
    });

    await Promise.all(fetchReadmePromises);
    localStorage.setItem(CACHE_KEY, JSON.stringify(repos));
    localStorage.setItem(CACHE_EXPIRATION_KEY, (Date.now() + CACHE_DURATION).toString());

    repositories.value = repos;
  } catch (error) {
    console.error("Error fetching repositories:", error);
  }
};

const loadFromCache = () => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  const expiration = localStorage.getItem(CACHE_EXPIRATION_KEY);

  if (cachedData && expiration && Date.now() < parseInt(expiration)) {
    console.log("Loading repositories from cache...");
    repositories.value = JSON.parse(cachedData);
    return true;
  }
  return false;
};

onMounted(() => {
  if (!loadFromCache()) {
    fetchRepositories();
  }
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8 text-white">🚀 Mes Projets</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
      <div
        v-for="repo in repositories"
        :key="repo.name"
        class="project-card border rounded-lg p-6 bg-gray-800 shadow-lg flex flex-col"
      >
        <h2 class="text-2xl font-semibold text-white">{{ repo.name }}</h2>

        <p v-if="repo.description" class="text-gray-400 mb-2 flex-grow">
          {{ repo.description }}
        </p>

        <div
          v-if="repo.readme"
          class="readme-container markdown-body"
          v-html="repo.readme"
        ></div>

        <a
          :href="repo.html_url"
          target="_blank"
          class="text-blue-400 hover:text-blue-500 mt-4 block"
        >
          Voir sur GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-dark.min.css";

/* Styles pour les cartes des projets */
.project-card {
  width: 100%;
  max-width: 600px;
  height: auto;
  display: flex;
  flex-direction: column;
}

/* Conteneur du README avec un scroll plus grand */
.readme-container {
  flex-grow: 1;
  max-height: 350px;
  overflow-y: auto;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: #1e1e1e;
  border-radius: 8px;
}
</style>
