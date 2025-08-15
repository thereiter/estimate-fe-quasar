<script setup lang="ts">
import { User, Home } from 'lucide-vue-next';
import { useTemplateGlobals } from 'stores/template-globals';
import { useAuthStore } from 'stores/auth';
import TopMenu from 'components/Layout/TopMenu.vue';
import { onMounted, ref } from 'vue';
import { QScrollObserver, type QScrollObserverProps } from 'quasar';
import { scroll } from 'quasar';
import MobileTopMenu from 'components/Layout/MobileTopMenu.vue';
import { useRouter } from 'vue-router';
const { getVerticalScrollPosition, getScrollTarget } = scroll;
const router = useRouter();
const templateGlobalsState = useTemplateGlobals();
const authStore = useAuthStore();

const isSticky = ref<boolean>(false);
const sectionTitle = ref<string | null>(router.currentRoute.value.meta.sectionTitle);
router.afterEach((to) => {
  sectionTitle.value = to.meta.sectionTitle;
});
onMounted(() => {
  const body = document.body;
  if (!body) return;

  const scrollTarget = getScrollTarget(body);

  if (!scrollTarget) return;

  isSticky.value = getVerticalScrollPosition(scrollTarget) > 0;
});

const scrollHandler: QScrollObserverProps['onScroll'] = (details) => {
  if (!details) return;
  isSticky.value = details.position.top > 0;
};
</script>

