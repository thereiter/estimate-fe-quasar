<template>
  <div v-if="init">
    <q-card v-if="appStore.isAuthorized">
        <div class="flex personal-top-menu mt-3">
          <q-btn-toggle
              class="q-pa-md"
              ripple
              padding="md"
              flat
              v-model="page"
              stretch
              toggle-color="primary"
              :options="toggleOptions"></q-btn-toggle>
        </div>
      <router-view></router-view>
    </q-card>
    </div>
</template>

<script>
import { inject, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from "vue-i18n";
import { truncateString } from 'boot/services/Misc.js'

export default {
  name: 'Personal',
  setup () {
    const appStore      = inject('appStore')
    const loadAuthState = inject('loadAuthState')
    const {t}           = useI18n({})
    const init          = ref(false)
    const page          = ref(null)
    const router        = useRouter()
    const currentRoute  = useRoute()

    const toggleOptionsData = [
      {label: t('personalProfileUrlTitle'), value: 'profile', icon:'person', to: { name: 'profile' }},
      {label: t('personalOrdersUrlTitle'), value: 'orders', icon:'list_alt', to: { name: 'orders' }},
      {label: t('personalLogoutUrlTitle'), value: 'logout', icon:'logout', to: { name: 'logout' }},
    ]

    const toggleOptions = ref([...toggleOptionsData])
    const toggleDefault = () => {
      toggleOptions.value = [...toggleOptionsData]
    }

    const toggleOrderDetail = (orderAccountNumber) => {
      toggleOptions.value = [
        {label: t('personalProfileUrlTitle'), value: 'profile', icon:'person', to: { name: 'profile' }},
        {label: t('personalOrdersUrlTitle'), value: 'orders', icon:'list_alt', to: { name: 'orders' }},
        {label: `${t('personalOrderUrlTitle')} ${truncateString(orderAccountNumber)}`, value: 'order', icon:'point_of_sale'},
        {label: t('personalLogoutUrlTitle'), value: 'logout', icon:'logout', to: { name: 'logout' }},
      ]
    }

    router.beforeEach((to, from, next) => {
      if(to.name === 'order') {
        toggleOrderDetail(to.params.orderAccountNumber)
      }
      else {
        toggleDefault()
      }
      page.value = to.name
      next()
    })

    onMounted(() => {
      loadAuthState().finally(() => {
        init.value = true
        if(!appStore.isAuthorized)
        {
          router.push({'name':'auth'})
        }
        else
        {
          page.value = currentRoute.name
          if(currentRoute.name === 'order') {
            toggleOrderDetail(currentRoute.params.orderAccountNumber)
          }
        }
      })
    })

    return {
      appStore,
      init,
      page,
      toggleOptions
    }
  }
}
</script>
<style scoped>
.flex-direction-column {
  flex-direction: column;
}
.personal-top-menu{
  align-content: center;
  justify-content: center;
  align-items: center;
}
.personal-top-menu .q-btn-group{
  flex-wrap: wrap;
  justify-content: center;
}
</style>
