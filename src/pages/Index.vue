<template>
  <div>the first page here</div>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useTemplateGlobals } from 'stores/template-globals';

export default defineComponent({
  name: 'Index',
  setup() {
    const templateGlobalsState = useTemplateGlobals();
    // function loadData() {
    //   api
    //     .get('/users')
    //     .then((response) => {
    //       console.log(response);
    //       console.log(response.data);
    //       data.value = response.data;
    //     })
    //     .catch(() => {
    //       $q.notify({
    //         color: 'negative',
    //         position: 'top',
    //         message: 'Loading failed',
    //         icon: 'report_problem',
    //       });
    //     });
    // }
    //loadData();
  },
});
</script>
