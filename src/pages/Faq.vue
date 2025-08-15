<template>
  <div class="bootstrap-scope">
    <div class="faq-area ptb-80">
      <div class="container">
        <div class="faq-accordion">
          <q-list bordered>
            <q-expansion-item switch-toggle-side class="expansion-item-styles" expand-icon="add">
              <template v-slot:header>
                <div class="expansion-item-styles">
                  <div class="p-3">Чим ваш сервіс може бути корисним?</div>
                </div>
              </template>
              <q-item-section class="expansion-item-section-styles list">
                <q-list bordered>
                  <q-item class="inline-block">
                    <b>Швидкість і зручність:</b> Наш сервіс дозволяє вам оцінити вартість
                    нерухомості в режимі онлайн, що дозволяє економити час на зустрічах з
                    оцінювачами.
                  </q-item>
                  <q-item class="inline-block">
                    <b>Об'єктивність:</b> Наш сервіс базується на алгоритмах, які використовують
                    велику кількість даних, що забезпечує більш об'єктивну оцінку, ніж може дати
                    окремий експерт.
                  </q-item>
                  <q-item class="inline-block">
                    <b>Доступність:</b> Онлайн-сервіс доступний 24/7, тому ви можете отримати оцінку
                    в будь-який зручний для вас час.
                  </q-item>
                  <q-item class="inline-block">
                    <b>Інформованість:</b> Наш сервіс надає додаткову інформацію про ринок
                    нерухомості: пошук схожих оголошень в інтернеті та оцінка вирогідності продажу
                    за часом. Це дозволяє вам зрозуміти, як формується вартість вашої нерухомості.
                  </q-item>
                </q-list>
              </q-item-section>
            </q-expansion-item>

            <q-expansion-item switch-toggle-side class="expansion-item-styles" expand-icon="add">
              <template v-slot:header>
                <div class="expansion-item-styles">
                  <div class="p-3">Як отримати результат оцінки?</div>
                </div>
              </template>
              <q-item-section class="expansion-item-section-styles">
                <div class="p-3">
                  Після оформлення замовлення ви отримаєте результат за декілька хвилин в особистому
                  кабінеті. Також результат оцінки відправляється на електронну пошту, яку ви
                  вказали при оформленні. Рекомендуємо переглядати результат оцінки в особистому
                  кабінеті, тому що там ви можете отримати додаткову інформацію щодо вашої оцінки.
                </div>
              </q-item-section>
            </q-expansion-item>

            <q-expansion-item switch-toggle-side class="expansion-item-styles" expand-icon="add">
              <template v-slot:header>
                <div class="expansion-item-styles">
                  <div class="p-3">Як відновити доступ до особистого кабінету?</div>
                </div>
              </template>
              <q-item-section class="expansion-item-section-styles">
                <div class="p-3">
                  Доступ до особистого кабінету можна відновити за допомогою
                  <router-link :to="{ name: 'auth' }"><b>форми відновлення паролю</b></router-link
                  >.<br />
                  Якщо ви втратили доступ до пошти, яку ви вказали при реєстрації, або втратили
                  доступ до акаунту соціальної мережі, через яку ви реєструвалися, то відновити
                  доступ до особистого кабінету неможливо.<br />
                  Будьте уважні при реєстрації, вказуйте реальну пошту, яку ви використовуєте та
                  пройдіть верифікацію пошти.<br />
                  Це запорука того, що ви зможете отримати результат оцінки та мати доступ до них у
                  майбутньому.
                </div>
              </q-item-section>
            </q-expansion-item>

            <q-expansion-item switch-toggle-side class="expansion-item-styles" expand-icon="add">
              <template v-slot:header>
                <div class="expansion-item-styles">
                  <div class="p-3">Як виглядає зразок результатів оцінки?</div>
                </div>
              </template>
              <q-item-section class="expansion-item-section-styles">
                <div class="p-3">
                  Зразок результатів можно переглянути
                  <router-link :to="{ name: 'manual' }"><b>тут</b></router-link
                  >.
                </div>
              </q-item-section>
            </q-expansion-item>

            <q-expansion-item switch-toggle-side class="expansion-item-styles" expand-icon="add">
              <template v-slot:header>
                <div class="expansion-item-styles">
                  <div class="p-3">Наскільки точні результати оцінки?</div>
                </div>
              </template>
              <q-item-section class="expansion-item-section-styles">
                <div class="p-3">
                  Якість оцінки залежить від кількості доступної інформації в районі розташування
                  нерухомості, яку ви хочете оцінити.<br />
                  На етапі вибору місцезнаходження ви зможете заздалегідь дізнатися наскільки
                  достовірна буде оцінка та чи можлива оцінка взагалі. <br />
                  <picture>
                    <img
                      src="~assets/pages/manual/2.jpg"
                      alt="Перевірка якості оцінки нерухомості за місцезнаходженням"
                    />
                    <br />
                  </picture>
                  Ми цінуємо ваш час та свою репутацію. Якщо якість оцінки буде посередньою або
                  оцінка буде взагалі неможлива, ми вам одразу про це повідомимо. <br />
                </div>
              </q-item-section>
            </q-expansion-item>

            <q-expansion-item switch-toggle-side class="expansion-item-styles" expand-icon="add">
              <template v-slot:header>
                <div class="expansion-item-styles">
                  <div class="p-3">Скільки коштує оцінка?</div>
                </div>
              </template>
              <q-item-section class="expansion-item-section-styles">
                <div class="p-3">Безкоштовно.</div>
              </q-item-section>
            </q-expansion-item>

            <q-expansion-item switch-toggle-side class="expansion-item-styles" expand-icon="add">
              <template v-slot:header>
                <div class="expansion-item-styles">
                  <div class="p-3">Чи не потрапляють мої особисті дані до третіх осіб?</div>
                </div>
              </template>
              <q-item-section class="expansion-item-section-styles">
                <div class="p-3">
                  Наш сервіс ніколи не передає ваші персональні дані третім особам.<br />
                  —
                  <router-link :to="{ name: 'terms-and-conditions' }"
                    ><b>Умови користування сервісом</b></router-link
                  >
                  <br />
                  —
                  <router-link :to="{ name: 'privacy-policy' }"
                    ><b>Політика конфіденційності</b></router-link
                  >
                </div>
              </q-item-section>
            </q-expansion-item>

            <q-expansion-item switch-toggle-side class="expansion-item-styles" expand-icon="add">
              <template v-slot:header>
                <div class="expansion-item-styles">
                  <div class="p-3">Чи не потрапляють дані про нерухомість до третіх осіб?</div>
                </div>
              </template>
              <q-item-section class="expansion-item-section-styles">
                <div class="p-3">
                  Наш сервіс ніколи не передає дані про нерухомість третім особам.<br />
                  —
                  <router-link :to="{ name: 'terms-and-conditions' }"
                    ><b>Умови користування сервісом</b></router-link
                  >
                  <br />
                  —
                  <router-link :to="{ name: 'privacy-policy' }"
                    ><b>Політика конфіденційності</b></router-link
                  >
                </div>
              </q-item-section>
            </q-expansion-item>
          </q-list>
          <div class="col-12 text-center mt-5">
            <router-link :to="{ name: 'estimate' }" class="btn btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-home"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Перейти до оцінки
            </router-link>
          </div>
          <div class="row row-mt-5">
            <div class="col-12 text-center mt-5">
              <h3>
                <a href="#" class="btn btn-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-help-circle"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12" y2="17"></line>
                  </svg>
                  Задати питання службі підтримки
                </a>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useMeta, QExpansionItem, QList } from 'quasar';
