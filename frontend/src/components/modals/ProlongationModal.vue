<template>
  <div class="modal fade show" id="exampleModal" tabindex="-1">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button @click="$emit('close')" type="button" class="close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body mx-auto">
          <div class="content">
            <div class="info-block">
              <div class="_text">
                <div class="info_title">№ЗАЙМА ПРОДЛЕНИЯ</div>
                <div class="data">{{ ticketNumber }}</div>
              </div>
              <div class="_text">
                <div class="info_title">ИТОГО К ОПЛАТЕ:</div>
                <div class="data">{{ amount.toLocaleString("ru") }} ₸</div>
              </div>
            </div>
            <div class="slide-block">
              <div class="days-numbers">
                <div v-html="options.min"></div>
                <div v-html="options.max"></div>
              </div>
              <vue-slider
                ref="slider"
                v-model="days"
                v-bind="options"
                :marks="true"
                :hide-label="true"
              ></vue-slider>
            </div>
            <input class="selected-block" v-model="days" readonly />
            <button
              @click="startProcessingTransaction"
              type="button"
              class="btn modal-btn"
            >
              Продлить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "ProlongationModal",
  components: {
    VueSlider
  },
  data() {
    return {
      value: 3,
      options: {
        dotSize: 24,
        width: "auto",
        height: 4,
        contained: false,
        direction: "ltr",
        data: null,
        min: 5,
        max: 30,
        interval: 1,
        disabled: false,
        clickable: true,
        duration: 0.5,
        adsorb: false,
        lazy: false,
        tooltip: "none",
        tooltipPlacement: "top",
        tooltipFormatter: void 0,
        useKeyboard: false,
        keydownHook: null,
        dragOnClick: false,
        enableCross: true,
        fixed: false,
        minRange: void 0,
        maxRange: void 0,
        order: true,
        marks: false,
        dotOptions: void 0,
        process: true,
        dotStyle: void 0,
        railStyle: void 0,
        processStyle: void 0,
        tooltipStyle: void 0,
        stepStyle: void 0,
        stepActiveStyle: void 0,
        labelStyle: void 0,
        labelActiveStyle: void 0
      }
    };
  },
  created() {
    this.getCurrCalculateData();
  },
  computed: {
    ...mapGetters([
      "getProlongationsLoanDataBase",
      "getProlongationsIncomeBase"
    ]),

    days: {
      get() {
        return this.getProlongationsLoanDataBase("days");
      },
      set(value) {
        this.setProlongationLoanDataBase({ type: "days", data: value });
      }
    },

    amount: {
      get() {
        return this.getProlongationsLoanDataBase("amount");
      },
      set(value) {
        this.setProlongationLoanDataBase({ type: "amount", data: value });
      }
    },

    ticketNumber: {
      get() {
        return this.getProlongationsIncomeBase("ticketNumber");
      }
    }
  },
  methods: {
    ...mapMutations(["setProlongationLoanDataBase"]),
    ...mapActions(["startProcessingTransaction"]),
    getCurrCalculateData() {
      if (this.days <= 3) {
        this.options.disabled = true;
      }
      this.options.max = this.days;

      // const intervalVariables = intDays =>
      //   (this.days - intDays) / this.options.min;

      // this.options.interval = this.isInteger(
      //   intervalVariables(this.options.min)
      // )
      //   ? 3
      //   : this.isInteger(intervalVariables(2))
      //   ? 2
      //   : 1;
    },
    isInteger(num) {
      return (num ^ 0) === num;
    }
  }
};
</script>

<style scoped lang="scss">
.modal {
  display: block;
  position: absolute;
  .modal-header {
    border: none;
    padding-bottom: 0;
    span {
      font-size: 40px;
      color: #2b2a29;
    }
  }
  .modal-dialog {
    max-width: 520px;
  }
  .modal-content {
    border: none;
    border-radius: 0;
  }
  .modal-body {
    width: 100%;
    padding: 0;
    & .content {
      width: 345px;
      margin: 0 auto 45px auto;
      & .info-block {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 28px;
        width: 90%;
        & ._text {
          display: flex;
          flex-direction: column;
          & .info_title {
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #2b2a29;
          }
          & .data {
            font-size: 20px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #333333;
          }
        }
      }
      & .slide-block {
        width: 100%;
        background: #f4f4f4;
        height: 60px;
        border-radius: 3px;
        border: solid 1px #0001ea;
        margin-bottom: 16px;
        & .days-numbers {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 90%;
          margin: 0 auto;
          padding-top: 4px;

          & div {
            width: 16px;
            height: 16px;
            font-size: 14px;
            font-weight: bold;
            color: #2b2a29;
          }
        }
      }
      & .selected-block {
        width: 100%;
        background: #f4f4f4;
        height: 60px;
        border-radius: 3px;
        padding: 16px;
        margin-bottom: 16px;
      }
    }
  }
  h1 {
    font-size: 20px;
    color: #2b2a29;
    text-transform: uppercase;
    margin-top: 0;
    width: 320px;
  }
  h2 {
    width: 400px;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
  }

  .modal-btn {
    background-color: #0001ea;
    color: #fff;
    border-radius: 3px;
    // font-size: 20px;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    width: 360px;
    height: 60px;
    display: block;
    margin: 0 auto;
  }
  input {
    background-color: #f4f4f4;
    border-radius: 3px;
    border: none;
    width: 380px;
    height: 60px;
  }
  input::placeholder {
    font-size: 18px;
    font-weight: bold;
    color: #b2b3b3;
  }
  .modal-text {
    font-size: 14px;
    color: #717171;
    text-align: center;
    // width: 380px;
  }
}
@media only screen and (max-width: 700px) {
  .modal {
    width: 100vw;
    .modal-dialog {
      max-width: 100%;
      .modal-header {
        span {
          margin-left: 70vw;
        }
      }
      .modal-body {
        width: 300px;
        .content {
          width: 100%;
          .btn {
            width: 100%;
          }
        }
        h1 {
          font-size: 4vw;
          width: 100%;
        }
        input {
          width: 100%;
        }
      }
      .modal-content {
        h2 {
          font-size: 15px;
          width: 300px;
        }
      }
    }
  }
}
</style>
