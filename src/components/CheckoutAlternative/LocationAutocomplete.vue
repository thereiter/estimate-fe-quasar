<template>
  <q-select
    use-input
    use-chips
    v-model="selectedLocation"
    input-debounce="500"
    :options="options"
    @filter="search"
    @filter-abort="abortFilterFn"
    :error="v$.selectedLocation.$errors.length > 0"
    ref="selectorComponent"
  >
    <template v-slot:prepend v-if="iconBefore">
      <q-icon :name="iconBefore" />
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          {{ $t("locationNotFound") }}
        </q-item-section>
      </q-item>
    </template>
    <template v-slot:error>
      <div v-if="v$.selectedLocation.$errors.length === 1">
        <span>
          {{ v$.selectedLocation.$errors[0].$message }}
        </span>
      </div>
      <div v-else>
        <span v-for="error of v$.selectedLocation.$errors" :key="error.$uid">
          {{ error.$message }};
        </span>
      </div>
    </template>
  </q-select>
</template>

<script>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import {
  createI18nMessage,
  required as requiredOrig,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  name: "LocationSelector",
  props: {
    locationService: {
      required: true,
      type: Object,
    },
    parentCode: {
      type: String,
    },
    label: {
      type: String,
    },
    hint: {
      type: String,
    },
    disable: {
      type: Boolean,
    },
    iconBefore: {
      type: String,
    },
    modelValue: {
      type: Object,
    },
    errors: {
      type: Array,
    },
  },
  data() {
    return {
      options: [],
      isLoading: false,
      query: "",
      selectorComponent: null,
    };
  },
  mounted() {
    this.selectorComponent = this.$refs.selectorComponent;
  },
  methods: {
    search(val, update, abort) {
      this.isLoading = true;
      this.query = val;
      this.v$.$reset();
      this.v$.$clearExternalResults();
      this.locationService
        .search(this.query)
        .then(
          function (response) {
            if (typeof response === "undefined") return;

            update(
              function () {
                this.options = response.data.items;
                this.isLoading = false;
                if (response.data.error) {
                  Object.assign(this.externalResults$, {
                    selectedLocation: response.data.error,
                  });
                  this.v$.$touch();
                }
              }.bind(this)
            );
          }.bind(this)
        )
        .catch(
          function (error) {
            Object.assign(this.externalResults$, {
              selectedLocation: error,
            });
            this.isLoading = false;
          }.bind(this)
        );
    },
    abortFilterFn() {},
    eventPopup() {
      this.$gtag.event("location-opened", { label: this.$props.label });
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n({});
    const withI18nMessage = createI18nMessage({ t });
    const required = withI18nMessage(requiredOrig);

    const selectedLocation = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const rules = computed(() => ({
      selectedLocation: { required },
    }));

    const externalResults$ = ref({});
    const v$ = useVuelidate(
      rules,
      { selectedLocation },
      {
        $autoDirty: true,
        $externalResults: externalResults$,
      }
    );

    return {
      props,
      selectedLocation,
      v$,
      externalResults$,
    };
  },
};
</script>
