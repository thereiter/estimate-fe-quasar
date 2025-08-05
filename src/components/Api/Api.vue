<template>
  <Captcha v-if="false" ref="captchaRef" @verify="captchaCallback"></Captcha>
</template>

<script>
import { onMounted, ref, inject } from "vue";
import Captcha from "components/Api/Captcha.vue";
import axios from "axios";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { query } from "vue-gtag";
import pTimeout from "p-timeout";

export default {
  name: "FormApi",
  components: {
    Captcha,
  },
  setup() {
    //axios
    const apiBaseUrl = inject("apiBaseUrl");
    const appStore = inject("appStore");
    const token = inject("token");
    const $q = useQuasar();
    const api = axios.create({ baseURL: apiBaseUrl, withCredentials: true });
    const { t } = useI18n({});

    api.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        appStore.isLoading = false;
        throw error;
      }
    );

    api.interceptors.response.use(
      (response) => {
        token.value = response.headers["x-token"];
        return response;
      },
      (error) => {
        $q.notify({
          multiLine: true,
          type: "negative",
          icon: "error",
          message: t("networkUnknownError"),
          position: "center",
          timeout: 5000,
          actions: [{ icon: "close", color: "white" }],
        });
        console.error(error);
        appStore.isLoading = false;
      }
    );

    const inProcess = ref(false);
    const captchaRef = ref(null);

    let captchaComponent = null;
    onMounted(() => {
      captchaComponent = captchaRef.value;
    });

    const runCaptcha = async () => {
      await captchaComponent.execute();
    };

    let dynamicCallback = null;
    const setCallback = async (callback) => {
      dynamicCallback = callback;
    };

    const captchaCallback = async (recaptchaCode) => {
      dynamicCallback(recaptchaCode);
    };

    const getClientId = new Promise((resolve) => {
      query(
        "get",
        import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
        "client_id",
        resolve
      );
    });

    const getGclid = new Promise((resolve) => {
      query("get", import.meta.env.VITE_GOOGLE_ANALYTICS_ID, "gclid", resolve);
    });

    let clientId = null;
    let gclid = null;

    const resolveMeasurementData = async () => {
      clientId = await pTimeout(getClientId, {
        milliseconds: 500,
        fallback: () => {
          return false;
        },
      });

      gclid = await pTimeout(getGclid, {
        milliseconds: 500,
        fallback: () => {
          return false;
        },
      });
    };

    const post = async (
      data,
      path,
      withRecaptcha = false,
      axiosInstance = null
    ) => {
      if (inProcess.value && withRecaptcha) return;
      data = data || {};
      if (clientId !== false && gclid !== false) {
        await resolveMeasurementData();
      }
      data["clientId"] = clientId;
      data["gclid"] = gclid;
      inProcess.value = true;

      return new Promise(function (resolve, reject) {
        const client = axiosInstance || api;
        setCallback((recaptchaCode) => {
          if (recaptchaCode) data["g-recaptcha-response"] = recaptchaCode;

          client
            .post(null, data, { params: { path: path } })
            .then((response) => resolve(response))
            .catch((err) => reject(err))
            .finally(() => {
              inProcess.value = false;
            });
        });

        //disable for now
        if (withRecaptcha && false) runCaptcha();
        else dynamicCallback();
      });
    };

    const postSimple = async (data, path, axiosInstance = null) => {
      data = data || {};
      if (clientId !== false && gclid !== false) {
        await resolveMeasurementData();
      }
      data["clientId"] = clientId;
      data["gclid"] = gclid;
      return new Promise(async function (resolve, reject) {
        const client = axiosInstance || api;
        client
          .post(null, data, { params: { path: path } })
          .then((response) => resolve(response))
          .catch((err) => reject(err));
      });
    };

    return {
      captchaRef,
      captchaCallback,
      post,
      postSimple,
    };
  },
};
</script>

<style scoped></style>
