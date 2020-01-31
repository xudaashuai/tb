<template>
  <img :src="`/assets/icon/${name}.png`" :width="size" :height="size" />
</template>
<script>
import Vue from 'vue';

export default Vue.extend({
  props: {
    name: String,
    size: Number,
  },
});
</script>
<style lang="scss" scoped></style>
