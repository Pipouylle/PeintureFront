<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import ListAffaireComponent from "@/component/lists/ListAffaireComponent.vue";
import NotificationHandlerComponent from "@/component/common/NotificationHandlerComponent.vue";

@Component({
  components: {ListAffaire: ListAffaireComponent, Menu, NotificationHandlerComponent}
})
export default class ListAffaireView extends Vue {

}
</script>

<template>
  <Menu/>
  <ListAffaire/>
  <NotificationHandlerComponent/>
</template>

<style scoped>

</style>