<template>
  <q-form
      class="q-gutter-md q-pa-md"
      v-if="data.init"
  >
    <q-input
        filled
        type="text"
        v-model="data.inputs.name"
        :label="$t('profileNameLabel')"
        :hint="$t('profileNameHint')"
        lazy-rules
        :bottom-slots="true"
        :error="v$.name.$errors.length > 0"
    >
      <template v-slot:prepend>
        <q-icon name="badge" />
      </template>
      <template v-slot:error>
        <div v-if="v$.name.$errors.length === 1">
              <span>
                {{v$.name.$errors[0].$message}}
              </span>
        </div>
        <div v-else>
              <span v-for="error of v$.name.$errors" :key="error.$uid">
              {{ error.$message }};
              </span>
        </div>
      </template>
    </q-input>
    <q-input
        filled
        type="text"
        v-model="data.inputs.lastName"
        :label="$t('profileLastNameLabel')"
        :hint="$t('profileLastNameHint')"
        lazy-rules
        :bottom-slots="true"
        :error="v$.lastName.$errors.length > 0"
    >
      <template v-slot:prepend>
        <q-icon name="badge" />
      </template>
      <template v-slot:error>
        <div v-if="v$.lastName.$errors.length === 1">
              <span>
                {{v$.lastName.$errors[0].$message}}
              </span>
        </div>
        <div v-else>
              <span v-for="error of v$.lastName.$errors" :key="error.$uid">
              {{ error.$message }};
              </span>
        </div>
      </template>
    </q-input>
    <q-input
        filled
        type="email"
        v-model="data.inputs.email"
        :label="$t('profileEmailLabel') + ' *'"
        :hint="$t('profileEmailHint')"
        lazy-rules
        :bottom-slots="true"
        :error="v$.email.$errors.length > 0"
        :readonly="data.inputs.newEmail.length > 0"
        hide-bottom-space
    >
      <template v-slot:prepend>
        <q-icon name="email" />
      </template>
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
    <q-input
        v-if="showNewEmail"
        filled
        type="email"
        v-model="data.inputs.newEmail"
        :label="$t('profileNewEmailLabel') + ' *'"
        :hint="$t('profileNewEmailHint')"
        lazy-rules
        :bottom-slots="true"
        :error="v$.newEmail.$errors.length > 0"
        hide-bottom-space
    >
      <template v-slot:prepend>
        <q-icon name="email" />
      </template>
      <template v-slot:error>
        <div v-if="v$.newEmail.$errors.length === 1">
              <span>
                {{v$.newEmail.$errors[0].$message}}
              </span>
        </div>
        <div v-else>
              <span v-for="error of v$.newEmail.$errors" :key="error.$uid">
              {{ error.$message }};
              </span>
        </div>
      </template>
    </q-input>
    <EmailConfirm
        v-if="data.inputs.newEmail.length > 0 || !data.emailConfirmed"
        @success-confirm="showEmailSuccessConfirmed"
        @already-confirmed="showEmailAlreadyConfirmed"
    ></EmailConfirm>
    <q-input
        filled
        type="text"
        v-model="data.inputs.phone"
        :label="$t('profilePhoneLabel')"
        :hint="$t('profilePhoneHint')"
        lazy-rules
        mask="+38 (###) ### - ## - ##"
        unmasked-value
        :bottom-slots="true"
        :error="v$.phone.$errors.length > 0"
    >
      <template v-slot:prepend>
        <q-icon name="phone_iphone" />
      </template>
      <template v-slot:error>
        <div v-if="v$.phone.$errors.length === 1">
              <span>
                {{v$.phone.$errors[0].$message}}
              </span>
        </div>
        <div v-else>
              <span v-for="error of v$.phone.$errors" :key="error.$uid">
              {{ error.$message }};
              </span>
        </div>
      </template>
    </q-input>
    <q-input
        filled
        type="password"
        v-model="data.inputs.password"
        :label="$t('passwordPlaceholder')"
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
                  {{v$.password.$errors[0].$message}}
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
        v-model="data.inputs.passwordConfirm"
        :label="$t('passwordConfirmPlaceholder')"
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
                {{v$.passwordConfirm.$errors[0].$message}}
              </span>
        </div>
        <div v-else>
              <span v-for="error of v$.passwordConfirm.$errors" :key="error.$uid">
              {{ error.$message }};
              </span>
        </div>
      </template>
    </q-input>
    <q-banner v-if="saveError" class="text-white bg-negative">
      Ошибка сохранения
      <div v-if="data.errors.length > 0" class="text-white">
        <p v-for="(error, index) in data.errors" :key="index">
          {{ error }}
        </p>
      </div>
    </q-banner>
    <q-banner v-if="saveSuccess" class="text-white bg-positive">
      Успішно збережено
    </q-banner>
    <q-btn :label="$t('profileSaveButton')" :loading="isLoading" type="button" @click.prevent="sendRequest" color="primary"/>
  </q-form>
</template>

<script>
import { inject, onMounted, ref, reactive, computed, watch, nextTick } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from "vue-i18n";
import { useVuelidate } from '@vuelidate/core'
import { required as requiredOrig, email as emailOrig, sameAs as sameAsOrig, minLength as minLengthOrig, maxLength as maxLengthOrig } from '@vuelidate/validators'
import { createI18nMessage } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import EmailConfirm from "components/Personal/EmailConfirm.vue";

