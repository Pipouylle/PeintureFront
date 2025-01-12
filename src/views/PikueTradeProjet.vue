<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import NavBar from "@/component/common/NavBar.vue";

@Component({
  components: {NavBar}
})
export default class PikueTradeProjet extends Vue {

}
</script>

<template>
  <div>
    <NavBar/>
    <div class="content">

    </div>
  </div>



</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 80%;
  margin: 0 auto;
}

</style>