<script>
export default {
  name: "About",
  mounted() {
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("visible");
      }, index * 200); // Ajoute un léger décalage pour chaque élément
    });
  },
};
</script>


<template>
  <div>
    <h1 class="fade-in">Bienvenue sur la page About</h1>
    <p class="fade-in">Ceci est un paragraphe avec un effet de fade-in.</p>
    <button class="fade-in">Cliquez ici</button>
  </div>
</template>


<style scoped>
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
