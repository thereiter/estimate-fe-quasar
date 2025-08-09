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
          <q-item clickable v-ripple class="row-fix" :to="{ name: menuItem.name }">
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>

            <q-item-section>{{ menuItem.label }}</q-item-section>
          </q-item>
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
    label: 'Інструкція',
    name: 'manual',
  },
  {
    icon: 'send',
    label: 'Переваги',
    name: 'advantages',
  },
  {
    icon: 'delete',
    label: 'Ціни',
    name: 'price',
  },
  {
    icon: 'error',
    label: 'Часті питання',
    name: 'faq',
  },
  {
    icon: 'settings',
    label: 'Оцінити квартиру',
    name: 'flat-sale',
  },
  {
    icon: 'feedback',
    label: 'Оцінити приватний будинок',
    name: 'house-sale',
  },
  {
    icon: 'help',
    label: 'Оцінити аренду квартири',
    name: 'flat-rent',
  },
  {
    icon: 'help',
    label: 'Оцінити аренду приватного будинку',
    name: 'house-rent',
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
