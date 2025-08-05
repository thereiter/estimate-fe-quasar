<template>
  <div>
    <q-chip v-if="(appStore.isAuthorized || appStore.isAuthorizedInitial) && !appStore.login.includes('@estimate.realestate')" color="accent" class="user-login-avatar" text-color="white" style="margin:12px 24px;" icon="account_circle">
      <router-link :to="{name:'profile'}">{{$t('indexPageLoginAuthAs')}} <span class="user-login">{{appStore.login}}</span></router-link>
    </q-chip>
    <LocationStep></LocationStep>
    <AuthStep v-if="showAuthStep"></AuthStep>
    <FormStep></FormStep>
    <SummaryStep></SummaryStep>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent, inject, watch, computed } from 'vue';
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'Mode',
  components:{
    FormStep: defineAsyncComponent(() => import('components/Checkout/FormStep.vue')),
    LocationStep: defineAsyncComponent(() => import('components/Checkout/LocationStep.vue')),
    AuthStep: defineAsyncComponent(() => import('components/Checkout/AuthStep.vue')),
    SummaryStep: defineAsyncComponent(() => import('components/Checkout/SummaryStep.vue'))
  },
  setup() {
    const appStore              = inject('appStore')
    const checkoutGeneralStore  = inject('checkoutGeneralStore')
    const $q                    = useQuasar()

    watch(() => checkoutGeneralStore.errors, (newValue) => {
      if(!Array.isArray(newValue))
        return
      if(newValue.length <= 0)
        return

      for(const error of newValue)
      {
        $q.notify({
          multiLine:true,
          type:'negative',
          icon:'error',
          message:error,
          position:'center',
          timeout:5000,
          actions: [{ icon: 'close', color: 'white' }]
        })
      }
    }, {deep: true})

    const showAuthStep = computed(() => {
      return !appStore.isAuthorizedInitial && !appStore.isAutoRegister
    })

    return {
      appStore,
      showAuthStep
    }
  }
})
</script>
<style scoped>
.user-login-avatar a, .user-login-avatar a:link, .user-login-avatar a:visited, .user-login-avatar a:hover, .user-login-avatar a:focus{
  color:white;
  text-decoration:none;
}
</style>
<style>
body .q-stepper__line .material-icons{
  font-size:20px;
}
</style>
