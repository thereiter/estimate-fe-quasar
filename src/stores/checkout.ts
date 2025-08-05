import { reactive } from "vue";
export const initCheckoutGeneralStore = () => {
  return reactive({
    mode: "flat_sale",
    step: 1,
    successConfirm: false,
    orderAccountNumber: null,
    scrollTo: null,
    errors: [],
  });
};

export const initCheckoutLocationStore = () => {
  return reactive({
    inputs: {
      placeId: null,
      placeAddress: null,
      lat: null,
      lon: null,
    },
    isEmpty: false,
    defaultLocations: [],
    locationString: null,
    score: null,
    scoreTitle: null,
    scoreDescription: null,
    scoreResultColor: null,
    marginOfError: null,
    isCanValidate: false,
    isCanContinue: false,
    isCompleted: false,
    isLoading: false,
    errors: [],
  });
};

export const initAutoRegisterStore = () => {
  return reactive({
    inputs: {
      isShow: false,
      isEmailExists: false,
      email: null,
      isTermsAccepted: null,
    },
    errors: [],
  });
};

export const initCheckoutFormStore = () => {
  return reactive({
    initialLoading: true,
    isCompleted: false,
    isInputDisabled: true,
    errors: [],
    fieldErrors: [],
    inputs: {
      totalMeters: null,
      livingMeters: null,
      kitchenMeters: null,
      floor: null,
      floorsCount: null,
      roomsCount: null,
      wallType: null,
      hasPanoramaWindows: false,
      hasParkingLot: false,
      hasFurniture: null,
      isPenthouse: false,
      isTwoLevels: false,
      interiorRenovationClass: null,
      exteriorRenovationClass: null,
      interiorPhotos: null,
      exteriorPhotos: null,
      areaSize: null,
    },
    summary: {},
    summaryErrors: [],
    constraints: {},
    options: {
      floor: [],
      floorsCount: [],
      roomsCount: [],
      wallType: [],
      interiorRenovationClass: [],
      exteriorRenovationClass: [],
    },
  });
};

export default {
  initCheckoutGeneralStore,
  initCheckoutLocationStore,
  initCheckoutFormStore,
  initAutoRegisterStore,
};
