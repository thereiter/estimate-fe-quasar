<template>
  <q-form>
    <q-input
        filled
        type="text"
        v-model="pinCode"
        :label="$t('emailConfirmPinCodeLabel')"
        :hint="$t('emailConfirmPinCodeHint')"
        lazy-rules
        :bottom-slots="true"
        hide-bottom-space
        :error="v$.pinCode.$errors.length > 0"
    >
      <template v-slot:prepend>
        <q-icon name="badge" />
      </template>
      <template v-slot:error>
        <div v-if="v$.pinCode.$errors.length === 1">
              <span>
                {{v$.pinCode.$errors[0].$message}}
              </span>
        </div>
        <div v-else>
              <span v-for="error of v$.pinCode.$errors" :key="error.$uid">
              {{ error.$message }};
              </span>
        </div>
      </template>
    </q-input>
    <q-banner v-if="messages.length > 0" :class="['text-white', 'q-mt-sm', 'bg-'+message.type]" v-for="(message, index) in messages" :key="index">
        <p>
          {{ message.text }}
        </p>
    </q-banner>
    <div class="fit row wrap justify-start items-start content-start">
      <div class="q-pr-sm q-pt-sm">
        <q-btn :label="$t('emailConfirmConfirmButton')" :loading="isLoading" @click.prevent="sendConfirm" type="button" color="primary"/>
      </div>
      <div class="q-pr-sm q-pt-sm">
        <q-btn :label="$t('emailConfirmSendEmailButton')" :loading="isLoading" @click.prevent="sendEmail" type="button" color="secondary"/>
      </div>
      <div class="q-pt-sm">
        <q-btn :label="$t('emailConfirmConfirmedByLinkButton')" :loading="isLoading" @click.prevent="sendCheckState" type="button" color="accent"/>
      </div>
    </div>

  </q-form>
</template>

<script>
import { defineComponent, ref, inject, computed, watch } from 'vue';
import { useQuasar } from 'quasar'
import { useI18n } from "vue-i18n";
import { useVuelidate } from '@vuelidate/core'
import { required as requiredOrig, minLength as minLengthOrig, maxLength as maxLengthOrig } from '@vuelidate/validators'
import { createI18nMessage } from '@vuelidate/validators'

export default defineComponent({
  name: 'EmailConfirm',
  emits:['success-confirm', 'already-confirmed'],
  setup(props, context) {
    const api       = inject('api')
    const $q        = useQuasar()
    const {t}       = useI18n({})

    const pinCode = ref(null)
    const fieldErrors = ref([])
    const messages = ref([])

    const withI18nMessage = createI18nMessage({ t })
    const required = withI18nMessage(requiredOrig)
    const minLength = withI18nMessage(minLengthOrig, { withArguments: true })
    const maxLength = withI18nMessage(maxLengthOrig, { withArguments: true })

    const rules = computed(() => ({
      pinCode: { required:required, pinCodeMinLength: minLength(6), pinCodeMaxLength: maxLength(6) },
    }))
    const $externalResults = ref({})
    const v$ = useVuelidate(rules, { pinCode }, { $autoDirty:true, $externalResults })
    watch(() => fieldErrors, (newValue) => {$externalResults.value = newValue}, {deep:true})

    const isLoading = ref(false)

    const sendConfirm = () => { sendRequest({
      action:'confirm',
      data:{ pinCode:pinCode.value }
    }, false, true) }
    const sendCheckState = () => { sendRequest({ action:'checkState' }, false, false) }
    const sendEmail = () => { sendRequest({ action:'sendEmail' }, true, false) }
    const updateData = (response) => {
      messages.value = response.data.messages
      if(response.data.successConfirm)
      {
        context.emit('success-confirm', {actualEmail:response.data.actualEmail})
      }
      else if(response.data.alreadyConfirmed)
      {
        context.emit('already-confirmed', {actualEmail:response.data.actualEmail})
      }
    }

    const sendRequest = async (payload, useCaptcha = false, checkForm = true) => {
      messages.value = []
      if(checkForm)
      {
        v$.value.$clearExternalResults()
        const result = await v$.value.$validate()
        if(!result) { return }
      }

      const request = new Promise(resolve => {
        isLoading.value = true
        let post = useCaptcha ? api.value.post(payload, 'emailConfirm', true) : api.value.postSimple(payload, 'emailConfirm')
        post.then(function (response)
        {
          updateData(response)
        }).catch((e) => {
          console.error(e)
          $q.notify({
            multiLine:true,
            type:'negative',
            icon:'upload',
            message:t('networkUnknownError'),
            position:'center',
            timeout:5000,
            actions: [{ icon: 'close', color: 'white' }]
          })
        })
            .finally(() => {
              isLoading.value = false
              resolve()
            })
      })

      request.then(() => {
        if(checkForm)
          v$.value.$touch()
      })
    }

    return {
      sendRequest,
      messages,
      pinCode,
      isLoading,
      v$,
      sendConfirm,
      sendEmail,
      sendCheckState
    }
  }
})
</script>
