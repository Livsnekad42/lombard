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
        <input type="number" class="form-control" id="processingPercent" placeholder="Процент процессинга" v-model="percentProcessing" step="0.05" required>
        <button type="button" class="btn btn-primary" @click="setSettings(fieldNames['percent'], percentProcessing)">Задать</button>
      </div>
      <div class="form-group">
        <label for="gold585">{{gold585PriceDescr}}</label>
        <input  type="number" class="form-control" id="gold585" placeholder="Стоимость 585 пробы" v-model="gold585Price" required>
        <button type="button" class="btn btn-primary" @click="setSettings(fieldNames['585'], gold585Price)">Задать</button>
      </div>
      <div class="form-group">
        <label for="gold750">{{gold750PriceDescr}}</label>
        <input  type="number" class="form-control" id="gold750" placeholder="Стоимость 750 пробы" v-model="gold750Price" required>
        <button type="button" class="btn btn-primary" @click="setSettings(fieldNames['750'], gold750Price)">Задать</button>
    </div>
  </div>
  </div>
</template>
<script>


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
            const responsePercent = response.data.find(elem => elem.fieldName == 'processingPercent');
            const response585 = response.data.find(elem => elem.fieldName == 'probePrice_585');
            const response750 = response.data.find(elem => elem.fieldName == 'probePrice_750');

            if (responsePercent && !!responsePercent.description && !!responsePercent.fieldName) {
              this.percentProcessingDescr = responsePercent.description;
              this.fieldNames['percent'] = responsePercent.fieldName;
            };
            if (response585 && !!response585.description && !!response585.fieldName) {
              this.gold585PriceDescr = response585.description;
              this.fieldNames['585'] = response585.fieldName;
            };
            if (response750 && !!response750.description && !!response750.fieldName) {
              this.gold750PriceDescr = response750.description;
              this.fieldNames['750'] = response750.fieldName;
            };
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
      if ( !!val && Number.isInteger(+val)) {
        this.$store.dispatch('setSetting', {fieldName: fieldName, value: +val});
      } else {
        this.$store.dispatch("toaster", {type: "error", message: "Введите корректное значение!"});
        console.log("Err: ", val);
      }

    }
  }
}
</script>

<style scoped lang="scss">
button {
  margin: 10px;
}
</style>