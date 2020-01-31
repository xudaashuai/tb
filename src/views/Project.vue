<template>
  <div class="container">
    <Header :tabs="tabs" :item="item" />
    <div class="content" v-loading="loading">
      <Section
        class="section"
        v-for="section in sections"
        :section="section"
        :key="section.gid"
        @add-task="reloadSectionTasks(section)"
        @update="reloadSectionTasks(section)"
      />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import asana from 'asana';
import { find } from 'lodash';
import Header from '@/components/Header.vue';
import Section from '@/components/Section.vue';

export default Vue.extend({
  props: ['item'],
  data(): {
    sections: asana.resources.Sections.Type[];
    loading: boolean;
    tabs: any[];
  } {
    return {
      loading: true,
      sections: [],
      tabs: [],
    };
  },
  created() {
    this.fetchProjectDetail(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchProjectDetail(to.params.id);
    next();
  },
  methods: {
    async fetchProjectDetail(id: string) {
      this.loading = true;
      let sections: any = (
        await this.$client.sections.findByProject(id)
      ).map(item => ({ ...item, tasks: [] }));
      this.tabs = [
        {
          name: 'Tasks',
          badge: '',
        },
      ];
      this.loading = false;
      this.sections = sections;
      const tasks = await Promise.all(
        sections.map((section: any) => {
          return this.$client.tasks
            .findBySection(section.gid)
            .then(res => res.data);
        })
      );
      sections = sections.map((section: any, index: number) => {
        return {
          ...section,
          tasks: tasks[index],
        };
      });
      this.sections = sections;
      this.tabs = [
        {
          name: 'Tasks',
          badge: sections.map((i: any) => i.tasks).flat().length,
        },
      ];
    },
    async reloadSectionTasks(section: any): Promise<void> {
      const [newSection, tasks] = await Promise.all([
        this.$client.sections.findById(section.gid),
        this.$client.tasks.findBySection(section.gid).then(res => res.data),
      ]);
      // eslint-disable-next-line no-param-reassign
      section.name = newSection.name;
      // eslint-disable-next-line no-param-reassign
      section.tasks = tasks;
    },
  },
  components: { Header, Section },
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.top {
  padding: 48px 48px 0px 48px;
  border-bottom: 2px solid $border_color;
}
.title {
  margin-bottom: 24px;
}
.tabs {
  display: flex;
  flex-direction: row;
  width: 100%;

  .tab-item {
    min-width: 120px;
    color: #ccc;
    padding-top: 24px;
    padding-bottom: 24px;
    margin-right: 24px;
    display: flex;
    justify-content: center;
  }
  .active-item {
    color: #888;
    border-bottom: 4px solid $primary;
  }
  .tag {
    color: $primary;
    background-color: #ccc;
  }
}
.content {
  overflow: auto;
  flex-grow: 1;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
  padding-bottom: 48px;
}

.section {
  margin: 0 48px;
  .section-title {
    border-bottom: 2px solid $border_color;
  }
  .task {
  }
}
</style>
