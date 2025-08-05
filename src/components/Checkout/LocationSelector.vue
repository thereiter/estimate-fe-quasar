<template>
  <q-select
    filled
    clearable
    v-model="selectedLocation"
    use-input
    use-chips
    input-debounce="500"
    :stack-label="false"
    :label="label"
    :options="options"
    @filter="search"
    @filter-abort="abortFilterFn"
    :hint="hint"
    :disable="disable"
    :hide-hint="true"
    :error-message="errorMessage"
    :error="hasErrors"
    behavior="dialog"
    @popup-show="eventPopup"
    ref="selectorComponent"
  >
    <template v-slot:prepend v-if="iconBefore">
      <q-icon :name="iconBefore" />
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          {{ $t('locationNotFound') }}
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
export default {
  name: 'LocationSelector',
  setup(props) {
    return {
      props
    }
  },
  props: {
    locationService:{
      required:true,
      type:Object
    },
    parentCode:{
      type:String
    },
    label:{
      type:String
    },
    hint:{
      type:String
    },
    disable:{
      type:Boolean
    },
    iconBefore:{
      type:String
    }
  },
  data() {
    return {
      selectedLocation: null,
      options: [],
      isLoading:false,
      query:'',
      errorMessage:null,
      selectorComponent:null
    }
  },
  computed: {
    hasErrors(){
      return !!this.errorMessage
    }
  },

  mounted() {
    this.selectorComponent = this.$refs.selectorComponent
    this.$emit('update:modelValue', this.$attrs.modelValue )
  },
  methods: {
    search(val, update, abort)
    {
      this.isLoading = true;
      this.query = val
      this.locationService.search(this.query).then(function (response)
      {
        let self = this
        if(typeof response === 'undefined')
          return;

        update(function ()
        {
          self.options = response.data.items
          self.isLoading = false;
          if(response.data.error)
          {
            self.errorMessage = response.data.error
          }
          else
          {
            self.errorMessage = null
          }
        });

      }.bind(this))
        .catch(function (error)
        {
          console.error(error);
          this.errorMessage = error
          this.isLoading = false;
        }.bind(this));

    },
    abortFilterFn()
    {

    },
    eventPopup(){
      this.$gtag.event('location-opened', { label: this.$props.label })
    }
  }
}
</script>
