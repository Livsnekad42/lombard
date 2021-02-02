<template>
  <div class="row page__spa">
    <div class="col-9">
      <h4>Загруженные документы</h4>
      <div>
        <table class="table table-striped table-hover">
          <thead>
          <tr>
            <th scope="col">Титул</th>
            <th scope="col">URL</th>
            <th scope="col">Дата создания</th>
            <th scope="col">Проект</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(document, index) in documents" v-bind:key="index">
            <td>{{ document.title }}</td>
            <td><a target="_blank" v-bind:href="'http://test.tezlombard.kz'+document.url">{{document.url}}</a></td>
            <td>{{ document.createdAt | formatDate }}</td>
            <td>{{ document.project }}</td>
            <td><button @click="delDocument(document)" type="button" class="btn btn-danger">удалить</button></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-3">
      <h4>Новый документ</h4>
      <div class="form-group">
        <div v-if="!!errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>
        <label for="exampleInputEmail1">Титул документа</label>
        <input v-model="titleDocument" type="text" class="form-control" id="exampleInputEmail1" placeholder="Титул документа ...">
        <input v-model="projectDocument" type="text" class="form-control" id="exampleInputApp" placeholder=" Проект документа ...">
        <small id="emailHelp" class="form-text text-muted">*обязательное поле.</small>
      </div>
      <div>
        <SelectFiles ref="selectFiles" v-bind:extPatterns="['pdf', 'jpg']" v-on:files="submitFiles" />
      </div>
      <div class="_submit-block">
        <button @click="save()" type="button" class="btn btn-primary">Сохранить</button>
      </div>
    </div>
    <div class="col-12">
    </div>
  </div>
</template>

<script>
import SelectFiles from "../../../components/containers/SelectFiles";
export default {
  name: "DocumentControl",
  data() {
    return {
      file: null,
      errorMessage: "",
      titleDocument: "",
      documents: [],
      projectDocument: ""
    };
  },
  components: {
    SelectFiles
  },
  created() {
    this.$store.dispatch("getListDocument")
        .then(response => {
          if ( response.data ) {
            this.documents = response.data;
          }
        })
        .catch(err => {
          this.$store.dispatch("toaster", {type: "error", message: "Не удалось загрузить докумены! Повторите попытку позже."});
        });
  },
  methods: {
    submitFiles(files) {
      if ( files.length === 0 ) {
        this.file = null;
        return;
      }
      this.file = files[0];
    },
    isValid() {
      if ( this.titleDocument === "" ) {
        this.errorBind("Укажите титул документа!");
        return false;
      }
      if ( !this.file ) {
        this.errorBind("Выберите файл!");
        return false;
      }
      return true;
    },
    errorBind(message) {
      this.errorMessage = message;
      setTimeout(() => {this.errorMessage = "";}, 5000);
    },
    save() {
      if ( !this.isValid() ) return;
      const data = new FormData();
      data.append("files", this.file, this.file.name);
      data.append("title", this.titleDocument);
      data.append("project", this.projectDocument);
      console.log(data);
      this.$store.dispatch("loadDocument", data)
          .then(response => {
            if ( response.data.document ) {
              this.documents.push(response.data.document);
            }
            this.$refs.selectFiles.files = [];
            this.titleDocument = "";
            this.appDocument = "";
          })
          .catch(err => {
            this.$store.dispatch("toaster", {type: "error", message: "Не удалось сохранить документ! Повторите попытку позже."});
          });
    },
    delDocument(document) {
      let indexDocument = -1;
      if ( !document.id ) {
        indexDocument = this.documents.findIndex(_doc => _doc.url === document.url);
        if ( indexDocument < 0 ) return;
        this.documents.splice(indexDocument, 1);
      } else {
        indexDocument = this.documents.findIndex(_doc => _doc.id === document.id);
        this.$store.dispatch("deleteDocument", document.id)
            .then(response => {
              this.documents.splice(indexDocument, 1);
            })
            .catch(err => {
              if ( !this.$store.dispatch("controlsResponse", err) ) this.$router.push({ path: "/sign-in-admin" });
              else this.$store.dispatch("toaster", {type: "error", message: "Не удалось удалить документ! Повторите попытку позже."});
            });
      }
    }
  }
};
</script>

<style scoped lang="scss">
._submit-block {
  padding: 10px;
  display: flex;
  justify-content: center;
}
tbody {
  tr {
    td {
      font-size: 0.9rem;
    }
  }
}
#exampleInputApp {
  margin-top: 10px;
}
</style>
