<template>
  <div>
    <q-card v-if="authState.isAuthorized">
      <q-card-section class="bg-grey-8 text-white">
        <div class="text-h6">{{ $t('authPageSuccessTitle') }}</div>
      </q-card-section>

      <q-card-actions vertical align="center">
        <q-btn type="a" :to="{ name: 'index' }" flat>{{ $t('authPageMainLink') }}</q-btn>
        <q-btn type="a" :to="{ name: 'personal' }" flat>{{ $t('authPagePersonalLink') }}</q-btn>
        <q-btn type="a" :to="{ name: 'flat-sale' }" flat>{{
          $t('authPageEstimateSaleLink')
        }}</q-btn>
        <q-btn type="a" :to="{ name: 'flat-rent' }" flat>{{
          $t('authPageEstimateRentLink')
        }}</q-btn>
        <q-btn type="a" :to="{ name: 'logout' }" flat>{{ $t('authPageLogoutLink') }}</q-btn>
      </q-card-actions>
    </q-card>
    <AuthComplex
      :loginBlockFirst="true"
      v-else
      @register-result="registerResult"
      @login-result="loginResult"
    ></AuthComplex>
  </div>
</template>

<script>
import { inject, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import AuthComplex from 'components/Auth/AuthComplex.vue';
import { useAuthStore } from 'stores/auth.js';

export default {
  name: 'AuthPage',
  components: { AuthComplex },

  setup() {
    const authState = useAuthStore();
    const $q = useQuasar();
    const { t } = useI18n({});
    const router = useRouter();
    const registerResult = (params) => {
      // appStore.isAuthorized = params.isAuthorized;
      // appStore.login = params.login;
      // appStore.userId = params.userId;
      // if (params.isSuccess && params.isAuthorized) {
      //   router.push({ name: 'personal' }).then(() => {
      //     $q.notify({
      //       type: 'info',
      //       icon: 'mark_email_unread',
      //       message: t('authRegisterConfirmMailSentNotify'),
      //       position: 'center',
      //       timeout: 3500,
      //       actions: [{ icon: 'close', color: 'white' }],
      //     });
      //
      //     $q.notify({
      //       type: 'positive',
      //       icon: 'thumb_up',
      //       message: t('authRegisterSuccessNotify'),
      //       position: 'center',
      //       timeout: 2000,
      //       actions: [{ icon: 'close', color: 'white' }],
      //     });
      //   });
      // }
    };

    const loginResult = (params) => {
      // appStore.isAuthorized = params.isAuthorized;
      // appStore.login = params.login;
      // appStore.userId = params.userId;
      // if (params.isSuccess && params.isAuthorized) {
      //   router.push({ name: 'personal' }).then(() => {
      //     $q.notify({
      //       type: 'positive',
      //       icon: 'thumb_up',
      //       message: t('authLoginSuccessNotify'),
      //       position: 'center',
      //       timeout: 2000,
      //       actions: [{ icon: 'close', color: 'white' }],
      //     });
      //   });
      // }
    };

    const loadAuthState = () => {
      return new Promise((resolve) => {
        //   appStore.isLoading = true;
        //   api.value
        //     .postSimple(
        //       {
        //         action: 'standalone-state',
        //         backurl: window.location.pathname,
        //       },
        //       'auth',
        //     )
        //     .then(function (response) {
        //       appStore.isAuthorized = response.data.isAuthorized;
        //       appStore.login = response.data.login;
        //       appStore.userId = response.data.userId;
        //     })
        //     .catch((e) => {
        //       console.error(e);
        //       $q.notify({
        //         multiLine: true,
        //         type: 'negative',
        //         icon: 'upload',
        //         message: t('authUnknownError'),
        //         position: 'center',
        //         timeout: 5000,
        //         actions: [{ icon: 'close', color: 'white' }],
        //       });
        //     })
        //     .finally(() => {
        //       appStore.isLoading = false;
        //       resolve();
        //     });
        // });
      });
    };

    return {
      registerResult,
      loginResult,
      authState,
    };
  },
};
</script>
