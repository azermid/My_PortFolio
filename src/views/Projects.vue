<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { marked } from 'marked'

interface Repository {
  id: number
  name: string
  description: string
  html_url: string
  readme?: string
}

const repositories = ref<Repository[]>([])
const selectedRepo = ref<Repository | null>(null)
const loading = ref(true)

const fetchRepos = async () => {
  try {
    const response = await fetch('https://api.github.com/users/azermid/repos')
    repositories.value = await response.json()
    loading.value = false
  } catch (error) {
    console.error('Error fetching repositories:', error)
    loading.value = false
  }
}

const fetchReadme = async (repo: Repository) => {
  try {
    const response = await fetch(`https://api.github.com/repos/azermid/${repo.name}/readme`)
    const data = await response.json()
    const decodedContent = atob(data.content)
    repo.readme = marked(decodedContent)
    selectedRepo.value = repo
  } catch (error) {
    console.error('Error fetching README:', error)
  }
}

onMounted(() => {
  fetchRepos()
})
</script>

<template>
  <div class="min-h-screen pt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="text-3xl font-bold text-white mb-8">Mes Projets GitHub</h2>
      
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-apple-blue mx-auto"></div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="repo in repositories"
          :key="repo.id"
          class="bg-apple-gray rounded-lg p-6 transition-transform hover:scale-105"
        >
          <h3 class="text-xl font-semibold text-white mb-3">{{ repo.name }}</h3>
          <p class="text-gray-400 mb-4">{{ repo.description || 'No description available' }}</p>
          <div class="flex space-x-4">
            <button
              @click="fetchReadme(repo)"
              class="text-apple-blue hover:text-white transition-colors"
            >
              View README
            </button>
            <a
              :href="repo.html_url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-apple-blue hover:text-white transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>

      <!-- README Modal -->
      <div
        v-if="selectedRepo"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        @click="selectedRepo = null"
      >
        <div
          class="bg-apple-gray rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto"
          @click.stop
        >
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold">{{ selectedRepo.name }} - README</h3>
            <button
              @click="selectedRepo = null"
              class="text-gray-400 hover:text-white"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="prose prose-invert max-w-none" v-html="selectedRepo.readme"></div>
        </div>
      </div>
    </div>
  </div>
</template>