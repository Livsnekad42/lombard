<template>
  <vue-recaptcha
    ref="capture"
    sitekey="6LcwEL4ZAAAAAJzR_doABPx4rSMh_rCj5fdTvlff"
    :loadRecaptchaScript="true"
    width="100%"
    @verify="verifyMethods"
    @expired="expiredMethods"
    @error="errorMethods"
  ></vue-recaptcha>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
export default {
  name: "reCaptcha",
  components: { VueRecaptcha },
  methods: {
    verifyMethods() {
      this.$emit("verifyCallback", true);
    },
    expiredMethods() {
      this.$emit("verifyCallback", false);
    },
    errorMethods() {
      this.$emit("verifyCallback", false);
    }
  }
};
</script>

<style scoped lang="scss">
.capture {
  > div {
    margin: 10px auto;
  }
}
</style>
