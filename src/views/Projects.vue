<script setup lang="ts">
import { ref, onMounted } from "vue";
import { marked } from "marked";

interface Repository {
  name: string;
  description: string | null;
  html_url: string;
  readme?: string; // This can be undefined
}

const repositories = ref<Repository[]>([]);

const fetchRepositories = async () => {
  try {
    const response = await fetch(
      "https://api.github.com/users/YOUR_USERNAME/repos"
    );
    const repos: Repository[] = await response.json();

    // Fetch README for each repository
    for (const repo of repos) {
      try {
        const readmeResponse = await fetch(
          `https://api.github.com/repos/YOUR_USERNAME/${repo.name}/readme`
        );
        const { content } = await readmeResponse.json();
        const decodedContent = atob(content);
        // Use await here since marked returns a Promise
        repo.readme = await marked(decodedContent);
      } catch (error) {
        console.error(`Error fetching README for ${repo.name}:`, error);
        repo.readme = "No README available";
      }
    }

    repositories.value = repos;
  } catch (error) {
    console.error("Error fetching repositories:", error);
  }
};

onMounted(() => {
  fetchRepositories();
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">My Projects</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="repo in repositories"
        :key="repo.name"
        class="border rounded-lg p-6"
      >
        <h2 class="text-xl font-semibold mb-2">{{ repo.name }}</h2>
        <p class="text-gray-600 mb-4">{{ repo.description }}</p>
        <div v-if="repo.readme" class="prose" v-html="repo.readme"></div>
        <a
          :href="repo.html_url"
          target="_blank"
          class="text-blue-500 hover:text-blue-700"
          >View on GitHub</a
        >
      </div>
    </div>
  </div>
</template>
