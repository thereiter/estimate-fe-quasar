<script setup lang="ts"></script>

<template>
  <footer class="footer-area bg-f7fafd">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="single-footer-widget">
            <div class="logo">
              <router-link :to="{ name: 'app-entry' }">
                <picture>
                  <source srcset="~assets/img/logo_black_260.webp" type="image/webp" />
                  <img
                    class="logo-black logo-footer"
                    src="~assets/img/logo_black_260.png"
                    alt="logo"
                  />
                </picture>
              </router-link>
            </div>
            <p>
              Онлайн-сервіс професійної автоматичної оцінки нерухомості за допомогою штучного
              інтелекту
            </p>
            <picture>
              <source srcset="~assets/img/footer_paysystem_portmone.webp" type="image/webp" />
              <img src="~assets/img/footer_paysystem_portmone.png" alt="Portmone" />
            </picture>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="single-footer-widget pl-5">
            <h3>Сервіс</h3>
            <ul class="list">
              <li class="nav-item top-item">
                <router-link :to="{ name: 'flat-sale' }"> Оцінити квартиру </router-link>
              </li>
              <li class="nav-item top-item">
                <router-link :to="{ name: 'house-sale' }"> Оцінити приватний будинок </router-link>
              </li>
              <li class="nav-item top-item">
                <router-link :to="{ name: 'flat-rent' }"> Вартість оренди квартири </router-link>
              </li>
              <li class="nav-item top-item">
                <router-link :to="{ name: 'house-rent' }">
                  Вартість оренди приватного будинку
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="single-footer-widget">
            <h3>Підтримка</h3>
            <ul class="list">
              <li class="nav-item top-item">
                <router-link :to="{ name: 'profile' }"> Особистий кабінет </router-link>
              </li>
              <li class="nav-item top-item">
                <router-link :to="{ name: 'terms-and-conditions' }"> Публічна оферта </router-link>
              </li>
              <li class="nav-item top-item">
                <router-link :to="{ name: 'privacy-policy' }">
                  Політика конфіденційності
                </router-link>
              </li>
              <li class="nav-item top-item">
                <router-link :to="{ name: 'manual' }"> Інструкція </router-link>
              </li>
              <li class="nav-item top-item">
                <router-link :to="{ name: 'advantages' }"> Переваги </router-link>
              </li>
              <li class="nav-item top-item">
                <router-link :to="{ name: 'faq' }"> Часті питання </router-link>
              </li>
              <li class="nav-item top-item">
                <router-link :to="{ name: 'price' }"> Ціни </router-link>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="single-footer-widget">
            <h3>Зв'язок</h3>

            <ul class="footer-contact-info">
              <li>
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
                  class="feather feather-mail"
                >
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  ></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                E-mail: <a href="mailto:support@estimate.realestate">support@estimate.realestate</a>
              </li>
              <li>
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
                  class="feather feather-mail"
                >
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  ></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Для партнерства:
                <a href="mailto:partners@estimate.realestate">partners@estimate.realestate</a>
              </li>
              <li>
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
                  class="feather feather-send"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                <a href="javascript:void(0)" onclick="HelpCrunch('openChat'); return false;"
                  >Зворотній зв'язок</a
                >
              </li>
              <li>
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
                  class="feather feather-clock"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Служба підтримки працює ПН-ПТ з 9:00 до 18:00
              </li>
              <li>
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
                Сервіс працює цілодобово 24/7
              </li>
            </ul>
          </div>
        </div>

        <div class="col-lg-12 col-md-12">
          <div class="copyright-area">
            <p>Всі права захищені estimate.realestate 2025</p>
          </div>
        </div>
      </div>
    </div>
    <picture>
      <source srcset="~assets/img/map.webp" type="image/webp" />
      <img src="~assets/img/map.png" class="map" alt="map" />
    </picture>

    <div class="shape1"><img src="~assets/img/shape1.png" alt="shape" /></div>
    <div class="shape8 rotateme"><img src="~assets/img/shape2.svg" alt="shape" /></div>
  </footer>
</template>

<style scoped></style>
