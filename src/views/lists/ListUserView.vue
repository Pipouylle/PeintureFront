<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import ListUserComponent from "@/component/lists/ListUserComponent.vue"

@Component({
   components: {Menu, ListUserComponent}
})
export default class ListUserView extends Vue {

}
</script>

<template>
   <Menu/>
   <ListUserComponent/>
</template>

<style scoped>

</style>