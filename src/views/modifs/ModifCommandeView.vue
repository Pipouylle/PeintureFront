<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import ModifCommandeComponent from "@/component/modifs/ModifCommandeComponent.vue";

@Component({
   components: {ModifCommandeComponent, Menu}
})
export default class ModifCommandeView extends Vue {

}
</script>

<template>
   <Menu/>
   <ModifCommandeComponent/>
</template>

<style scoped>

</style>