export default class LocationService {
  constructor(api) {
    this.api = api.value;
  }

  search(query) {
    return this.api.post(
      {
        query: query || "",
      },
      "locationSearch"
    );
  }
}
