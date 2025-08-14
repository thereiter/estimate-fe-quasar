<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from 'stores/auth';

export default defineComponent({
  name: 'App',
  setup() {
    //const $q = useQuasar();
    // const apiRef = ref(null);
    // const apiBaseUrl = `api/index`;
    // const token = ref(null);
    //
    // watch(
    //   () => appStore.isLoading,
    //   (newState) => {
    //     let el = document.getElementById('estimate-app-container-loader');
    //     let app = document.getElementById('app');
    //     if (newState) {
    //       $q.loading.show({
    //         delay: 0, // ms
    //       });
    //
    //       if (el && app) {
    //         if (app.childNodes.length === 0) {
    //           el.style.display = 'block';
    //         }
    //       }
    //     } else {
    //       $q.loading.hide();
    //       if (el) {
    //         el.style.display = 'none';
    //       }
    //     }
    //   },
    // );

    // watch(
    //   () => appStore.login,
    //   (newState, oldState) => {
    //     try {
    //       if (newState !== oldState && newState) {
    //         for (let item of document.getElementsByClassName('header-personal-url')) {
    //           item.href = `https://localhost:9100/estimate/personal/`;
    //         }
    //
    //         for (let item of document.getElementsByClassName('header-personal-link-text')) {
    //           if (appStore.login.length > 14) {
    //             item.innerText = appStore.login.slice(0, 14) + '...';
    //           } else {
    //             item.innerText = appStore.login;
    //           }
    //         }
    //       }
    //     } catch (e) {
    //       console.error(e);
    //       throw e;
    //     }
    //   },
    // );

    // watch(
    //   token,
    //   async (newValue, oldValue) => {
    //     if (newValue !== oldValue) {
    //       webSocketConnection.getInstance().emitter?.emit('token-changed', { token: newValue });
    //     }
    //   },
    //   { immediate: false },
    // );

    // watch(
    //   () => appStore.errors,
    //   (newValue) => {
    //     if (!Array.isArray(newValue)) return;
    //     if (newValue.length <= 0) return;
    //
    //     for (const error of newValue) {
    //       $q.notify({
    //         multiLine: true,
    //         type: 'negative',
    //         icon: 'error',
    //         message: error,
    //         position: 'center',
    //         timeout: 5000,
    //         actions: [{ icon: 'close', color: 'white' }],
    //       });
    //     }
    //   },
    //   { deep: true },
    // );

    // const parentPageTitle = ref(null);
    // const changeParentTitleText = (newText) => {
    //   if (newText === null) return;
    //   let element = document.querySelector('.page-title-area h2');
    //   if (!element) return;
    //
    //   element.innerText = newText;
    // };
    // watch(
    //   () => parentPageTitle.value,
    //   (newValue) => {
    //     changeParentTitleText(newValue);
    //   },
    // );

    // const loadAuthState = () => {
    //   return new Promise((resolve) => {
    //     appStore.isLoading = true;
    //     apiRef.value
    //       .postSimple(
    //         {
    //           action: 'standalone-state',
    //         },
    //         'auth',
    //       )
    //       .then(function (response) {
    //         appStore.isAuthorized = response.data.isAuthorized;
    //         appStore.login = response.data.login;
    //         appStore.userId = response.data.userId;
    //         appStore.token = response.data.token;
    //       })
    //       .catch((e) => {
    //         console.error(e);
    //         $q.notify({
    //           multiLine: true,
    //           type: 'negative',
    //           icon: 'upload',
    //           message: t('authUnknownError'),
    //           position: 'center',
    //           timeout: 5000,
    //           actions: [{ icon: 'close', color: 'white' }],
    //         });
    //       })
    //       .finally(() => {
    //         appStore.isLoading = false;
    //         resolve();
    //       });
    //   });
    // };

    // const termsAndConditionsHref = '/terms-and-conditions/';
    //
    // const privacyPolicyHref = '/privacy-policy/';
    //
    // provide('appStore', appStore);
    // provide('apiBaseUrl', apiBaseUrl);
    // provide('loadAuthState', loadAuthState);
    // provide('api', readonly(apiRef));
    // provide('parentPageTitle', parentPageTitle);
    // provide('token', token);
    // provide('emitter', emitter);
    // provide('assetsPath', import.meta.env.VITE_ASSET_PATH);
    // provide('imagesPathWebServer', import.meta.env.VITE_IMG_PATH);
    // provide('termsAndConditionsHref', termsAndConditionsHref);
    // provide('privacyPolicyHref', privacyPolicyHref);

    // const router = useRouter();
    //
    // router.beforeEach((to, from, next) => {
    //   const authState = useAuthStore();
    //   console.log(authState);
    //   next();
    // });
    //
    // router.afterEach(() => {
    //   const authState = useAuthStore();
    //   console.log(authState);
    // });

    return {};
  },
  preFetch: async ({ store }) => {
    const authState = useAuthStore(store);
    await authState.getCsrf();
    //await authState.login();
    //await authState.loadAuthState();
  },
});
</script>
<template>
  <router-view></router-view>
</template>
