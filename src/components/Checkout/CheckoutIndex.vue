<template>
  <div v-if="!checkoutFormStore.initialLoading">
    <q-stepper
      v-model="checkoutGeneralStore.step"
      vertical
      color="primary"
      animated
      :keep-alive="true"
      ref="stepper"
      style="padding: 0"
    >
      <div
        class=""
        v-if="
          checkoutGeneralStore.mode === 'flat_sale' ||
          checkoutGeneralStore.mode === 'house_sale'
        "
      >
        <q-banner dense class="bg-primary text-white">
          <div class="text-subtitle1 text-center">Оцінка вартості квартири</div>
        </q-banner>
        <q-card flat>
          <q-card-section class="flex justify-center">
            <q-chip
              class="flex"
              icon-selected="remove_circle_outline"
              v-model:selected="tooltips.instruction"
              clickable
              style="cursor: pointer"
              outline
              square
              color="deep-purple-13"
              text-color="white"
              icon="info"
            >
              Інструкція
              <q-popup-proxy @before-hide="tooltips.instruction = false">
                <q-banner dense v-close-popup>
                  <div style="position: relative">
                    <q-icon
                      style="
                        z-index: 10;
                        cursor: pointer;
                        position: absolute;
                        right: 0;
                        top: 0;
                      "
                      flat
                      size="sm"
                      color="primary"
                      name="close"
                      @click="tooltips.instruction = false"
                    />
                  </div>
                  <q-list>
                    <q-item>
                      <q-item-section side top>
                        <q-icon name="looks_one" color="deep-purple-13" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Вкажіть місцезнаходження</q-item-label>
                        <q-item-label caption lines="3"
                          >Введіть адрес вашої квартири і дізнайтеся можливу
                          якість оцінки у вашому районі</q-item-label
                        >
                      </q-item-section>
                    </q-item>

                    <q-separator spaced />

                    <q-item>
                      <q-item-section side top>
                        <q-icon name="looks_two" color="deep-purple-13" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Заповніть форму</q-item-label>
                        <q-item-label caption lines="2"
                          >Введіть основні характеристики квартири та
                          будівлі</q-item-label
                        >
                      </q-item-section>
                    </q-item>

                    <q-separator spaced />

                    <q-item>
                      <q-item-section side top>
                        <q-icon name="looks_3" color="deep-purple-13" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Є ремонт? Завантажте фото!</q-item-label>
                        <q-item-label caption lines="3">
                          Унікальна композитна технологія оцінки для максимально
                          точного результату
                        </q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-separator spaced />

                    <q-item>
                      <q-item-section side top>
                        <q-icon name="looks_4" color="deep-purple-13" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Запускайте процес оцінки</q-item-label>
                        <q-item-label caption lines="2"
                          >Перевірте введені дані та підтвердіть
                          запит</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-banner>
              </q-popup-proxy>
            </q-chip>
            <q-chip
              class="flex"
              style="cursor: pointer"
              outline
              square
              color="green-8"
              text-color="white"
              icon="payments"
              icon-selected="remove_circle_outline"
              v-model:selected="tooltips.price"
              clickable
            >
              Вартість
              <q-popup-proxy @before-hide="tooltips.price = false">
                <q-banner dense v-close-popup>
                  <div style="position: relative">
                    <q-icon
                      style="
                        z-index: 10;
                        cursor: pointer;
                        position: absolute;
                        right: 0;
                        top: 0;
                      "
                      flat
                      size="sm"
                      color="primary"
                      name="close"
                      @click="tooltips.price = false"
                    />
                  </div>
                  <q-list>
                    <q-item>
                      <q-item-section side top>
                        <q-icon name="person" color="green-8" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>50 грн. для приватної особи</q-item-label>
                        <q-item-label caption lines="2"
                          >Будемо вдячні за відгук на сторінці результату
                          оцінки</q-item-label
                        >
                      </q-item-section>
                    </q-item>

                    <q-separator spaced />

                    <q-item>
                      <q-item-section side top>
                        <q-icon name="groups" color="green-8" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label
                          >Індивідуальні тарифи для корпоративних
                          клієнтів</q-item-label
                        >
                        <q-item-label caption lines="2"
                          >E-mail: partners@estimate.realestate</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-banner>
              </q-popup-proxy>
            </q-chip>

            <q-chip
              class="flex"
              style="cursor: pointer"
              outline
              square
              color="teal-8"
              text-color="white"
              icon="gpp_good"
              icon-selected="remove_circle_outline"
              v-model:selected="tooltips.quality"
              clickable
            >
              Якість
              <q-popup-proxy @before-hide="tooltips.quality = false">
                <q-banner dense v-close-popup>
                  <div style="position: relative">
                    <q-icon
                      style="
                        z-index: 10;
                        cursor: pointer;
                        position: absolute;
                        right: 0;
                        top: 0;
                      "
                      flat
                      size="sm"
                      color="primary"
                      name="close"
                      @click="tooltips.quality = false"
                    />
                  </div>
                  <q-list>
                    <q-item>
                      <q-item-section side top>
                        <q-icon name="smart_toy" color="teal-8" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Сучасні технології</q-item-label>
                        <q-item-label caption lines="2"
                          >Використання найсучасніших State-Of-The-Art
                          алгоритмів штучного інтелекту</q-item-label
                        >
                      </q-item-section>
                    </q-item>

                    <q-separator spaced />

                    <q-item>
                      <q-item-section side top>
                        <q-icon name="camera_indoor" color="teal-8" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Аналізатор інтер'єру</q-item-label>
                        <q-item-label caption lines="2"
                          >Завантажте від 3 до 50 фотографії інтер'єру
                          квартири.</q-item-label
                        >
                        <q-item-label caption lines="3"
                          >Житлові кімнати, коридор, кухня, санвузел — ми
                          врахуємо все в розрахунках оцінки
                          вартості</q-item-label
                        >
                      </q-item-section>
                    </q-item>

                    <q-separator spaced />

                    <q-item>
                      <q-item-section side top>
                        <q-icon name="precision_manufacturing" color="teal-8" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label
                          >Композитний аналіз - враховуємо все:</q-item-label
                        >
                        <q-item-label caption lines="2"
                          >1. Місцезнаходження квартири</q-item-label
                        >
                        <q-item-label caption lines="2"
                          >2. Основні характеристики</q-item-label
                        >
                        <q-item-label caption lines="2"
                          >3. Візуальний аналіз інтер'єру</q-item-label
                        >
                        <q-item-label caption lines="3"
                          >4. Інфраструктура, транспортні вузли та ще сотні
                          внутрішніх параметрів, які комбінує і враховує наша
                          система</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-banner>
              </q-popup-proxy>
            </q-chip>

            <q-chip
              class="flex"
              style="cursor: pointer"
              outline
              square
              color="blue-14"
              text-color="white"
              icon="leaderboard"
              icon-selected="remove_circle_outline"
              v-model:selected="tooltips.advantages"
              clickable
            >
              Переваги
              <q-popup-proxy @before-hide="tooltips.advantages = false">
                <q-banner dense v-close-popup>
                  <div style="position: relative">
                    <q-icon
                      style="
                        z-index: 10;
                        cursor: pointer;
                        position: absolute;
                        right: 0;
                        top: 0;
                      "
                      flat
                      size="sm"
                      color="primary"
                      name="close"
                      @click="tooltips.advantages = false"
                    />
                  </div>
                  <q-list>
                    <q-item>
                      <q-item-section side top>
                        <q-icon name="shutter_speed" color="blue-14" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Швидко</q-item-label>
                        <q-item-label caption lines="2"
                          >1. Заповніть основні характеристики</q-item-label
                        >
                        <q-item-label caption lines="2"
                          >2. Зробіть фото інтер'єру, якщо є
                          ремонт</q-item-label
                        >
                        <q-item-label caption lines="3"
                          >3. Підтвердіть запит. Середній час оцінки системою —
                          30 секунд</q-item-label
                        >
                      </q-item-section>
                    </q-item>

                    <q-separator spaced />

                    <q-item>
                      <q-item-section side top>
                        <q-icon name="view_list" color="blue-14" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Схожі квартири</q-item-label>
                        <q-item-label caption lines="2"
                          >Перелік максимально схожих оголошеннь продажу квартир
                          поряд з вами</q-item-label
                        >
                      </q-item-section>
                    </q-item>

                    <q-separator spaced />

                    <q-item>
                      <q-item-section side top>
                        <q-icon name="memory" color="blue-14" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Надійно</q-item-label>
                        <q-item-label caption lines="2"
                          >Відсутність людського фактору — машинна
                          точність</q-item-label
                        >
                      </q-item-section>
                    </q-item>

                    <q-separator spaced />

                    <q-item>
                      <q-item-section side top>
                        <q-icon name="update" color="blue-14" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Актуальність</q-item-label>
                        <q-item-label caption lines="2"
                          >Оновлення даних в системі кожні 24
                          години</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-banner>
              </q-popup-proxy>
            </q-chip>

            <q-chip
              class="flex"
              style="cursor: pointer"
              outline
              square
              color="yellow-10"
              text-color="white"
              icon="lock"
              icon-selected="remove_circle_outline"
              v-model:selected="tooltips.security"
              clickable
            >
              Безпека
              <q-popup-proxy @before-hide="tooltips.security = false">
                <q-banner dense v-close-popup>
                  <div style="position: relative">
                    <q-icon
                      style="
                        z-index: 10;
                        cursor: pointer;
                        position: absolute;
                        right: 0;
                        top: 0;
                      "
                      flat
                      size="sm"
                      color="primary"
                      name="close"
                      @click="tooltips.security = false"
                    />
                  </div>
                  <q-list>
                    <q-item>
                      <q-item-section side top>
                        <q-icon name="security" color="yellow-10" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Приватність</q-item-label>
                        <q-item-label caption lines="2"
                          >Ми ніколи не передаємо введені вами дані третім
                          особам</q-item-label
                        >
                      </q-item-section>
                    </q-item>

                    <q-separator spaced />

                    <q-item>
                      <q-item-section side top>
                        <q-icon name="phonelink_lock" color="yellow-10" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Відсутність чутливих даних</q-item-label>
                        <q-item-label caption lines="3"
                          >Ви надаєте ти ж самі характеристики квартири, якби ви
                          розміщували оголошення щодо продажу
                          квартири.</q-item-label
                        >
                        <q-item-label caption lines="3"
                          >Відмінність у тому, що у нашій системі ваші дані
                          ніколи не будуть опубліковані чи передані третім
                          особам.</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-banner>
              </q-popup-proxy>
            </q-chip>
          </q-card-section>

          <q-card-actions align="around" style="display: none">
            <q-btn-toggle
              ripple
              v-model="modeSwitcherState"
              toggle-color="primary"
              @update:model-value="this.modeSwitcherState = 'flat_sale'"
              :options="[
                {
                  label: $t('globalFlat'),
                  slot: 'flat_sale',
                  value: 'flat_sale',
                  icon: 'apartment',
                },
                {
                  label: $t('globalHouse'),
                  type: 'a',
                  slot: 'house_sale',
                  value: 'house_sale',
                  icon: 'house',
                  'icon-right': 'help',
                  disabled: true,
                },
              ]"
            >
              <template v-slot:house_sale>
                <q-tooltip class="bg-purple text-body2">{{
                  $t("serviceIsPendingTooltip")
                }}</q-tooltip>
              </template>
            </q-btn-toggle>
          </q-card-actions>
        </q-card>
      </div>
      <div
        class="row justify-center q-ma-lg"
        v-else-if="
          checkoutGeneralStore.mode === 'flat_rent' ||
          checkoutGeneralStore.mode === 'house_rent'
        "
      >
        <q-card class="my-card">
          <q-card-section class="">
            <div class="text-h6">{{ $t("modeSwitcherStateRent") }}</div>
            <div class="text-subtitle2">
              {{ $t("modeSwitcherStateRentSubText") }}:
            </div>
          </q-card-section>

          <q-card-actions align="around">
            <q-btn-toggle
              ripple
              v-model="modeSwitcherState"
              toggle-color="primary"
              :options="[
                {
                  label: $t('globalFlat'),
                  value: 'flat_rent',
                  icon: 'apartment',
                },
                {
                  label: $t('globalHouse'),
                  value: 'house_rent',
                  icon: 'house',
                },
              ]"
            ></q-btn-toggle>
          </q-card-actions>
        </q-card>
      </div>
      <Mode id="stepper-mode"></Mode>
    </q-stepper>
  </div>
