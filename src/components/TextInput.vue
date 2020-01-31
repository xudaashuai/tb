<template>
  <div class="text-input">
    <div v-if="!editing" class="text" @click="startEdit">
      {{ text }}
    </div>
    <input
      v-else
      type="text"
      @blur="endEdit"
      @keyup.enter="endEdit"
      v-model="inputText"
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: ['text'],
  data() {
    return { editing: false, inputText: this.text };
  },
  watch: {
    text(): void {
      this.inputText = this.text;
    },
  },
  methods: {
    startEdit() {
      this.editing = true;
    },
    endEdit() {
      if (this.editing) {
        this.editing = false;
        this.$nextTick(() => this.$emit('end-edit', this.inputText));
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.text-input {
  height: 100%;
  .text {
    height: 100%;
  }
  input {
    font: inherit;
  }
}
</style>
