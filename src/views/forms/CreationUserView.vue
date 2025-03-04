<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import CreerUserComponent from "@/component/Form/CreerUserComponent.vue";

@Component({
   components: {CreerUserComponent, Menu}
})
export default class CreationUserView extends Vue {

}
</script>

<template>
   <Menu/>
   <CreerUserComponent/>
</template>

<style scoped>

</style>