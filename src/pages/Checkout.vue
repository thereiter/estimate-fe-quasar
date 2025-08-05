<template>
  <CheckoutHeader :mode="mode" @update:mode="changeMode"></CheckoutHeader>
  <router-view></router-view>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { watchEffect } from "vue";
import CheckoutHeader from "components/CheckoutAlternative/CheckoutHeader.vue";

export default defineComponent({
  name: "Checkout",
  components: { CheckoutHeader },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const routeName = ref(route.name);

    watchEffect(() => {
      routeName.value = route.name;
    });

    const changeMode = (mode) => {
      router.push({ name: mode });
    };
    return {
      mode: routeName,
      changeMode,
    };
  },
});
</script>
