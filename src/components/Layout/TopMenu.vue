<script setup lang="ts"></script>

<template>
  <div
    class="collapse navbar-collapse mean-menu"
    id="navbarSupportedContent"
    style="display: block"
  >
    <ul class="navbar-nav nav mr-auto ml-auto">
      <li class="nav-item top-item">
        <router-link :to="{ name: 'manual' }" class="nav-link"> Інструкція </router-link>
      </li>

      <li class="nav-item top-item">
        <router-link :to="{ name: 'advantages' }" class="nav-link"> Переваги </router-link>
      </li>

      <li class="nav-item top-item">
        <router-link :to="{ name: 'price' }" class="nav-link"> Ціни </router-link>
      </li>

      <li class="nav-item top-item">
        <router-link :to="{ name: 'faq' }" class="nav-link"> Часті питання </router-link>
      </li>

      <li class="nav-item top-item">
        <router-link :to="{ name: 'estimate' }" class="nav-link">
          Оцінка
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
            class="feather feather-chevron-down"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </router-link>

        <ul class="dropdown_menu">
          <li class="nav-item">
            <router-link :to="{ name: 'flat-sale' }" class="nav-link">
              Вартість квартири
            </router-link>
          </li>

          <li class="nav-item">
            <router-link :to="{ name: 'house-sale' }" class="nav-link">
              Вартість приватного будинку
            </router-link>
          </li>

          <li class="nav-item">
            <router-link :to="{ name: 'flat-rent' }" class="nav-link">
              Оренда квартири
            </router-link>
          </li>

          <li class="nav-item">
            <router-link :to="{ name: 'house-rent' }" class="nav-link">
              Оренда приватного будинку
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
