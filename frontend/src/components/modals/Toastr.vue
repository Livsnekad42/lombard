<template>
  <div v-if="!!$store.getters.toasterError || !!$store.getters.toasterSuccess || !!$store.getters.toasterWarning">
    <div class="modal-backdrop fade show"></div>
    <div class="modal fade show" id="exampleModalCenter" tabindex="-1" aria-labelledby="exampleModalCenterTitle" style="display: block; padding-right: 15px;" aria-modal="true" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-if="!!$store.getters.toasterError" class="modal-title">Ошибка!!</h5>
            <h5 v-if="!!$store.getters.toasterSuccess" class="modal-title">Успешно!!</h5>
            <h5 v-if="!!$store.getters.toasterWarning" class="modal-title">Внимание!!</h5>
            <button @click="closeToaster()" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <p>{{ $store.getters.toasterMessage }}</p>
          </div>
          <div class="modal-footer">
            <button @click="closeToaster()" type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Toastr",
  methods: {
    closeToaster() {
      this.$store.dispatch('toaster', {hide: true});
    }
  }
}
</script>

<style scoped>

</style>