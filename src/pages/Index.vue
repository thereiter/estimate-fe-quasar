<template>
  <div></div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Index',
  setup(){
    const router = useRouter()
    router.push({'name':'checkout'})
  }
})
</script>
