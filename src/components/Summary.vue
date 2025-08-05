<template>
  <div class="q-pa-md">
    <div
      ref="container"
      style="height: 300px"
      v-if="isset('latitude') && isset('longitude')"
    ></div>
    <q-list bordered separator>
      <q-item v-if="isset('placeAddress')">
        <q-item-section>
          <q-item-label overline>{{ $t("summaryLocationTitle") }}</q-item-label>
          <q-item-label>{{ summary.placeAddress }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="isset('areaSize')">
        <q-item-section>
          <q-item-label overline>{{
            $t("formStepAreaSizeLabel")
          }}</q-item-label>
          <q-item-label>{{ summary.areaSize }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="isset('totalMeters')">
        <q-item-section>
          <q-item-label overline>{{
            $t("formStepTotalMetersLabel")
          }}</q-item-label>
          <q-item-label>{{ summary.totalMeters }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="isset('livingMeters')">
        <q-item-section>
          <q-item-label overline>{{
            $t("formStepLivingMetersLabel")
          }}</q-item-label>
          <q-item-label>{{ summary.livingMeters }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="isset('kitchenMeters')">
        <q-item-section>
          <q-item-label overline>{{
            $t("formStepKitchenMetersLabel")
          }}</q-item-label>
          <q-item-label>{{ summary.kitchenMeters }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="isset('floorsCount')">
        <q-item-section>
          <q-item-label overline>{{
            $t("formStepFloorsCountLabel")
          }}</q-item-label>
          <q-item-label>{{ summary.floorsCount }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="isset('floor')">
        <q-item-section>
          <q-item-label overline>{{ $t("formStepFloorLabel") }}</q-item-label>
          <q-item-label>{{ summary.floor }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="isset('roomsCount')">
        <q-item-section>
          <q-item-label overline>{{
            $t("formStepRoomsCountLabel")
          }}</q-item-label>
          <q-item-label>{{ summary.roomsCount }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="isset('wallType')">
        <q-item-section>
          <q-item-label overline>{{
            $t("formStepWallTypeLabel")
          }}</q-item-label>
          <q-item-label>{{ summary.wallType }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="isset('hasParkingLot')">
        <q-item-section>
          <q-item-label overline>{{
            $t("formStepHasParkingLotLabel")
          }}</q-item-label>
          <q-item-label>{{
            summary.hasParkingLot ? $t("globalYes") : $t("globalNo")
          }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="isset('isTwoLevels')">
        <q-item-section>
          <q-item-label overline>{{
            $t("formStepIsTwoLevelsLabel")
          }}</q-item-label>
          <q-item-label>{{
            summary.isTwoLevels ? $t("globalYes") : $t("globalNo")
          }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="isset('isPenthouse')">
        <q-item-section>
          <q-item-label overline>{{
            $t("formStepIsPenthouseLabel")
          }}</q-item-label>
          <q-item-label>{{
            summary.isPenthouse ? $t("globalYes") : $t("globalNo")
          }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="isset('hasPanoramaWindows')">
        <q-item-section>
          <q-item-label overline>{{
            $t("formStepHasPanoramaWindowsLabel")
          }}</q-item-label>
          <q-item-label>{{
            summary.hasPanoramaWindows ? $t("globalYes") : $t("globalNo")
          }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="isset('hasFurniture')">
        <q-item-section>
          <q-item-label overline> Меблі </q-item-label>
          <q-item-label>{{ summary.hasFurniture }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="isset('interiorRenovationClass')">
        <q-item-section>
          <q-item-label overline>{{
            $t("formStepInteriorRenovationClassLabel")
          }}</q-item-label>
          <q-item-label>{{ summary.interiorRenovationClass }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="summary.interiorPhotos.length > 0" class="carousel-element">
        <q-item-section>
          <q-item-label overline>{{
            $t("summaryInteriorPhotosBlockTitle")
          }}</q-item-label>
          <q-carousel
            swipeable
            animated
            v-model="interiorSlide"
            infinite
            navigation
            arrows
            padding
            control-type="regular"
            control-color="black"
            control-text-color="primary"
            height="500px"
          >
            <q-carousel-slide
              :name="index"
              :img-src="baseUrl + '/' + thumbnail"
              v-for="(thumbnail, index) in summary.interiorPhotos"
              :key="index"
            />
          </q-carousel>
        </q-item-section>
      </q-item>
      <q-item v-if="isset('exteriorRenovationClass')">
        <q-item-section>
          <q-item-label overline>{{
            $t("formStepExteriorRenovationClassLabel")
          }}</q-item-label>
          <q-item-label>{{ summary.exteriorRenovationClass }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="summary.exteriorPhotos.length > 0" class="carousel-element">
        <q-item-section>
          <q-item-label overline>{{
            $t("summaryExteriorPhotosBlockTitle")
          }}</q-item-label>
          <q-carousel
            swipeable
            animated
            v-model="exteriorSlide"
            infinite
            navigation
            arrows
            padding
            control-type="regular"
            control-color="black"
            control-text-color="primary"
            height="500px"
          >
            <q-carousel-slide
              :name="index"
              :img-src="baseUrl + '/' + thumbnail"
              v-for="(thumbnail, index) in summary.exteriorPhotos"
              :key="index"
            />
          </q-carousel>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon-2x.png";
import markerIconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.fullscreen/Control.FullScreen.css";
import "leaflet.fullscreen/Control.FullScreen.js";

if (import.meta.env.PROD) {
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon,
    iconUrl: markerIcon,
    shadowUrl: markerIconShadow,
  });
}

export default defineComponent({
  name: "Summary",
  components: {},
  props: {
    summary: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const interiorSlide = ref(0);
    const exteriorSlide = ref(0);
    const isset = (name) => {
      return props.summary[name] && props.summary[name] !== "";
    };

    const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const ATTRIBUTION =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>';

    const container = ref<HTMLElement>(null);
    const map = ref<L.Map | null>();

    function setupMap() {
      if (!isset("latitude") || !isset("longitude")) return;
      const tiles = new L.TileLayer(TILE_URL, {
        attribution: ATTRIBUTION,
        maxZoom: 18,
      });
      const scale = new L.Control.Scale();

      let zoom = 12;

      map.value = new L.Map(container.value, {
        dragging: !L.Browser.mobile,
        tap: !L.Browser.mobile,
        preferCanvas: true,
        scrollWheelZoom: true,
        zoomAnimation: false,
        fullscreenControl: true,
        fullscreenControlOptions: {
          position: "topleft",
        },
      }).setView([props.summary["latitude"], props.summary["longitude"]], zoom);

      tiles.addTo(map.value);
      scale.addTo(map.value);

      const marker = L.marker([
        props.summary["latitude"],
        props.summary["longitude"],
      ]).addTo(map.value);

      if (isset("placeAddress")) {
        marker.bindPopup(props.summary["placeAddress"]);
      }

      setTimeout(() => {
        map.value.invalidateSize();
      }, 400);
    }

    onMounted(() => {
      setupMap();
    });

    return {
      interiorSlide,
      exteriorSlide,
      isset,
      container,
      baseUrl: import.meta.env.VITE_APP_BASE_URL,
    };
  },
});
</script>
<style scoped>
.q-carousel__slide,
.q-carousel .q-carousel--padding {
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
