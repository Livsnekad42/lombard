<template>
  <div class="row page__spa">
    <div class="col-12">
      <h4>Настройки</h4>
      <div id="prolongStatus">
        <input type="checkbox" id="prolongationStatus" v-model="prolongationStatus">
        <label for="prolongationStatus">Статус быстрого продления
        </label>
      </div>
      <div id="prolongMessage">
        <label for="prolongationMessage">Сообщение в случае невалидности пролонгации</label>
        <textarea name="prolongationMessage" id="prolongationMessage" cols="10" rows="10"></textarea>
      </div>
      <div id="priceForGold" style="display: flex; flex-direction: column">
        <label for="gold585">
          Стоимость пробы 585
          <input type="text" id="gold585" v-model="getGold585Price">
        </label>
        <label for="gold750">
          Стоимость пробы 750
          <input type="text" id="gold750" v-model="getGold750Price">
        </label>
        <label for="percent">
          Процент для пролонгации
          <input type="text" id="percent" v-model="getPercent">
        </label>
      </div>
      <button @click="save()">Сохранить</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import axios from "axios";

export default {
  name: "SettingsContol",
  data() {
    return {
      settings: {
        prolong: this.getPercent
      }
    }
  },
  computed: {
    prolongationStatus() {
      return this.$store.getters.getProlongationStatus;
    },
    getGold585Price() {
      return this.$store.getters.getCalcProbePrice("585")
    },
    getGold750Price() {
      return this.$store.getters.getCalcProbePrice("750")
    },
    getPercent() {
      return this.$store.getters.getPercentLoanCalc;
    }
  },
  created() {

    /*
    axios.get('https://jsonplaceholder.typicode.com/todos/4').then(response => this.settings.prolongationStatus = response.data);
    axios.get('https://jsonplaceholder.typicode.com/posts/4').then(response => this.settings.prolongationMessage = response.data);
    */
  },
  mounted() {
    this.$store.dispatch("getProlongationStatus");
  },
  methods: {
    save() {
      console.log('123123');
      this.$store.dispatch("saveSettings", this.settings)
          /*
          .then(resp => {
            if ( resp.data && resp.data.comment ) {
              this.commentList.push(resp.data.comment);
            }
          })
          .catch(err => {
            console.log("*** err: ", err);
            this.$store.dispatch("toaster", {type: "error", message: "Не удалось сохранить комментарий! Повторите попытку позже."});
          });
      */
    },
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
</style>