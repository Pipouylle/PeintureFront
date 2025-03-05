<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import AvancementComponent from "@/component/avancements/AvancementComponent.vue";

@Component({
   components: {AvancementComponent, Menu}
})
export default class AvancementView extends Vue {

}
</script>

<template>
   <Menu/>
   <AvancementComponent/>
</template>

<style scoped>

</style>