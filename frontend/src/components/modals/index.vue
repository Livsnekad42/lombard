<template>
  <div class="popup__veil" id="parent_popup" v-if="showModal">
    <IInAndLoanModal
      v-if="showModal === 'startRefinance'"
      @close="close()"
    />
    <ProlongationModal
      v-if="showModal === 'prolongation'"
      @close="close()"
    />
    <ReadyProlongationModal
      v-if="showModal === 'readyProlongation'"
      @close="close()"
    />
    <DeclineProlongationModal
      v-if="showModal === 'declineProlongation'"
      @close="close()"
    />
    <DeclineLoanData
      v-if="showModal === 'declineLoanData'"
      @close="close()"
      :errorText="title"
    />
    <SmsCodeModal
      :responseText="title"
      @close="close()"
      v-if="showModal === 'smsCodeModal'"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import ProlongationModal from "./ProlongationModal";
import DeclineLoanData from "./DeclineLoanData";
export default {
  name: "index",
  components: {
    DeclineLoanData,
    DeclineProlongationModal: () => import("./DeclineProlongationModal"),
    ReadyProlongationModal: () => import("./ReadyProlongationModal"),
    ProlongationModal,
    IInAndLoanModal: () => import("./IInAndLoanModal"),
    SmsCodeModal: () => import("./smsCodeModal")
  },
  computed: {
    ...mapGetters(["getModalBase", "getContext"]),
    showModal: {
      get() {
        return this.getModalBase("type");
      },
      set(value) {
        this.setModalBase({ type: "type", data: value });
      }
    },
    title: {
      get() {
        return this.getModalBase("title");
      },
      set(value) {
        this.setModalBase({ type: "title", data: value });
      }
    },
    contextData: {
      get() {
        return this.getContext;
      }
    }
  },
  methods: {
    ...mapMutations(["setModalBase", "freeContext"]),
    close() {
      this.showModal = null;
      this.freeContext();
    }
  }
};
</script>

<style scoped lang="scss">
  #popup_regist_card.popup__check .popup__form,
  .popup__veil {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
</style>
