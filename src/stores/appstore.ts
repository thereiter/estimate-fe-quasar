import { defineStore, acceptHMRUpdate } from 'pinia';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';
const $q = useQuasar();

export const useMyStore = defineStore('myStore', {
  state: () => ({
    isLoading: false,
    isAuthorized: false,
    isAuthorizedInitial: false,
    isAutoRegister: false,
    isAutoRegisterGenerateMail: false,
    login: null,
    user: {},
    personalLink: '/personal/',
    errors: [],
  }),
  getters: {},
  actions: {
    async registerUser(login: string, password: string) {
      try {
        this.user = await api.post('/api/register', { login, password });
        $q.notify({
          color: 'success',
          position: 'center',
          message: 'Registered successfully',
          icon: 'report_problem',
        });
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'center',
          message: 'Register failed',
          icon: 'report_problem',
        });
        return error;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMyStore, import.meta.hot));
}
