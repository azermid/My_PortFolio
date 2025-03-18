<script setup lang="ts">
import { defineProps } from 'vue';
import type { Repository } from '../types';
import { useLanguages } from '../composables/useLanguages';

const props = defineProps<{
  repository: Repository;
}>();

const { getLanguageColor } = useLanguages();
</script>

<template>
  <div v-if="repository.languages?.length" class="languages-container">
    <div class="languages-bar h-2 bg-gray-700 rounded-full overflow-hidden flex">
      <div
        v-for="language in repository.languages"
        :key="language"
        :style="{
          width: `${repository.languageStats?.[language]}%`,
          backgroundColor: getLanguageColor(language)
        }"
        class="h-full"
      />
    </div>

    <div class="languages-details mt-4 grid grid-cols-2 gap-2">
      <div
        v-for="language in repository.languages"
        :key="language"
        class="relative flex items-center space-x-2"
      >
        <div
          class="w-3 h-3 rounded-full"
          :style="{ backgroundColor: getLanguageColor(language) }"
        />
        <span class="text-sm text-gray-300">
          {{ language }} ({{ repository.languageStats?.[language] }}%)
        </span>
      </div>
    </div>
  </div>
</template>