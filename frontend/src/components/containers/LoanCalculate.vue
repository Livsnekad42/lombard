<template>
  <section id="compute">
    <div class="container compute-box mx-auto text-center" style="max-width: 920px;">
      <h1 class="mx-auto">Рассчитайте стоимость займа</h1>
      <div class="row mt-4" id="wr-calc">
        <div class="col-sm-12 mt-4 text-left comp justify-content-center">
          <div class="row flex-column flex-md-row justify-content-center" style="box-shadow: none">
            <div class="col-sm-4 mx-2 my-2 my-md-0 pb-3 compute-boxes gold">
              <p>Проба золота</p>
              <div class="ml-3 box-inside">
                <CustomCheckBox
                  v-for="(probe, index) in goldProbeArray"
                  :param="probe"
                  :boxKey="probe"
                  :key="index"
                  :status="probe === goldProbe"
                  v-model="goldProbe"
                />
                <!--                            <div class="round">-->
                <!--                              <input type="checkbox" id="checkbox" />-->
                <!--                              <label for="checkbox"></label>-->
                <!--                            </div>-->
                <!--                            <span class="box-text">583/585</span>-->
                <!--                            <div class="ml-3 round">-->
                <!--                              <input type="checkbox" id="checkbox1" />-->
                <!--                              <label for="checkbox1"></label>-->
                <!--                            </div>-->
                <!--                            <span class="box-text">750</span>-->
              </div>
            </div>
            <div class="col-sm-4 mx-2 my-2 my-md-0 pb-3 compute-boxes">
              <p class="mb-2">Вес изделия, гр</p>
              <input
                v-mask="'######'"
                class="ml-3 dotted-input"
                v-model="weight"
              />
            </div>
            <div class="col-sm-4 mx-2 my-2 my-md-0 pb-3 compute-boxes">
              <p class="mb-2">Срок (5 - 60 дней)</p>
              <input
                v-mask="'##'"
                class="ml-3 dotted-input"
                v-model="term"
                @change="termCheck"
              />
              <span v-if="warnErr === 'max'" class="warn_text"
                >Максимальный срок 60 дней</span
              >
              <span v-if="warnErr === 'min'" class="warn_text"
                >Минимальный срок 5 дней</span
              >
            </div>
          </div>
        </div>
        <div class="col-sm-12 sum mx-auto mt-4 justify-content-center flex-column flex-md-row">
          <div class="sums sums-border">
            <p>Сумма на руки</p>
            <h2>{{ amount.toLocaleString("ru") }} &#8376;</h2>
          </div>
          <div class="sums no-border">
            <p>Сумма к воврату</p>
            <h2>{{ returnedAmount.toLocaleString("ru") }} &#8376;</h2>
          </div>
        </div>
        <p class="col-sm-12 mx-auto mt-4 text-compute">
          Для более точного определения пробы и веса изделия, а так же стоимости
          займа, пожалуйста, посетите наш ближайший филиал.
        </p>
      </div>
      <button class="btn w-100 mt-4" type="button">Заказать звонок</button>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

import CustomCheckBox from "../ui/customCheckBox";
export default {
  name: "LoanCalculate",
  components: { CustomCheckBox },
  computed: {
    ...mapGetters(["getCalcBase"]),

    goldProbeArray: {
      get() {
        return this.getCalcBase("goldProbeArray");
      }
    },
    goldProbe: {
      get() {
        this.startCalculate();
        return this.getCalcBase("goldProbe");
      },
      set(value) {
        this.setCalcBase({ type: "goldProbe", data: value });
      }
    },
    weight: {
      get() {
        return this.getCalcBase("weight");
      },
      set(value) {
        this.setCalcBase({ type: "weight", data: value });
        this.startCalculate();
      }
    },
    term: {
      get() {
        return this.getCalcBase("term");
      },
      set(value) {
        this.setCalcBase({ type: "term", data: value });
      }
    },
    amount: {
      get() {
        return this.getCalcBase("amount");
      },
      set(value) {
        this.setCalcBase({ type: "amount", data: value });
      }
    },
    returnedAmount: {
      get() {
        return this.getCalcBase("returnedAmount");
      },
      set(value) {
        this.setCalcBase({
          type: "returnedAmount",
          data: value
        });
      }
    }
  },
  data() {
    return {
      warnErr: ""
    };
  },
  methods: {
    ...mapMutations(["setCalcBase"]),
    ...mapActions(["startCalculate"]),
    termCheck(e) {
      // console.log(e.target.value);
      if (e.target.value >= 5) {
        this.startCalculate();
        this.warnErr = false;
      } else {
        this.term = 5;
        this.warnErr = "min";
        return;
      }

      if (e.target.value <= 60) {
        this.startCalculate();
        this.warnErr = false;
      } else {
        this.term = 60;
        this.warnErr = "max";
      }
      // if (e.target.value >= 5 && e.target.value <= 60) {
      //   this.warnErr = false;
      // } else {
      //   this.term = 60;
      //   this.warnErr = true;
      // }
    }
  }
};
</script>

