<template>
  <div v-if="showAuthStep">
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
          :error="v$.email.$errors.length > 0"
        >
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
          <template v-slot:error>
            <div v-if="v$.email.$errors.length === 1">
              <span>
                {{ v$.email.$errors[0].$message }}
              </span>
            </div>
            <div v-else>
              <span v-for="error of v$.email.$errors" :key="error.$uid">
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
      <div class="terms-accept-block" v-if="!hideTerms">
        <q-scroll-area style="height: 53px" :visible="true">
          <q-field
            dense
            isTermsAccepted
            :error="v$.isTermsAccepted.$errors.length > 0"
            hide-bottom-space
          >
            <q-checkbox
              v-model="checkoutAutoRegisterStore.inputs.isTermsAccepted"
              color="primary"
              @click="v$.isTermsAccepted.$touch"
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
              <div v-if="v$.isTermsAccepted.$errors.length === 1">
                <span>
                  {{ v$.isTermsAccepted.$errors[0].$message }}
                </span>
              </div>
              <div v-else>
                <span
                  v-for="error of v$.isTermsAccepted.$errors"
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
</template>

<script>
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import AuthComplex from "components/Auth/AuthComplex.vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { event } from "vue-gtag";
import {
  createI18nMessage,
  email as emailOrig,
  required as requiredOrig,
  sameAs as sameAsOrig,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import SocServButtons from "components/Auth/SocServButtons.vue";

export default defineComponent({
  name: "AuthStep",
  components: {
    SocServButtons,
    AuthComplex,
  },
  props: {
    hideTerms: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const appStore = inject("appStore");
    const checkoutGeneralStore = inject("checkoutGeneralStore");
    const checkoutAutoRegisterStore = inject("checkoutAutoRegisterStore");
    const loadState = inject("loadState");
    const termsAndConditionsHref = inject("termsAndConditionsHref");
    const privacyPolicyHref = inject("privacyPolicyHref");
    const api = inject("api");
    const $q = useQuasar();
    const { t } = useI18n({});
    const withI18nMessage = createI18nMessage({ t });

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

    const registerResult = (params) => {
      appStore.isAuthorized = params.isAuthorized;
      appStore.login = params.login;
      appStore.userId = params.userId;
      if (params.isSuccess && params.isAuthorized) {
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
        loadState().then(() => {
          $q.notify({
            type: "positive",
            icon: "thumb_up",
            message: t("authLoginSuccessNotify"),
            position: "center",
            timeout: 2000,
            actions: [{ icon: "close", color: "white" }],
          });
        });
      }
    };

    const showAuthStep = computed(() => {
      return !appStore.isAuthorizedInitial && !appStore.isAuthorized;
    });

    const email = withI18nMessage(emailOrig);
    const required = withI18nMessage(requiredOrig);
    const sameAs = withI18nMessage(sameAsOrig, { withArguments: true });
    const rules = computed(() => ({
      email: { required, email },
      isTermsAccepted: { sameAsTerms: sameAs(true) },
    }));

    const externalResults$ = ref({});
    const v$ = useVuelidate(rules, checkoutAutoRegisterStore.inputs, {
      $autoDirty: true,
      $externalResults: externalResults$,
      $scope: false,
      $stopPropagation: true,
    });

    watch(
      () => checkoutAutoRegisterStore.fieldErrors,
      (newValue) => {
        externalResults$.value = newValue;
      },
      { deep: true }
    );

    const validate = async function () {
      if (!showAuthStep.value) {
        return true;
      }

      return await v$.value.$validate();
    };

    return {
      appStore,
      checkoutGeneralStore,
      registerResult,
      loginResult,
      checkoutAutoRegisterStore,
      validate,
      event,
      socServAuthStore,
      termsAndConditionsHref,
      privacyPolicyHref,
      showAuthStep,
      v$,
      externalResults$,
      hideTerms: props.hideTerms,
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
    margin: 0 0 10px 0;
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
