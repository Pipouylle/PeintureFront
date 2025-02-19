<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import ModifSystemesComponent from "@/component/modifs/ModifSystemesComponent.vue";

@Component({
   components: {ModifSystemesComponent, Menu}
})
export default class ModifSystemeView extends Vue {

}
</script>

<template>
   <Menu/>
   <ModifSystemesComponent/>
</template>

<style scoped>

</style>