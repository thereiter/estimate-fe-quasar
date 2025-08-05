<template>
  <q-step
    :name="1"
    :title="$t('locationSelectionBlock')"
    active-icon="location_on"
    :done="checkoutLocationStore.isCompleted"
    :error="checkoutLocationStore.errors.length > 0"
    :caption="
      checkoutLocationStore.isCompleted
        ? checkoutLocationStore.locationString
        : ''
    "
  >
    <div class="city-location-selector" @click="event('city-selector-click')">
      <LocationSelector
        ref="cityLocation"
        :label="$t('locationSelectorLabelCity')"
        v-model="checkoutLocationStore.cityLocation"
        icon-before="location_city"
        @update:modelValue="cityLocationChangedHandler"
        :location-service="apiCity"
      />
    </div>

    <div
      class="default-location-block"
      @click="event('default-location-click')"
    >
      <q-btn-toggle
        @update:model-value="defaultLocationSelectedEvent"
        v-model="defaultLocationModel"
        toggle-color="primary"
        :options="checkoutLocationStore.defaultLocations"
        no-caps
        flat
        unelevated
      />
    </div>

    <LocationSelector
      :label="$t('locationSelectorLabelStreet')"
      :hint="$t('locationSelectorHintStreet')"
      v-model="checkoutLocationStore.streetLocation"
      icon-before="route"
      :disable="!checkoutLocationStore.inputs.cityCode"
      :location-service="apiStreet"
    />

    <q-input
      :clearable="true"
      filled
      bottom-slots
      v-model="checkoutLocationStore.inputs.address"
      :hide-hint="true"
      :label="$t('locationSelectorLabelAddress')"
      :disable="!checkoutLocationStore.inputs.streetCode"
      :error="locationValidator.address.$errors.length > 0"
      :dense="false"
    >
      <template v-slot:prepend>
        <q-icon name="home" />
      </template>
      <template v-slot:hint>
        {{ $t("locationSelectorHintAddress") }}
      </template>
      <template v-slot:error>
        <div v-if="locationValidator.address.$errors.length === 1">
          <span>
            {{ locationValidator.address.$errors[0].$message }}
          </span>
        </div>
        <div v-else>
          <span
            v-for="error of locationValidator.address.$errors"
            :key="error.$uid"
          >
            {{ error.$message }};
          </span>
        </div>
      </template>
    </q-input>

    <template v-if="checkoutLocationStore.errors.length">
      <div v-for="(error, index) in checkoutLocationStore.errors" :key="index">
        <q-banner dense inline-actions class="text-white bg-red">
          {{ error }}
        </q-banner>
      </div>
    </template>

    <q-stepper-navigation
      v-if="
        checkoutLocationStore.isCanValidate &&
        !checkoutLocationStore.isCompleted
      "
    >
      <q-btn
        :disable="
          !checkoutLocationStore.inputs.cityCode ||
          !checkoutLocationStore.inputs.streetCode ||
          !checkoutLocationStore.inputs.address
        "
        :loading="checkoutGeneralStore.isLoading"
        @click="checkLocation"
        color="primary"
        :label="$t('locationStepCheckPossibility')"
      ></q-btn>
    </q-stepper-navigation>

    <q-banner id="location-check-result" dense v-if="isLocationValid">
      <template v-slot:avatar>
        <q-icon :style="scoreResultIconStyles" :name="scoreResultIcon" />
      </template>
      <span class="text-h6">{{ checkoutLocationStore.scoreTitle }}</span>
      <p class="text-body2">{{ checkoutLocationStore.scoreDescription }}</p>
      <p class="text-body2" v-if="checkoutLocationStore.isCanContinue && false">
        {{ $t("locationStepMarginOfError") }}:
        <span :style="scoreResultMarginOfErrorStyles"
          >{{ checkoutLocationStore.marginOfError }}%</span
        >
      </p>
    </q-banner>

    <div v-if="isLocationValid">
      <div v-if="checkoutAutoRegisterStore.inputs.isShow">
        <div v-if="checkoutAutoRegisterStore.inputs.isEmailExists">
          <q-banner class="text-white bg-accent" style="margin-bottom: 10px">
            {{ $t("checkoutAutoRegisterEmailExists") }}
            <br />
            {{ $t("checkoutAutoRegisterUseAnotherEmail") }}
            <br />
            {{ $t("checkoutAutoRegisterRecoverPassword") }}
          </q-banner>
          <AuthComplex
            :login-block-first="true"
            @register-result="registerResult"
            @login-result="loginResult"
          ></AuthComplex>
        </div>
        <div v-else>
          <div class="autoregister-block">
            <q-input
              filled
              v-model="checkoutAutoRegisterStore.inputs.email"
              label="Введіть E-mail"
              lazy-rules
              @click="event('autoregister-email-click')"
              :bottom-slots="true"
              :error="autoRegisterValidator.email.$errors.length > 0"
            >
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
              <template v-slot:error>
                <div v-if="autoRegisterValidator.email.$errors.length === 1">
                  <span>
                    {{ autoRegisterValidator.email.$errors[0].$message }}
                  </span>
                </div>
                <div v-else>
                  <span
                    v-for="error of autoRegisterValidator.email.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }};
                  </span>
                </div>
              </template>
            </q-input>
            <div class="autoregister-socserv">
              <p class="text-overline text-primary soc-serv-buttons-title">
                Або увійдіть через соцмережу
              </p>
              <SocServButtons
                @click="event('autoregister-soc-serv-click')"
                v-if="!socServAuthStore.isLoading"
                :facebook-link="socServAuthStore.facebookLink"
                :google-link="socServAuthStore.googleLink"
                :errors="socServAuthStore.errors"
              ></SocServButtons>
            </div>
          </div>

          <div class="terms-accept-block">
            <q-scroll-area style="height: 53px" :visible="true">
              <q-field
                dense
                isTermsAccepted
                :error="
                  autoRegisterValidator.isTermsAccepted.$errors.length > 0
                "
                hide-bottom-space
              >
                <q-checkbox
                  v-model="checkoutAutoRegisterStore.inputs.isTermsAccepted"
                  color="primary"
                  @click="autoRegisterValidator.isTermsAccepted.$touch"
                >
                </q-checkbox>
                <p class="accept-terms-checkbox">
                  Я погоджусь з&nbsp;
                  <a
                    :href="privacyPolicyHref"
                    target="_blank"
                    style="text-decoration: underline"
                    >політикої обробки моїх персональних даних</a
                  >&nbsp;та погоджусь з&nbsp;
                  <a
                    :href="termsAndConditionsHref"
                    target="_blank"
                    style="text-decoration: underline"
                  >
                    умовами користування сервісом
                  </a>
                </p>
                <template v-slot:error>
                  <div
                    v-if="
                      autoRegisterValidator.isTermsAccepted.$errors.length === 1
                    "
                  >
                    <span>
                      {{
                        autoRegisterValidator.isTermsAccepted.$errors[0]
                          .$message
                      }}
                    </span>
                  </div>
                  <div v-else>
                    <span
                      v-for="error of autoRegisterValidator.isTermsAccepted
                        .$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }};
                    </span>
                  </div>
                </template>
              </q-field>
            </q-scroll-area>
          </div>
        </div>
      </div>

      <q-btn
        style="margin-top: 20px"
        v-if="isCanTryNextStep"
        @click="nextStep"
        color="primary"
        :label="$t('locationStepContinueButton')"
      ></q-btn>
    </div>
  </q-step>
