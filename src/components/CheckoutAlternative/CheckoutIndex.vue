<template>
  <div v-if="!checkoutFormStore.initialLoading">
    <Mode ref="modeComponent" id="stepper-mode" class="q-mt-md"></Mode>
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
  nextTick,
  isProxy,
  toRaw,
} from "vue";
import Mode from "components/CheckoutAlternative/Mode.vue";
import {
  initCheckoutGeneralStore,
  initCheckoutLocationStore,
  initCheckoutFormStore,
  initAutoRegisterStore,
} from "stores/checkout";
import { useRouter } from "vue-router";
import { event } from "vue-gtag";
import CheckoutHeader from "components/CheckoutAlternative/CheckoutHeader.vue";

export default defineComponent({
  name: "CheckoutIndex",
  components: {
    CheckoutHeader,
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

    const mode = unref(props.mode);
    checkoutGeneralStore.mode = mode;
    const changeMode = (newMode) => {
      router.push({ name: newMode.replace("_", "-") });
    };

    const modeComponent = ref(null);

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
        if (key === "interiorPhotos" || key === "exteriorPhotos") {
          if (!isProxy(value)) {
            continue;
          }

          form[key + "Uploaded"] = toRaw(value);
          continue;
        }

        if (isProxy(value)) {
          form[key] = toRaw(value);
          continue;
        }

        form[key] = value;
      }

      let errors = {};
      if (modeComponent.value) {
        errors = modeComponent.value.getCombinedErrors();
      }

      return {
        location: location,
        autoRegister: autoRegister,
        form: form,
        errors: errors,
      };
    };

    const saveInputs = () => {
      if (appStore.isLoading) return;

      const inputs = combineInputs();

      logAction(inputs);
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
        () => checkoutGeneralStore.step,
        () => {
          //   scrollTop("stepper-mode", 10);
        }
      );

      watch(
        () => checkoutGeneralStore.scrollTo,
        (newValue) => {
          if (!newValue) {
            return;
          }
          // scrollTop(newValue);
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

    const process = function () {
      checkoutGeneralStore.errors = [];
      let inputs = combineInputs();
      event("process", { inputs: inputs });
      logAction(inputs);

      return new Promise((resolve, reject) => {
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
            resolve(response.data);
          })
          .catch((e) => {
            event("process-error", { inputs: inputs, error: e });
            reject(e);
          });
      });
    };

    const confirm = function () {
      checkoutGeneralStore.errors = [];
      let inputs = combineInputs();
      event("confirm", { inputs: inputs });
      logAction(inputs);

      return new Promise((resolve, reject) => {
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
            resolve(response.data);
          })
          .catch((e) => {
            event("confirm-error", { inputs: inputs, error: e });
            reject(e);
          });
      });
    };

    bindWatchers();

    function waitForElementToExist(selector) {
      return new Promise((resolve) => {
        if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(() => {
          if (document.querySelector(selector)) {
            resolve(document.querySelector(selector));
            observer.disconnect();
          }
        });

        observer.observe(document.body, {
          subtree: true,
          childList: true,
        });
      });
    }

    const scrollToAuth = () => {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("to") === "auth") {
        nextTick(() => {
          const authBlock = document.querySelector(".auth-step-block");
          if (!authBlock) {
            return;
          }
          authBlock.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
          window.history.pushState(
            {},
            document.title,
            window.location.pathname
          );
        });
      }
    };

    const logAction = (inputs) => {
      if (!inputs) {
        inputs = combineInputs();
      }

      api.value
        .post(
          {
            action: "logAction",
            mode: checkoutGeneralStore.mode,
            inputs: inputs,
          },
          "actionLog"
        )
        .catch((e) => {
          console.error(e);
        });
    };

    onMounted(() => {
      loadState(mode).then(() => {
        nextTick(() => {
          waitForElementToExist(".auth-step-block").then((elm) => {
            setTimeout(() => {
              scrollToAuth();
            }, 1000);
          });
        });
      });
    });

    provide("checkoutGeneralStore", checkoutGeneralStore);
    provide("checkoutLocationStore", checkoutLocationStore);
    provide("checkoutAutoRegisterStore", checkoutAutoRegisterStore);
    provide("checkoutFormStore", checkoutFormStore);
    provide("loadState", loadState);
    provide("process", process);
    provide("confirm", confirm);
    provide("recursive", recursive);
    provide("assignState", assignState);
    provide("logAction", logAction);

    return {
      checkoutGeneralStore,
      checkoutLocationStore,
      checkoutFormStore,
      checkoutAutoRegisterStore,
      modeComponent,
      mode: props.mode,
      changeMode,
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
