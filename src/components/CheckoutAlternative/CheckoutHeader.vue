<script setup>
import { computed, reactive, watch } from "vue";
import { event } from "vue-gtag";
import { defineProps, defineEmits } from "vue";
import { useQuasar } from "quasar";

const props = defineProps({
  mode: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["update:mode"]);
const tooltips = reactive({
  instruction: false,
  price: false,
  quality: false,
  advantages: false,
  security: false,
});

const bindWatchers = () => {
  watch(
    () => tooltips.instruction,
    (value) => {
      event("tooltip", {
        block_name: "instruction",
        action: value ? "show" : "hide",
      });
    }
  );

  watch(
    () => tooltips.price,
    (value) => {
      event("tooltip", {
        block_name: "price",
        action: value ? "show" : "hide",
      });
    }
  );

  watch(
    () => tooltips.quality,
    (value) => {
      event("tooltip", {
        block_name: "quality",
        action: value ? "show" : "hide",
      });
    }
  );

  watch(
    () => tooltips.advantages,
    (value) => {
      event("tooltip", {
        block_name: "advantages",
        action: value ? "show" : "hide",
      });
    }
  );

  watch(
    () => tooltips.security,
    (value) => {
      event("tooltip", {
        block_name: "security",
        action: value ? "show" : "hide",
      });
    }
  );
};
bindWatchers();
const $q = useQuasar();

const isVertical = computed(() => {
  return $q.screen.width < 410;
});

const realtyType = computed(() => props.mode.split("-")[0]);
const operationType = computed(() => props.mode.split("-")[1]);

const updateModeByRealtyType = (value) => {
  emit("update:mode", `${value}-${operationType.value}`);
};

const updateModeByOperationType = (value) => {
  emit("update:mode", `${realtyType.value}-${value}`);
};

const modeName = computed(() => {
  switch (props.mode) {
    case "flat-sale":
      return "Оцінка вартості квартири";
    case "flat-rent":
      return "Оцінка вартості оренди квартири";
    case "house-sale":
      return "Оцінка вартості приватного будинку";
    case "house-rent":
      return "Оцінка вартості оренди приватного будинку";
    default:
      return "";
  }
});
</script>

<template>
  <div v-if="props.mode === 'checkout'" class="q-ma-sm form-step-block-color">
    <q-chip
      text-color="white"
      color="indigo-7"
      size="md"
      square
      outline
      icon="apartment"
      class="text-subtitle2 form-chip-block-style"
    >
      Оберіть тип оцінки
    </q-chip>
    <q-btn
      color="primary"
      flat
      push
      no-caps
      padding="md"
      size="lg"
      ripple
      class="full-width"
      :to="{ name: 'flat-sale' }"
      ><template v-slot:default>
        <div class="row no-wrap">
          <q-icon name="attach_money" />
          <q-icon name="apartment" />
          <div class="text-center q-mr-md">Оцінка вартості квартири</div>
        </div>
      </template>
    </q-btn>
    <q-separator size="4px" color="green-3" />
    <q-btn
      color="primary"
      flat
      push
      no-caps
      padding="md"
      size="lg"
      ripple
      class="full-width"
      :to="{ name: 'house-sale' }"
      ><template v-slot:default>
        <div class="row no-wrap">
          <q-icon name="attach_money" />
          <q-icon name="house" />
          <div class="text-center q-mr-md">
            Оцінка вартості приватного будинку
          </div>
        </div>
      </template>
    </q-btn>
    <q-separator size="4px" color="green-3" />
    <q-btn
      color="primary"
      flat
      push
      no-caps
      padding="md"
      size="lg"
      ripple
      class="full-width"
      :to="{ name: 'flat-rent' }"
      ><template v-slot:default>
        <div class="row no-wrap">
          <q-icon name="event_repeat" />
          <q-icon name="apartment" />
          <div class="text-center q-mr-md">Оцінка вартості оренди квартири</div>
        </div>
      </template>
    </q-btn>
    <q-separator size="4px" color="green-3" />
    <q-btn
      color="primary"
      flat
      push
      no-caps
      padding="md"
      size="lg"
      ripple
      class="full-width"
      :to="{ name: 'house-rent' }"
      ><template v-slot:default>
        <div class="row no-wrap">
          <q-icon name="event_repeat" />
          <q-icon name="house" />
          <div class="text-center q-mr-md">
            Оцінка вартості оренди приватного будинку
          </div>
        </div>
      </template>
    </q-btn>
  </div>
  <div v-else>
    <div class="row flex">
      <div class="flex-grow-1">
        <div>
          <q-banner dense class="bg-green-1">
            <div class="text-center">
              <q-btn-toggle
                ripple
                size="12px"
                v-model="operationType"
                @update:model-value="updateModeByOperationType"
                :options="[
                  {
                    value: 'sale',
                    slot: 'sale',
                  },
                  {
                    value: 'rent',
                    slot: 'rent',
                  },
                ]"
              >
                <template v-slot:sale>
                  <div class="row no-wrap">
                    <q-icon left name="attach_money" />
                    <div class="text-center q-mr-md">Вартість</div>
                  </div>
                </template>
                <template v-slot:rent>
                  <div class="row no-wrap">
                    <q-icon left name="event_repeat" />
                    <div class="text-center q-mr-md">Оренда</div>
                  </div>
                </template>
              </q-btn-toggle>
            </div>
          </q-banner>
          <q-banner dense class="bg-green-1">
            <div class="text-center">
              <q-btn-toggle
                ripple
                size="12px"
                v-model="realtyType"
                @update:model-value="updateModeByRealtyType"
                :options="[
                  {
                    value: 'flat',
                    slot: 'flat',
                  },
                  {
                    value: 'house',
                    slot: 'house',
                  },
                ]"
              >
                <template v-slot:flat>
                  <div class="row no-wrap">
                    <q-icon left name="apartment" />
                    <div class="text-center q-mr-md">Квартира</div>
                  </div>
                </template>
                <template v-slot:house>
                  <div class="row no-wrap">
                    <q-icon left name="house" />
                    <div class="text-center q-mr-md">Будинок</div>
                  </div>
                </template>
              </q-btn-toggle>
            </div>
          </q-banner>
        </div>
      </div>

      <div class="flex-grow-1">
        <q-banner
          dense
          class="vertical-height-100"
          style="background: linear-gradient(135deg, #23bdb8 0%, #43e794 100%)"
        >
          <div class="text-center text-white text-h5">
            <q-icon name="attach_money" v-if="operationType === 'sale'" />
            <q-icon name="event_repeat" v-else-if="operationType === 'rent'" />
            <q-icon name="apartment" v-if="realtyType === 'flat'" />
            <q-icon name="house" v-else-if="realtyType === 'house'" />
            {{ modeName }}
          </div>
        </q-banner>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.form-step-block-color {
  border-radius: 10px;
  border: 1px solid $indigo-7;
  padding-top: 20px;
  position: relative;
  margin-top: 35px;
}
.form-chip-block-style {
  position: absolute;
  top: -20px;
  left: 10px;
  background-color: #fff !important;
}
.flex-grow-1 {
  flex-grow: 1;
}
.vertical-height-100 {
  height: 100%;
}
</style>
