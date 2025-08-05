<template>
    <q-card>
      <q-card-section class="bg-grey-8 text-white">
        <div class="text-h6">{{props.title}}</div>
      </q-card-section>
      <q-card-actions vertical align="center">
        <q-btn class="active-button" type="a" icon="apartment" color="primary" outline  :to="{name:'flat-sale'}">
          {{$t('personalOrdersFlatSaleLink')}}
        </q-btn>
        <q-btn type="a" stretch icon="pending" icon-right="help" size="sm" disable flat>
          &nbsp;&nbsp;{{$t('personalOrdersFlatRentLink')}}&nbsp;&nbsp;&nbsp;
          <q-tooltip>
            {{$t('personalOrdersTypePending')}}
          </q-tooltip>
        </q-btn>
        <q-btn type="a" stretch icon="pending" icon-right="help" size="sm" disable flat>
          &nbsp;&nbsp;{{$t('personalOrdersHouseSaleLink')}}&nbsp;&nbsp;&nbsp;
          <q-tooltip>
            {{$t('personalOrdersTypePending')}}
          </q-tooltip>
        </q-btn>
        <q-btn type="a" stretch icon="pending" icon-right="help" size="sm" disable flat>
          &nbsp;&nbsp;{{$t('personalOrdersHouseRentLink')}}&nbsp;&nbsp;&nbsp;
          <q-tooltip>
            {{$t('personalOrdersTypePending')}}
          </q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FallbackLinksBlock',
  props:{
    title:{
      type:String,
      required:true
    }
  },
  setup(props) {
    return {
      props
    }
  }
})
</script>
<style scoped>
.active-button{
  margin-bottom:10px;
}
</style>