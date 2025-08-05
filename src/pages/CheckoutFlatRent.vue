<template>
  <CheckoutIndex :mode="mode"></CheckoutIndex>
</template>

<script>
import { defineComponent, inject, onMounted } from "vue";
import CheckoutIndex from "components/CheckoutAlternative/CheckoutIndex.vue";

export default defineComponent({
  name: "CheckoutFlatRent",
  components: { CheckoutIndex },
  setup() {
    const parentPageTitle = inject("parentPageTitle");
    onMounted(() => {
      parentPageTitle.value = "CheckoutFlatRent";
    });

    return {
      mode: "flat_rent",
    };
  },
});
</script>
