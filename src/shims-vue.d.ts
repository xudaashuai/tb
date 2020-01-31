import Vue from 'vue';
import asana, { Client } from 'asana';
import { Store } from 'vuex';
import { State } from './store';

declare module '*.vue' {
  export default Vue;
}

declare module 'vue/types/vue' {
  interface Vue {
    $client: Client;
  }
}

declare module 'asana' {
  namespace resources {
    interface Tasks {
      /**
       * * Returns the compact task records for all tasks within the given project,
       * * ordered by their priority within the project.
       *   * @param {Number} projectId The project in which to search for tasks.
       *   * @param {Object} [params] Parameters for the request
       *   * @param {Object} [dispatchOptions] Options, if any, to pass the dispatcher for the request
       *   * @return {Promise} The response from the API
       * @param projectId
       * @param params?
       * @param dispatchOptions?
       * @return
       */
      findBySection(
        sectionId: string | number,
        params?: asana.resources.PaginationParams,
        dispatchOptions?: any
      ): Promise<asana.resources.ResourceList<asana.resources.Tasks.Type>>;
    }
    interface Sections {
      update(
        section: string | number,
        params?: any,
        dispatchOptions?: any
      ): Promise<asana.resources.Sections.Type>;
    }
  }
}
