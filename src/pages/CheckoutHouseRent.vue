<template>
  <CheckoutIndex :mode="mode"></CheckoutIndex>
</template>

<script>
import { defineComponent } from "vue";
import CheckoutIndex from "components/CheckoutAlternative/CheckoutIndex.vue";

export default defineComponent({
  name: "CheckoutHouseRent",
  components: { CheckoutIndex },
  setup() {
    return {
      mode: "house_rent",
    };
  },
});
</script>
