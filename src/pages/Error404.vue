<template>
  <div></div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Error404',
  created: function() {
    const router = useRouter()
    router.push({'name':'flat-sale'})
  }
})
</script>
