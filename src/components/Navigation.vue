<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <nav class="fixed w-full bg-apple-gray/80 backdrop-blur-md z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="text-white font-semibold text-xl">
            Portfolio
          </router-link>
        </div>
        
        <!-- Desktop menu -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <router-link
              to="/"
              class="px-3 py-2 rounded-md text-sm font-medium"
              :class="route.path === '/' ? 'text-apple-blue' : 'text-gray-300 hover:text-white'"
            >
              Home
            </router-link>
            <router-link
              to="/projects"
              class="px-3 py-2 rounded-md text-sm font-medium"
              :class="route.path === '/projects' ? 'text-apple-blue' : 'text-gray-300 hover:text-white'"
            >
              Projects
            </router-link>
            <router-link
              to="/contact"
              class="px-3 py-2 rounded-md text-sm font-medium"
              :class="route.path === '/contact' ? 'text-apple-blue' : 'text-gray-300 hover:text-white'"
            >
              Contact
            </router-link>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="!isMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="isMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <router-link
            to="/"
            class="block px-3 py-2 rounded-md text-base font-medium"
            :class="route.path === '/' ? 'text-apple-blue' : 'text-gray-300 hover:text-white'"
            @click="isMenuOpen = false"
          >
            Home
          </router-link>
          <router-link
            to="/projects"
            class="block px-3 py-2 rounded-md text-base font-medium"
            :class="route.path === '/projects' ? 'text-apple-blue' : 'text-gray-300 hover:text-white'"
            @click="isMenuOpen = false"
          >
            Projects
          </router-link>
          <router-link
            to="/contact"
            class="block px-3 py-2 rounded-md text-base font-medium"
            :class="route.path === '/contact' ? 'text-apple-blue' : 'text-gray-300 hover:text-white'"
            @click="isMenuOpen = false"
          >
            Contact
          </router-link>
        </div>
      </div>
    </transition>
  </nav>
</template>