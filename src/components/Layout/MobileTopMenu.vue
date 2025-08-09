<template>
  <q-btn
    flat
    @click="drawer = !drawer"
    color="primary"
    :class="drawer ? 'primary-green' : 'primary-white'"
    square
    dense
    stack
    icon="menu"
    padding="none"
    size="xl"
  />
  <q-drawer
    v-model="drawer"
    show-if-above
    :width="280"
    :breakpoint="991"
    bordered
    overlay
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
  >
    <q-scroll-area class="fit">
      <q-list>
        <template v-for="(menuItem, index) in menuList" :key="index">
          <q-item clickable v-ripple class="row-fix">
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>

            <q-item-section>{{ menuItem.label }}</q-item-section>
          </q-item>
          <q-separator :key="'sep' + index" v-if="menuItem.separator" />
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { ref } from 'vue';

const menuList = [
  {
    icon: 'inbox',
    label: 'Inbox',
    separator: true,
  },
  {
    icon: 'send',
    label: 'Outbox',
    separator: false,
  },
  {
    icon: 'delete',
    label: 'Trash',
    separator: false,
  },
  {
    icon: 'error',
    label: 'Spam',
    separator: true,
  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false,
  },
  {
    icon: 'feedback',
    label: 'Send Feedback',
    separator: false,
  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
    separator: false,
  },
];

export default {
  setup() {
    return {
      drawer: ref(false),
      menuList,
    };
  },
};
</script>
<style scoped>
.row-fix,
.row-fix > * {
  width: auto;
}
</style>
