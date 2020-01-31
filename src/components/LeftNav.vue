<template>
  <div class="container">
    <div class="item mt2" v-for="(item, index) in items" :key="index">
      <font-awesome-icon :icon="['far', item.name]" fixed-width />
      <span class="text">{{ item.text }}</span>
    </div>
    <div class="group">
      <span class="text">Projects</span>
    </div>
    <router-link
      class="item mt2"
      :to="`/project/${item.gid}`"
      v-for="item in $store.state.projects"
      :key="item.gid"
      active-class="active"
    >
      <font-awesome-icon :icon="['far', 'list-alt']" fixed-width />
      <span class="text">{{ item.name }}</span>
    </router-link>
  </div>
</template>
<script>
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      items: [
        { text: 'Inbox', name: 'envelope-open', active: false },
        { text: 'Today', name: 'star', active: false },
        { text: 'Upcoming', name: 'calendar-alt', active: false },
        { text: 'Completed', name: 'check-circle', active: false },
        { text: 'Trash', name: 'trash-alt', active: false },
      ],
      active: '',
    };
  },
});
</script>
<style lang="scss" scoped>
.container {
  background-color: $background;
  border-right: 2px solid $border_color;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 80px;
  width: 300px;
}
.icon {
  width: 20px;
}

.item {
  align-items: center;
  color: #000;
  display: flex;
  font-size: 18px;
  padding-left: 40px;
  text-decoration: none;
  .text {
    margin-left: 18px;
  }
}
.active {
  color: $primary;
}
.group {
  align-items: center;
  display: flex;
  font-size: 18px;
  margin-top: 30px;
  padding-left: 58px;
  .text {
    color: #777;
    font-size: 14px;
    font-weight: 300;
    margin-left: 18px;
  }
}
</style>
