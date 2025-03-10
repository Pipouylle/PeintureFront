<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import ModifAffaireComponent from "@/component/modifs/ModifAffaireComponent.vue";

@Component({
  components: {ModifAffaireComponent, Menu}
})
export default class ModifAffaireView extends Vue {
}
</script>

<template>
  <Menu/>
  <ModifAffaireComponent/>
</template>

<style scoped>

</style>