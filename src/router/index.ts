import Vue from 'vue';
import VueRouter, { RouteConfig, Route } from 'vue-router';
import { find } from 'lodash';
import Project from '@/views/Project.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/project/:id',
    name: 'project',
    component: Project,
    props: route => ({
      item: find(store.state.projects, item => item.gid === route.params.id),
    }),
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
