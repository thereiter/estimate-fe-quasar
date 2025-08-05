<template>
  <div v-if="init">
    <div class="q-pa-md mobile-padding">
      <div v-if="Object.keys(order).length > 0" id="to-pdf">
        <div class="order-sub-container">
          <div>
            <div>
              <div class="block text-h6">
                {{ $t("personalOrdersOrder") }} {{ order.orderAccountNumber }}
                {{ $t("personalOrdersOrderFrom") }} {{ order.dateInsert }}
              </div>
              <div class="block text-subtitle1">
                {{ helper.getOrderTypeLangPhrase(order.type) }}
              </div>
              <div class="block text-subtitle1">
                {{ summaryData.locationString }}
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
                  <h6 class="title-h6">
                    {{ $t("personalOrdersPaid") }}: {{ order.price }}
                  </h6>
                </div>
                <div class="block text-subtitle2" v-else>
                  <h6 class="title-h6">
                    {{ $t("personalOrdersToPay") }}: {{ order.price }}
                  </h6>
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
                <span
                  v-if="order.status.code === 'W'"
                  style="padding-right: 10px"
                >
                  <q-spinner-gears color="white" size="2em" />
                </span>
                <span>{{ order.status.name }}</span>
                <span v-if="order.status.code !== 'F'">
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
                </span>
                <span v-else> &nbsp;{{ estimation.date }} </span>
              </div>
              <q-linear-progress
                v-if="order.status.code === 'W'"
                size="xl"
                rounded
                animation-speed="10"
                class="q-my-md"
                indeterminate
                color="primary"
                track-color="secondary"
              ></q-linear-progress>
              <div
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
                  order.status.code === 'S' && order.payment.isResponseReceived
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
          <div>
            <div
              class="q-pa-md refresh-status-block"
              v-if="order.status.code === 'N'"
            >
              <div class="refresh-status-block-1">
                <q-btn
                  @click="loadState()"
                  icon="refresh"
                  color="secondary"
                  :label="$t('personalOrdersCheckOrderStatus')"
                >
                  <q-tooltip>
                    {{ $t("personalOrdersCheckOrderStatusTooltip") }}
                  </q-tooltip>
                </q-btn>
              </div>
              <div class="refresh-status-block-2" v-if="!order.isFree">
                <q-banner rounded class="bg-purple-8 text-white">
                  <p>{{ $t("personalOrdersOrderInProcessDescription") }}</p>
                </q-banner>
              </div>
            </div>
            <div
              class="q-pa-sm refresh-status-block"
              v-else-if="order.status.code === 'E'"
            >
              <div class="refresh-status-block-1">
                <q-btn
                  @click="openLiveChat()"
                  icon="refresh"
                  color="positive"
                  :label="$t('personalOrdersOpenLiveChat')"
                >
                  <q-tooltip>
                    {{ $t("personalOrdersOpenLiveChatTooltip") }}
                  </q-tooltip>
                </q-btn>
              </div>
              <div class="refresh-status-block-2">
                <q-banner rounded class="bg-negative text-white">
                  <p>{{ $t("personalOrdersProcessError") }}</p>
                </q-banner>
              </div>
            </div>

            <div
              class="text-body1 text-weight-medium"
              v-if="['F', 'S'].includes(order.status.code)"
            >
              <div class="estimate-block">
                <h4>{{ $t("personalOrdersSuccessEstimateResults") }}</h4>
                <q-markup-table
                  flat
                  bordered
                  wrap-cells
                  squared
                  separator="cell"
                >
                  <tbody>
                    <tr>
                      <td class="text-left bg-grey-3 text-right">
                        {{ $t("personalOrdersSuccessEstimateDate") }}
                      </td>
                      <td class="text-left">{{ estimation.date }}</td>
                    </tr>
                    <tr>
                      <td class="text-left bg-grey-3 text-right">
                        {{ $t("personalOrdersSuccessEstimatedPrice") }}, грн
                      </td>
                      <td class="text-left" v-if="isPaid">
                        {{
                          $n(
                            parseInt(estimation.uah.price),
                            "currency",
                            "uk-UK"
                          )
                        }}
                        [{{
                          $n(
                            parseInt(estimation.uah.pricePerSquare),
                            "currency",
                            "uk-UK"
                          )
                        }}
                        за кв.м]
                      </td>
                      <td class="text-left" v-else>
                        <q-btn
                          color="positive"
                          unelevated
                          outline
                          icon="preview"
                          dense
                          stretch
                          align="left"
                          no-caps
                          no-wrap
                          @click="
                            scrollToElement(this.$refs.mainPaymentBlock);
                            event('go-to-payment-block', {
                              eventTarget: 'uahPricePerSquare',
                            });
                          "
                          >Показати</q-btn
                        >
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left bg-grey-3 text-right">
                        {{ $t("personalOrdersSuccessEstimatedPrice") }}, USD
                      </td>
                      <td class="text-left" v-if="isPaid">
                        {{
                          $n(
                            parseInt(estimation.usd.price),
                            "currency",
                            "en-US"
                          )
                        }}
                        [{{
                          $n(
                            parseInt(estimation.usd.pricePerSquare),
                            "currency",
                            "en-US"
                          )
                        }}
                        за кв.м]
                      </td>
                      <td class="text-left" v-else>
                        <q-btn
                          color="positive"
                          unelevated
                          outline
                          icon="preview"
                          dense
                          stretch
                          align="left"
                          no-caps
                          no-wrap
                          @click="
                            scrollToElement(this.$refs.mainPaymentBlock);
                            event('go-to-payment-block', {
                              eventTarget: 'usdPricePerSquare',
                            });
                          "
                          >Показати</q-btn
                        >
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left bg-grey-3 text-right">
                        {{ $t("personalOrdersSuccessEstimatedCurrency") }}
                      </td>
                      <td class="text-left">
                        UAH/USD {{ estimation.currencyRate }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left bg-grey-3 text-right">
                        {{ $t("personalOrdersSuccessEstimatedMarginError") }}, %
                      </td>
                      <td class="text-left">
                        &plusmn;
                        {{
                          $n(
                            parseFloat(estimation.marginPercentError),
                            "decimal",
                            "uk-UK"
                          )
                        }}%
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left bg-grey-3 text-right">
                        {{ $t("personalOrdersSuccessEstimatedMarginError") }}, $
                      </td>
                      <td class="text-left">
                        &plusmn;
                        {{
                          $n(
                            parseInt(estimation.marginError),
                            "currency",
                            "en-US"
                          )
                        }}
                      </td>
                    </tr>
                    <tr class="remove-from-pdf">
                      <td
                        colspan="2"
                        class="text-center create-pdf-row bg-grey-11"
                      >
                        <q-btn
                          @click="
                            createPDF();
                            event('create-pdf', {
                              orderAccountNumber: order.orderAccountNumber,
                            });
                          "
                          :loading="createPDFLoading"
                          :label="$t('personalOrdersCreatePDF')"
                          class="create-pdf-button"
                          icon="refresh"
                          color="deep-purple-10"
                          label="Завантажити PDF"
                          :disable="!isPaid"
                        />
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </div>
              <div class="q-pa-sm form-step-block-color remove-from-pdf">
                <q-chip
                  text-color="white"
                  color="indigo-7"
                  size="md"
                  square
                  outline
                  icon="apartment"
                  class="text-subtitle2 form-chip-block-style"
                >
                  Схожі оголошення
                </q-chip>
                <RelatedAdverts
                  :order-account-number="orderAccountNumber"
                  :lat="summaryData.latitude"
                  :lon="summaryData.longitude"
                  ref="relatedAdverts"
                ></RelatedAdverts>
              </div>
              <div
                style="page-break-inside: avoid"
                class="sale-time-estimation"
                v-if="
                  estimation.saleTimeEstimation &&
                  Object.keys(estimation.saleTimeEstimation).length > 0
                "
              >
                <q-card bordered class="bg-white my-card">
                  <q-card-section>
                    <div class="text-h6">
                      <q-icon name="query_stats" />
                      Графік ймовірності продажу вашої нерухомості
                      <div class="text-subtitle2 q-pa-xs">
                        <q-icon name="area_chart" />
                        Середня кількість днів продажу:
                        <span style="font-weight: 1000">{{
                          estimation.saleTimeEstimation.mean
                        }}</span>
                      </div>
                      <div class="text-subtitle2 q-pa-xs">
                        <q-icon name="assessment" />
                        Медіанна кількість днів продажу:
                        <span style="font-weight: 1000">{{
                          estimation.saleTimeEstimation.median
                        }}</span>
                      </div>
                    </div>
                  </q-card-section>

                  <q-separator dark inset />

                  <q-card-section>
                    <picture>
                      <source
                        :srcset="`${host}${estimation.saleTimeEstimation.graph_200}`"
                        media="(max-width: 200px)"
                      />
                      <source
                        :srcset="`${host}${estimation.saleTimeEstimation.graph_300}`"
                        media="(max-width: 300px)"
                      />
                      <source
                        :srcset="`${host}${estimation.saleTimeEstimation.graph_400}`"
                        media="(max-width: 400px)"
                      />
                      <source
                        :srcset="`${host}${estimation.saleTimeEstimation.graph_500}`"
                        media="(max-width: 500px)"
                      />
                      <source
                        :srcset="`${host}${estimation.saleTimeEstimation.graph_600}`"
                        media="(max-width: 600px)"
                      />
                      <source
                        :srcset="`${host}${estimation.saleTimeEstimation.graph_700}`"
                        media="(max-width: 700px)"
                      />
                      <source
                        :srcset="`${host}${estimation.saleTimeEstimation.graph_800}`"
                        media="(max-width: 800px)"
                      />
                      <source
                        :srcset="`${host}${estimation.saleTimeEstimation.graph_900}`"
                        media="(max-width: 900px)"
                      />
                      <img
                        style="width: 100%; object-fit: scale-down"
                        alt="Графік ймовірності продажу нерухомості"
                        :src="`${host}${estimation.saleTimeEstimation.graph_1000}`"
                      />
                    </picture>
                  </q-card-section>
                </q-card>
              </div>
              <div
                class="q-pa-sm form-step-block-color truncate-chip-labels"
                style="page-break-inside: avoid"
                v-if="estimation.generatedDescriptionSuccess"
              >
                <q-chip
                  text-color="white"
                  color="indigo-7"
                  size="md"
                  square
                  outline
                  icon="apartment"
                  class="text-subtitle2 form-chip-block-style"
                  title="Сгенерований опис оголошення [beta-версія]"
                  label="Сгенерований опис оголошення [beta-версія]"
                >
                </q-chip>
                <q-list v-if="!isPaid">
                  <q-item>
                    <q-item-section class="description-payment-section">
                      <q-item-label
                        ><q-btn
                          color="accent"
                          unelevated
                          outline
                          icon="warning"
                          @click="
                            scrollToElement(this.$refs.mainPaymentBlock);
                            event('go-to-payment-block', {
                              eventTarget: 'generatedDescription',
                            });
                          "
                          label="Відкрити доступ"
                      /></q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-card flat>
                  <q-card-section class="text-body1">
                    {{ estimation.generatedDescription }}
                  </q-card-section>
                </q-card>
              </div>

              <div
                class="refresh-status-block"
                v-if="
                  order.status.code === 'S' && order.isWaitingPaymentCallback
                "
              >
                <div class="refresh-status-block-1">
                  <q-btn
                    @click="loadState()"
                    icon="refresh"
                    color="secondary"
                    :label="$t('personalOrdersCheckOrderStatus')"
                  >
                    <q-tooltip>
                      {{ $t("personalOrdersCheckOrderStatusTooltip") }}
                    </q-tooltip>
                  </q-btn>
                </div>
                <div class="refresh-status-block-2">
                  <q-banner rounded class="bg-purple-8 text-white">
                    <p>{{ $t("personalOrdersPaymentInProcessDescription") }}</p>
                  </q-banner>
                </div>
              </div>
              <div
                v-else-if="
                  order.status.code === 'S' && !order.isWaitingPaymentCallback
                "
                class="q-pa-sm form-step-block-color main-payment-block"
                id="mainPaymentBlock"
                ref="mainPaymentBlock"
              >
                <q-chip
                  text-color="white"
                  color="indigo-7"
                  size="md"
                  square
                  outline
                  icon="payments"
                  class="text-subtitle2 form-chip-block-style"
                >
                  Оплата замовлення
                </q-chip>
                <WayForPayPayment
                  v-if="order.payment.code === 'wayforpay'"
                ></WayForPayPayment>
                <LiqpayPayment
                  v-else-if="order.payment.code === 'liqpay'"
                ></LiqpayPayment>
                <PortmonePayment
                  :formatted-price="order.price"
                  v-else-if="order.payment.code === 'portmone'"
                >
                </PortmonePayment>
              </div>
            </div>
            <div v-if="order.status.code === 'F'">
              <OrderReview
                class="remove-from-pdf"
                :order-account-number="orderAccountNumber"
              ></OrderReview>
            </div>

            <div
              class="q-pa-sm form-step-block-color"
              style="page-break-inside: avoid"
            >
              <q-chip
                text-color="white"
                color="indigo-7"
                size="md"
                square
                outline
                icon="apartment"
                class="text-subtitle2 form-chip-block-style"
              >
                Характеристики нерухомості
              </q-chip>
              <Summary :summary="summaryData"></Summary>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="content-container">
        <FallbackLinksBlock
          :title="
            $t('personalOrderNotFound', {
              orderAccountNumber: truncateString(orderAccountNumber),
            })
          "
        ></FallbackLinksBlock>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  inject,
  provide,
  onMounted,
  reactive,
  ref,
} from "vue";
import { useQuasar, scroll } from "quasar";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { scrollTop } from "components/Helpers/scroll.js";
import FallbackLinksBlock from "components/Personal/FallbackLinksBlock.vue";
import OrderHelper from "boot/services/OrderHelper.js";
import Summary from "components/Summary.vue";
import { truncateString } from "boot/services/Misc.js";
import html2pdf from "html2pdf.js";
import OrderReview from "components/Personal/OrderReview.vue";
import RelatedAdverts from "components/Personal/RelatedAdverts.vue";
import WayForPayPayment from "components/Personal/WayForPayPayment.vue";
import LiqpayPayment from "components/Personal/LiqpayPayment.vue";
import PortmonePayment from "components/Personal/PortmonePayment.vue";
import { event } from "vue-gtag";

