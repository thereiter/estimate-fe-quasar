<template>
  <div class="pricing-area ptb-80 bg-f9f6f6">
    <div class="container">
      <div class="section-title">
        <h2>Безкоштовно</h2>
        <div class="bar"></div>
        <h5>Поки триває війна з російськими загарбниками, наш сервіс працює безкоштовно.</h5>
        <br />
        <p>
          <a href="https://bank.gov.ua/ua/about/support-the-armed-forces" class="btn btn-primary">
            Перерахувати кошти на підтримку ЗСУ
          </a>
        </p>
        <br />
        <p>
          <router-link :to="{ name: 'estimate' }" class="btn btn-secondary">
            Оцінити нерухомість
          </router-link>
        </p>
      </div>
    </div>

    <div class="shape8 rotateme">
      <img src="~assets/img/shape2.svg" alt="shape" />
    </div>
    <div class="shape2 rotateme">
      <img src="~assets/img/shape2.svg" alt="shape" />
    </div>
    <div class="shape7">
      <img src="~assets/img/shape4.svg" alt="shape" />
    </div>
    <div class="shape4">
      <img src="~assets/img/shape4.svg" alt="shape" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useMeta } from 'quasar';

export default defineComponent({
  name: 'Price',
  setup() {
    const metaData = {
      title: 'Вартість оцінки онлайн нерухомості — Estimate Real Estate',
      meta: {
        description: {
          name: 'description',
          content: 'Вартість оцінки онлайн нерухомості',
        },
        keywords: {
          name: 'keywords',
          content: 'Вартість оцінки онлайн нерухомості',
        },
        robots: { name: 'robots', content: 'index, follow' },
      },
    };
    useMeta(metaData);
  },
});
</script>
