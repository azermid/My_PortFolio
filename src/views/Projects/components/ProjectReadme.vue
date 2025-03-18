<script setup lang="ts">
defineProps<{
  readme: string;
}>();
</script>

<template>
  <div class="readme-container markdown-body mt-auto px-6 pb-4">
    <div class="markdown-body" v-html="readme"></div>
  </div>
</template>

<style>
@import '../styles/markdown.css';
</style>