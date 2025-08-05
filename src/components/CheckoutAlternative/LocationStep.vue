<template>
  <q-banner
    dense
    class="text-white bg-red q-mb-sm q-field--error"
    v-if="checkoutLocationStore.isEmpty"
  >
    <q-icon name="south"></q-icon
    ><span class="text-weight-bold">Вкажіть місцезнаходження нерухомості</span>
  </q-banner>
  <GoogleMap
    @place-changed="(payload) => $emit('location-place-updated', payload)"
  />

  <div class="location-loader q-pa-md" v-if="checkoutLocationStore.isLoading">
    <q-spinner-gears size="3em" color="primary" />
    <span class="q-ml-sm text-subtitle1">Перевірка можливості оцінки...</span>
  </div>

  <template v-if="checkoutLocationStore.errors.length">
    <div v-for="(error, index) in checkoutLocationStore.errors" :key="index">
      <q-banner dense inline-actions class="text-white bg-red">
        {{ error }}
      </q-banner>
    </div>
  </template>

  <q-banner
    id="location-check-result"
    dense
    :class="{
      'q-field--error':
        checkoutLocationStore.score === 'not_available_score' &&
        !checkoutLocationStore.isCanContinue &&
        !checkoutLocationStore.isLoading,
    }"
  >
    <template v-slot:avatar>
      <q-icon :style="scoreResultIconStyles" :name="scoreResultIcon" />
    </template>
    <span class="text-h6">{{ checkoutLocationStore.scoreTitle }}</span>
    <p class="text-body2">{{ checkoutLocationStore.scoreDescription }}</p>
  </q-banner>
</template>

<script>
import { defineComponent, defineAsyncComponent, inject, computed } from "vue";

export default defineComponent({
  name: "LocationStep",
  components: {
    GoogleMap: defineAsyncComponent(() =>
      import("components/CheckoutAlternative/GoogleMap.vue")
    ),
  },
  emits: ["location-place-updated"],
  setup() {
    const checkoutLocationStore = inject("checkoutLocationStore");

    const resetData = function () {
      checkoutLocationStore.score = null;
      checkoutLocationStore.scoreTitle = null;
      checkoutLocationStore.scoreDescription = null;
      checkoutLocationStore.scoreResultColor = null;
      checkoutLocationStore.isCanContinue = false;
      checkoutLocationStore.isCompleted = false;
      checkoutLocationStore.isCanValidate = true;
      checkoutLocationStore.errors = [];
    };

    const scoreResultIconStyles = computed(function () {
      if (checkoutLocationStore.scoreResultColor === "not_set") {
        return { color: "green" };
      }

      if (
        checkoutLocationStore.isCanContinue &&
        checkoutLocationStore.scoreResultColor === "green"
      ) {
        return { color: "green" };
      }

      if (
        checkoutLocationStore.isCanContinue &&
        checkoutLocationStore.scoreResultColor === "yellow"
      ) {
        return { color: "#FF8C00" };
      }

      if (
        checkoutLocationStore.isCanContinue &&
        checkoutLocationStore.scoreResultColor === "red"
      ) {
        return { color: "red" };
      }

      if (!checkoutLocationStore.isCanContinue) {
        return { color: "red" };
      }

      return {};
    });

    const scoreResultIcon = computed(function () {
      if (checkoutLocationStore.isLoading) {
        return "";
      }

      if (checkoutLocationStore.scoreResultColor === "not_set") {
        return "search";
      }

      if (
        checkoutLocationStore.isCanContinue &&
        checkoutLocationStore.scoreResultColor === "green"
      ) {
        return "check_circle";
      }

      if (
        checkoutLocationStore.isCanContinue &&
        checkoutLocationStore.scoreResultColor === "yellow"
      ) {
        return "report_problem";
      }

      if (
        checkoutLocationStore.isCanContinue &&
        checkoutLocationStore.scoreResultColor === "red"
      ) {
        return "warning";
      }

      if (!checkoutLocationStore.isCanContinue) {
        return "cancel";
      }

      return "";
    });

    const scoreResultMarginOfErrorStyles = computed(function () {
      if (checkoutLocationStore.scoreResultColor === "not_set") {
        return { color: "green", fontWeight: "bold" };
      }

      if (
        checkoutLocationStore.isCanContinue &&
        checkoutLocationStore.scoreResultColor === "green"
      ) {
        return { color: "green", fontWeight: "bold" };
      }

      if (
        checkoutLocationStore.isCanContinue &&
        checkoutLocationStore.scoreResultColor === "yellow"
      ) {
        return { color: "#FF8C00", fontWeight: "bold" };
      }
      if (
        checkoutLocationStore.isCanContinue &&
        checkoutLocationStore.scoreResultColor === "red"
      ) {
        return { color: "red", fontWeight: "bold" };
      }

      if (!checkoutLocationStore.isCanContinue) {
        return { display: "none" };
      }

      return {};
    });

    const isLocationValid = computed(() => {
      return (
        checkoutLocationStore.inputs.placeId && checkoutLocationStore.score
      );
    });

    return {
      checkoutLocationStore,
      scoreResultIconStyles,
      scoreResultIcon,
      scoreResultMarginOfErrorStyles,
      resetData,
      isLocationValid,
    };
  },
});
</script>
<style scoped>
.default-location-block {
  margin-bottom: 10px;
  max-width: 1024px;
}
.default-location-block div.q-btn-group:first-child {
  flex-wrap: wrap;
}
.city-location-selector .q-field--with-bottom {
  padding-bottom: 10px;
}
.location-loader {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
