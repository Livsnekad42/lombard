<template>
  <div class="popup__veil" id="parent_popup">
    <div class="modal fade show" tabindex="-1">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <span class="header-text"><strong>Редактор комментария</strong></span>
            <button @click="$emit('close')" type="button" class="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="content">
              <div class="logo-box">
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
                  <textarea v-model="comment.content" type="text" class="form-control" id="comment_content" placeholder="Комментарий ..." rows="10">
                  </textarea>
                  <small class="form-text text-muted commentHelp">*обязательное поле.</small>
                </div>
                <div class="form-group">
                  <label for="user_avatar">Аватар</label>
                  <input v-model="comment.avatar" type="text" class="form-control" id="user_avatar" placeholder="URL аватара ...">
                </div>
                <div class="form-group check__control">
                  <label for="comment_public">Опубликовать</label>
                  <input v-model="comment.isPublic" type="checkbox" id="comment_public">
                </div>
                <div class="_submit-block">
                  <button @click="update" type="button" class="btn btn-primary">Сохранить</button>
                  <button type="button" class="btn modal-btn mx-auto" @click="$emit('close')">
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpdateComment",
  props: [
    "comment"
  ],
  data() {
    return {
      errorMessage: "",
    };
  },
  created() {
  },
  methods: {
    update() {
      if ( !this.comment.username || !this.comment.content ) {
        this.errorMessage = "Заполните обязательные поля!";
        setTimeout(() => {this.errorMessage = "";}, 5000);
        return;
      }
      this.$emit('updateComment', this.comment);
    }
  }
}
</script>

<style scoped lang="scss">
  .modal {
    display: block;
  }
</style>