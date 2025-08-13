import { defineStore } from '#q-app/wrappers';
import { createPinia } from 'pinia';
import { inject, markRaw } from 'vue';
import { apiKey } from 'boot/axios';
import { AxiosInstance } from 'axios';
/*
 * When adding new properties to stores, you should also
 * extend the `PiniaCustomProperties` interface.
 * @see https://pinia.vuejs.org/core-concepts/plugins.html#typing-new-store-properties
 */
declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface PiniaCustomProperties {
    api: () => AxiosInstance;
  }
}

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default defineStore(() => {
  const pinia = createPinia();

  pinia.use(({ store }) => {
    store.api = () => {
      return inject(apiKey);
    };
    if (process.env.NODE_ENV === 'development') {
      store._customProperties.add('api');
    }
  });

  return pinia;
});
