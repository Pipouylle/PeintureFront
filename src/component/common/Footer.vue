<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';

@Component({})
export default class Footer extends Vue {

}
</script>

<template>
  <footer class="footer">
    <a href="https://www.linkedin.com/in/your-profile" target="_blank" class="mdi mdi-linkedin"></a>
    <a href="https://github.com/your-profile" target="_blank" class="mdi mdi-github"></a>
    <a href="mailto:your-email@example.com" class="mdi mdi-email"></a>
  </footer>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px 0;
}

.footer a {
  color: white;
  margin: 0 10px;
  font-size: 24px;
  text-decoration: none;
}

.footer a:hover {
  color: #ddd;
}

.footer a.mdi-linkedin:hover {
  color: #0077b5;
}

.footer a.mdi-github:hover {
  color: #333;
}
.footer a.mdi-email:hover {
  color: #d44638;
}
</style>