<template>
  <div class="google-map" ref="googleMap">
    <template v-if="google !== null && map !== null">
      <slot :google="google" :map="map" />
    </template>
  </div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";
export default {
  name: "googleMap",
  props: {
    mapConfig: Object,
    apiKey: String
  },
  data() {
    return {
      google: null,
      map: null
    };
  },
  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey
    });
    this.google = googleMapApi;
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      const mapRef = this.$refs.googleMap;
      this.map = new this.google.maps.Map(mapRef, this.mapConfig);
    }
  }
};
</script>

<style scoped lang="scss">
.google-map {
  width: 100%;
  height: 540px;
}
</style>
