<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import ListAffaireComponent from "@/component/lists/ListAffaireComponent.vue";

@Component({
  components: {ListAffaire: ListAffaireComponent, Menu}
})
export default class ListAffaireView extends Vue {

}
</script>

<template>
  <Menu/>
  <ListAffaire/>
</template>

<style scoped>

</style>