export default {
  name: 'Profile',
  components:{
    EmailConfirm
  },
  setup () {
    const appStore  = inject('appStore')
    const api       = inject('api')
    const $q        = useQuasar()
    const {t}       = useI18n({})
    const router    = useRouter()

    const data = reactive({
      init:false,
      isAuthorized:false,
      emailConfirmed:false,
      userId:0,
      login:null,
      errors:[],
      fieldErrors:[],
      inputs:{
        name:null,
        lastName:null,
        phone:null,
        email:null,
        newEmail:null,
        password:null,
        passwordConfirm:null,
      }
    })

    const withI18nMessage = createI18nMessage({ t })
    const required = withI18nMessage(requiredOrig)
    const email = withI18nMessage(emailOrig)
    const minLength = withI18nMessage(minLengthOrig, { withArguments: true })
    const maxLength = withI18nMessage(maxLengthOrig, { withArguments: true })
    const sameAs = withI18nMessage(sameAsOrig, { withArguments: true })

    const rules = computed(() => ({
      name: { nameMaxLength: maxLength(50) },
      lastName: { lastNameMaxLength: maxLength(50) },
      phone: { phoneMaxLength: maxLength(10), phoneMinLength: minLength(10) },
      email: { required, email },
      newEmail: { email },
      password: { passwordMinLength: minLength(6) },
      passwordConfirm: { sameAsPassword:sameAs(data.inputs.password) },
    }))

    const $externalResults = ref({})
    const v$ = useVuelidate(rules, data.inputs, { $autoDirty:true, $externalResults, $scope:false })
    watch(() => data.fieldErrors, (newValue) => {$externalResults.value = newValue}, {deep:true})
    const showNewEmail = ref(false)
    const updateData = (response) => {
      data.isAuthorized = response.isAuthorized
      data.emailConfirmed = response.emailConfirmed
      data.userId = response.userId
      data.login = response.login
      data.errors = response.errors
      data.fieldErrors = response.fieldErrors
      data.inputs.name = response.name
      data.inputs.lastName = response.lastName
      data.inputs.email = response.email
      data.inputs.newEmail = response.newEmail
      data.inputs.phone = response.phone
      showNewEmail.value = response.newEmail.length > 0
    }

    const applyConfirmedEmailData = (actualEmail = '') => {
      data.inputs.newEmail = ''
      data.emailConfirmed = true
      showNewEmail.value = false
      if(actualEmail.length > 0)
        data.inputs.email = actualEmail
    }

    const showEmailAlreadyConfirmed = (data) => {
      $q.notify({
        multiLine:true,
        type:'info',
        icon:'info',
        message:t('emailConfirmAlreadyConfirmed'),
        position:'center',
        timeout:5000,
        actions: [{ icon: 'close', color: 'white' }]
      })
      applyConfirmedEmailData(data.actualEmail)
    }

    const showEmailSuccessConfirmed = (data) => {
      $q.notify({
        multiLine:true,
        type:'positive',
        icon:'info',
        message:t('emailConfirmSuccessConfirmed'),
        position:'center',
        timeout:5000,
        actions: [{ icon: 'close', color: 'white' }]
      })
      applyConfirmedEmailData(data.actualEmail)
    }

    const isLoading = ref(false)
    const saveError = ref(false)
    const saveSuccess = ref(false)

    const loadState = () => {
      return new Promise(resolve => {
        appStore.isLoading = true;
        api.value.postSimple({
          action:'standalone-state',
        }, 'profile').then(function (response)
        {
          if(!response.data.isAuthorized)
          {
              router.push({'name':'auth'})
              return
          }
          updateData(response.data)
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
              appStore.isLoading = false
              resolve()
            })
      })
    }

    onMounted(() => {
      loadState().finally(() => {
        data.init = true
      })
    })

    const scrollToError = () => {
      nextTick(() => {
        let firstError = document.querySelector('.q-field--error');
        if(!firstError)
          return

        let domRect = firstError.getBoundingClientRect();
        window.scrollTo(
            domRect.left + document.documentElement.scrollLeft,
            domRect.top + document.documentElement.scrollTop
        );
      })
    }

    const sendRequest = async () => {
      v$.value.$clearExternalResults()
      saveError.value = false
      saveSuccess.value = false
      const result = await v$.value.$validate()
      if(!result)
      {
        scrollToError()
        return
      }
      const request = new Promise(resolve => {
        appStore.isLoading = true
        isLoading.value = true
        api.value.postSimple({
          action:'save',
          data:data.inputs
        }, 'profile').then(function (response)
        {
          if(!response.data.isAuthorized)
          {
            router.push({'name':'auth'})
            return
          }
          updateData(response.data)
          if(response.data.isSuccess)
          {
            saveSuccess.value = true
            saveError.value = false
            data.inputs.password = null
            data.inputs.passwordConfirm = null
          }
          else
          {
            saveSuccess.value = false
            saveError.value = true
          }

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
              appStore.isLoading = false
              isLoading.value = false
              resolve()
            })
      })

      request.then(() => {v$.value.$touch()}).finally(() => {scrollToError()})
    }

    return {
      appStore,
      sendRequest,
      data,
      v$,
      isLoading,
      saveError,
      saveSuccess,
      showNewEmail,
      showEmailAlreadyConfirmed,
      showEmailSuccessConfirmed
    }
  }
}
</script>
