<template>
  <div v-if="init">
    <div class="q-pa-md">
      <div v-if="ordersLength > 0" class="orders-list">
        <div
          v-for="(order, index) in orders"
          :key="order.orderAccountNumber"
          class="content-container"
        >
          <div class="row flex-left order-row">
            <div class="row q-pa-sm order-row flex-nowrap">
              <div class="row align-self-center flex-nowrap">
                <span class="text-h5 q-mr-sm">{{ ordersLength - index }}.</span>
                <q-icon
                  :name="helper.getStatusIcon(order.status)"
                  :color="helper.getStatusColor(order.status)"
                  size="34px"
                />
              </div>
              <div class="q-pa-sm">
                <div class="block text-h6">
                  {{ $t("personalOrdersOrder") }}
                  {{ order.orderAccountNumber }}
                  {{ $t("personalOrdersOrderFrom") }} {{ order.dateInsert }}
                </div>
                <div class="block text-subtitle1">
                  {{ helper.getOrderTypeLangPhrase(order.type) }}.
                </div>
                <div v-if="order.isFree">
                  <div class="block text-subtitle2">
                    {{ $t("personalOrdersFree") }}
                  </div>
                </div>
                <div v-else>
                  <div
                    class="block text-subtitle2"
                    v-if="order.status.code === 'F'"
                  >
                    {{ $t("personalOrdersPaid") }}: {{ order.price }}
                  </div>
                  <div class="block text-subtitle2" v-else>
                    {{ $t("personalOrdersToPay") }}: {{ order.price }}
                  </div>
                </div>
                <div v-if="order.place_address" style="max-width: 467px">
                  <div class="block text-subtitle2">
                    {{ order.place_address }}
                  </div>
                </div>
                <div
                  :class="[
                    'text-body2',
                    'q-pa-sm',
                    'text-center',
                    'block',
                    'flex-center',
                    'text-white',
                    'rounded-borders',
                    'bg-' + helper.getStatusColor(order.status),
                  ]"
                >
                  {{ order.status.name }}
                  <q-icon name="help_outline" color="white" size="20px" />
                  <q-tooltip
                    anchor="bottom middle"
                    self="top middle"
                    max-width="400px"
                  >
                    <span class="text-body2">{{
                      order.status.description
                    }}</span>
                  </q-tooltip>
                </div>
                <div
                  style="max-width: 459px"
                  :class="[
                    'text-body2',
                    'q-pa-sm',
                    'q-mt-sm',
                    'text-center',
                    'block',
                    'flex-center',
                    'text-white',
                    'rounded-borders',
                    'bg-' + helper.getPaymentStatusColor(order.payment),
                  ]"
                  v-if="
                    order.status.code === 'S' &&
                    order.payment.isResponseReceived
                  "
                >
                  <q-icon
                    :name="helper.getPaymentStatusIcon(order.payment)"
                    color="white"
                    size="20px"
                  />
                  {{ order.payment.message }}
                  <q-tooltip
                    anchor="bottom middle"
                    self="top middle"
                    max-width="400px"
                    v-if="order.payment.description"
                  >
                    <span class="text-body2">{{
                      order.payment.description
                    }}</span>
                  </q-tooltip>
                </div>
              </div>
            </div>
            <div class="q-pa-sm order-detail-button flex-grow-1">
              <q-btn
                icon="double_arrow"
                stretch
                :to="{
                  name: 'order',
                  params: { orderAccountNumber: order.orderAccountNumber },
                }"
                color="primary"
                :label="$t('personalOrdersOrderDetail')"
              />
            </div>
          </div>
          <div class="row separator-block">
            <q-separator spaced color="secondary"></q-separator>
          </div>
        </div>
      </div>
      <div v-else class="content-container">
        <FallbackLinksBlock
          :title="$t('personalOrdersNoOrders')"
        ></FallbackLinksBlock>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, inject, onMounted, ref, watch } from "vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import OrderHelper from "boot/services/OrderHelper.js";
import FallbackLinksBlock from "components/Personal/FallbackLinksBlock.vue";

export default defineComponent({
  name: "Orders",
  components: {
    FallbackLinksBlock,
  },
  setup() {
    const appStore = inject("appStore");
    const api = inject("api");
    const $q = useQuasar();
    const { t } = useI18n({});
    const router = useRouter();
    const helper = new OrderHelper(t);
    const init = ref(false);
    const orders = ref([]);
    const ordersLength = ref(0);

    watch(orders, (newValue) => {
      ordersLength.value = newValue.length;
    });

    const loadState = () => {
      return new Promise((resolve) => {
        appStore.isLoading = true;
        api.value
          .postSimple(
            {
              action: "loadOrdersList",
            },
            "ordersList"
          )
          .then(function (response) {
            if (!response.data.isAuthorized) {
              router.push({ name: "auth" });
            } else {
              orders.value = response.data.orders;
            }
          })
          .catch((e) => {
            console.error(e);
            $q.notify({
              multiLine: true,
              type: "negative",
              icon: "upload",
              message: t("networkUnknownError"),
              position: "center",
              timeout: 5000,
              actions: [{ icon: "close", color: "white" }],
            });
          })
          .finally(() => {
            appStore.isLoading = false;
            resolve();
          });
      });
    };

    onMounted(() => {
      loadState().finally(() => {
        init.value = true;
      });
    });

    return {
      init,
      orders,
      ordersLength,
      helper,
    };
  },
});
</script>
<style scoped>
.orders-list {
  display: flex;
  flex-direction: column;
}
.orders-list > * {
  flex: 1;
}
.content-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.order-row {
  align-content: center;
  justify-content: center;
  align-items: stretch;
}
.flex-grow-1 {
  flex-grow: initial;
}
.order-detail-button a {
  height: 100%;
}
.align-self-center {
  align-self: center;
}
.flex-nowrap {
  flex-wrap: nowrap;
}
.separator-block {
  flex-basis: 100%;
  display: block;
}
@media (max-width: 991px) {
  .flex-grow-1 {
    flex-grow: 1;
  }
  .order-detail-button a {
    width: 100%;
  }
  .order-detail-button {
    padding: 8px 16px;
  }
}
</style>
