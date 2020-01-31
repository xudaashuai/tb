<template>
  <div class="task">
    <input type="radio" class="radio" />
    <TextInput :text="task.name" @end-edit="endEdit" class="text" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import TextInput from '@/components/TextInput.vue';

export default Vue.extend({
  props: ['task'],
  data() {
    return { loading: false };
  },
  components: { TextInput },
  methods: {
    endEdit(text: string): void {
      this.$client.tasks.update(this.task.gid, {
        name: text,
      });
      this.$emit('update-task', this.task);
    },
  },
});
</script>

<style lang="scss" scoped>
.task {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 24px;
  .radio {
    width: 20px;
  }
  .text {
    flex-grow: 1;
  }
}
</style>
