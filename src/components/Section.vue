<template>
  <div class="section">
    <TextInput
      class="section-title"
      :text="section.name"
      @end-edit="updateSectionTitle"
    />
    <div>
      <Task
        class="task mt1"
        v-for="task in section.tasks"
        :task="task"
        @update-task="$emit('update')"
        :key="task.gid"
      />
    </div>
    <div class="add-task mt1" @click="addTask">
      <font-awesome-icon :icon="['fas', 'plus']" fixed-width />
      添加任务
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Task from '@/components/Task.vue';
import TextInput from '@/components/TextInput.vue';

export default Vue.extend({
  props: ['section'],
  methods: {
    async addTask(): Promise<void> {
      const task = await this.$client.tasks.createInWorkspace(
        this.$store.state.workspace.gid,
        {
          name: 'new task',
        }
      );
      await this.$client.tasks.addProject(task.gid, {
        project: this.$route.params.id,
        section: this.section.gid,
      });

      this.$emit('add-task', task);
    },
    async updateSectionTitle(name: string): Promise<void> {
      await this.$client.sections.update(this.section.gid, { name });
      this.$emit('update');
    },
  },
  components: { Task, TextInput },
});
</script>

<style lang="scss" scoped>
.section {
  margin: 0 48px;
  .section-title {
    font: 300 2.2em nunito;
    border-bottom: 2px solid $border_color;
    margin: 24px 0;
  }
  .add-task {
    color: #777;
  }
}
</style>
