<template><div></div></template>

<script>
import { defineComponent } from 'vue';
import { useMeta } from 'quasar';

const metaData = {
  title: 'Оцінка вартості нерухомості онлайн в Україні — Estimate Real Estate',
  meta: {
    description: {
      name: 'description',
      content:
        'Оцінка вартості нерухомості, оцінка вартості квартири, оцінка вартості приватного будиннку, онлайн оцінка нерухомості в Україні',
    },
    keywords: {
      name: 'keywords',
      content: 'оцінка нерухомості, оцінка вартості квартири, оцінка вартості будинку',
    },
    robots: { name: 'robots', content: 'index, follow' },
  },
};

export default defineComponent({
  name: 'Index',
  setup() {
    useMeta(metaData);
  },
});
</script>
