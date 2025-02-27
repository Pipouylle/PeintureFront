<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import ModifDemandeComponent from "@/component/modifs/ModifDemandeComponent.vue";

@Component({
   components: {ModifDemandeComponent, Menu}
})
export default class ModifDemandeView extends Vue {

}
</script>

<template>
   <Menu/>
   <ModifDemandeComponent/>
</template>

<style scoped>

</style>