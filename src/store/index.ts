/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import Asana from 'asana';

Vue.use(Vuex);
const MY_TOKEN = '0/ffe3d2d21af059f8746751755e1f3181';
const client = Asana.Client.create({
  asanaBaseUrl: '/api/',
}).useAccessToken(MY_TOKEN);
Vue.prototype.$client = client;

export interface State {
  projects: Array<any>;
  appLoading: boolean;
  workspace: any;
}

export default new Vuex.Store<State>({
  state: {
    projects: [],
    workspace: null,
    appLoading: true,
  },
  mutations: {
    setProjects(state, payload): void {
      state.projects = payload;
    },
    setAppLoading(state, payload): void {
      state.appLoading = payload;
    },
    setWorkspace(state, payload): void {
      state.workspace = payload;
    },
  },
  actions: {
    // 初始化用户数据
    async init({ dispatch, state }): Promise<any> {
      // 加载用户的第一个 workspace 作为全局默认 workspace
      const {
        data: [workspace],
      } = await client.workspaces.findAll({});
      state.workspace = workspace;
      return dispatch('getProjects');
    },
    async getProjects({ state }): Promise<any> {
      const { data } = await client.projects.findByWorkspace(
        state?.workspace?.gid || 0
      );
      state.projects = data;
      state.appLoading = false;
      return data;
    },
  },
  modules: {},
});
