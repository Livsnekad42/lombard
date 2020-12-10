<template>
  <div class="row">
    <div class="col-8">
      <h4>Загруженные документы</h4>
    </div>
    <div class="col-4">
      <h4>Новый документ</h4>
      <div class="form-group">
        <div v-if="!!errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>
        <label for="exampleInputEmail1">Титул документа</label>
        <input v-model="titleDocument" type="text" class="form-control" id="exampleInputEmail1" placeholder="Титул документа ...">
        <small id="emailHelp" class="form-text text-muted">*обязательное поле.</small>
      </div>
      <div>
        <SelectFiles v-bind:extPatterns="['pdf']" v-on:files="submitFiles" />
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
      titleDocument: ""
    };
  },
  components: {
    SelectFiles
  },
  created() {
    
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
      console.log("data: ", data);
      this.$store.dispatch("")
    }
  }
};
</script>

<style scoped lang="scss">
.row {
  padding: 1rem;
}
._submit-block {
  padding: 10px;
  display: flex;
  justify-content: center;
}
</style>
