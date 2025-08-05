<template>
  <q-step
    v-if="!appStore.isAuthorizedInitial"
    :name="2"
    :title="$t('authStepTitle')"
    icon="person"
    :done="checkoutGeneralStore.step > 2 && appStore.isAuthorized"
  >
      <AuthComplex @register-result="registerResult" @login-result="loginResult"></AuthComplex>

    <q-stepper-navigation>
      <q-btn
        flat
        @click="checkoutGeneralStore.step = 1"
        color="primary"
        :label="$t('authStepGoBackButton')"
        class="q-ml-sm"></q-btn>
    </q-stepper-navigation>
  </q-step>
</template>

<script>
import { defineComponent, inject } from 'vue';
import AuthComplex from 'components/Auth/AuthComplex.vue'
import { useQuasar } from 'quasar'
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: 'AuthStep',
  components:{
    AuthComplex
  },
  setup(){
    const appStore              = inject('appStore')
    const checkoutGeneralStore  = inject('checkoutGeneralStore')
    const loadState             = inject('loadState')

    const $q = useQuasar()
    const {t} = useI18n({})

    const registerResult = (params) => {
      appStore.isAuthorized = params.isAuthorized
      appStore.login = params.login
      appStore.userId = params.userId
      if(params.isSuccess && params.isAuthorized)
      {
        checkoutGeneralStore.step = 3
        $q.notify({
          type:'info',
          icon:'mark_email_unread',
          message:t('authRegisterConfirmMailSentNotify'),
          position:'center',
          timeout:3500,
          actions: [{ icon: 'close', color: 'white' }]
        })

        $q.notify({
          type:'positive',
          icon:'thumb_up',
          message:t('authRegisterSuccessNotify'),
          position:'center',
          timeout:2000,
          actions: [{ icon: 'close', color: 'white' }]
        })
      }
    }

    const loginResult = (params) => {
      appStore.isAuthorized = params.isAuthorized
      appStore.login = params.login
      appStore.userId = params.userId
      if(params.isSuccess && params.isAuthorized)
      {
        checkoutGeneralStore.step = 3
        loadState().then(() => {
          $q.notify({
            type:'positive',
            icon:'thumb_up',
            message:t('authLoginSuccessNotify'),
            position:'center',
            timeout:2000,
            actions: [{ icon: 'close', color: 'white' }]
          })
        })
      }
    }

    return {
      appStore,
      checkoutGeneralStore,
      registerResult,
      loginResult
    }
  },
})
</script>
