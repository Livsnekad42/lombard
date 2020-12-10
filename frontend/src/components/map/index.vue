<template>
  <div class="map-block">
    <div class="container">
      <div class="title">
        <h1>АДРЕСА ОТДЕЛЕНИЙ</h1>
      </div>
      <div class="content">
        <div class="map-container">
          <GmapMap
            :center="center"
            :zoom="zoom"
            :streetViewControl="true"
            map-type-id="terrain"
            style="width: 100%; height: 540px"
          >
            <GmapInfoWindow
              :position="selectMarkerData.position"
              :opened="infoOpened"
              @closeclick="infoOpened = false"
              :options="infoOptions"
            >
              <div v-html="selectMarkerData.content"></div>
            </GmapInfoWindow>
            <GmapMarker
              :key="index"
              v-for="(loc, index) in currentLocationList"
              :position="loc.position"
              :clickable="true"
              :draggable="false"
              :icon="icon"
              @click="markerClick(loc)"
            />
          </GmapMap>
        </div>
        <div v-if="cityList.length > 0" class="locations-container">
          <accordion
            v-for="city in cityList"
            :title="city.cityName"
            :data="city"
            :key="city.id"
            :active="active"
            @selectCity="changeMarker"
            :type="typeIcon"
          >
            <div
              v-for="affiliate in city.affiliateLocs"
              :key="affiliate.id"
              class="affiliate-list"
              @click="setAffiliateData(affiliate)"
            >
              {{ affiliate.affiliateName }}
            </div>
          </accordion>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cityIcon, affiliateIcon } from "@/constants/markerSettings";
import accordion from "../ui/accordion";
import { getAllCitiesAndAffiliate } from "../../app/api-map";
export default {
  name: "Map",
  data() {
    return {
      cityList: [],
      currentLocationList: [],
      center: { lat: 48, lng: 68 },
      zoom: 5,
      typeIcon: "city",
      active: { id: "", type: false },
      selectMarkerData: "",
      infoOpened: false,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    };
  },
  computed: {
    icon() {
      return this.typeIcon === "city" ? cityIcon : affiliateIcon;
    }
  },
  components: {
    accordion
  },
  created() {
    this.getCityList();
  },
  methods: {
    changeMarker(city) {
      this.active.type = !this.active.type;

      if (this.active.id === city.id) {
        this.active.id = "";
      } else {
        this.active.id = city.id;
      }

      if (!this.active.type) {
        this.currentLocationList = this.cityList;
        this.zoom = 5;
        this.center = { lat: 48, lng: 68 };
        this.typeIcon = "city";
        return;
      }

      const currCity = this.cityList.filter(
        currCity => currCity.id === city.id
      );
      this.center = currCity[0].position;
      this.zoom = 12;
      this.typeIcon = "affiliate";
      this.currentLocationList = this.mutationMarkerData(
        currCity[0].affiliateLocs
      );
    },

    getCityList() {
      getAllCitiesAndAffiliate().then(res => {
        this.cityList = res.data;
        this.currentLocationList = this.mutationMarkerData(this.cityList);
      });
    },

    mutationMarkerData(array) {
      return array.map(el => {
        const lat = Number(el.latitude);
        const lng = Number(el.longitude);
        el.position = { lat, lng };
        el.type = el.cityName ? "city" : "affiliate";
        return el;
      });
    },

    markerClick(data) {
      if (data.type === "city") {
        this.changeMarker(data);
        return;
      }
      this.setAffiliateData(data);
    },

    setCityPositions(data) {
      this.center = data.position;
      this.zoom = 12;
      this.typeIcon = "affiliate";
    },

    setAffiliateData(data) {
      const content = `<div class="map-content">
      <h1 class="map-title">${data.affiliateName}</h1>
      <div>
      <h4 class="map-desc"><span>Адресс:</span> ${data.address}</h4>
      <h4 class="map-desc"><span>Телефон:</span> ${data.affiliatePhone} </h4>
      <h4 class="map-desc"><span>График работы:</span> ${data.schedule}</h4>
      </div>
      </div>`;
      const position = data.position;
      this.selectMarkerData = { content, position };
      this.infoOpened = true;
    }
  }
};
</script>

<style scoped lang="scss">
.map-block {
  & .container {
    width: 100%;
    margin: 0 auto;
    padding: 100px 0 100px 0;
    & .title {
      & h1 {
        margin-bottom: 90px;
        text-transform: uppercase;
        font-size: 54px;
        font-weight: bold;
        text-align: center;
      }
    }
    & .content {
      display: flex;
      flex-direction: row;
      & .map-container {
        width: 80%;
      }
      & .locations-container {
        width: 30%;
        & .affiliate-list {
          border-color: #00236e;
          border-bottom-width: 1px;
          border-bottom-style: solid;
          font-weight: 400;
          font-size: 16px;
          text-align: left;
          padding: 5px 20px 5px 20px;
          color: #ffffff;
          background-color: #002e90;
        }
      }
    }
  }
}
</style>
