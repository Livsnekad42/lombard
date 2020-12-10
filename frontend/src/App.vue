<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
    <MainModal />
    <MainLoader />
    <div v-if="!!$store.getters.toasterError || !!$store.getters.toasterSuccess || !!$store.getters.toasterWarning" class="modal-backdrop fade show"></div>
    <div v-if="!!$store.getters.toasterError || !!$store.getters.toasterSuccess || !!$store.getters.toasterWarning" class="modal fade show" id="exampleModalCenter" tabindex="-1" aria-labelledby="exampleModalCenterTitle" style="display: block; padding-right: 15px;" aria-modal="true" role="dialog">
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

<style lang="scss"></style>
<script>
import Header from "./components/Layouts/Header";
import Footer from "./components/Layouts/Footer";
import MainModal from "./components/modals";
import MainLoader from "./components/loaders";
// import './assets/style/main.scss'
export default {
  name: "App",
  components: {
    Header,
    Footer,
    MainModal,
    MainLoader
  },
  created() {
    console.log("App: start");
  },
  methods: {
    closeToaster() {
      this.$store.dispatch('toaster', {hide: true});
    }
  }
};
</script>

<style lang="scss">
@import "assets/style/variables";
#app {
  font-family: GoodPro, sans-serif !important;
  overflow-x: hidden;
  // width: 100vw;
  @font-face {
    font-family: "GoodPro";
    src: url("./assets/fonts/GoodPRO/FFGoodPro.otf") format("otf"),
      url("./assets/fonts/GoodPRO/FFGoodProLight.otf") format("otf");
    font-weight: bold;
    font-style: normal;
  }
  main {
    min-height: calc(100vh - #{$footer-desctop-height + $header-desctop-height});
  }
}
@media only screen and (max-width: 700px) {
  #app {
    main {
      min-height: calc(100vh - #{$footer-mobile-height + $header-mobile-height});
    }
  }
}
@import "./assets/style/mobile";
@import "./assets/style/tablet";
@import "./assets/style/main";
</style>
