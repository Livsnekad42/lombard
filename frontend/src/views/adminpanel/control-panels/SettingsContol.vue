<template>
  <div class="row page__spa">
    <div class="col-8">
      <h4>Настройки</h4>
      <div class="comment__table__block">
        <table class="table table-striped table-hover">
          <thead>
          <tr>
            <th scope="col">Название параметра</th>
            <th scope="col">Значение параметра</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr class="row__comment" >
            <td >
              {{percentProcessingDescr}}
            </td>
            <td >
              {{getProcessingPercent}}
            </td>
          </tr>
          <tr class="row__comment" >
            <td >
              {{gold585PriceDescr}}
            </td>
            <td >
              {{get585}}
            </td>
          </tr>
          <tr class="row__comment" >
            <td >
              {{gold750PriceDescr}}
            </td>
            <td >
              {{get750}}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-4">
      <h4>Изменение настроек</h4>
      <div class="form-group">
        <label for="processingPercent">{{percentProcessingDescr}}</label>
        <input type="number" class="form-control" id="processingPercent" v-model="percentProcessing" step="0.05">
        <button type="button" class="btn btn-primary" @click="setPercent(fieldNames['percent'], percentProcessing)">Задать</button>
      </div>
      <div class="form-group">
        <label for="gold585">{{gold585PriceDescr}}</label>
        <input  type="number" class="form-control" id="gold585" placeholder="Стоимость 585 пробы" v-model="gold585Price">
        <button type="button" class="btn btn-primary" @click="setSettings(fieldNames['585'], gold585Price)">Задать</button>
      </div>
      <div class="form-group">
        <label for="gold750">{{gold750PriceDescr}}</label>
        <input  type="number" class="form-control" id="gold750" placeholder="Стоимость 750 пробы" v-model="gold750Price">
        <button type="button" class="btn btn-primary" @click="setSettings(fieldNames['750'], gold750Price)">Задать</button>
    </div>
  </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import axios from "axios";

export default {
  name: "SettingsControl",
  data() {
    return {
      percentProcessing: '',
      gold585Price: '',
      gold750Price: '',
      probePrice_585: '',
      probePrice_750: '',
      percentProcessingDescr: '',
      gold585PriceDescr: '',
      gold750PriceDescr: '',
      fieldNames: {}
    }
  },
  computed: {
    getProcessingPercent() {
      return this.$store.getters.getProcessingPercent;
    },
    get585() {
      return this.$store.getters.get585Price;
    },
    get750() {
      return this.$store.getters.get750Price;
    }
  },
  beforeMount() {
    this.$store.dispatch('getAllSetting')
        .then(response => {
          if ( response.data ) {
            const responsePercentDescr = response.data.find(elem => elem.fieldName == 'processingPercent').description;
            const response585Descr = response.data.find(elem => elem.fieldName == 'probePrice_585').description;
            const response750Descr = response.data.find(elem => elem.fieldName == 'probePrice_750').description;
            const responsePercentFieldName = response.data.find(elem => elem.fieldName == 'processingPercent').fieldName;
            const response585FieldName = response.data.find(elem => elem.fieldName == 'probePrice_585').fieldName;
            const response750FieldName = response.data.find(elem => elem.fieldName == 'probePrice_750').fieldName;

            if (responsePercentDescr) {
              this.percentProcessingDescr = response.data.find(elem => elem.fieldName == 'processingPercent').description;
            };
            if (response585Descr) {
              this.gold585PriceDescr = response.data.find(elem => elem.fieldName == 'probePrice_585').description;
            };
            if (response750Descr) {
              this.gold750PriceDescr = response.data.find(elem => elem.fieldName == 'probePrice_750').description;
            };
            if (responsePercentFieldName) {
              this.fieldNames['percent'] = response.data.find(elem => elem.fieldName == 'processingPercent').fieldName;
            };
            if (response585FieldName) {
              this.fieldNames['585'] = response.data.find(elem => elem.fieldName == 'probePrice_585').fieldName;
            }
            if (response750FieldName) {
              this.fieldNames['750'] = response.data.find(elem => elem.fieldName == 'probePrice_750').fieldName;
            }
          }
        })
        .catch(err => {
          this.$store.dispatch("toaster", {type: "error", message: "Произошла ошибка!"});
          console.log("Err: ", err);
        });
    this.$store.dispatch('actualizeCalcPrices');
    this.$store.dispatch('actualizePercent');
  },
  methods: {
    setSettings(fieldName, val) {
      this.$store.dispatch('setSetting', {fieldName: fieldName, value: val});
    },
    setPercent(fieldName, val) {
      this.$store.dispatch('setPercent', {fieldName: fieldName, value: val});
    }
  }
}
</script>

<style scoped lang="scss">
#prolongMessage {
  display: flex;
  flex-direction: column;
  & textarea {
    max-width: 500px;
  }
}
button {
  margin: 10px;
}
</style>