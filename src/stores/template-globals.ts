import { defineStore, acceptHMRUpdate } from 'pinia';

export const useTemplateGlobals = defineStore('templateGlobals', {
  state: () => ({
    isActivePage: false,
    isDarkMode: false,
    isEstimatePage: false,
    isEstimateCheckoutPage: false,
    isIndexPage: false,
  }),
  getters: {},
  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTemplateGlobals, import.meta.hot));
}
