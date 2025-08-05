<template xmlns:template="http://www.w3.org/1999/html">
  <div class="q-mt-md" style="position: relative">
    <q-list v-if="!canShow">
      <q-item>
        <q-item-section class="related-adverts-payment-section">
          <q-item-label
            ><q-btn
              color="accent"
              unelevated
              outline
              icon="warning"
              @click="
                scrollToElement(this.$parent.$refs.mainPaymentBlock);
                event('go-to-payment-block', {
                  eventTarget: 'relatedAdverts',
                });
              "
              label="Відкрити доступ"
          /></q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list>
      <q-item :disable="!canShow">
        <q-item-section avatar>
          <q-icon color="primary" name="info" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Схожі оголошення за результатами оцінки</q-item-label>
          <q-item-label caption> Знайдено в мережі Інтернет </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <div v-if="isLoading">
      <p class="text-subtitle2 q-pd-sm">
        Шукаемо схожі оголошення в інтернеті для вас...
      </p>
      <q-inner-loading :showing="isLoading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </div>
    <div v-else>
      <div v-if="hasResults" class="related-block">
        <div ref="container" id="related-map" style="height: 500px" />
        <div class="row">
          <div
            class="col-12 col-sm-6 col-md-4"
            v-for="(relatedItem, index) in related"
            :key="relatedItem.external_id"
          >
            <q-list dense separator bordered class="rounded-borders">
              <q-expansion-item
                expand-separator
                icon="apartment"
                label="Account settings"
                caption="John Doe"
              >
                <template v-slot:header>
                  <q-item-section>
                    <q-item-label
                      >{{ index + 1 }}. ~{{
                        formatNumber(relatedItem.attributes.price, "en-US")
                      }}$
                    </q-item-label>
                    <q-item-label caption>
                      {{ relatedItem.attributes.squares }} м<sup>2</sup> |
                      {{ relatedItem.attributes.rooms }} кімнат
                      <template
                        v-if="
                          relatedItem.attributes.hasOwnProperty('area_size')
                        "
                      >
                        | {{ relatedItem.attributes.area_size }} сот.</template
                      >
                    </q-item-label>
                    <q-item-label caption>
                      Відстань: {{ relatedItem.attributes.distance }}
                    </q-item-label>
                  </q-item-section>
                </template>
                <q-btn-group outline>
                  <q-btn
                    dense
                    no-caps
                    flat
                    label="Показати на мапі"
                    icon="visibility"
                    @click="goToMarker(relatedItem.external_id)"
                  />
                  <q-btn
                    dense
                    no-caps
                    flat
                    label="Перейти на сайт оголошення"
                    icon="link"
                    :href="relatedItem.url"
                    target="_blank"
                  />
                </q-btn-group>
              </q-expansion-item>
            </q-list>
          </div>
        </div>
      </div>
      <div v-else class="row related-block">
        <p class="text-caption">Не знайшли схожі оголошення :(</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref, toRaw } from "vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { event } from "vue-gtag";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon-2x.png";
import markerIconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import { MarkerClusterGroup } from "leaflet.markercluster/dist/leaflet.markercluster.js";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.fullscreen/Control.FullScreen.css";
import "leaflet.fullscreen/Control.FullScreen.js";
import { scrollTop } from "components/Helpers/scroll.js";

if (import.meta.env.PROD) {
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon,
    iconUrl: markerIcon,
    shadowUrl: markerIconShadow,
  });
}