export default defineComponent({
  name: "Order",
  props: {
    scrollToTop: String,
  },
  components: {
    PortmonePayment,
    LiqpayPayment,
    RelatedAdverts,
    OrderReview,
    FallbackLinksBlock,
    Summary,
    WayForPayPayment,
  },
  setup() {
    const appStore = inject("appStore");
    const api = inject("api");
    const emitter = inject("emitter");
    const assetsPath = inject("assetsPath");
    const imagesPathWebServer = inject("imagesPathWebServer");
    const $q = useQuasar();
    const { t } = useI18n({});
    const router = useRouter();
    const helper = new OrderHelper(t);
    const init = ref(false);
    const order = ref({});
    const estimation = ref({});
    const summaryData = ref({});
    const createPDFLoading = ref(false);
    const isPaid = ref(false);
    const relatedAdverts = ref(null);

    const { getScrollTarget, setVerticalScrollPosition } = scroll;

    const highlightPayment = () => {
      const div = document.querySelector(".main-payment-block");

      div.classList.add("highlight");

      setTimeout(() => {
        div.classList.remove("highlight");
      }, 3000);
    };

    const scrollToElement = async function (el, addOffset = -80) {
      const target = getScrollTarget(el);
      const offset = el.offsetTop + addOffset;
      const duration = 100;
      setVerticalScrollPosition(target, offset, duration);
      highlightPayment();
    };

    const orderAccountNumber =
      router.currentRoute.value.params.orderAccountNumber;
    const loadState = () => {
      return new Promise((resolve) => {
        appStore.isLoading = true;
        api.value
          .postSimple(
            {
              action: "loadOrder",
              orderAccountNumber: orderAccountNumber,
            },
            "orderDetail"
          )
          .then(async function (response) {
            if (!response.data.isAuthorized) {
              router.push({ name: "auth" });
            } else {
              order.value = response.data.order;
              estimation.value = response.data.estimation;
              summaryData.value = response.data.summary;
              isPaid.value = response.data.order.status.code === "F";
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
            if (relatedAdverts.value) {
              relatedAdverts.value.reload();
            }
            resolve();
          });
      });
    };

    onMounted(() => {
      loadState().finally(() => {
        init.value = true;
        //scrollTop("app");
        progress.value = 0;
        buffer.value = 0;
        fadeOutStyle.opacity = 1;

        updateProgress();
      });
    });

    emitter.on("order-updated", (e) => {
      try {
        if (orderAccountNumber === e) {
          loadState().finally(() => {
            //scrollTop("app");
          });
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    });

    const paymentInProgress = ref(false);
    const pay = () => {
      return new Promise((resolve) => {
        paymentInProgress.value = true;
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

            for (const [key, value] of Object.entries(formData["data"])) {
              const i = document.createElement("input");
              i.setAttribute("type", "text");
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
          })
          .finally(() => {
            resolve();
            paymentInProgress.value = false;
          });
      });
    };

    const createPDF = () => {
      let element = document.getElementById("to-pdf");
      if (element) {
        let options = {
          margin: [0.1, 0.1, 0.1, 0.1],
          filename: "estimation.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
          pagebreak: { mode: "css" },
        };

        createPDFLoading.value = true;
        let newElement = element.cloneNode(true);
        let removeFromPdf =
          newElement.getElementsByClassName("remove-from-pdf");
        while (removeFromPdf.length > 0) {
          removeFromPdf[0].remove();
        }

        let carousels = newElement.getElementsByClassName("carousel-element");
        while (carousels.length > 0) {
          carousels[0].remove();
        }

        html2pdf()
          .set(options)
          .from(newElement)
          .save()
          .then(() => {
            createPDFLoading.value = false;
          })
          .catch((e) => {
            console.error(e);
            createPDFLoading.value = false;
          });
      }
    };

    const openLiveChat = () => {
      window.HelpCrunch("openChat");
    };

    const formatNumber = (number, locale) => {
      return new Intl.NumberFormat(locale).format(number);
    };

    const progress = ref(0);
    const buffer = ref(0);
    const fadeOutStyle = reactive({});

    const updateProgress = () => {
      if (progress.value < 99) {
        progress.value += 1;
        buffer.value = progress.value + 1;
        setTimeout(updateProgress, 1000);
      }
    };

    provide("order", order);
    provide("scrollToElement", scrollToElement);

    return {
      init,
      order,
      estimation,
      summaryData,
      helper,
      orderAccountNumber,
      truncateString,
      assetsPath,
      pay,
      paymentInProgress,
      loadState,
      openLiveChat,
      createPDF,
      createPDFLoading,
      formatNumber,
      progress,
      buffer,
      fadeOutStyle,
      host: import.meta.env.VITE_APP_BASE_URL,
      imagesPathWebServer,
      isPaid,
      scrollToElement,
      relatedAdverts,
      event,
    };
  },
});
</script>
<style scoped lang="scss">
.content-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.flex-nowrap {
  flex-wrap: nowrap;
}
.separator-block {
  flex-basis: 100%;
  display: block;
}
.flex-column {
  flex-direction: column;
}
.refresh-status-block {
  padding-top: 0;
}
.refresh-status-block-1 {
  display: flex;
  align-items: stretch;
  margin-right: 20px;
}
.refresh-status-block-2 {
  text-align: center;
  display: flex;
  align-items: stretch;
  max-width: 430px;
}
.refresh-status-block-2 p {
  margin: 0;
  padding: 5px;
}
.center-stretch {
  align-content: stretch;
  justify-content: center;
  align-items: stretch;
}
.flex-direction-column {
  flex-direction: column;
}
.summary-block > .q-pa-md {
  padding-top: 0;
  padding-left: 0;
  padding-right: 0;
}
#app .q-card h4 {
  margin: 15px 0;
}
.create-pdf-button {
  margin: 5px 0;
}
.estimate-block .q-table tbody td.text-left {
  font-size: 16px;
}
.pay-banner {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.pay-banner-text {
  text-align: center;
  margin-bottom: 10px;
}

.form-step-block-color {
  border-radius: 10px;
  border: 1px solid $indigo-7;
  padding-top: 20px;
  position: relative;
  margin-top: 35px;
}
.form-chip-block-style {
  position: absolute;
  top: -20px;
  left: 10px;
  background-color: #fff !important;
}
.truncate-chip-labels > .q-chip {
  text-overflow: ellipsis;
  max-width: 90%;
}
.order-sub-container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
h6.title-h6 {
  margin: 5px 0;
}
.sale-time-estimation {
  margin-top: 20px;
}
.description-payment-section {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  align-items: center;
}

@media (max-width: 991px) {
  #app div.q-pa-md.mobile-padding {
    padding: 6px;
  }
}

@media (max-width: 576px) {
  .refresh-status-block,
  .refresh-status-block-1,
  .refresh-status-block-2 {
    flex-direction: column;
    max-width: none;
  }
  .refresh-status-block-1 {
    margin-bottom: 20px;
    margin-right: 0;
  }
}
</style>
<style lang="scss">
.second_line_payment_icon {
  padding: 3px;
}
.q-carousel__navigation-inner.no-wrap {
  flex-wrap: wrap;
}
.main-payment-block {
  background-color: white;
}
.main-payment-block.highlight {
  animation: highlightFade 3s linear 0s 1 alternate forwards;
}

@keyframes highlightFade {
  0% {
    animation-timing-function: ease-in;
    opacity: 1;
    transform: translateY(-45px);
  }

  24% {
    opacity: 1;
  }

  40% {
    animation-timing-function: ease-in;
    transform: translateY(-24px);
  }

  65% {
    animation-timing-function: ease-in;
    transform: translateY(-12px);
  }

  82% {
    animation-timing-function: ease-in;
    transform: translateY(-6px);
  }

  93% {
    animation-timing-function: ease-in;
    transform: translateY(-4px);
  }

  25%,
  55%,
  75%,
  87% {
    animation-timing-function: ease-out;
    transform: translateY(0px);
  }

  100% {
    animation-timing-function: ease-out;
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
