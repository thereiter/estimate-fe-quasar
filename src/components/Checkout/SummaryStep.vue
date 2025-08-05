<template>
  <q-step
    :name="4"
    :title="$t('summaryStepBlockTitle')"
    icon="summarize"
    active-icon="summarize"
    :done="checkoutFormStore.isCompleted"
    :error="checkoutFormStore.errors.length > 0"
  >
    <h6 style="margin: 0;">{{$t('summaryStepBlockCheckData')}}</h6>
      <Summary :summary="summaryData"></Summary>
      <div v-if="checkoutFormStore.summaryErrors.length === 1">
        <span>
          {{checkoutFormStore.summaryErrors[0]}}
        </span>
      </div>
      <div v-else>
        <span v-for="(error, index) of checkoutFormStore.summaryErrors" :key="index">
          {{ error }};
        </span>
      </div>
      <q-stepper-navigation style="padding-bottom: 30px">
        <q-btn @click="confirm" :label="$t('summaryStepNext')" :loading="checkoutGeneralStore.isLoading" color="primary"/>
        <q-btn flat @click="goBack" color="primary" :label="$t('summaryStepPrev')" class="q-ml-sm"></q-btn>
      </q-stepper-navigation>
  </q-step>
</template>

<script>
import { defineComponent, inject, reactive, watch } from 'vue';
import Summary from 'components/Summary.vue'
export default defineComponent({
  name: 'SummaryStep',
  components:{Summary},
  setup() {
    const checkoutGeneralStore  = inject('checkoutGeneralStore')
    const checkoutLocationStore = inject('checkoutLocationStore')
    const checkoutFormStore     = inject('checkoutFormStore')
    const confirm               = inject('confirm')
    const goBack = () => {
        checkoutGeneralStore.step = 3
    }

    const summaryData = reactive(Object.assign(checkoutFormStore.summary, {locationString:checkoutLocationStore.locationString}))

    watch(() => checkoutLocationStore.locationString, (newValue) => {
      summaryData.locationString = newValue
    })

    return {
      goBack,
      summaryData,
      confirm,
      checkoutGeneralStore,
      checkoutFormStore
    }
  },
})
</script>
