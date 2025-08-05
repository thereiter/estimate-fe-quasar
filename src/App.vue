<template>
  <router-view></router-view>
  <Api ref="apiRef"></Api>
</template>
<script lang="ts">
import { defineComponent, provide, readonly, ref, watch } from "vue";
import { appStore } from "stores/reactive-store";
import { useQuasar } from "quasar";
import Api from "components/Api/Api.vue";
import { io } from "socket.io-client";
import mitt from "mitt";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "App",
  components: {
    Api,
  },
  setup() {
    const $q = useQuasar();
    const apiRef = ref(null);
    const apiBaseUrl = `api/index`;
    const token = ref(null);

    const webSocketConnection = {
      instance: null,
      getInstance: async function (reconnect = false) {
        if (this.instance === null || reconnect) {
          this.instance = io.connect("wss://" + import.meta.env.VITE_APP_HOST, {
            path: "/ws/",
            autoConnect: false,
            transports: ["websocket", "polling"],
          });

          await this.bindBasicEvents(this.instance);
          await this.instance.connect();
        }

        return this.instance;
      },
      bindBasicEvents: async function (instance) {
        instance.on("connect", () => {
          console.log("connection established");
        });

        instance.on("order-updated", (data) => {
          emitter.emit("order-updated", data);
        });
      },
    };

    watch(
      () => appStore.isLoading,
      (newState) => {
        let el = document.getElementById("estimate-app-container-loader");
        let app = document.getElementById("app");
        if (newState) {
          $q.loading.show({
            delay: 0, // ms
          });

          if (el && app) {
            if (app.childNodes.length === 0) {
              el.style.display = "block";
            }
          }
        } else {
          $q.loading.hide();
          if (el) {
            el.style.display = "none";
          }
        }
      }
    );

    watch(
      () => appStore.login,
      (newState, oldState) => {
        try {
          if (newState !== oldState && newState) {
            for (let item of document.getElementsByClassName(
              "header-personal-url"
            )) {
              item.href = `https://${
                import.meta.env.VITE_APP_HOST
              }/estimate/personal/`;
            }

            for (let item of document.getElementsByClassName(
              "header-personal-link-text"
            )) {
              if (appStore.login.length > 14) {
                item.innerText = appStore.login.slice(0, 14) + "...";
              } else {
                item.innerText = appStore.login;
              }
            }
          }
        } catch (e) {
          console.error(e);
          throw e;
        }
      }
    );

    watch(
      token,
      async (newValue, oldValue) => {
        if (newValue !== oldValue) {
          webSocketConnection
            .getInstance()
            .then((instance) =>
              instance.emit("token-changed", { token: newValue })
            );
        }
      },
      { immediate: false }
    );

    watch(
      () => appStore.errors,
      (newValue) => {
        if (!Array.isArray(newValue)) return;
        if (newValue.length <= 0) return;

        for (const error of newValue) {
          $q.notify({
            multiLine: true,
            type: "negative",
            icon: "error",
            message: error,
            position: "center",
            timeout: 5000,
            actions: [{ icon: "close", color: "white" }],
          });
        }
      },
      { deep: true }
    );

    const parentPageTitle = ref(null);
    const changeParentTitleText = (newText) => {
      if (newText === null) return;
      let element = document.querySelector(".page-title-area h2");
      if (!element) return;

      element.innerText = newText;
    };
    watch(
      () => parentPageTitle.value,
      (newValue) => {
        changeParentTitleText(newValue);
      }
    );

    const loadAuthState = () => {
      return new Promise((resolve) => {
        appStore.isLoading = true;
        apiRef.value
          .postSimple(
            {
              action: "standalone-state",
            },
            "auth"
          )
          .then(function (response) {
            appStore.isAuthorized = response.data.isAuthorized;
            appStore.login = response.data.login;
            appStore.userId = response.data.userId;
            appStore.token = response.data.token;
          })
          .catch((e) => {
            console.error(e);
            $q.notify({
              multiLine: true,
              type: "negative",
              icon: "upload",
              message: t("authUnknownError"),
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

    const emitter = mitt();

    const termsAndConditionsHref = "/terms-and-conditions/";

    const privacyPolicyHref = "/privacy-policy/";

    provide("appStore", appStore);
    provide("apiBaseUrl", apiBaseUrl);
    provide("loadAuthState", loadAuthState);
    provide("api", readonly(apiRef));
    provide("parentPageTitle", parentPageTitle);
    provide("token", token);
    provide("emitter", emitter);
    provide("assetsPath", import.meta.env.VITE_ASSET_PATH);
    provide("imagesPathWebServer", import.meta.env.VITE_IMG_PATH);
    provide("termsAndConditionsHref", termsAndConditionsHref);
    provide("privacyPolicyHref", privacyPolicyHref);

    const router = useRouter();

    router.beforeEach((to, from, next) => {
      appStore.isLoading = true;
      next();
    });

    router.afterEach(() => {
      appStore.isLoading = false;
    });

    return {
      apiRef,
    };
  },
});
</script>
<style>
body .material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  font-size: 24px;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: "liga";
}
@media (max-width: 991px) {
  #app div.q-pa-md {
    padding: 3px;
  }
}
</style>