<style scoped lang="scss">
#compute {
  background-color: #f1f2f6;
  padding-bottom: 100px;
  .compute-box {
    h1 {
      text-transform: uppercase;
      font-size: 54px;
      font-weight: bold;
      padding-top: 60px;
    }
    .row {
      background-color: #fff;
      border-radius: 11px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .comp {
        display: flex;
        .compute-boxes {
          background-color: #f1f2f6;
          border-radius: 9px;
          display: flex;
          flex-wrap: wrap;
          max-width: 280px;
          & .warn_text {
            color: #e51b56;
            padding-left: 17px;
            font-size: 14px;
          }
          p {
            color: #5b5b5b;
            font-size: 16px;
            padding: 10px 0px 0px 15px;
          }
          .box-inside {
            display: flex;
            flex-wrap: wrap;
            .round {
              position: relative;
            }

            .round label {
              background-color: #fff;
              border: solid 2px #999999;
              background: transparent;
              border-radius: 50%;
              cursor: pointer;
              height: 28px;
              left: 0;
              position: absolute;
              top: 2px;
              width: 28px;
            }

            .round label:after {
              border: 2px solid #fff;
              border-top: none;
              border-right: none;
              content: "";
              height: 6px;
              left: 7px;
              opacity: 0;
              position: absolute;
              top: 8px;
              transform: rotate(-45deg);
              width: 12px;
            }

            .round input[type="checkbox"] {
              visibility: hidden;
            }

            .round input[type="checkbox"]:checked + label {
              background-color: #0001ea;
              border-color: #0001ea;
            }

            .round input[type="checkbox"]:checked + label:after {
              opacity: 1;
            }
            .box-text {
              color: #2b2a29;
              font-size: 24px;
              font-weight: bold;
              padding-left: 24px;
              //   padd
            }
            .checked {
              color: #0001ea;
            }
          }
          .dotted-input {
            border: 0;
            border-bottom: 1px dashed #5b5b5b;
            background: transparent;
            width: 208px;
            height: 40px;
            color: #2b2a29;
            font-size: 26px;
          }
          .dotted-input::placeholder {
            color: #2b2a29;
            font-size: 26px;
            font-weight: bold;
          }
        }
      }
      .sum {
        display: flex;
        .sums {
          p {
            font-size: 20px;
            color: #2b2a29;
            margin-bottom: 0px;
            font-weight: bold;
          }
          h2 {
            font-size: 32px;
            color: #0001ea;
            padding-top: 0px;
            font-weight: bold;
          }
        }

      }
      .text-compute {
        color: #9b9b9b;
        font-size: 20px;
      }
    }
    button {
      background-color: #e51b56;
      box-shadow: 0 2px 12px 0 rgba(229, 27, 86, 0.1);
      border: solid 2px #d20054;
      border-radius: 11px;
      color: #fff;
      font-size: 24px;
    }
  }
}

@media (max-width: 767px) {
  #compute {
    h1 {
      font-size: 30px !important;
    }
    .compute-box {
      width: 100%;
      h1 {
        padding-bottom: 30px;
        padding-top: 30px;
      }
      .container {
        width: 90%;
        .comp {
          display: block;
          .compute-boxes {
            margin: auto;
          }
        }
        .sum {
          display: flex;
          flex-direction: column;
        }
        .sums {

          p {
            font-size: 15px !important;
            padding-left: 0px !important;
          }
          h2 {
            font-size: 20px !important;
            padding-left: 0px !important;
          }
        }

        .no-border {
          p {
            padding-right: 0px !important;
          }
          h2 {
            padding-right: 0px !important;
          }
        }
        .text-compute {
          width: 100%;
          font-size: 15px;
        }
      }
      button {
        font-size: 20px;
      }
    }
  }
  .sums-border {
    border-right: none !important;
    border-bottom: 2px dashed #000;;
  }
}

@media (min-width: 768px) {
  .sums-border {
    margin-right: 50px;
    padding-right: 50px;
  }
}

@media (max-width: 1000px) and (min-width: 600px) {
  .compute-boxes {
    max-width: 220px !important;
  }
  #compute .compute-box .row .comp .compute-boxes .dotted-input {
    width: 180px;

    .gold {
      text-align: center !important;
      justify-content: center !important;
      padding-left: 0 !important;
    }
  }
  .logo {
    max-width: 100%;
  }
  #wr-calc {
    margin-right: 10px;
    margin-left: 10px;
  }
}
@media (min-width: 768px) {
  .sums-border {
    border-right: 2px dashed #000;
  }
}
</style>
