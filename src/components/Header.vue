<template>
  <div class="header">
    <div class="title">{{ item.name }}</div>
    <div class="tabs">
      <div class="tab-item active-item" v-for="tab in tabs" :key="tab.name">
        <div class="tab-content">
          {{ tab.name }}
          <span v-if="tab.badge" class="tag pill ph1 ml1">
            {{ tab.badge }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: ['item', 'tabs'],
});
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  padding: 18px 18px 0px 36px;
  overflow: hidden;
  flex-shrink: 0;

  border-bottom: 2px solid $border_color;
  .title {
    font: 300 2.5em nunito;
    margin: 24px 0;
  }
  .tabs {
    display: flex;
    flex-direction: row;
    width: 100%;

    .tab-item {
      line-height: 36px;
      min-width: 120px;
      color: #ccc;
      margin-right: 24px;
      display: flex;
      justify-content: center;
    }
    .active-item {
      color: #888;
      box-shadow: inset 0 -4px $primary;
    }
    .tag {
      color: $primary;
      background-color: #ccc;
    }
  }
}
</style>
