<template>
  <div class="q-mt-md relative-position">
    <h4 class="q-pd-sm">{{$t('personalOrdersSuccessRelatedAdvertisements')}}</h4>
      <div v-if="related.length" class="row related-block">
        <q-card v-for="relatedItem in related" :key="relatedItem.external_id" class="q-ma-sm related-block-item">
          <q-img :src="relatedItem.image_src" style="max-height: 250px;" fit="cover" />
          <q-markup-table flat bordered>
            <tbody>
            <tr>
              <td class="text-left">{{$t('personalOrdersSimilarAdvertDistance')}}</td>
              <td class="text-left">{{relatedItem.attributes.distance}}</td>
            </tr>
            <tr>
              <td class="text-left">{{$t('personalOrdersSimilarAdvertRoomsCount')}}</td>
              <td class="text-left">{{relatedItem.attributes.rooms_count}}</td>
            </tr>
            <tr>
              <td class="text-left">{{$t('personalOrdersSimilarAdvertSquareMeters')}}</td>
              <td class="text-left">{{relatedItem.attributes.square_meters}} м.кв.</td>
            </tr>
            <tr>
              <td class="text-left">{{$t('personalOrdersSimilarAdvertPriceUah')}}</td>
              <td class="text-left">{{formatNumber(relatedItem.price_uah, 'uk-UA')}} грн.</td>
            </tr>
            <tr>
              <td class="text-left">{{$t('personalOrdersSimilarAdvertPriceUsd')}}</td>
              <td class="text-left">{{formatNumber(relatedItem.price_usd, 'en-EN')}}$</td>
            </tr>
            </tbody>
          </q-markup-table>
          <div class="flex justify-center flex-direction-column">
            <q-btn :href="relatedItem.url"
                   target="_blank"
                   rel="noreferrer"
                   color="primary"
                   flat
                   square
                   :label="$t('personalOrdersSimilarAdvertsGoToLinkText')"
            />
          </div>
        </q-card>
        <div class="q-pa-lg flex" style="flex-basis: 100%; justify-content: center;">
          <q-pagination
              v-model="currentPage"
              color="deep-orange"
              :max="maxPages"
              boundary-links
          />
        </div>
      </div>
    <div v-else-if="!related.length && !isLoading" class="row related-block">
      <p class="text-caption">Немає схожих оголошень :(</p>
    </div>
    <q-inner-loading :showing="isLoading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script>
import {defineComponent, inject, onMounted, ref} from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: 'RelatedAdverts',
  props:{
    orderAccountNumber: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const api              = inject('api')
    const $q               = useQuasar()
    const {t}              = useI18n({})
    const related          = ref([])
    const meta             = ref([])
    const isLoading        = ref(true)
    const currentPage      = ref(1)
    const maxPages         = ref(1)

    const loadState = () => {
      return new Promise(resolve => {
        isLoading.value = true;
        api.value.postSimple({
          orderAccountNumber: props.orderAccountNumber
        }, 'orderRelatedAdverts').then(async function (response)
        {
          related.value = response.data.adverts || []
          meta.value = response.data.meta || {}
        }).catch((e) => {
          console.error(e)
          $q.notify({
            multiLine:true,
            type:'negative',
            icon:'upload',
            message:t('networkUnknownError'),
            position:'center',
            timeout:5000,
            actions: [{ icon: 'close', color: 'white' }]
          })
        })
            .finally(() => {
              isLoading.value = false
              resolve()
            })
      })
    }

    onMounted(() => {
      loadState().finally(() => {
        isLoading.value = false;
      })
    })

    const formatNumber = (number, locale) => {
      return new Intl.NumberFormat(locale).format(number)
    }

    return {
      isLoading,
      related,
      formatNumber,
      currentPage,
      maxPages
    }
  }
})
</script>