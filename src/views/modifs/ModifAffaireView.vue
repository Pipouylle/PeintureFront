<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import ModifAffaireComponent from "@/component/modifs/ModifAffaireComponent.vue";
import {ListStore} from "@/stores";

@Component({
  components: {ModifAffaireComponent, Menu}
})
export default class ModifAffaireView extends Vue {
  private affaire = ListStore().ListAffaire.affairesModif;
}
</script>

<template>
  <Menu/>
  <ModifAffaireComponent :affaire="affaire"/>
</template>

<style scoped>

</style>