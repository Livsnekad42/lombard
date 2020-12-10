<template>
  <div class="mainBack" id="parent_popup" v-if="showLoader">
    <fullScreenLoader v-if="showLoader === 'fullScreen'" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "index",
  components: {
    fullScreenLoader: () => import("./fullScreenLoader")
  },
  computed: {
    ...mapGetters(["getLoaderBase"]),
    showLoader: {
      get() {
        return this.getLoaderBase("type");
      }
    }
  }
};
</script>

<style scoped>
.mainBack {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  /*background-color: rgba(0, 0, 0, 0.44);*/
  background-color: #e9ecef8f;
  z-index: 999;
  justify-content: center;
}
</style>
