<template>
  <q-form @submit="sendRequest" class="q-gutter-md">
    <q-input
      autocomplete="email"
      filled
      v-model="data.email"
      label="E-mail *"
      :hint="$t('enterWorkingEmailAddress')"
      lazy-rules
      :bottom-slots="true"
      :error="v$.email.$errors.length > 0"
    >
      <template v-slot:prepend>
        <q-icon name="email" />
      </template>
      <template v-slot:error>
        <div style="display: flex; align-items: center">
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
          <q-btn
            v-if="showSwitchToLoginHref"
            flat
            dense
            color="primary"
            class="q-pd-0 q-ma-0"
            size="sm"
            icon="login"
            @click="switchToLogin"
            style="min-width: 60px"
            >Увійти</q-btn
          >
        </div>
      </template>
    </q-input>

    <q-input
      autocomplete="new-password"
      filled
      type="password"
      v-model="data.password"
      :label="$t('passwordPlaceholder') + ' *'"
      :error="v$.password.$errors.length > 0"
      :bottom-slots="true"
      lazy-rules
    >
      <template v-slot:prepend>
        <q-icon name="password" />
      </template>
      <template v-slot:error>
        <div v-if="v$.password.$errors.length === 1">
          <span>
            {{ v$.password.$errors[0].$message }}
          </span>
        </div>
        <div v-else>
          <span v-for="error of v$.password.$errors" :key="error.$uid">
            {{ error.$message }};
          </span>
        </div>
      </template>
    </q-input>

    <q-input
      autocomplete="new-password"
      filled
      type="password"
      v-model="data.passwordConfirm"
      :label="$t('passwordConfirmPlaceholder') + ' *'"
      lazy-rules
      :bottom-slots="true"
      :error="v$.passwordConfirm.$errors.length > 0"
    >
      <template v-slot:prepend>
        <q-icon name="password" />
      </template>
      <template v-slot:error>
        <div v-if="v$.passwordConfirm.$errors.length === 1">
          <span>
            {{ v$.passwordConfirm.$errors[0].$message }}
          </span>
        </div>
        <div v-else>
          <span v-for="error of v$.passwordConfirm.$errors" :key="error.$uid">
            {{ error.$message }};
          </span>
        </div>
      </template>
    </q-input>

    <div class="terms-accept-block">
      <q-scroll-area style="height: 70px; margin-top: 10px;" :visible="true">
        <q-field
            dense
            isTermsAccepted
            :error="v$.isTermsAccepted.$errors.length > 0"
        >
          <q-checkbox
              v-model="data.isTermsAccepted"
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
            >політикої обробки моїх персональних даних</a>&nbsp;та погоджусь з&nbsp;
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
          <span v-for="error of v$.isTermsAccepted.$errors" :key="error.$uid">
            {{ error.$message }};
          </span>
            </div>
          </template>
        </q-field>
      </q-scroll-area>
    </div>

    <div v-if="errors.length > 0" class="text-negative">
      <p v-for="(error, index) in errors" :key="index">
        {{ error }}
      </p>
    </div>
    <div class="row register-button-block">
      <div class="self-center">
        <q-btn
          :label="$t('registerButtonText')"
          type="submit"
          :loading="isLoading"
          color="primary"
          class="register"
        />
      </div>
      <div>
        <SocServButtons
          :facebook-link="facebookSocServLink"
          :google-link="googleSocServLink"
          :errors="errorsSocServ"
        ></SocServButtons>
      </div>
    </div>
  </q-form>
</template>

<script>
import { ref, reactive, computed, inject } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { useI18n } from "vue-i18n";
import {
  email as emailOrig,
  required as requiredOrig,
  sameAs as sameAsOrig,
  minLength as minLengthOrig,
} from "@vuelidate/validators";
import { createI18nMessage } from "@vuelidate/validators";
import SocServButtons from "components/Auth/SocServButtons.vue";