</template>

<script>
import {
  defineComponent,
  inject,
  provide,
  watch,
  ref,
  unref,
  onMounted,
  reactive,
} from "vue";
import Mode from "components/Checkout/Mode.vue";
import {
  initCheckoutGeneralStore,
  initCheckoutLocationStore,
  initCheckoutFormStore,
  initAutoRegisterStore,
} from "stores/checkout";
import { useRouter } from "vue-router";
import { scrollTop } from "components/Helpers/scroll.js";
import { event } from "vue-gtag";

export default defineComponent({
  name: "CheckoutIndex",
  components: {
    Mode,
  },
  props: {
    mode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const api = inject("api");
    const appStore = inject("appStore");
    const router = useRouter();

    const checkoutGeneralStore = initCheckoutGeneralStore();
    const checkoutLocationStore = initCheckoutLocationStore();
    const checkoutFormStore = initCheckoutFormStore();
    const checkoutAutoRegisterStore = initAutoRegisterStore();
    const tooltips = reactive({
      instruction: false,
      price: false,
      quality: false,
      advantages: false,
      security: false,
    });
    const mode = unref(props.mode);
    checkoutGeneralStore.mode = mode;
    const modeSwitcherState = ref(mode);
    watch(
      () => modeSwitcherState.value,
      (newValue) => {
        appStore.isLoading = true;
        router.push({ name: newValue.replace("_", "-") }).finally(() => {
          appStore.isLoading = false;
        });
      }
    );

    const combineInputs = () => {
      let location = {};
      let autoRegister = {};
      let form = {};
      for (const [key, value] of Object.entries(checkoutLocationStore.inputs)) {
        location[key] =
          typeof value == "object" && value !== null ? value.value : value;
      }
      for (const [key, value] of Object.entries(
        checkoutAutoRegisterStore.inputs
      )) {
        autoRegister[key] =
          typeof value == "object" && value !== null ? value.value : value;
      }
      for (const [key, value] of Object.entries(checkoutFormStore.inputs)) {
        if (key === "interiorPhotos" || key === "exteriorPhotos") continue;

        let val = value;
        if (typeof val === "object" && val !== null) val = value.value;
        form[key] = val;
      }

      return {
        location: location,
        autoRegister: autoRegister,
        form: form,
      };
    };

    const saveInputs = () => {
      if (appStore.isLoading) return;

      const inputs = combineInputs();
      event("saveInputs", { inputs: inputs });
      api.value
        .post(
          {
            action: "saveInputs",
            mode: checkoutGeneralStore.mode,
            inputs: inputs,
          },
          "checkout"
        )
        .catch((e) => {
          console.error(e);
        });
    };

    const bindWatchers = () => {
      watch(
        () => checkoutLocationStore.inputs,
        () => {
          saveInputs();
        },
        { deep: true }
      );

      watch(
        () => checkoutAutoRegisterStore.inputs,
        () => {
          saveInputs();
        },
        { deep: true }
      );

      watch(
        () => checkoutFormStore.inputs,
        () => {
          saveInputs();
        },
        { deep: true }
      );

      watch(
        () => checkoutLocationStore.cityLocation,
        (value) => {
          checkoutLocationStore.inputs.cityCode =
            typeof value == "object" && value !== null ? value.value : value;
        }
      );

      watch(
        () => checkoutLocationStore.streetLocation,
        (value) => {
          checkoutLocationStore.inputs.streetCode =
            typeof value == "object" && value !== null ? value.value : value;
        }
      );

      watch(
        () => checkoutLocationStore.address,
        (value) => {
          checkoutLocationStore.inputs.address =
            typeof value == "object" && value !== null ? value.value : value;
        }
      );

      watch(
        () => checkoutGeneralStore.step,
        () => {
          scrollTop("stepper-mode", 10);
        }
      );

      watch(
        () => tooltips.instruction,
        (value) => {
          event("tooltip", {
            block_name: "instruction",
            action: value ? "show" : "hide",
          });
        }
      );

      watch(
        () => tooltips.price,
        (value) => {
          event("tooltip", {
            block_name: "price",
            action: value ? "show" : "hide",
          });
        }
      );

      watch(
        () => tooltips.quality,
        (value) => {
          event("tooltip", {
            block_name: "quality",
            action: value ? "show" : "hide",
          });
        }
      );

      watch(
        () => tooltips.advantages,
        (value) => {
          event("tooltip", {
            block_name: "advantages",
            action: value ? "show" : "hide",
          });
        }
      );

      watch(
        () => tooltips.security,
        (value) => {
          event("tooltip", {
            block_name: "security",
            action: value ? "show" : "hide",
          });
        }
      );

      watch(
        () => checkoutGeneralStore.scrollTo,
        (newValue) => {
          if (!newValue) {
            return;
          }
          scrollTop(newValue);
          checkoutGeneralStore.scrollTo = null;
        }
      );
    };

    const recursive = (target, data, promises = []) => {
      for (const [key, value] of Object.entries(data)) {
        if (!key in target) continue;

        let targetItem = target[key];
        if (
          typeof value == "object" &&
          value !== null &&
          typeof targetItem == "object" &&
          targetItem !== null
        ) {
          promises.push(
            new Promise((resolve) => {
              recursive(targetItem, value, promises);
              resolve();
            })
          );
        } else {
          target[key] = value;
        }
      }

      return promises;
    };

    const assignState = async (apiData) => {
      return Promise.all([
        ...recursive(appStore, apiData.app),
        ...recursive(checkoutGeneralStore, apiData.general),
        ...recursive(checkoutLocationStore, apiData.location),
        ...recursive(checkoutAutoRegisterStore, apiData.autoRegister),
        ...recursive(checkoutFormStore, apiData.form),
      ]);
    };

    const loadState = async function (mode) {
      return new Promise((resolve) => {
        if (!mode) mode = checkoutGeneralStore.mode;
        appStore.isLoading = true;
        api.value
          .post(
            {
              action: "loadState",
              mode: mode,
            },
            "checkout"
          )
          .then(function (response) {
            assignState(response.data).finally(() => {
              appStore.isLoading = false;
              checkoutFormStore.initialLoading = false;
              resolve();
            });
          });
      });
    };

    const process = async function (skipStepUpdate = false, scrollTo = null) {
      appStore.isLoading = true;
      checkoutGeneralStore.errors = [];
      let inputs = combineInputs();
      event("process", { inputs: inputs });
      api.value
        .post(
          {
            action: "process",
            inputs: inputs,
            mode: checkoutGeneralStore.mode,
          },
          "checkout"
        )
        .then(function (response) {
          let step = response.data.general.step;

          try {
            delete response.data.general.step;
          } catch (e) {
            console.error(e);
            throw e;
          }

          assignState(response.data).finally(() => {
            if (!skipStepUpdate) {
              checkoutGeneralStore.step = step;
            }

            appStore.isLoading = false;
            checkoutGeneralStore.scrollTo = scrollTo;
          });
        })
        .catch((e) => {
          appStore.isLoading = false;
          event("process-error", { inputs: inputs, error: e });
          throw e;
        });
    };

    const confirm = async function () {
      appStore.isLoading = true;
      checkoutGeneralStore.errors = [];
      let inputs = combineInputs();
      event("confirm", { inputs: inputs });
      api.value
        .post(
          {
            action: "confirm",
            inputs: inputs,
            mode: checkoutGeneralStore.mode,
          },
          "checkout"
        )
        .then(function (response) {
          let success = false;

          if (
            response.data.general.successConfirm &&
            response.data.general.orderAccountNumber
          ) {
            router.push({
              name: "order",
              params: {
                orderAccountNumber: response.data.general.orderAccountNumber,
                scrollToTop: "yes",
              },
            });
            success = true;
          }

          if (!success) {
            appStore.isLoading = true;
            assignState(response.data).finally(() => {
              checkoutGeneralStore.scrollTo = "app";
            });
          }
        })
        .finally(() => {
          appStore.isLoading = false;
        });
    };

    bindWatchers();

    onMounted(async () => {
      await loadState(mode);
    });

    provide("checkoutGeneralStore", checkoutGeneralStore);
    provide("checkoutLocationStore", checkoutLocationStore);
    provide("checkoutAutoRegisterStore", checkoutAutoRegisterStore);
    provide("checkoutFormStore", checkoutFormStore);
    provide("loadState", loadState);
    provide("process", process);
    provide("confirm", confirm);

    return {
      checkoutGeneralStore,
      checkoutLocationStore,
      checkoutFormStore,
      modeSwitcherState,
      checkoutAutoRegisterStore,
      tooltips,
    };
  },
});
</script>
<style scoped>
.user-login-avatar a,
.user-login-avatar a:link,
.user-login-avatar a:visited,
.user-login-avatar a:hover,
.user-login-avatar a:focus {
  color: white;
  text-decoration: none;
}
</style>
<style>
.q-stepper--vertical .q-stepper__step-inner {
  padding: 0 12px 16px 30px;
}
.q-stepper--vertical .q-stepper__tab {
  padding: 12px 6px;
}
</style>
