import { defineStore, acceptHMRUpdate } from 'pinia';

export const useTemplateGlobals = defineStore('templateGlobals', {
  /* <<<<<<<<<<<<<<  ✨ Windsurf Command ⭐ >>>>>>>>>>>>>>>> */
  /**
   * The reactive state of the store.
   *
   * @property {boolean} isActivePage - Whether the current page is active.
   * @property {boolean} isDarkMode - Whether the current page is in dark mode.
   * @property {boolean} isEstimatePage - Whether the current page is an estimate page.
   * @property {boolean} isEstimateCheckoutPage - Whether the current page is an estimate checkout page.
   * @property {boolean} isIndexPage - Whether the current page is the index page.
   */
  /* <<<<<<<<<<  ec58baad-c555-4969-8a28-602ea0130395  >>>>>>>>>>> */
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
