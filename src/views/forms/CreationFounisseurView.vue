<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import CreerFournisseurComponent from "@/component/Form/CreerFournisseurComponent.vue";

@Component({
   components: {CreerFournisseurComponent, Menu}
})
export default class CreationFounisseurView extends Vue {

}
</script>

<template>
   <Menu/>
   <CreerFournisseurComponent/>
</template>

<style scoped>

</style>