import { defineStore, acceptHMRUpdate } from 'pinia';

export const useAuthStore = defineStore('useAuthStore', {
  state: () => ({
    isAuthorized: false,
    login: null,
  }),
  getters: {},
  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
