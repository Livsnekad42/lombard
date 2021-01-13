<template>
  <div class="row page__spa">
    <div class="col-12">
      <h4>Настройки</h4>
      <div id="prolongStatus">
        <input type="checkbox" id="prolongationStatus" v-model="settings.prolongationStatus.completed">
        <label for="prolongationStatus">Статус быстрого продления
        <span>{{settings.prolongationStatus.title}}</span>
        </label>
      </div>
      <div id="prolongMessage">
        <label for="prolongationMessage">Сообщение в случае невалидности пролонгации</label>
        <textarea name="prolongationMessage" id="prolongationMessage" cols="10" rows="10" v-model="settings.prolongationMessage.body"></textarea>
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

  data: function () {
    return {
      settings: {
        prolongationStatus: "",
        prolongationMessage: ""
      }

    }
  },
  created() {
    axios.get('https://jsonplaceholder.typicode.com/todos/4').then(response => this.settings.prolongationStatus = response.data);
    axios.get('https://jsonplaceholder.typicode.com/posts/4').then(response => this.settings.prolongationMessage = response.data);
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