import Header from 'components/Layout/Header.vue';

export default defineComponent({
  name: 'Faq',
  components: { Header, QList, QExpansionItem },
  setup() {
    const metaData = {
      title: 'Часті питання FAQ сервіса онлайн оцінки нерухомості — Estimate Real Estate',
      meta: {
        description: {
          name: 'description',
          content: 'Часті питання сервіса онлайн оцінки нерухомості',
        },
        keywords: {
          name: 'keywords',
          content: 'Часті питання сервіса онлайн оцінки нерухомості',
        },
        robots: { name: 'robots', content: 'index, follow' },
      },
    };
    useMeta(metaData);
  },
});
</script>
<style lang="scss" scoped>
.expansion-item-styles {
  text-decoration: none;
  color: #0e314c;
  position: relative;
  border-bottom: 1px solid #ffffff;
  background: #f5f9ff;
  font-size: 16px;
  font-weight: 500;
  margin: 0;
}
.expansion-item-styles > div {
  padding-left: 40px !important;
}
.expansion-item-section-styles > div {
  background-color: #fffcff;
  margin: 10px;
  padding: 10px;
  border: 1px solid $separator-color;
}
.faq-accordion .row.row-mt-5 {
  margin-top: 10px !important;
}
</style>
<style lang="scss">
.faq-accordion .row,
.faq-accordion .row > * {
  margin: 0 !important;
}
.faq-accordion .q-item {
  padding: 0 !important;
}
.faq-accordion .q-item__section--avatar {
  z-index: 1;
  position: absolute;
  height: 100%;
  padding: 0;
}
</style>