<template>
  <div class="bootstrap-scope">
    <header
      ref="header"
      class="header-container headroom"
      :class="{ 'is-dark-mode': templateGlobalsState.isDarkMode, 'is-sticky': isSticky }"
    >
      <q-scroll-observer axis="vertical" @scroll="scrollHandler" debounce="50" />
      <div class="startp-responsive-nav">
        <div class="container">
          <div class="startp-responsive-menu">
            <div class="logo">
              <router-link :to="{ name: 'app-entry' }">
                <div class="inline-block">
                  <picture>
                    <source srcset="~assets/img/logo_black_200.webp" type="image/webp" />
                    <img class="logo-black" src="~assets/img/logo_black_200.png" alt="logo" />
                  </picture>
                  <picture>
                    <source srcset="~assets/img/logo_black_200_mob.webp" type="image/webp" />
                    <img
                      class="logo-black-mob"
                      src="~assets/img/logo_black_200_mob.png"
                      alt="logo"
                    />
                  </picture>
                </div>
                <div v-if="templateGlobalsState.isDarkMode" class="inline-block">
                  <picture>
                    <source srcset="~assets/img/logo_white_200.webp" type="image/webp" />
                    <img class="logo-white" src="~assets/img/logo_white_200.png" alt="logo" />
                  </picture>
                  <picture>
                    <source srcset="~assets/img/logo_white_200_mob.webp" type="image/webp" />
                    <img
                      class="logo-white-mob"
                      src="~assets/img/logo_white_200_mob.png"
                      alt="logo"
                    />
                  </picture>
                </div>
              </router-link>

              <div class="startp-nav">
                <div class="container-fluid flex">
                  <nav class="navbar navbar-expand-md navbar-light">
                    <div class="others-option">
                      <div v-if="authStore.isAuthorized" class="inline-block">
                        <router-link
                          :to="{ name: 'personal' }"
                          :class="{ active: templateGlobalsState.isActivePage }"
                          class="header-personal-url cabinet-header btn btn-light header-button"
                        >
                          <User />
                          <span class="header-personal-link-text link-text header-login">
                            {{ authStore.email }}
                          </span>
                        </router-link>
                      </div>
                      <div class="inline-block" v-else>
                        <router-link
                          :to="{ name: 'auth' }"
                          :class="{ active: templateGlobalsState.isActivePage }"
                          class="header-personal-url cabinet-header btn btn-light header-button"
                        >
                          <User />
                          <span class="header-personal-link-text link-text">
                            Особистий кабінет
                          </span>
                        </router-link>
                      </div>
                      <router-link
                        :to="{ name: 'estimate' }"
                        :class="{ active: templateGlobalsState.isActivePage }"
                        class="btn btn-light header-button"
                      >
                        <Home />
                        <span class="link-text"> Оцінити </span>
                      </router-link>
                    </div>
                  </nav>
                  <MobileTopMenu :isSticky="isSticky" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="startp-nav">
        <div class="container-fluid">
          <nav class="navbar navbar-expand-md navbar-light">
            <router-link class="navbar-brand" :to="{ name: 'app-entry' }">
              <div class="inline-block">
                <picture>
                  <source srcset="~assets/img/logo_black_200.webp" type="image/webp" />
                  <img class="logo-black" src="~assets/img/logo_black_200.png" alt="logo" />
                </picture>
                <picture>
                  <source srcset="~assets/img/logo_black_200_mob.webp" type="image/webp" />
                  <img class="logo-black-mob" src="~assets/img/logo_black_200_mob.png" alt="logo" />
                </picture>
              </div>
              <div v-if="templateGlobalsState.isDarkMode" class="inline-block">
                <picture>
                  <source srcset="~assets/img/logo_white_200.webp" type="image/webp" />
                  <img class="logo-white" src="~assets/img/logo_white_200.png" alt="logo" />
                </picture>
                <picture>
                  <source srcset="~assets/img/logo_white_200_mob.webp" type="image/webp" />
                  <img class="logo-white-mob" src="~assets/img/logo_white_200_mob.png" alt="logo" />
                </picture>
              </div>
            </router-link>

            <TopMenu />
            <div class="others-option">
              <div v-if="authStore.isAuthorized" class="inline-block">
                <router-link
                  :to="{ name: 'personal' }"
                  :class="{ active: templateGlobalsState.isActivePage }"
                  class="header-personal-url cabinet-header btn btn-light header-button"
                >
                  <User />
                  <span class="header-personal-link-text header-login">
                    {{ authStore.email }}
                  </span>
                </router-link>
              </div>
              <div v-else class="inline-block">
                <router-link
                  :to="{ name: 'auth' }"
                  :class="{ active: templateGlobalsState.isActivePage }"
                  class="header-personal-url cabinet-header btn btn-light header-button"
                >
                  <User />
                  <span class="header-personal-link-text"> Особистий кабінет </span>
                </router-link>
              </div>

              <router-link
                :to="{ name: 'estimate' }"
                :class="{ active: templateGlobalsState.isActivePage }"
                class="btn btn-light header-button"
              >
                <Home />
                <span class="link-text"> Оцінити </span>
              </router-link>
            </div>
          </nav>
        </div>
      </div>
    </header>
    <div class="bigdata-analytics-banner" v-if="templateGlobalsState.isIndexPage">
      <div class="container">
        <div class="bigdata-analytics-content">
          <h1>
            Оцінка нерухомості онлайн <br />
            із використанням <br />штучного інтелекту
          </h1>
          <p>
            Отримайте за 5 хвилин точну оцінку вартості квартири, приватного будинку або оренди
            нерухомості. <br />Доступно, швидко та якісно.
            <router-link :to="{ name: 'flat-sale' }" class="btn btn-primary">
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
                style="vertical-align: bottom; margin-right: 5px"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Оцінити вартість квартири
            </router-link>
            <router-link :to="{ name: 'house-sale' }" class="btn btn-primary">
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
                style="vertical-align: bottom; margin-right: 5px"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Оцінити вартість приватного будинку
            </router-link>
            <router-link :to="{ name: 'manual' }" class="btn btn-primary">
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
                style="vertical-align: bottom; margin-right: 5px"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12" y2="17"></line>
              </svg>
              Інструкція
            </router-link>
            <router-link :to="{ name: 'advantages' }" class="btn btn-primary">
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
                class="feather feather-thumbs-up"
                style="vertical-align: bottom; margin-right: 5px"
              >
                <path
                  d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                ></path>
              </svg>
              Переваги
            </router-link>
          </p>
        </div>
      </div>

      <div class="header-index banner-boxes-area">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-12 col-sm-12">
              <div class="single-banner-boxes">
                <div class="icon">
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
                    class="feather feather-code"
                  >
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
                <h3>Просто та легко</h3>
                <p>
                  Отримайте точну оцінку за 5 хвилин просто заповнивши форму на сайті та
                  завантаживши декілька фотографій.
                </p>
              </div>
            </div>

            <div class="col-lg-4 col-md-12 col-sm-12">
              <div class="single-banner-boxes">
                <div class="icon">
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
                    class="feather feather-users"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3>Точно та актуально</h3>
                <p>
                  Щоденне оновлення інформації ринка нерухомості. Відсутність людського фактору.
                  Машинна точність.
                </p>
              </div>
            </div>

            <div class="col-lg-4 col-md-12 col-sm-12">
              <div class="single-banner-boxes">
                <div class="icon">
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
                    class="feather feather-server"
                  >
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                    <line x1="6" y1="6" x2="6" y2="6"></line>
                    <line x1="6" y1="18" x2="6" y2="18"></line>
                  </svg>
                </div>
                <h3>Сучасні технології</h3>
                <p>
                  Сучасні підходи в обробці даних. Машинне навчання та штучний інтелект для
                  максимального точного аналізу ринку.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Start Page Title -->
    <div
      class="page-title-area"
      v-if="!templateGlobalsState.isEstimatePage && !templateGlobalsState.isIndexPage"
    >
      <div class="d-table">
        <div class="d-table-cell">
          <div class="container">
            <h2>{{ sectionTitle }}</h2>
          </div>
        </div>
      </div>

      <div class="shape1"><img src="~assets/img/shape1.png" alt="shape" /></div>
      <div class="shape2 rotateme"><img src="~assets/img/shape2.svg" alt="shape" /></div>
      <div class="shape3"><img src="~assets/img/shape3.svg" alt="shape" /></div>
      <div class="shape4"><img src="~assets/img/shape4.svg" alt="shape" /></div>
      <div class="shape5"><img src="~assets/img/shape5.png" alt="shape" /></div>
      <div class="shape6 rotateme"><img src="~assets/img/shape4.svg" alt="shape" /></div>
      <div class="shape7"><img src="~assets/img/shape4.svg" alt="shape" /></div>
      <div class="shape8 rotateme"><img src="~assets/img/shape2.svg" alt="shape" /></div>
    </div>
    <!-- End Page Title -->
    <div class="cta-area pt-3 pb-3" v-if="!templateGlobalsState.isEstimatePage">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-1">
            <div class="cta-content glory-to-ukraine">
              <img
                src="~assets/img/ukraine.png"
                alt="Stand with Ukraine!"
                style="max-width: 50px"
              />
            </div>
          </div>

          <div class="col-10">
            <div class="cta-content glory-to-ukraine">
              <h3 class="text-center">Сайт працює безкоштовно до перемоги</h3>
            </div>
          </div>

          <div class="col-sm-1 uk-flag-right">
            <div class="cta-content float">
              <img
                class="float-right"
                src="~assets/img/ukraine.png"
                alt="Stand with Ukraine!"
                style="max-width: 50px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
