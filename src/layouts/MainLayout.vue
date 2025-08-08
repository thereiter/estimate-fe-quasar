<template>
  <q-layout view="lhr lpR lFr">
    <Header />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import Header from 'components/Layout/Header.vue';
</script>
