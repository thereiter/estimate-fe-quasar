<template>
  <div class="q-pa-sm">
    <div class="q-pa-sm location-step-block-color">
      <q-chip
        text-color="white"
        color="indigo-7"
        size="md"
        square
        outline
        icon="location_city"
        class="text-subtitle2 chip-block-style"
      >
        Місцезнаходження
      </q-chip>

      <LocationStep
        ref="locationStep"
        @location-place-updated="addressUpdatedHandler"
      ></LocationStep>
    </div>

    <FormStep ref="formStep"></FormStep>

    <div class="q-pa-sm auth-step-block-color auth-step-block">
      <q-chip
        text-color="white"
        color="indigo-7"
        size="md"
        square
        outline
        icon="apartment"
        class="text-subtitle2 chip-block-style"
      >
        Отримання результату
      </q-chip>
      <AuthStep ref="authStep" :hide-terms="true"></AuthStep>

      <div
        class="results-get-block"
        v-if="
          (appStore.isAuthorized || appStore.isAuthorizedInitial) &&
          !appStore.login.includes('@estimate.realestate')
        "
        style="margin-bottom: 15px"
      >
        <q-btn
          outline
          color="secondary"
          :to="{ name: 'profile' }"
          no-wrap
          no-caps
          dense
        >
          <div class="row items-center">
            <q-icon left name="account_circle" />
            <div class="text-center">В особистому кабінеті</div>
          </div>
        </q-btn>
        <div
          class="results-to-email row items-center text-subtitle2"
          style="margin-top: 15px"
        >
          <q-icon left name="email" />
          <div class="text-center">та на пошту {{ appStore.login }}</div>
        </div>
      </div>

      <q-btn
        @click="submit"
        label="Продовжити"
        :loading="checkoutGeneralStore.isLoading"
        color="primary"
        outline
        push
        square
        size="lg"
        icon="done_outline"
        style="margin: 0 9px 9px 9px"
      >
        <template v-slot:loading>
          <q-spinner-hourglass class="on-left" />
          Завантаження...
        </template>
      </q-btn>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  defineAsyncComponent,
  inject,
  watch,
  ref,
  nextTick,
} from "vue";
import { useQuasar } from "quasar";
import { event } from "vue-gtag";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Mode",
  components: {
    FormStep: defineAsyncComponent(() =>
      import("components/CheckoutAlternative/FormStep.vue")
    ),
    LocationStep: defineAsyncComponent(() =>
      import("components/CheckoutAlternative/LocationStep.vue")
    ),
    AuthStep: defineAsyncComponent(() =>
      import("components/CheckoutAlternative/AuthStep.vue")
    ),
  },
  setup() {
    const appStore = inject("appStore");
    const checkoutGeneralStore = inject("checkoutGeneralStore");
    const checkoutLocationStore = inject("checkoutLocationStore");
    const confirm = inject("confirm");
    const process = inject("process");
    const assignState = inject("assignState");
    const logAction = inject("logAction");
    const $q = useQuasar();
    const router = useRouter();

    const locationStep = ref(null);
    const formStep = ref(null);
    const authStep = ref(null);

    const scrollToError = () => {
      nextTick(() => {
        let firstError = document.querySelector(".q-field--error");
        if (!firstError) {
          return;
        }
        firstError.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      });
    };

    const validate = async () => {
      const locationStepValid = await locationStep.value.isLocationValid;
      const formStepValid = await formStep.value.validate();
      const authStepValid = await authStep.value.validate();
      checkoutLocationStore.isEmpty = !checkoutLocationStore.inputs.placeId;
      if (checkoutLocationStore.isEmpty) {
        return false;
      }

      return locationStepValid && formStepValid && authStepValid;
    };

    const getCombinedErrors = () => {
      const errorMapper = ($error) => {
        return { [$error.$property]: $error.$message };
      };

      const formatter = (a, v) => {
        const key = Object.keys(v)[0];
        const value = v[key];
        return { ...a, [key]: value };
      };

      const formErrors = formStep.value.v$.$errors.map(errorMapper);
      const authErrors = authStep.value.v$.$errors.map(errorMapper);

      const $combinedErrors = {};

      if (formErrors.length) {
        $combinedErrors.form = formErrors.reduce(formatter, {});
      }

      if (authErrors.length) {
        $combinedErrors.auth = authErrors.reduce(formatter, {});
      }

      return $combinedErrors;
    };

    const notifyFormIsInvalid = () => {
      scrollToError();
      $q.notify({
        message: "Перевірте правильність заповнення форми",
        color: "negative",
        actions: [{ icon: "close", color: "white" }],
        type: "negative",
        icon: "error",
        group: "invalid-form",
      });
      logAction();
    };

    const checkLocation = async () => {
      const notifyError = () => {
        $q.notify({
          message: "Неможливо оцінити за даною адресою",
          color: "negative",
          actions: [{ icon: "close", color: "white" }],
          type: "negative",
          icon: "error",
          group: "invalid-location",
        });
      };

      locationStep.value.resetData();
      checkoutLocationStore.isLoading = true;
      process()
        .then(async (response) => {
          await assignState(response);
          await nextTick(() => {
            if (
              checkoutLocationStore.score === "not_available_score" &&
              !checkoutLocationStore.isCanContinue
            ) {
              notifyError();
              scrollToError();

              event("location-error", {
                error: "not_available_score",
                placeAddress: checkoutLocationStore.inputs.placeAddress,
                placeId: checkoutLocationStore.inputs.placeId,
              });
            }
          });
        })
        .catch((e) => {
          event("process-error", { error: e });
          throw e;
        })
        .finally(() => {
          checkoutLocationStore.isLoading = false;
        });
    };

    const addressUpdatedHandler = () => {
      checkLocation();
    };

    const submit = async () => {
      let isValid = await validate();
      if (!isValid) {
        notifyFormIsInvalid();
        return;
      }

      appStore.isLoading = true;
      confirm()
        .then(async (response) => {
          try {
            if (
              response.general.successConfirm &&
              response.general.orderAccountNumber
            ) {
              await router.push({
                name: "order",
                params: {
                  orderAccountNumber: response.general.orderAccountNumber,
                  scrollToTop: "yes",
                },
              });

              return;
            }
          } catch (e) {
            event("confirm-error", { error: e });
            throw e;
          }

          await assignState(response);
          await nextTick(() => {
            const form = formStep.value;
            const formValidator = form.v$;
            const auth = authStep.value;
            const authValidator = auth.v$;

            Object.assign(form.externalResults$, response.form.fieldErrors);

            Object.assign(
              auth.externalResults$,
              response.autoRegister.fieldErrors
            );

            Object.assign(
              auth.externalResults$,
              response.autoRegister.fieldErrors
            );

            formValidator.$touch();
            authValidator.$touch();

            notifyFormIsInvalid();
          });
        })
        .catch((e) => {
          event("confirm-error", { error: e });
          throw e;
        })
        .finally(() => {
          appStore.isLoading = false;
        });
    };

    watch(
      () => checkoutGeneralStore.errors,
      (newValue) => {
        if (!Array.isArray(newValue)) return;
        if (newValue.length <= 0) return;

        for (const error of newValue) {
          $q.notify({
            multiLine: true,
            type: "negative",
            icon: "error",
            message: error,
            position: "center",
            timeout: 5000,
            actions: [{ icon: "close", color: "white" }],
          });
        }
      },
      { deep: true }
    );

    return {
      appStore,
      checkoutGeneralStore,
      locationStep,
      formStep,
      authStep,
      addressUpdatedHandler,
      submit,
      getCombinedErrors,
    };
  },
});
</script>
<style scoped lang="scss">
.user-login-avatar a,
.user-login-avatar a:link,
.user-login-avatar a:visited,
.user-login-avatar a:hover,
.user-login-avatar a:focus {
  color: white;
  text-decoration: none;
}

.location-step-block-color {
  border-radius: 10px;
  border: 1px solid $indigo-7;
  padding-top: 20px;
  position: relative;
}
.chip-block-style {
  position: absolute;
  top: -20px;
  left: 10px;
  background-color: #fff !important;
}

.auth-step-block-color {
  border-radius: 10px;
  border: 1px solid $indigo-7;
  padding-top: 20px;
  position: relative;
  margin-top: 35px;
}
.results-get-block {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-wrap: wrap;
  align-content: flex-start;
}
.results-to-email {
  color: $secondary;
  flex-wrap: nowrap;
  word-break: break-all;
}
</style>
