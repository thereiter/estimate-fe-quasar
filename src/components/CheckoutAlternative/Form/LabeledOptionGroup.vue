<template>
  <div class="q-pa-sm">
    <div class="row q-col-gutter-md">
      <div
        class="col-540 col-991 col-max"
        v-for="option in options"
        :key="option.value"
      >
        <q-carousel
          v-model="option.sliderRef"
          swipeable
          dark
          animated
          arrows
          next-icon="east"
          prev-icon="west"
          infinite
          padding
          dense
          class="rounded-slider"
        >
          <q-carousel-slide
            :name="image.index"
            class="column no-wrap flex-center"
            v-for="image in option.images"
            :key="image.index"
            :img-src="image.src"
          >
            <div class="absolute-bottom custom-caption">
              <div class="text-caption" style="font-size: 18px">
                <q-radio
                  :model-value="modelValue"
                  @update:model-value="updateValue"
                  :val="option.value"
                  :label="option.label"
                  color="primary"
                  size="xl"
                  unchecked-icon="check_box_outline_blank"
                  checked-icon="check_box"
                />
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRefs, unref } from "vue";

export default {
  name: "LabeledOptionGroup",
  props: {
    modelValue: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      default: [],
    },
  },
  setup(props, context) {
    const { modelValue } = toRefs(props);

    const updateValue = (value) => {
      context.emit("update:modelValue", value);
    };

    return {
      modelValue,
      updateValue,
      options: ref(unref(props.options)),
    };
  },
};
</script>
<style>
.q-carousel__arrow .q-icon.material-icons {
  font-size: 28px !important;
}
.material-icons.q-radio__icon {
  font-size: 36px !important;
}
.q-carousel__arrow .q-btn.q-btn-item > .q-focus-helper {
  background-color: rgba(0, 0, 0, 0.4); /* semi-transparent black */
  border-radius: 50%; /* makes the background circular */
  padding: 5px; /* provides some space between the icon and the edge of the circle */
  opacity: 1 !important;
}
.q-carousel__arrow .q-btn.q-btn-item .q-focus-helper:after {
  display: none;
}
.q-carousel__arrow .q-btn.q-btn-item:hover > .q-focus-helper {
  background-color: rgba(0, 0, 0, 1) !important; /* semi-transparent black */
  opacity: 1 !important;
}

.rounded-slider {
  border-radius: 20px;
}
.q-carousel__slide .q-radio {
  width: 100%;
}
.q-radio__inner {
  color: #ffffff;
}
</style>
<style scoped>
.q-card {
  max-width: 1106px;
}
.col-max {
  height: auto;
  width: 33%;
}
@media (max-width: 540px) {
  .col-540 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
@media (max-width: 991px) {
  .col-991 {
    height: auto;
    width: 50%;
  }
}
</style>
<style lang="sass" scoped>
.custom-caption
  text-align: center
  color: white
  background-color: rgba(0, 0, 0, .35)
</style>
