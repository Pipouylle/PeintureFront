<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator';
import {useColorStore} from "@/stores";

@Component({})
export default class NavBar extends Vue {
  private colorStore = useColorStore();

  private toggleTheme() {
    this.colorStore.toggleTheme();
  }
}
</script>

<template>
  <header class="header">
    <div class="top">
      <a href="/" class="mdi mdi-home"></a>
      <a href="/about" class="mdi mdi-information"></a>
      <a href="/path-to-your-cv.pdf" download class="mdi mdi-file-download"></a>
    </div>
    <button @click="toggleTheme" class="theme-toggle-btn">
      <span v-if="colorStore.isLightTheme">Dark Mode</span>
      <span v-else>Light Mode</span>
    </button>
    <div class="bottom">
      <a href="https://www.linkedin.com/in/your-profile" target="_blank" class="mdi mdi-linkedin"></a>
      <a href="https://github.com/your-profile" target="_blank" class="mdi mdi-github"></a>
      <a href="mailto:your-email@example.com" class="mdi mdi-gmail"></a>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 5%;
  height: 100%;
  background-color: var(--navbar-background-color);
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  z-index: 1000;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.header .top, .header .bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header a {
  color: var(--text-color);
  margin: 20px 0;
  font-size: 24px;
  text-decoration: none;
  transition: color 0.3s;
}

.header a:hover {
  color: #ddd;
}

.header a.mdi-home:hover {
  color: #4CAF50;
}

.header a.mdi-information:hover {
  color: #2196F3;
}

.header a.mdi-file-download:hover {
  color: #FF5722;
}

.header a.mdi-linkedin:hover {
  color: #0077B5;
}

.header a.mdi-github:hover {
  color: #333;
}

.header a.mdi-gmail:hover {
  background-image: linear-gradient(to left, #EA4335, #FBBC04, #34A853, #4285F4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>