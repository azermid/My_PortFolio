<script setup lang="ts">

</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <a
        href="https://www.linkedin.com/in/amir-madaoui-08018a25b"
        target="_blank"
        class="social-link"
      >
        <img
          src="../assets/linkedin-icon.png"
          alt="LinkedIn"
          class="linkedin-icon"
        />
      </a>
      <a href="/CV.pdf" download class="cv-link">
        <span>Mon CV</span>
      </a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 2rem 0;
  color-scheme: dark;
  backdrop-filter: blur(5.4px);
  -webkit-backdrop-filter: blur(5.4px);
  position: relative;
  bottom: 0;
  width: 100%;
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  max-width: 7xl;
  margin: 0 auto;
  padding: 0 1rem;
}

.social-link {
  text-decoration: none;
  transition: transform 0.3s ease;
}

.social-link:hover {
  transform: scale(1.1);
}

.linkedin-icon {
  width: auto;
  height: auto;
  transition: opacity 0.3s ease;
}

.linkedin-icon:hover {
  opacity: 1;
}

.cv-link {
  padding: 0.75rem 1.5rem;
  background-color: #2997ff;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.cv-link:hover {
  background-color: #2180d8;
  transform: translateY(-1px);
  box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.1),
    0 4px 6px -1px rgba(0, 0, 0, 0.06);
}

.cv-link:active {
  transform: translateY(0);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

@media (max-width: 640px) {
  .footer-content {
    flex-direction: column;
    gap: 1.5rem;
  }

  .cv-link {
    width: 100%;
    text-align: center;
  }
}
</style>
