<template>
  <div class="map-control">
    <div class="add-city-form">
      <h4>Управление городами</h4>
      <p v-if="errText" style="color: red">{{ errText }}</p>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          class="btn btn-primary"
          @click="cityWorkType = 'add'"
        >
          Добавить
        </button>
        <button
          type="button"
          class="btn btn-success"
          @click="cityWorkType = 'edit'"
        >
          Редактировать
        </button>
      </div>
      <p v-if="finallyText" style="color: green">{{ finallyText }}</p>
      <div v-if="cityWorkType === 'add'" class="add-city">
        <br />
        <br />
        <h4>Добавить город</h4>
        <br />
        <br />
        <div class="form-group row">
          <label for="addCityName" class="col-sm-2 col-form-label"
            >Наименование Города</label
          >
          <div class="col-sm-8">
            <input
              v-model="city.cityName"
              type="text"
              class="form-control"
              id="addCityName"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="addCityLatitude" class="col-sm-2 col-form-label"
            >Широта</label
          >
          <div class="col-sm-8">
            <input
              v-model="city.latitude"
              type="text"
              class="form-control"
              id="addCityLatitude"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="addCityLongitude" class="col-sm-2 col-form-label"
            >Долгота</label
          >
          <div class="col-sm-8">
            <input
              v-model="city.longitude"
              type="text"
              class="form-control"
              id="addCityLongitude"
            />
          </div>
        </div>
        <button type="button" @click="createCity" class="btn btn-primary">
          Сохранить
        </button>
      </div>
      <br />
      <br />
      <div v-if="cityWorkType === 'edit'" class="edit-city">
        <h4>Редактирование города</h4>
        <br />
        <br />
        <select
          @change="setCityEditData"
          id="cityList"
          v-model="city.selectCity"
          class="custom-select"
        >
          <option
            :value="city"
            v-for="city in citiesList"
            selected
            :key="city.id"
            >{{ city.cityName }}</option
          >
        </select>
        <br />
        <br />
        <div class="form-group row">
          <label for="editCityName" class="col-sm-2 col-form-label"
            >Наименование Города</label
          >
          <div class="col-sm-8">
            <input
              v-model="city.cityName"
              type="text"
              class="form-control"
              id="editCityName"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="editCityLatitude" class="col-sm-2 col-form-label"
            >Широта</label
          >
          <div class="col-sm-8">
            <input
              v-model="city.latitude"
              type="text"
              class="form-control"
              id="editCityLatitude"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="editCityLongitude" class="col-sm-2 col-form-label"
            >Долгота</label
          >
          <div class="col-sm-8">
            <input
              v-model="city.longitude"
              type="text"
              class="form-control"
              id="editCityLongitude"
            />
          </div>
        </div>
        <button type="button" @click="editCity" class="btn btn-success">
          Сохранить
        </button>
        <!--        <button type="button" @click="deleteCity" class="btn btn-danger">-->
        <!--          Удалить-->
        <!--        </button>-->
      </div>
    </div>

    <div class="add-affiliate-form">
      <h4>Управление Филиалами</h4>
      <p v-if="errAffilText" style="color: red">{{ errAffilText }}</p>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          class="btn btn-primary"
          @click="affiliateWorkType = 'add'"
        >
          Добавить
        </button>
        <button
          type="button"
          class="btn btn-success"
          @click="affiliateWorkType = 'edit'"
        >
          Редактировать
        </button>
      </div>
      <p v-if="affiliateFinallyText" style="color: green">
        {{ affiliateFinallyText }}
      </p>

      <div v-if="affiliateWorkType === 'add'" class="add-affiliate">
        <h4>Добавление Филиалами</h4>
        <div class="form-group row">
          <label for="city" class="col-sm-2 col-form-label">Город</label>
          <select id="city" v-model="affiliate.city" class="custom-select">
            <option
              v-for="city in citiesList"
              selected
              :key="city.cityName"
              :value="city"
              >{{ city.cityName }}</option
            >
          </select>
        </div>
        <div class="form-group row">
          <label for="affiliate" class="col-sm-2 col-form-label"
            >Наименование филиала</label
          >
          <div class="col-sm-8">
            <input
              v-model="affiliate.affiliateName"
              type="text"
              class="form-control"
              id="affiliate"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="affiliateAdress" class="col-sm-2 col-form-label"
            >Адрес филиала</label
          >
          <div class="col-sm-8">
            <input
              v-model="affiliate.address"
              type="text"
              class="form-control"
              id="affiliateAdress"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="affiliatePhone" class="col-sm-2 col-form-label"
            >Телефон филиала
          </label>
          <div class="col-sm-8">
            <input
              v-mask="'+# (###) ###-##-##'"
              v-model="affiliate.affiliatePhone"
              type="text"
              class="form-control"
              id="affiliatePhone"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="workTime" class="col-sm-2 col-form-label"
            >График работы</label
          >
          <div class="col-sm-8">
            <input
              v-model="affiliate.schedule"
              type="text"
              class="form-control"
              id="workTime"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="latitude">Широта</label>
            <input
              v-model="affiliate.latitude"
              type="text"
              class="form-control"
              id="latitude"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="longitude">Долгота</label>
            <input
              v-model="affiliate.longitude"
              type="text"
              class="form-control"
              id="longitude"
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-8">
            <button
              @click="crateAffiliate()"
              type="submit"
              class="btn btn-primary"
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
      <div v-if="affiliateWorkType === 'edit'" class="edit-affiliate">
        <h4>Редактирование Филиала</h4>
        <div class="form-group row">
          <label for="editCity" class="col-sm-2 col-form-label">Город</label>
          <select
            @change="getAffiliate"
            id="editCity"
            v-model="affiliate.city"
            class="custom-select"
          >
            <option
              v-for="city in citiesList"
              selected
              :key="city.cityName"
              :value="city"
              >{{ city.cityName }}</option
            >
          </select>
        </div>
        <div v-if="affiliate.city" class="form-group row">
          <label for="affiliateList" class="col-sm-2 col-form-label"
            >Филиал</label
          >
          <select
            id="affiliateList"
            @change="setAffiliateEditData"
            v-model="affiliate.selectAffiliate"
            class="custom-select"
          >
            <option
              v-for="affiliate in affiliate.affiliateList"
              selected
              :key="affiliate.affiliateName"
              :value="affiliate"
              >{{ affiliate.affiliateName }}</option
            >
          </select>
        </div>
        <div v-if="affiliate.selectAffiliate">
          <div class="form-group row">
            <label for="editAffiliate" class="col-sm-2 col-form-label"
              >Наименование филиала</label
            >
            <div class="col-sm-8">
              <input
                v-model="affiliate.affiliateName"
                type="text"
                class="form-control"
                id="editAffiliate"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="editAffiliateAdress" class="col-sm-2 col-form-label"
              >Адрес филиала</label
            >
            <div class="col-sm-8">
              <input
                v-model="affiliate.address"
                type="text"
                class="form-control"
                id="editAffiliateAdress"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="editAffiliateNumber" class="col-sm-2 col-form-label"
              >Телефон филиала
            </label>
            <div class="col-sm-8">
              <input
                v-mask="'+# (###) ###-##-##'"
                v-model="affiliate.affiliatePhone"
                type="text"
                class="form-control"
                id="editAffiliateNumber"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="editWorkTime" class="col-sm-2 col-form-label"
              >График работы</label
            >
            <div class="col-sm-8">
              <input
                v-model="affiliate.schedule"
                type="text"
                class="form-control"
                id="editWorkTime"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="editLatitude">Широта</label>
              <input
                v-model="affiliate.latitude"
                type="text"
                class="form-control"
                id="editLatitude"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="editLongitude">Долгота</label>
              <input
                v-model="affiliate.longitude"
                type="text"
                class="form-control"
                id="editLongitude"
              />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-8">
              <button
                @click="editAffiliate()"
                type="submit"
                class="btn btn-primary"
              >
                Сохранить
              </button>
              <button
                @click="deleteAffiliate()"
                type="submit"
                class="btn btn-danger"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAllCities,
  addCities,
  // destroyCities,
  editCities,
  addAffiliate,
  editAffiliate,
  getAffiliate,
  destroyAffiliate
  // destroyAffiliate
} from "../../../app/api-admin";
export default {
  name: "MapControl",
  data() {
    return {
      citiesList: [],
      cityWorkType: "",
      affiliateWorkType: "",
      finallyText: "",
      affiliateFinallyText: "",
      errText: "",
      errAffilText: "",
      city: {
        selectCity: "",
        cityName: "",
        latitude: "",
        longitude: ""
      },
      affiliate: {
        affiliateList: [],
        selectAffiliate: "",
        city: "",
        affiliateName: "",
        affiliatePhone: "",
        address: "",
        schedule: "",
        latitude: "",
        longitude: ""
      },
      errorRussian: {
        selectCity: "Город",
        cityName: " Наименование города",
        latitude: "Широта",
        longitude: "Долгота"
      },
      errorRussianAffiliate: {
        affiliateName: "Наименование филиала",
        affiliatePhone: "Телефон филиала",
        address: "Адрес филиала",
        schedule: "Время работы",
        latitude: "Широта",
        longitude: "Долгота"
      }
    };
  },
  created() {
    this.getAllCity();
  },
  methods: {
    getAllCity() {
      getAllCities().then(cities => {
        this.citiesList = cities.data;
      });
    },
    createCity() {
      const sendData = {
        cityName: this.city.cityName,
        latitude: this.city.latitude,
        longitude: this.city.longitude
      };

      for (let data in sendData) {
        if (sendData[data] === "") {
          this.errText = `Необходимо заполнить поле ${this.errorRussian[data]}`;
          return;
        }
      }
      addCities(sendData).then(response => {
        if ( !this.controlsResponse(response) ) {
          this.errText = `Не удалось удалить филиал. Повторите попытку позже!`;
          return;
        }
        const cities = response.data;
        this.citiesList.push(cities.location);
        this.city.cityName = "";
        this.city.latitude = "";
        this.city.longitude = "";
        this.cityWorkType = "";
        this.finallyText = "Город успешно создан";
      }).catch(err => {
        console.log(err);
        this.$router.push({ path: "/sign-in-admin" });
      });
    },
    setCityEditData() {
      this.city.cityName = this.city.selectCity.cityName;
      this.city.latitude = this.city.selectCity.latitude;
      this.city.longitude = this.city.selectCity.longitude;
    },
    setAffiliateEditData() {
      this.affiliate.affiliateName = this.affiliate.selectAffiliate.affiliateName;
      this.affiliate.affiliatePhone = this.affiliate.selectAffiliate.affiliatePhone;
      this.affiliate.address = this.affiliate.selectAffiliate.address;
      this.affiliate.schedule = this.affiliate.selectAffiliate.schedule;
      this.affiliate.latitude = this.affiliate.selectAffiliate.latitude;
      this.affiliate.longitude = this.affiliate.selectAffiliate.longitude;
    },
    editCity() {
      const sendData = {
        cityName: this.city.cityName,
        latitude: this.city.latitude,
        longitude: this.city.longitude,
        cityId: this.city.selectCity ? this.city.selectCity.id : ""
      };

      for (let data in sendData) {
        if (sendData[data] === "") {
          this.errText = `Необходимо заполнить поле ${this.errorRussian[data]}`;
          return;
        }
      }

      editCities(sendData).then((response) => {
        if ( !this.controlsResponse(response) ) {
          this.errText = `Не удалось обновить данные города. Повторите попытку позже!`;
          return;
        }
        this.city.cityName = "";
        this.city.latitude = "";
        this.city.longitude = "";
        this.cityWorkType = "";
        this.finallyText = "Город успешно изменен";
      }).catch(err => {
        this.$router.push({ path: "/sign-in-admin" });
      });
    },
    getAffiliate() {
      const cityId = this.affiliate.city.id;
      this.dropAffiliateData();
      this.affiliate.selectAffiliate = "";
      getAffiliate(cityId).then(res => {
        this.affiliate.affiliateList = res.data;
      });
    },
    controlsResponse(response) {
      const respData = response.data;
      if ( !!respData && respData.err ) {
        if ( respData.code === 1 ) {
          this.$store.dispatch("logout");
          this.$router.push({ path: "/sign-in-admin" });
          return;
        }
        return false;
      }
      return true;
    },
    crateAffiliate() {
      const sendData = {
        cityId: this.affiliate.city.id,
        affiliateName: this.affiliate.affiliateName,
        affiliatePhone: this.affiliate.affiliatePhone,
        address: this.affiliate.address,
        schedule: this.affiliate.schedule,
        latitude: this.affiliate.latitude,
        longitude: this.affiliate.longitude
      };
      for (let data in sendData) {
        if (sendData[data] === "") {
          this.errAffilText = `Необходимо заполнить поле ${this.errorRussianAffiliate[data]}`;
          return;
        }
      }
      addAffiliate(sendData).then((response) => {
        if ( !this.controlsResponse(response) ) {
          this.errAffilText = `Не удалось сохранить данные. Повторите попытку позже!`;
          return;
        }
        this.dropAffiliateData();
        this.affiliateWorkType = "";
        this.affiliateFinallyText = "Филиал успешно создан";
      });
    },
    dropAffiliateData() {
      this.affiliate.affiliateName = "";
      this.affiliate.affiliatePhone = "";
      this.affiliate.address = "";
      this.affiliate.schedule = "";
      this.affiliate.latitude = "";
      this.affiliate.longitude = "";
    },
    editAffiliate() {
      const sendData = {
        id: this.affiliate.selectAffiliate.id,
        cityId: this.affiliate.city.id,
        affiliateName: this.affiliate.affiliateName,
        affiliatePhone: this.affiliate.affiliatePhone,
        address: this.affiliate.address,
        schedule: this.affiliate.schedule,
        latitude: this.affiliate.latitude,
        longitude: this.affiliate.longitude
      };
      for (let data in sendData) {
        if (sendData[data] === "") {
          this.errAffilText = `Необходимо заполнить поле ${this.errorRussianAffiliate[data]}`;
          return;
        }
      }
      editAffiliate(sendData).then((response) => {
        if ( !this.controlsResponse(response) ) {
          this.errAffilText = `Не удалось сохранить данные. Повторите попытку позже!`;
          return;
        }
        this.dropAffiliateData();
        this.affiliateWorkType = "";
        this.affiliateFinallyText = "Филиал успешно изменен";
      }).catch(err => {
        this.$router.push({ path: "/sign-in-admin" });
      });
    },
    deleteCity() {},
    deleteAffiliate() {
      const affiliateId = this.affiliate.selectAffiliate.id;
      destroyAffiliate(affiliateId).then((response) => {
        if ( !this.controlsResponse(response) ) {
          this.errAffilText = `Не удалось удалить филиал. Повторите попытку позже!`;
          return;
        }
        this.dropAffiliateData();
        this.affiliateWorkType = "";
        this.affiliate.selectAffiliate = "";
        this.affiliateFinallyText = "Филиал успешно удален";
      }).catch(err => {
        this.$router.push({ path: "/sign-in-admin" });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.map-control {
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & .add-city-form {
    width: 50%;
    padding: 20px;
  }
  & .add-affiliate-form {
    width: 50%;
    padding: 20px;

    & form {
      width: 50%;
      border: solid 1px #b2b3b3;
      padding: 20px;
    }
  }

  & .form-group {
    justify-content: space-between !important;

    & .form-control {
    }
    & label {
    }
  }
}
@media only screen and (max-width: 700px) {
  .map-control {
    flex-wrap: wrap;
    & .add-city-form, & .add-affiliate-form {
      width: 100%;
    }
  }
}
</style>
