<template>
  <q-btn
    flat
    @click="drawer = !drawer"
    color="primary"
    :class="{
      'primary-green': drawer,
      'primary-white': !drawer && templateGlobalsState.isDarkMode && !isSticky,
      'primary-black': !drawer && (isSticky || !templateGlobalsState.isDarkMode),
    }"
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
        <q-item @click="handleLogoClick" clickable class="block">
          <q-item-section>
            <q-img src="~assets/img/logo_black_200.webp" position="center" fit="none" alt="logo" />
          </q-item-section>
        </q-item>
        <template v-for="(menuItem, index) in menuList" :key="index">
          <q-item clickable v-ripple class="" :to="{ name: menuItem.name }">
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

<script setup lang="ts">
defineProps({
  isSticky: {
    type: Boolean,
    default: false,
  },
});
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTemplateGlobals } from 'stores/template-globals.js';
const templateGlobalsState = useTemplateGlobals();
const router = useRouter();
const handleLogoClick = () => {
  drawer.value = false;
  router.push({ name: 'app-entry' });
};

const menuList = [
  {
    icon: 'description',
    label: 'Інструкція',
    name: 'manual',
  },
  {
    icon: 'star',
    label: 'Переваги',
    name: 'advantages',
  },
  {
    icon: 'attach_money',
    label: 'Ціни',
    name: 'price',
  },
  {
    icon: 'help_outline',
    label: 'Часті питання',
    name: 'faq',
  },
  {
    icon: 'apartment',
    label: 'Оцінити квартиру',
    name: 'flat-sale',
  },
  {
    icon: 'home',
    label: 'Оцінити приватний будинок',
    name: 'house-sale',
  },
  {
    icon: 'business',
    label: 'Оцінити аренду квартири',
    name: 'flat-rent',
  },
  {
    icon: 'villa',
    label: 'Оцінити аренду приватного будинку',
    name: 'house-rent',
  },
];

const drawer = ref(false);
</script>
<style scoped>
.,
. > * {
  width: auto;
}
</style>
