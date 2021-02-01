<template>
  <div class="row page__spa">
    <div class="col-8">
      <h4>Комментарии</h4>
      <div class="comment__table__block">
        <table class="table table-striped table-hover">
          <thead>
          <tr>
            <th scope="col">Дата создания</th>
            <th scope="col">Имя</th>
            <th scope="col">Содержание</th>
            <th scope="col">Аватар URL</th>
            <th scope="col">Проект</th>
            <th scope="col">Город</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr class="row__comment" v-for="(comment, index) in commentList" v-bind:key="index" @click="editComment(comment)" v-bind:class="{ new: !comment.isRead }">
            <td>{{ comment.createdAt | formatDate }}</td>
            <td>{{ comment.username }}</td>
            <td>{{ comment.content }}</td>
            <td>{{ comment.avatar }}</td>
            <td>{{ comment.project }}</td>
            <td>{{ myCities[comment.cityId] }}</td>
            <td><button @click="delComment(comment, $event)" type="button" class="btn btn-danger">удалить</button></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-4">
      <h4>Новый Комментарий</h4>
      <div v-if="!!errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>
      <div class="form-group">
        <label for="user_name">Имя пользователя</label>
        <input v-model="comment.username" type="text" class="form-control" id="user_name" placeholder="Имя ...">
        <small class="form-text text-muted commentHelp">*обязательное поле.</small>
      </div>
      <div class="form-group">
        <label for="comment_content">Комментарий</label>
        <textarea v-model="comment.content" type="text" class="form-control" id="comment_content" placeholder="Комментарий ...">
        </textarea>
        <small class="form-text text-muted commentHelp">*обязательное поле.</small>
      </div>
      <div class="form-group">
        <label for="user_avatar">Аватар</label>
        <input v-model="comment.avatar" type="text" class="form-control" id="user_avatar" placeholder="URL аватара ...">
      </div>
      <div class="form-group">
        <label for="user_project">Проект</label>
        <input v-model="comment.project" type="text" class="form-control" id="user_project" placeholder="Название проекта ...">
      </div>
      <div class="form-group">
        <label for="user_city">Город</label>
        <select
            id="user_city"
            v-model="comment.cityId"
            class="custom-select"
        >
          <option
              v-for="city in citiesList"
              selected
              :key="city.cityName"
              :value="city.id"
          >{{ city.cityName }}</option>
        </select>
      </div>
      <div class="form-group check__control">
        <label for="comment_public">Опубликовать</label>
        <input v-model="comment.isPublic" type="checkbox" id="comment_public">
      </div>
      <div class="_submit-block">
        <button @click="save()" type="button" class="btn btn-primary">Сохранить</button>
      </div>
    </div>
    <UpdateComment
        v-if="editShow" ref="updateComment"
        :comment="commentEdit"
        v-on="handlerEvent"/>
  </div>
</template>

<script>
import UpdateComment from "./modals/updateComment";
import {
  getAllCities
} from "../../../app/api-admin";
import router from "@/router";
export default {
  name: "CommentsControl",
  data() {
    return {
      citiesList: [],
      myCities : {
        1: "Нур-Султан",
        2: "Алматы",
        3: "Капшагай",
        4: "Кокшетау",
        5: "Тараз",
        6: "Талдыкорган",
      },
      errorMessage: "",
      commentList: [],
      comment: {
        username: "",
        content: "",
        avatar: "",
        isPublic: true,
        cityId: 0, // number
        project: "",
        isRead: false
      },
      commentEdit: null,
      editShow: false,
      handlerEvent: {
        close: () => this.editShow = false,
        updateComment: (data) => {
          this.updateComment(data);
        }
      }
    };
  },
  components: {
    UpdateComment
  },
  created() {
    this.getAllCity();
    this.$store.dispatch("getListComment")
        .then(response => {
          if ( response.data ) {
            this.commentList = response.data;
            console.log(this.commentList);
          }
        })
        .catch(err => {
          this.$store.dispatch("toaster", {type: "error", message: "Не удалось создать комментарий! Повторите попытку позже."});
          console.log("Err: ", err);
        });

  },
  methods: {
    getAllCity() {
      getAllCities().then(cities => {
        this.citiesList = cities.data;
      });
    },
    delComment(comment, event) {
      event.stopPropagation();
      const index = this.commentList.findIndex(_comment => _comment.id === comment.id);
      if ( index < 0 ) return;
      this.$store.dispatch("deleteComment", comment.id)
          .then(resp => {
            this.commentList.splice(index, 1);
          })
          .catch(err => {
            console.log("Err Del: ", err);
            this.$store.dispatch("toaster", {type: "error", message: "Не удалось удалить комментарий! Повторите попытку позже."});
          });
    },
    editComment(comment) {
      comment.isRead = true;
      this.$store.dispatch("editComment", comment).catch(err => {
        this.$store.dispatch("toaster", {type: "error", message: "Не удалось изменить комментарий! Повторите попытку позже."});
      });
      this.commentEdit = comment;
      this.editShow = true;
    },
    save() {
      if ( !this.isValid() ) {
        return;
      }
      this.$store.dispatch("addComment", this.comment)
          .then(resp => {
            if ( resp.data && resp.data.comment ) {
              console.log(resp);
              this.commentList.push(resp.data.comment);
            }
            this.comment.username = "";
            this.comment.content = "";
            this.comment.avatar = "";
            this.comment.project = "",
            this.comment.isRead = false,
                this.comment.isPublic = true;
          })
          .catch(err => {
            console.log("*** err: ", err);
            this.$store.dispatch("toaster", {type: "error", message: "Не удалось сохранить комментарий! Повторите попытку позже."});
          });;
    },
    isValid() {
      if ( this.comment.username === "" ) {
        this.errorBind("Введите имя пользователя!");
        return false;
      }
      if ( this.comment.content === "" ) {
        this.errorBind("Введите комментарий");
        return false;
      }
      if ( this.comment.project === "" ) {
        this.errorBind("Введите название проекта");
        return false;
      }
      return true;
    },
    updateComment(comment) {
      this.$store.dispatch("editComment", comment)
          .then(resp => {
            if ( resp.data && resp.data.comment ) {
              const index = this.commentList.findIndex(_comment => _comment.id === resp.data.comment.id);
              if ( index < 0 ) return;
              this.commentList[index] = resp.data.comment;
              this.editShow = false;
            }
          })
          .catch(err => {
            this.$store.dispatch("toaster", {type: "error", message: "Не удалось изменить комментарий! Повторите попытку позже."});
          });
    },
    errorBind(message) {
      this.errorMessage = message;
      setTimeout(() => {this.errorMessage = "";}, 5000);
    },
  }
}
</script>
<style scoped lang="scss">
.comment__table__block {
  overflow-x: auto;
  .row__comment {
    cursor: pointer;
  }
}
.check__control {
  input {
    margin-left: 10px;
    margin-top: 4px;
  }
}
.new::after {
  content: "!";
  position: absolute;
  left: 0;
  background-color: red;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  font-size: 30px;
  padding-left: 13px;
  color: #fff;
  display: block;
}
</style>
