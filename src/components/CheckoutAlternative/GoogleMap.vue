<template>
  <div class="google-map">
    <div class="search-area">
      <q-input
        ref="autocompleteQInput"
        v-model="checkoutLocationStore.inputs.placeAddress"
        type="text"
        hide-bottom-space
        outlined
        square
        clearable
        stack-label
        @clear="clear"
      >
        <template v-slot:prepend>
          <q-icon name="location_on" />
        </template>
      </q-input>
    </div>
    <div ref="mapDiv" style="width: 100%; height: 500px"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import type { Ref } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import { QInput } from "quasar";

interface Coordinates {
  lat: number;
  lon: number;
}

interface PlaceEvent {
  placeId: string;
  placeName: string;
  coordinates: Coordinates;
}

const emit = defineEmits<{
  placeChanged: [eventPayload: PlaceEvent];
}>();

const map: Ref<google.maps.Map | null> = ref(null);
const mapDiv: Ref<HTMLElement | null> = ref(null);
const autocompleteQInput: Ref<QInput | null> = ref(null);
const autocompleteInput: Ref<HTMLInputElement | null> = ref(null);
const autocomplete: Ref<google.maps.places.Autocomplete | null> = ref(null);
const marker: Ref<google.maps.Marker | null> = ref(null);
const geocoder: Ref<google.maps.Geocoder | null> = ref(null);
let isPlaceChangedByMarker: boolean = false;
let isUserChangedZoom: boolean = false;
const checkoutLocationStore = inject("checkoutLocationStore");
const qModelValue = ref(null);

const clear = function () {
  checkoutLocationStore.inputs.placeAddress = null;
  checkoutLocationStore.inputs.placeId = null;
  checkoutLocationStore.inputs.lat = null;
  checkoutLocationStore.inputs.lon = null;
};

onMounted(async () => {
  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    version: "weekly",
    language: "uk",
  });

  await loader.importLibrary("places");

  geocoder.value = new google.maps.Geocoder();

  const mapOptions = {
    center: {
      lat: checkoutLocationStore.inputs.lat || 50.451374,
      lng: checkoutLocationStore.inputs.lon || 30.5226261,
    },
    zoom: checkoutLocationStore.inputs.placeId ? 17 : 10,
  };

  autocompleteInput.value = autocompleteQInput.value.nativeEl;

  autocompleteInput.value.value =
    checkoutLocationStore.inputs.placeAddress || "";

  qModelValue.value = autocompleteInput.value.value;

  map.value = new google.maps.Map(mapDiv.value, mapOptions);
  autocomplete.value = new google.maps.places.Autocomplete(
    autocompleteInput.value,
    {
      componentRestrictions: { country: ["ua"] },
      // types: ["address"],
      strictBounds: false,
    }
  );

  marker.value = new google.maps.Marker({
    map: map.value,
    position: {
      lat: checkoutLocationStore.inputs.lat || 50.451374,
      lng: checkoutLocationStore.inputs.lon || 30.5226261,
    },
    draggable: true,
  });

  const updateAutocompleteByMarkerPosition = () => {
    const newPos = marker.value.getPosition();
    geocoder.value.geocode({ location: newPos }, (results, status) => {
      if (status === "OK" && results[0]) {
        isPlaceChangedByMarker = true;
        autocompleteInput.value.value = results[0].formatted_address;
        autocomplete.value.set("place", results[0]);
        isPlaceChangedByMarker = false;
      }
    });
  };

  google.maps.event.addListener(marker.value, "dragend", function () {
    updateAutocompleteByMarkerPosition();
  });

  map.value.addListener("click", function (event) {
    // Update the existing marker's position
    marker.value.setPosition(event.latLng);

    // Update the Autocomplete input
    updateAutocompleteByMarkerPosition();
  });

  map.value.addListener("zoom_changed", function () {
    isUserChangedZoom = true;
  });

  autocompleteInput.value.addEventListener("input", function () {
    checkoutLocationStore.isEmpty = false;
  });

  // Listen for place changes in autocomplete
  autocomplete.value.addListener("place_changed", () => {
    const place = autocomplete.value?.getPlace();

    if (place && place.geometry && place.geometry.location) {
      map.value?.setCenter(place.geometry.location);

      if (!isUserChangedZoom) {
        map.value?.setZoom(17);
      }

      checkoutLocationStore.inputs.placeId = place.place_id;
      checkoutLocationStore.inputs.placeAddress = place.formatted_address;
      checkoutLocationStore.inputs.lat = place.geometry.location.lat();
      checkoutLocationStore.inputs.lon = place.geometry.location.lng();
      qModelValue.value = place.formatted_address;

      if (!isPlaceChangedByMarker) {
        marker.value.setPosition({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }

      const eventPayload: PlaceEvent = {
        placeId: place.place_id || "",
        placeName: place.name || "",
        coordinates: {
          lat: place.geometry.location.lat(),
          lon: place.geometry.location.lng(),
        },
      };

      emit("placeChanged", eventPayload);
      checkoutLocationStore.isEmpty = false;
    }
  });
});
</script>
