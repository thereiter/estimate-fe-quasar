<template>
      <q-form
        @submit="sendRequest"
        class="q-gutter-md"
      >
        <div class="text-h6">{{ $t('authForgotPasswordBlockTitle') }}</div>
        <transition name="slide-fade" mode="out-in">
          <div v-if="!isSuccess">
            <q-input
              autocomplete="email"
              filled
              v-model="data.email"
              label="E-mail *"
              :hint="$t('authLoginWorkingEmailAddressHint')"
              lazy-rules
              :bottom-slots="true"
              :error="v$.email.$errors.length > 0"
            >
              <template v-slot:error>
                <div v-if="v$.email.$errors.length === 1">
                      <span>
                        {{v$.email.$errors[0].$message}}
                      </span>
                </div>
                <div v-else>
                      <span v-for="error of v$.email.$errors" :key="error.$uid">
                      {{ error.$message }};
                      </span>
                </div>
              </template>
            </q-input>
            <div class="q-pa-md">
              <div v-if="errors.length > 0" class="text-negative">
                <p v-for="(error, index) in errors" :key="index">
                  {{ error }}
                </p>
              </div>
              <div class="row">
                <div class="col">
                  <q-btn :label="$t('authForgotPasswordSendMailButton')" :loading="isLoading" type="submit" color="primary"/>
                </div>
                <div class="col">
                  <slot name="back-button"></slot>
                </div>
              </div>
            </div>
          </div>
          <div v-else:>
            {{ $t('authForgotPasswordSendMailSuccess') }}
            <div class="col">
              <slot name="back-button"></slot>
            </div>
          </div>
        </transition>
      </q-form>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { useI18n } from "vue-i18n";
import { email as emailOrig, required as requiredOrig } from '@vuelidate/validators'
import { createI18nMessage } from '@vuelidate/validators'

export default {
  name: 'ForgotPassword',
  props:{
    api:{
      required:true,
      type:Object
    }
  },
  emits:['forgot-password-result'],
  setup (props, context) {
    const {t} = useI18n({})
    const withI18nMessage = createI18nMessage({ t })

    const isLoading = ref(false)
    const isSuccess = ref(null)

    const data = reactive({
      email:null
    })

    const errors = ref([])
    const required = withI18nMessage(requiredOrig)
    const email = withI18nMessage(emailOrig)

    const rules = computed(() => ({
      email: { required, email }
    }))

    const $externalResults = ref({})
    const v$ = useVuelidate(rules, data, { $autoDirty:true, $externalResults })

    const sendRequest = async () => {
      v$.value.$clearExternalResults()
      errors.value = []
      const result = await v$.value.$validate()
      if(!result)
        return

      isLoading.value = true;
      props.api.post({
        action:'forgot-password',
        inputs:data,
      }, 'auth', true).then(function (response)
      {

        $externalResults.value = response.data.fieldErrors;
        errors.value = response.data.errors;

        isSuccess.value = response.data.isSuccess;

        context.emit('forgot-password-result', {
          isSuccess: isSuccess.value
        })
      }).catch((e) => {
        console.error(e)
        window.location.reload()
      })
        .finally(() => {
          isLoading.value = false
        })
    }

    return {
      isLoading,
      errors,
      isSuccess,
      data,
      sendRequest,
      v$
    }
  }
}
</script>
