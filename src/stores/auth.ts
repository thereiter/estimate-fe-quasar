import { ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

export const useAuthStore = defineStore('useAuthStore', () => {
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
  function login(ssrContext: any) {
    console.log('login start');
    console.log(ssrContext);
    console.log(this);
    console.log(
      this.api().post('/auth/login', {
        email: 'exa2mp11l221@emaol.com',
        password: 'test123',
        remember: true,
      }),
    );
    console.log('login end');
  }

  const testRef = ref('test');

  return {
    testRef,
    login,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