</template>

<script>
import {
  defineComponent,
  defineAsyncComponent,
  inject,
  computed,
  watch,
  ref,
  onMounted,
  reactive,
} from "vue";

import LocationService from "boot/services/LocationService.js";
import { event } from "vue-gtag";
import {
  createI18nMessage,
  email as emailOrig,
  required as requiredOrig,
  sameAs as sameAsOrig,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useI18n } from "vue-i18n";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "LocationStep",
  components: {
    SocServButtons: defineAsyncComponent(() =>
      import("components/Auth/SocServButtons.vue")
    ),
    LocationSelector: defineAsyncComponent(() =>
      import("components/Checkout/LocationSelector.vue")
    ),
    AuthComplex: defineAsyncComponent(() =>
      import("components/Auth/AuthComplex.vue")
    ),
  },
  setup() {
    const appStore = inject("appStore");
    const checkoutLocationStore = inject("checkoutLocationStore");
    const checkoutGeneralStore = inject("checkoutGeneralStore");
    const checkoutAutoRegisterStore = inject("checkoutAutoRegisterStore");
    const termsAndConditionsHref = inject("termsAndConditionsHref");
    const privacyPolicyHref = inject("privacyPolicyHref");
    const process = inject("process");
    const api = inject("api");
    const { t } = useI18n({});
    const withI18nMessage = createI18nMessage({ t });
    const $q = useQuasar();

    const resetData = function () {
      if (checkoutGeneralStore.isLoading) return;

      checkoutLocationStore.score = null;
      checkoutLocationStore.scoreTitle = null;
      checkoutLocationStore.scoreDescription = null;
      checkoutLocationStore.scoreResultColor = null;
      checkoutLocationStore.isCanContinue = false;
      checkoutLocationStore.isCompleted = false;
      checkoutLocationStore.isCanValidate = true;
      checkoutLocationStore.errors = [];
    };

    const apiCity = computed(function () {
      return new LocationService(api, "", "city");
    });
    const apiStreet = computed(function () {
      return new LocationService(
        api,
        checkoutLocationStore.inputs.cityCode,
        "street"
      );
    });

    const scoreResultIconStyles = computed(function () {
      if (
        checkoutLocationStore.isCanContinue &&
        checkoutLocationStore.scoreResultColor === "green"
      )
        return { color: "green" };
      else if (
        checkoutLocationStore.isCanContinue &&
        checkoutLocationStore.scoreResultColor === "yellow"
      )
        return { color: "#FF8C00" };
      else if (
        checkoutLocationStore.isCanContinue &&
        checkoutLocationStore.scoreResultColor === "red"
      )
        return { color: "red" };
      else if (!checkoutLocationStore.isCanContinue) return { color: "red" };

      return {};
    });

    const scoreResultIcon = computed(function () {
      if (
        checkoutLocationStore.isCanContinue &&
        checkoutLocationStore.scoreResultColor === "green"
      )
        return "check_circle";
      else if (
        checkoutLocationStore.isCanContinue &&
        checkoutLocationStore.scoreResultColor === "yellow"
      )
        return "report_problem";
      else if (
        checkoutLocationStore.isCanContinue &&
        checkoutLocationStore.scoreResultColor === "red"
      )
        return "warning";
      else if (!checkoutLocationStore.isCanContinue) return "cancel";

      return "";
    });

    const scoreResultMarginOfErrorStyles = computed(function () {
      if (
        checkoutLocationStore.isCanContinue &&
        checkoutLocationStore.scoreResultColor === "green"
      )
        return { color: "green", fontWeight: "bold" };
      else if (
        checkoutLocationStore.isCanContinue &&
        checkoutLocationStore.scoreResultColor === "yellow"
      )
        return { color: "#FF8C00", fontWeight: "bold" };
      else if (
        checkoutLocationStore.isCanContinue &&
        checkoutLocationStore.scoreResultColor === "red"
      )
        return { color: "red", fontWeight: "bold" };
      else if (!checkoutLocationStore.isCanContinue) return { display: "none" };

      return {};
    });

    watch(
      () => checkoutLocationStore.cityLocation,
      () => {
        if (checkoutGeneralStore.isLoading) return;

        checkoutLocationStore.streetLocation = null;
        checkoutLocationStore.inputs.address = null;
        resetData();
      }
    );

    watch(
      () => checkoutLocationStore.streetLocation,
      () => {
        if (checkoutGeneralStore.isLoading) return;

        checkoutLocationStore.inputs.address = null;
        resetData();
      }
    );

    watch(
      () => checkoutLocationStore.inputs.address,
      () => {
        if (checkoutGeneralStore.isLoading) return;

        resetData();
      }
    );

    const cityLocation = ref(null);
    const defaultLocationModel = ref(null);

    const cityLocationChangedHandler = (newValue) => {
      if (!newValue) {
        defaultLocationModel.value = null;
        return;
      }

      if (newValue.value === defaultLocationModel.value) {
        return;
      }

      let city = checkoutLocationStore.defaultLocations.find(
        ({ value }) => value === newValue.value
      );
      if (typeof city !== "object") {
        defaultLocationModel.value = null;
        return;
      }

      defaultLocationModel.value = newValue.value;
    };

    //auto register part
    const validateAutoRegister = function () {
      const email = withI18nMessage(emailOrig);
      const required = withI18nMessage(requiredOrig);
      const sameAs = withI18nMessage(sameAsOrig, { withArguments: true });
      const rules = computed(() => ({
        email: { required, email },
        isTermsAccepted: { sameAsTerms: sameAs(true) },
      }));
      const $externalResults = ref({});
      const v$ = useVuelidate(rules, checkoutAutoRegisterStore.inputs, {
        $autoDirty: true,
        $externalResults,
        $scope: "autoRegister",
      });
      watch(
        () => checkoutAutoRegisterStore.fieldErrors,
        (newValue) => {
          $externalResults.value = newValue;
        },
        { deep: true }
      );
      return v$;
    };

    const validateLocation = function () {
      const addressRule = withI18nMessage((inputValue) => {
        return true;
        let value = parseFloat(inputValue);
        if (isNaN(value)) {
          return false;
        }
        return value > 0;
      });

      const rules = computed(() => ({
        address: { addressInteger: addressRule },
      }));

      return useVuelidate(rules, checkoutLocationStore.inputs, {
        $autoDirty: true,
        $scope: "location",
      });
    };

    const autoRegisterValidator = validateAutoRegister();
    const locationValidator = validateLocation();
    const sendRequest = async () => {
      autoRegisterValidator.value.$clearExternalResults();
      const autoRegisterValidatorResult =
        await autoRegisterValidator.value.$validate();
      const locationValidatorResult = await locationValidator.value.$validate();
      if (!autoRegisterValidatorResult || !locationValidatorResult) return;

      await process(false, "stepper-mode");
    };
    //auto register end

    const nextStep = async () => {
      event("location-next-step-button-clicked");

      const locationValidatorResult = await locationValidator.value.$validate();
      if (!locationValidatorResult) return;

      event("location-next-step-validation-passed");

      if (appStore.isAuthorized || appStore.isAuthorizedInitial) {
        checkoutGeneralStore.step = 3;
        event("location-next-step-3");
        return;
      }

      if (appStore.isAutoRegister) {
        await sendRequest();
        event("location-next-auto-register");
        return;
      }

      checkoutGeneralStore.step = 2;
      event("location-next-step-2");
    };

    const checkLocation = async () => {
      const locationValidatorResult = await locationValidator.value.$validate();
      if (!locationValidatorResult) return;

      await process(true, "location-check-result");
    };

    const isLocationValid = computed(() => {
      return (
        checkoutLocationStore.inputs.cityCode &&
        checkoutLocationStore.inputs.streetCode &&
        checkoutLocationStore.inputs.address &&
        checkoutLocationStore.score
      );
    });

    const isCanTryNextStep = computed(() => {
      return checkoutLocationStore.isCanContinue && checkoutLocationStore.score;
    });

    const isShowAutoRegisterBlock = computed(() => {
      return (
        checkoutLocationStore.isCanContinue &&
        checkoutLocationStore.score &&
        appStore.isAutoRegister &&
        !appStore.isAutoRegisterGenerateMail &&
        !appStore.isAuthorized &&
        !appStore.isAuthorizedInitial
      );
    });

    onMounted(() => {
      watch(defaultLocationModel, (newValue) => {
        let city = checkoutLocationStore.defaultLocations.find(
          ({ value }) => value === newValue
        );
        if (typeof city !== "object") {
          return;
        }
        let selectorComponent = cityLocation.value.selectorComponent;

        if (
          selectorComponent.isOptionSelected({
            label: city.label,
            value: city.value,
          })
        ) {
          return;
        }

        selectorComponent.toggleOption({
          label: city.label,
          value: city.value,
        });
        selectorComponent.blur();
      });

      watch(
        isShowAutoRegisterBlock,
        (newValue) => {
          checkoutAutoRegisterStore.inputs.isShow = newValue;
        },
        { immediate: true }
      );
    });

    const registerResult = (params) => {
      appStore.isAuthorized = params.isAuthorized;
      appStore.login = params.login;
      appStore.userId = params.userId;
      if (params.isSuccess && params.isAuthorized) {
        checkoutGeneralStore.step = 3;
        $q.notify({
          type: "info",
          icon: "mark_email_unread",
          message: t("authRegisterConfirmMailSentNotify"),
          position: "center",
          timeout: 3500,
          actions: [{ icon: "close", color: "white" }],
        });

        $q.notify({
          type: "positive",
          icon: "thumb_up",
          message: t("authRegisterSuccessNotify"),
          position: "center",
          timeout: 2000,
          actions: [{ icon: "close", color: "white" }],
        });
      }
    };

    const loginResult = (params) => {
      appStore.isAuthorized = params.isAuthorized;
      appStore.login = params.login;
      appStore.userId = params.userId;
      if (params.isSuccess && params.isAuthorized) {
        checkoutGeneralStore.step = 3;
      }
    };

    const defaultLocationSelectedEvent = function (locationCode) {
      event("default-location-selected", {
        location: checkoutLocationStore.defaultLocations.find(
          (location) => location.value === locationCode
        ),
      });
    };

    const socServAuthStore = reactive({
      isLoading: true,
      errors: [],
      googleLink: null,
      facebookLink: null,
    });

    const loadSocServAuthLinks = () => {
      socServAuthStore.isLoading = true;
      api.value
        .postSimple(
          {
            action: "load-soc-serv-services",
            backurl: window.location.pathname,
          },
          "auth"
        )
        .then(function (response) {
          if (response.data.GoogleOAuth) {
            socServAuthStore.googleLink = response.data.GoogleOAuth;
          }

          if (response.data.Facebook) {
            socServAuthStore.facebookLink = response.data.Facebook;
          }
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          socServAuthStore.isLoading = false;
        });
    };

    onMounted(() => {
      loadSocServAuthLinks();
    });

    return {
      checkoutLocationStore,
      checkoutAutoRegisterStore,
      checkoutGeneralStore,
      apiCity,
      apiStreet,
      scoreResultIconStyles,
      scoreResultIcon,
      scoreResultMarginOfErrorStyles,
      nextStep,
      process,
      defaultLocationModel,
      cityLocation,
      cityLocationChangedHandler,
      appStore,
      isLocationValid,
      isCanTryNextStep,
      termsAndConditionsHref,
      privacyPolicyHref,
      registerResult,
      loginResult,
      autoRegisterValidator,
      locationValidator,
      checkLocation,
      event,
      defaultLocationSelectedEvent,
      socServAuthStore,
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
</style>
<style scoped lang="scss">
.accept-terms-checkbox {
  color: $secondary !important;
  margin: 0 !important;
  display: flex !important;
  flex-wrap: wrap;
  align-items: center !important;
  font-size: 12px !important;
}
.accept-terms-checkbox a {
  color: $secondary !important;
}
.register-button-block {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: flex-start;
}
.register-button-block .register {
  margin-right: 1.5rem !important;
}

.terms-accept-block {
  margin: 10px 0;
}

.autoregister-block {
  display: flex;
  flex-wrap: wrap;
}

.autoregister-socserv {
  margin-left: 20px;
}
.soc-serv-buttons-title {
  margin: 2px 0 5px 0 !important;
  padding: 0 !important;
  line-height: 1 !important;
  text-align: center !important;
}
@media (max-width: 600px) {
  .autoregister-block {
    flex-direction: column;
  }
  .autoregister-socserv {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15px 0;
  }
}
@media (max-width: 520px) {
  .register-button-block {
    flex-direction: column;
    justify-content: space-around;
    align-content: space-around;
  }

  .register-button-block .register {
    margin-right: 0 !important;
  }

  .register-button-block .main-block {
    margin-bottom: 20px;
  }
}
</style>
<style>
.terms-accept-block .q-field__control-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

@media (max-width: 820px) {
  .terms-accept-block .q-field__control-container {
    align-items: flex-start !important;
  }
  .terms-accept-block .q-checkbox {
    height: 23px !important;
  }
}

@media (max-width: 520px) {
  .soc-button {
    margin-bottom: 10px;
  }
}
</style>