export default defineComponent({
  name: "RelatedAdverts",
  props: {
    orderAccountNumber: {
      type: String,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const api = inject("api");
    const scrollToElement = inject("scrollToElement");
    const $q = useQuasar();
    const { t } = useI18n({});
    const related = ref([]);
    const meta = ref([]);
    const hasResults = ref(false);
    const canShow = ref(false);
    const isLoading = ref(true);
    const currentPage = ref(1);
    const maxPages = ref(1);

    const loadState = () => {
      return new Promise((resolve) => {
        isLoading.value = true;
        api.value
          .postSimple(
            {
              orderAccountNumber: props.orderAccountNumber,
            },
            "orderRelatedAdverts"
          )
          .then(async function (response) {
            related.value = response.data.adverts || [];
            meta.value = response.data.meta || [];
            hasResults.value = response.data.hasResults || false;
            canShow.value = response.data.canShow || false;
            event("related-adverts-load", {
              hasResults: hasResults.value,
              orderAccountNumber: props.orderAccountNumber,
            });
          })
          .catch((e) => {
            console.error(e);
            $q.notify({
              multiLine: true,
              type: "negative",
              icon: "upload",
              message: t("networkUnknownError"),
              position: "center",
              timeout: 5000,
              actions: [{ icon: "close", color: "white" }],
            });
          })
          .finally(() => {
            isLoading.value = false;
            resolve();
          });
      });
    };

    const formatNumber = (number, locale) => {
      return new Intl.NumberFormat(locale).format(number);
    };

    function replaceThousandWithK(str) {
      return str.replace(/,(\d{3})$/, "k");
    }

    function roundToNearestThousand(price) {
      return price;
      //return Math.round(price / 1000) * 1000;
    }

    const container = ref<HTMLElement>(null);
    const map = ref<L.Map | null>();

    function findMarkerById(map, id) {
      let targetMarker = null;
      map.eachLayer(function (layer) {
        if (layer instanceof MarkerClusterGroup) {
          layer.eachLayer(function (marker) {
            if (marker instanceof L.Marker) {
              if (marker.id === id) {
                targetMarker = marker;
                layer.zoomToShowLayer(marker);
                return;
              }
            }
          });
        }
      });
      return targetMarker;
    }

    const goToMarker = (markerId) => {
      let marker = findMarkerById(map.value, markerId);
      if (marker) {
        marker.fireEvent("click");
        scrollTop("related-map", 0);
      }
    };

    const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const ATTRIBUTION =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>';

    function setupMap() {
      if (!hasResults.value) return;
      const tiles = new L.TileLayer(TILE_URL, {
        attribution: ATTRIBUTION,
        maxZoom: 18,
      });
      const scale = new L.Control.Scale();

      let zoom = 5;

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
      }).setView([props.lat, props.lon], zoom);

      tiles.addTo(map.value);
      scale.addTo(map.value);

      function addMarkers() {
        return new Promise((resolve) => {
          const markers = new MarkerClusterGroup();
          related.value.forEach((item) => {
            let markerHtml = `
           <span class="marker-label"><b>~${replaceThousandWithK(
             formatNumber(item.attributes.price, "en-US")
           )}$</b></span>

          `;
            const customHtmlIcon = L.divIcon({
              html: markerHtml,
              className: "dot-marker",
              iconSize: [14, 14],
            });

            let popupHtml = `
           <p><b>~${formatNumber(
             roundToNearestThousand(item.attributes.price),
             "en-US"
           )}$</b></p>
           <p>${item.attributes.squares} м<sup>2</sup></p>
          `;
            if (item.attributes.hasOwnProperty("area_size")) {
              popupHtml += `<p>${item.attributes.area_size} сот.</p>`;
            }
            popupHtml += `<a href="${item.url}" target="_blank">
              Перейти
           </a>`;
            const marker = new L.Marker(
              [item.attributes.lat, item.attributes.lon],
              { icon: customHtmlIcon }
            ).bindPopup(popupHtml, { className: "marker-popup" });
            marker.id = item.external_id;
            markers.addLayer(marker);
          });

          map.value.addLayer(toRaw(markers));
          resolve();
        });
      }

      setTimeout(() => {
        map.value.invalidateSize();
        addMarkers().then(() => {
          map.value.fitBounds(
            new L.LatLngBounds(
              related.value.map((item) => [
                item.attributes.lat,
                item.attributes.lon,
              ])
            )
          );
        });
      }, 400);
    }

    const reload = () => {
      loadState().finally(() => {
        isLoading.value = false;
        setupMap();
      });
    };

    onMounted(() => {
      reload();
    });

    return {
      isLoading,
      related,
      formatNumber,
      currentPage,
      maxPages,
      hasResults,
      canShow,
      scrollToElement,
      reload,
      event,
      orderAccountNumber: props.orderAccountNumber,
      container,
      goToMarker,
    };
  },
});
</script>
<style scoped lang="scss">
.related-block a.q-item:visited {
  color: $purple !important;
}
.related-adverts-payment-section {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  align-items: center;
}
</style>
<style lang="scss">
.dot-marker {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: $purple;
  border: 2px solid #ffffff;
}
.dot-marker .marker-label {
  background-color: white;
  position: absolute;
  left: 12px;
  top: -5px;
  border-radius: 25%;
  border: 1px solid #ffffff;
}
.dot-marker:hover .marker-label,
.dot-marker .marker-label:hover {
  background-color: lightgrey;
  border-color: lightgrey;
}
.marker-popup p {
  margin: 1px 0;
  font-size: 12px;
  color: $dark;
  white-space: nowrap;
}

.marker-popup a {
  display: block;
  margin-top: 2px;
  color: $accent;
  text-decoration: none;
  font-size: 12px;
  font-weight: bold;
}

.marker-popup a:hover {
  text-decoration: underline;
}
</style>
