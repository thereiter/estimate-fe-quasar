<template>
  <div v-if="Object.keys(order).length > 0">
    <q-btn
      @click="pay"
      :loading="paymentInProgress"
      color="white"
      text-color="positive"
      dense
      flat
    >
      <div>
        <h6>
          Сплатити {{ formattedPrice }} <br />
          Відкрити повний доступ до результатів оцінки
        </h6>
        <div>
          <div>
            <q-img
              width="250px"
              fit="contain"
              loading="eager"
              :src="imagesPathWebServer + '/payment_methods/portmone_logo.png'"
            ></q-img>
          </div>
          <q-img
            width="70px"
            :style="{ marginLeft: '10px' }"
            img-class="second_line_payment_icon"
            fit="scale-down"
            loading="eager"
            :src="imagesPathWebServer + '/payment_methods/mastercard.png'"
          ></q-img>
          <q-img
            width="100px"
            :style="{ marginLeft: '10px' }"
            img-class="second_line_payment_icon"
            fit="scale-down"
            loading="eager"
            :src="imagesPathWebServer + '/payment_methods/visa.png'"
          ></q-img>
          <q-img
            width="100px"
            :style="{ marginLeft: '10px' }"
            img-class="second_line_payment_icon"
            fit="scale-down"
            loading="eager"
            :src="imagesPathWebServer + '/payment_methods/apple_pay.png'"
          ></q-img>
          <q-img
            width="100px"
            :style="{ marginLeft: '10px' }"
            img-class="second_line_payment_icon"
            fit="scale-down"
            loading="eager"
            :src="imagesPathWebServer + '/payment_methods/google_pay.png'"
          ></q-img>
          <q-img
            width="200px"
            :style="{ marginLeft: '10px' }"
            img-class="second_line_payment_icon"
            fit="scale-down"
            loading="eager"
            :src="imagesPathWebServer + '/payment_methods/privat_24-2.png'"
          ></q-img>
        </div>
        <q-tooltip>
          {{ $t("personalOrdersPortmoneDescription") }}
        </q-tooltip>
        <p class="text-caption" style="text-transform: none">
          Оплату картами Visa і Mastercard забезпечує сервіс онлайн-платежів
          Portmone.com. Безпека оплати підтверджена міжнародним аудитом PCI DSS.
          Служба підтримки: тел. +380 (44) 2000922, b2bsupport@portmone.me
        </p>
      </div>
    </q-btn>
  </div>
</template>

<script>
import { defineComponent, inject, ref } from "vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { event } from "vue-gtag";

export default defineComponent({
  name: "PortmonePayment",
  props: {
    scrollToTop: String,
    formattedPrice: String,
  },
  components: {},
  setup(props) {
    const order = inject("order");
    const api = inject("api");
    const imagesPathWebServer = inject("imagesPathWebServer");
    const $q = useQuasar();
    const { t } = useI18n({});
    const router = useRouter();
    const appStore = inject("appStore");

    const orderAccountNumber =
      router.currentRoute.value.params.orderAccountNumber;

    const paymentInProgress = ref(false);
    const pay = () => {
      return new Promise((resolve) => {
        paymentInProgress.value = true;
        appStore.isLoading = true;
        event("confirm-payment", {
          orderAccountNumber: orderAccountNumber,
        });
        api.value
          .postSimple(
            {
              action: "initPayment",
              orderAccountNumber: orderAccountNumber,
            },
            "payment"
          )
          .then(function (response) {
            if (!response.data.isAuthorized) {
              router.push({ name: "auth" });
            }

            if (response.data.error) {
              $q.notify({
                multiLine: true,
                type: "negative",
                icon: "point_of_sale",
                message: response.data.error,
                position: "center",
                timeout: 5000,
                actions: [{ icon: "close", color: "white" }],
              });
              return;
            }

            if (response.data.isPaid) {
              $q.notify({
                multiLine: true,
                type: "positive",
                icon: "paid",
                message: t("personalOrdersOrderPaid"),
                position: "center",
                timeout: 5000,
                actions: [{ icon: "close", color: "white" }],
              });
            }

            const formData = response.data["form"];
            const f = document.createElement("form");
            f.style.display = "none";
            f.setAttribute("method", "post");
            f.setAttribute("action", formData["action"]);
            f.setAttribute("accept-charset", "utf-8");

            for (const [key, value] of Object.entries(formData["inputs"])) {
              const i = document.createElement("input");
              i.setAttribute("name", key);
              i.setAttribute("value", value);
              i.setAttribute("type", "hidden");
              f.appendChild(i);
            }

            const submit = document.createElement("input");
            submit.setAttribute("type", "submit");
            submit.setAttribute("value", "submit");
            //submit.setAttribute("formtarget", "_blank");
            f.appendChild(submit);
            document.getElementsByTagName("body").item(0).append(f);
            submit.click();
          })
          .catch((e) => {
            console.error(e);
            $q.notify({
              multiLine: true,
              type: "negative",
              icon: "point_of_sale",
              message: t("networkUnknownError"),
              position: "center",
              timeout: 5000,
              actions: [{ icon: "close", color: "white" }],
            });
            throw e;
          })
          .finally(() => {
            resolve();
            appStore.isLoading = false;
            paymentInProgress.value = false;
          });
      });
    };

    return {
      order,
      pay,
      paymentInProgress,
      imagesPathWebServer,
      formattedPrice: props.formattedPrice,
    };
  },
});
</script>
<style scoped>
.second_line_payment_icon {
  padding: 3px;
}
.q-carousel__navigation-inner.no-wrap {
  flex-wrap: wrap;
}
</style>
