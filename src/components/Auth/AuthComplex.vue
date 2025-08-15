<template>
  <q-card>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <template v-if="loginBlockFirst">
        <q-tab name="login" :label="$t('authComplexLoginTabName')" icon="login" />
        <q-tab name="register" :label="$t('authComplexRegisterTabName')" icon="app_registration" />
      </template>
      <template v-else>
        <q-tab name="register" :label="$t('authComplexRegisterTabName')" icon="app_registration" />
        <q-tab name="login" :label="$t('authComplexLoginTabName')" icon="login" />
      </template>
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated :keep-alive="true">
      <template v-if="loginBlockFirst">
        <q-tab-panel name="login">
          <Login @login-result="$emit('login-result', $event)"></Login>
        </q-tab-panel>

        <q-tab-panel name="register">
          <Register
            @register-result="$emit('register-result', $event)"
            @switch-to-login="switchToLoginEvent"
          ></Register>
        </q-tab-panel>
      </template>
      <template v-else>
        <q-tab-panel name="register">
          <Register
            @register-result="$emit('register-result', $event)"
            @switch-to-login="switchToLoginEvent"
          ></Register>
        </q-tab-panel>

        <q-tab-panel name="login">
          <Login @login-result="$emit('login-result', $event)"></Login>
        </q-tab-panel>
      </template>
    </q-tab-panels>
  </q-card>
</template>

<script>
import { ref } from 'vue';
import Register from 'components/Auth/Register.vue';
import Login from 'components/Auth/Login.vue';

export default {
  name: 'AuthComplex',
  components: { Login, Register },
  emits: ['register-result'],
  props: {
    loginBlockFirst: {
      type: Boolean,
    },
  },
  setup(props) {
    const tab = ref(props.loginBlockFirst ? 'login' : 'register');

    const switchToLoginEvent = () => {
      tab.value = 'login';
    };

    return {
      tab,
      loginBlockFirst: props.loginBlockFirst,
      switchToLoginEvent,
    };
  },
};
</script>
