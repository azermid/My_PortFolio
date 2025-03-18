<template>
    <div class="flex justify-center mb-10">
      <div class="loader"></div>
    </div>
  </template>
  
  <style scoped>
  .loader {
    border: 5px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    border-top: 5px solid #3498db;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>