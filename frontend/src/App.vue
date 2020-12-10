<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
    <MainModal />
    <MainLoader />
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
