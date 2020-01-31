<template>
  <div id="loading" v-if="$store.state.appLoading">
    <embed src="/assets/loading.svg" />
  </div>
  <div v-else id="app">
    <LeftNav />
    <router-view class="main" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import LeftNav from '@/components/LeftNav.vue';

export default Vue.extend({
  created() {
    this.$store.dispatch('init');
  },
  components: {
    LeftNav,
  },
});
</script>

<style lang="scss">
@import './style/theme.scss';
#app {
  display: flex;
  flex-direction: row;
  height: 100%;
}
#loading {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #fff;
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
}
.main {
  height: 100%;
  width: 100%;
}
</style>
