<template>
  <div>
    <!--    <News />-->
    <LoanCalculate />
    <Prolongation />
    <!--    <AutoLoan />-->
    <Map />
  </div>
</template>
<script>
// import News from "../components/containers/News";
import LoanCalculate from "../components/containers/LoanCalculate";
import Prolongation from "../components/containers/Prolongation";
// import AutoLoan from "../components/containers/AutoLoan";
import Map from "../components/map";
import { mapActions } from "vuex";
export default {
  name: "Main",
  components: {
    Map,
    // AutoLoan,
    Prolongation,
    LoanCalculate
    // News
  },
  methods: {
    ...mapActions(["getAuthorize", "getTransactionStatus"])
  },
  created() {
    this.getTransactionStatus(this.$route.query);
    this.getAuthorize();
  }
};
</script>

<style scoped></style>
