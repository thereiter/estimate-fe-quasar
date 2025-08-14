import { defineStore, acceptHMRUpdate } from 'pinia';
import { type AxiosResponse } from 'axios';

export const useAuthStore = defineStore('useAuthStore', {
  state: () => ({
    id: null,
    email: null,
    name: null,
  }),
  getters: {
    isAuthorized: (state) => !state,
  },
  actions: {
    async getCsrf() {
      await this.api.get('/sanctum/csrf-cookie');
    },
    async loadAuthState() {
      this.api
        .get('/user')
        .then((response: AxiosResponse) => {
          const data = response.data;
          this.id = data.id;
          this.email = data.email;
          this.name = data.name;
        })
        .catch(() => this.$reset());
    },
    async login() {
      this.api.post('/auth/login', {
        email: 'testing@local.host',
        password: 'test123',
        remember: true,
      });
    },
  },
});

// const api = inject(apiKey);
// console.log('store');
// console.log(process.env);
// console.log(api);
// console.log('ssrContext');
// console.log(ssrContext);
// api.get('/sanctum/csrf-cookie').then((response) => {
//   console.log('csrf-cookie');
//   console.log(response);
// });
// api
//   .post('/auth/login', { email: 'exa2mp11l221@emaol.com', password: 'test123', remember: true })
//   .then((response) => {
//     console.log('user');
//     console.log(response);
//   });
// function login(ssrContext: any) {
//   console.log('login start');
//   console.log(ssrContext);
//   console.log(this);
//   console.log(
//     this.api().post('/auth/login', {
//       email: 'exa2mp11l221@emaol.com',
//       password: 'test123',
//       remember: true,
//     }),
//   );
//   console.log('login end');
// }

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
