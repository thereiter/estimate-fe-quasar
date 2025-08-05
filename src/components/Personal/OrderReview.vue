<template>
  <Transition name="fade" mode="out-in">
    <div v-if="data.showBlock" class="q-pa-md" style="padding-top:0;">
      <div class="q-pa-md">
        <div class="review-block">
          <h4 style="margin: 15px 0;">Ваш відгук</h4>
          <div class="q-gutter-sm review-top">
            <div v-if="v$.predictionQuality.$errors.length > 0" class="text-negative has-errors" style="font-weight: bold">
              <div v-if="v$.predictionQuality.$errors.length === 1">
                  <span>
                    {{v$.predictionQuality.$errors[0].$message}}
                  </span>
              </div>
              <div v-else>
                <span v-for="error of v$.predictionQuality.$errors" :key="error.$uid">
                {{ error.$message }};
                </span>
              </div>
            </div>
            <div class="rounded-borders" :class="{ 'bg-yellow-3': v$.predictionQuality.$errors.length > 0 }">
              <q-radio keep-color v-model="data.predictionQuality" val="accurate" label="Оцінка точна" color="primary" />
              <q-radio keep-color v-model="data.predictionQuality" val="price-higher" label="Ціна повинна бути більше" color="orange" />
              <q-radio keep-color v-model="data.predictionQuality" val="price-lower" label="Ціна повинна бути менше" color="red" />
            </div>

            <Transition name="fade" mode="out-in">
              <q-input
                  v-if="data.predictionQuality === 'price-higher' || data.predictionQuality === 'price-lower'"
                  v-model="data.userPrice"
                  filled
                  label="Як ви оцінюєте?"
                  hint="Напишіть вартість в $"
                  :bottom-slots="true"
                  :loading="data.isLoading"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_money" />
                </template>
              </q-input>
            </Transition>
            <q-input
                v-model="data.reviewText"
                filled
                placeholder="Напишіть нам, ваш відгук дуже важливий для нас"
                type="textarea"
                :loading="data.isLoading"
            />
            <q-btn @click="sendRequest" :loading="data.isLoading" label="Відправити" type="button" color="primary"/>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import {computed, defineComponent, inject, nextTick, onMounted, reactive, ref, unref} from 'vue';
import {useQuasar} from "quasar";
import {useI18n} from "vue-i18n";
import {createI18nMessage, required as requiredOrig} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {scrollTop} from 'components/Helpers/scroll.js'
export default defineComponent({
  name: 'OrderReview',
  components:{},
  props:{
    orderAccountNumber:{
      type:String,
      required:true
    }
  },
  setup(props){
    const api       = inject('api')
    const $q        = useQuasar()
    const {t}       = useI18n({})
    const withI18nMessage = createI18nMessage({ t })
    const orderAccountNumber = unref(props.orderAccountNumber)
    const data = reactive({
      predictionQuality:null,
      reviewText:null,
      userPrice:null,
      showBlock:false,
      isLoading:false
    })

    const required = withI18nMessage(requiredOrig)

    const rules = computed(() => ({
      predictionQuality: { 'predictionQualityReview': required },
    }))

    const $externalResults = ref({})
    const v$ = useVuelidate(rules, data, { $autoDirty:true, $externalResults })

    const scrollToError = () => {
      nextTick(() => {
        let firstError = document.querySelector('.review-top .has-errors');
        if(!firstError)
          return

        scrollTop(null, 200, firstError)
      })
    }

    const loadState = () => {
      return new Promise(resolve => {
        api.value.postSimple({
          action:'isOrderHasReview',
          orderAccountNumber: orderAccountNumber
        }, 'orderReview').then(async function (response)
        {
          data.showBlock = response.data.hasReview === false;
        }).finally(() => {
              resolve()
            })
      })
    }

    onMounted(() => {
      loadState()
    })

    const sendRequest = async () => {
      v$.value.$clearExternalResults()
      const result = await v$.value.$validate()
      if(!result) {
        scrollToError()
        return
      }

      data.isLoading = true;
      api.value.postSimple({
        action:'saveReview',
        predictionQuality:data.predictionQuality,
        reviewText:data.reviewText,
        userPrice:data.userPrice,
        orderAccountNumber:orderAccountNumber,
      }, 'orderReview').then(function (response)
      {
        if(response.data.reviewSaved === true) {
          $q.notify({
            multiLine:true,
            type:'positive',
            icon:'check',
            message:"Дякуємо за відгук!",
            position:'center',
            timeout:5000,
            actions: [{ icon: 'close', color: 'white' }]
          })
          data.showBlock = false
        } else {
          $q.notify({
            multiLine:true,
            type:'negative',
            icon:'warning',
            message:"Сталася помилка. Спробуйте ще раз.",
            position:'center',
            timeout:5000,
            actions: [{ icon: 'close', color: 'white' }]
          })
        }

      }).finally(() => {
            data.isLoading = false
          })
    }

    return {
      v$,
      data,
      sendRequest
    }
  },
})
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
