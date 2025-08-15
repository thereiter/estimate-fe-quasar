<template>
  <transition name="slide-fade" mode="out-in">
    <div v-if="showForgotPassword" key="forgot-password-form">
      <ForgotPassword>
        <template v-slot:back-button>
          <q-btn
            @forgot-password-result="$emit('forgot-password-result', $event)"
            @click="showForgotPassword = false"
            size="12px"
            class="float-right vertical-bottom"
            flat
            color="primary"
            :label="$t('authForgotPasswordStepGoBackButton')"
          />
        </template>
      </ForgotPassword>
    </div>
    <div v-else key="login-form">
      <q-form @submit="sendRequest" class="q-gutter-md">
        <q-input
          autocomplete="email"
          filled
          v-model="data.email"
          label="E-mail *"
          :hint="$t('authLoginWorkingEmailAddressHint')"
          lazy-rules
          :bottom-slots="true"
          :error="v$.email.$errors.length > 0"
          name="email"
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

        <q-input
          autocomplete="new-password"
          filled
          type="password"
          v-model="data.password"
          :label="$t('passwordPlaceholder') + ' *'"
          :error="v$.password.$errors.length > 0"
          :hint="$t('authLoginWorkingPasswordHint')"
          :bottom-slots="true"
          lazy-rules
          name="new-password"
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

        <div>
          <div v-if="errors.length > 0" class="text-negative">
            <p v-for="(error, index) in errors" :key="index">
              {{ error }}
            </p>
          </div>
          <div class="row login-button-block">
            <div class="login-forgot-button-block">
              <div class="self-center">
                <q-btn
                  :label="$t('authLoginLoginButtonLabel')"
                  :loading="isLoading"
                  type="submit"
                  color="primary min-width-125"
                />
              </div>
              <div>
                <q-btn
                  @click="showForgotPassword = true"
                  size="10px"
                  class="float-right q-mt-sm vertical-bottom min-width-125"
                  flat
                  color="primary"
                  :label="$t('authLoginForgotPasswordButtonLabel')"
                />
              </div>
            </div>
            <div>
              <!--              <SocServButtons-->
              <!--                :facebook-link="facebookSocServLink"-->
              <!--                :google-link="googleSocServLink"-->
              <!--                :errors="errorsSocServ"-->
              <!--              ></SocServButtons>-->
            </div>
          </div>
        </div>
      </q-form>
    </div>
  </transition>
</template>

<script>
import { ref, reactive, computed, unref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { useI18n } from 'vue-i18n';
import { email as emailOrig, required as requiredOrig } from '@vuelidate/validators';
import { createI18nMessage } from '@vuelidate/validators';
import ForgotPassword from 'components/Auth/ForgotPassword.vue';
import SocServButtons from 'components/Auth/SocServButtons.vue';

export default {
  name: 'Login',
  emits: ['login-result'],
  components: {
    ForgotPassword,
  },
  setup(props, context) {
    const { t } = useI18n({});
    const withI18nMessage = createI18nMessage({ t });

    const isLoading = ref(false);
    const isSuccess = ref(null);
    const isAuthorized = ref(null);
    const userId = ref(null);
    const login = ref(null);

    const data = reactive({
      email: null,
      password: null,
    });

    const showForgotPassword = ref(false);

    const errors = ref([]);
    const required = withI18nMessage(requiredOrig);
    const email = withI18nMessage(emailOrig);

    const rules = computed(() => ({
      email: { required, email },
      password: { required },
    }));

    const $externalResults = ref({});
    const v$ = useVuelidate(rules, data, {
      $autoDirty: true,
      $externalResults,
    });

    const sendRequest = async () => {
      // v$.value.$clearExternalResults();
      // errors.value = [];
      // const result = await v$.value.$validate();
      // if (!result) return;
      //
      // isLoading.value = true;
      // props.api
      //   .post(
      //     {
      //       action: "login",
      //       inputs: data,
      //     },
      //     "auth",
      //     true
      //   )
      //   .then(function (response) {
      //     $externalResults.value = response.data.fieldErrors;
      //     errors.value = response.data.errors;
      //
      //     isSuccess.value = response.data.isSuccess;
      //     isAuthorized.value = response.data.isAuthorized;
      //     userId.value = response.data.userId;
      //     login.value = response.data.login;
      //
      //     context.emit("login-result", {
      //       isSuccess: isSuccess.value,
      //       isAuthorized: isAuthorized.value,
      //       userId: userId.value,
      //       login: login.value,
      //     });
      //   })
      //   .catch((e) => {
      //     console.error(e);
      //     window.location.reload();
      //   })
      //   .finally(() => {
      //     isLoading.value = false;
      //   });
    };

    return {
      isLoading,
      errors,
      data,
      v$,
      showForgotPassword,
      sendRequest,
    };
  },
};
</script>

<style scoped>
.min-width-125 {
  min-width: 125px;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter {
  transform: translateX(100px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}
</style>
<style scoped>
.login-button-block {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: flex-start;
}
.login-forgot-button-block {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  margin-right: 1.5rem !important;
}

@media (max-width: 520px) {
  .login-button-block {
    flex-direction: column;
    justify-content: space-around;
    align-content: space-around;
  }

  .login-forgot-button-block {
    margin-right: 0 !important;
  }

  .login-forgot-button-block {
    margin-bottom: 10px;
  }
}
</style>
