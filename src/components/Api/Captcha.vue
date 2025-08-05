<template>
  <div id="g-recaptcha-block" class="g-recaptcha-block">
  </div>
</template>

<script>
import { onMounted, ref, getCurrentInstance } from 'vue';

export default {
  name: "Captcha",
  emits:['verify'],
  setup (props, context) {

    const internalInstance = getCurrentInstance()
    const loadScript = internalInstance.appContext.config.globalProperties.$loadScript
    const siteKey = '6LePDkkdAAAAAN8C_qCMpIbzS4N_TdEh4aCrcYOj'
    const widgetId = ref(0)

    const execute = async () => {
      await window.grecaptcha.execute(widgetId.value)
    }

    const reset = async () => {
      await window.grecaptcha.reset(widgetId.value)
    }

    const render = () => {
      if (window.grecaptcha) {
        widgetId.value = window.grecaptcha.render('g-recaptcha-block', {
          sitekey: siteKey,
          size: 'invisible',
          callback: async (response) => {
            await reset()
            context.emit('verify', response)
          },
          'expired-callback': () => {
            alert('Expired: Please, reload page and try once more')
          },
          'error-callback': () => {
            alert('Error: Please, reload page and try once more')
          }
        })
    }}

    onMounted( () => {
      loadScript("https://www.google.com/recaptcha/api.js")
        .then(() => {
          window.grecaptcha.ready(() => {render()})
        })
        .catch((e) => {
          console.error(e)
        });
    })

    return {
      execute,
      reset
    }
  }
}
</script>

<style scoped>

</style>
