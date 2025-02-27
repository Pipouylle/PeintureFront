<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import ListFournisseurComponent from "@/component/lists/ListFournisseurComponent.vue";

@Component({
   components: {ListFournisseurComponent, Menu}
})
export default class ListFournisseurView extends Vue {

}
</script>

<template>
   <Menu/>
   <ListFournisseurComponent/>
</template>

<style scoped>

</style>