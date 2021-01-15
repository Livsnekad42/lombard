<template>
  <div class="row page__spa">
    <div class="col-8">
      <h4>Настройки</h4>
      <div class="comment__table__block">
        <table class="table table-striped table-hover">
          <thead>
          <tr>
            <th scope="col">Статус пролонгации</th>
            <th scope="col">Сообщение пролонгации</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr class="row__comment">
            <td><input type="checkbox" v-model="prolongationState"></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-4">
      <h4>Изменение настроек</h4>
      <div class="form-group">
        <label for="prolongationStatus">Статус пролонгации</label>
        <input type="checkbox" class="form-control" id="prolongationStatus" v-model="prolongationState">
      </div>
      <div class="form-group">
        <label for="comment_content">Комментарий</label>
        <textarea  type="text" class="form-control" id="comment_content" placeholder="Комментарий ...">
        </textarea>
        <small class="form-text text-muted commentHelp">*обязательное поле.</small>
      </div>
      <div class="form-group">
        <label for="user_avatar">Аватар</label>
        <input type="text" class="form-control" id="user_avatar" placeholder="URL аватара ...">
      </div>
      <div class="form-group">
        <label for="user_project">Аватар</label>
        <input type="text" class="form-control" id="user_project" placeholder="Название проекта ...">
      </div>

      <div class="form-group check__control">
        <label for="comment_public">Опубликовать</label>
        <input type="checkbox" id="comment_public">
      </div>
      <div class="_submit-block">
        <button type="button" class="btn btn-primary" @click="save()">Сохранить</button>
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
      settings: {
        prolongationStatus: false,
        bla: 345
      }
    }
  },
  computed: {

    prolongationState() {
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
    },
  },
  created() {

    /*
    axios.get('https://jsonplaceholder.typicode.com/todos/4').then(response => this.settings.prolongationStatus = response.data);
    axios.get('https://jsonplaceholder.typicode.com/posts/4').then(response => this.settings.prolongationMessage = response.data);
    */
  },
  updated() {
    this.$store.dispatch('saveSettings', true)
  },
  mounted() {
    this.$store.dispatch("getProlongationStatus");
  },
  methods: {
    save() {
      return this.$store.dispatch('saveSettings', false)
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
</style>