export default {
  name: "Register",
  props: {
    api: {
      required: true,
      type: Object,
    },
    googleSocServLink: {
      type: String,
    },
    facebookSocServLink: {
      type: String,
    },
    errorsSocServ: {
      type: Array,
    },
  },
  components: { SocServButtons },
  emits: ["register-result", "switch-to-login"],
  setup(props, context) {
    const { t } = useI18n({});
    const withI18nMessage = createI18nMessage({ t });
    const termsAndConditionsHref = inject("termsAndConditionsHref");
    const privacyPolicyHref = inject("privacyPolicyHref");
    const isLoading = ref(false);
    const isSuccess = ref(null);
    const isAuthorized = ref(null);
    const userId = ref(null);
    const login = ref(null);

    const data = reactive({
      email: null,
      password: null,
      passwordConfirm: null,
      isTermsAccepted: true,
    });

    const errors = ref([]);
    const required = withI18nMessage(requiredOrig);
    const minLength = withI18nMessage(minLengthOrig, { withArguments: true });
    const email = withI18nMessage(emailOrig);
    const sameAs = withI18nMessage(sameAsOrig, { withArguments: true });

    const rules = computed(() => ({
      email: { required, email },
      password: { required, passwordMinLength: minLength(6) },
      passwordConfirm: { required, sameAsPassword: sameAs(data.password) },
      isTermsAccepted: { sameAsTerms: sameAs(true) },
    }));

    const $externalResults = ref({});
    const v$ = useVuelidate(rules, data, {
      $autoDirty: true,
      $externalResults,
    });

    const isPureObject = function (input) {
      return (
        null !== input &&
        typeof input === "object" &&
        Object.getPrototypeOf(input).isPrototypeOf(Object)
      );
    };

    const showSwitchToLoginHref = ref(false);
    const sendRequest = async () => {
      v$.value.$clearExternalResults();
      showSwitchToLoginHref.value = false;
      errors.value = [];
      const result = await v$.value.$validate();
      if (!result) return;

      isLoading.value = true;
      props.api
        .post(
          {
            action: "register",
            inputs: data,
          },
          "auth",
          true
        )
        .then(function (response) {
          let fieldErrors = response.data.fieldErrors;

          if (
            isPureObject(fieldErrors) &&
            fieldErrors.hasOwnProperty("email") &&
            Array.isArray(fieldErrors.email)
          ) {
            //todo: fix this
            let emailExistsErrorIndex = fieldErrors.email.findIndex((error) =>
              error.includes("Такий E-mail вже зарєестрован на сайті")
            );
            if (emailExistsErrorIndex !== -1) {
              showSwitchToLoginHref.value = true;
            }
          }

          $externalResults.value = fieldErrors;

          errors.value = response.data.errors;

          isSuccess.value = response.data.isSuccess;
          isAuthorized.value = response.data.isAuthorized;
          userId.value = response.data.userId;
          login.value = response.data.login;

          context.emit("register-result", {
            isSuccess: isSuccess.value,
            isAuthorized: isAuthorized.value,
            userId: userId.value,
            login: login.value,
          });
        })
        .catch((e) => {
          console.error(e);
          throw e;
        })
        .finally(() => {
          isLoading.value = false;
        });
    };

    const switchToLogin = () => {
      context.emit("switch-to-login");
    };

    return {
      isLoading,
      errors,
      data,
      sendRequest,
      termsAndConditionsHref,
      privacyPolicyHref,
      v$,
      showSwitchToLoginHref,
      switchToLogin,
    };
  },
};
</script>
<style scoped lang="scss">
.accept-terms-checkbox {
  color: $secondary !important;
  margin: 0 !important;
  display: flex !important;
  flex-wrap: wrap;
  align-items: center !important;
  font-size:12px !important;
}
.accept-terms-checkbox a {
  color: $secondary !important;
}
.register-button-block{
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: flex-start;
}
.register-button-block .register{
  margin-right: 1.5rem!important;
}

@media (max-width: 520px) {
  .register-button-block{
    flex-direction: column;
    justify-content: space-around;
    align-content: space-around;
  }

  .register-button-block .register{
    margin-right: 0 !important;
  }

  .register-button-block .main-block{
    margin-bottom: 20px;
  }
  .mw-250.main-block{
    margin-top:20px;
  }
}
</style>
<style>
.terms-accept-block .q-field__control-container{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

@media (max-width: 820px) {
  .terms-accept-block .q-field__control-container{
    align-items: flex-start !important;
  }
  .terms-accept-block .q-checkbox{
    height:23px !important;
  }
}

@media (max-width: 520px) {
  .soc-button {
    margin-bottom: 10px;
  }
}
</style>
