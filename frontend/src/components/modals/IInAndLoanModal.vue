<template>
  <div class="modal fade show" id="exampleModal" tabindex="-1">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button @click="$emit('close')" type="button" class="close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body mx-auto text-center">
          <h1 class="mx-auto mt-3 form_title">Быстрое продление займа</h1>
          <form class="form-group">
            <input
              v-mask="'############'"
              class="form-control mt-3 m-a form_input"
              placeholder="ИИН"
              v-model="iin"
            />
            <input
              v-mask="'########'"
              class="form-control mt-3 m-a form_input"
              placeholder="Номер займа"
              v-model="ticketNumber"
            />
          </form>
          <div class="reCaptchaBlock">
            <ReCaptcha @verifyCallback="captchaVerifyMethod" />
          </div>
          <button @click="startSMSVerification" type="button" class="btn modal-btn">
            Продлить заем
          </button>
          <p class="mt-4 pb-5 modal-text">
            Вы также можете продлить заем в Личном кабинете, и получить полную
            информацию о своих займах, не выходя из дома
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import ReCaptcha from "@/components/captcha/reCaptcha";
export default {
  name: "IInAndLoanModal",
  components: { ReCaptcha },
  data() {
    return {};
  },

  computed: {
    ...mapGetters(["getProlongationsIncomeBase", "getProlongationsBase"]),
    iin: {
      get() {
        return this.getProlongationsIncomeBase("iin");
      },
      set(value) {
        this.setProlongationIncomeBase({ type: "iin", data: value });
      }
    },
    captchaVerify: {
      get() {
        return this.getProlongationsBase("captchaVerify");
      },
      set(value) {
        this.setProlongationBase({ type: "captchaVerify", data: value });
      }
    },
    ticketNumber: {
      get() {
        return this.getProlongationsIncomeBase("ticketNumber");
      },
      set(value) {
        this.setProlongationIncomeBase({
          type: "ticketNumber",
          data: value
        });
      }
    }
  },
  methods: {
    ...mapMutations(["setProlongationIncomeBase", "setProlongationBase"]),
    ...mapActions(["startSMSVerification"]),

    captchaVerifyMethod(data) {
      this.captchaVerify = data;
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
    width: 450px;
    padding: 0;

    & .form_title {
      font-weight: bold;
    }
    & .form_input {
      margin: 0 auto;
    }
    & .reCaptchaBlock {
      width: 300px;
      margin: 10px auto;
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
    width: 380px;
    // height: 60px;
    height: 50px;
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
    display: block;
    margin: 0 auto;
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
        h1 {
          font-size: 4vw;
          // width: 100%;
        }
        input {
          width: 100%;
        }
        .modal-btn {
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
  .modal-2 {
    .modal-dialog {
      width: 100%;
      .modal-content {
        .modal-body {
          h4 {
            font-size: 12px;
          }
          h3 {
            font-size: 18px;
          }
          .form-group {
            input {
              font-size: 18px;
            }
            input::placeholder {
              font-size: 18px;
            }
            .input {
              .range-start {
                padding-right: 85%;
              }
              .el-slider {
                width: 90%;
              }
              .el-slider__runway {
                .el-slider__button-wrapper {
                  .el-slider__button {
                    height: 18px;
                    width: 18px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .modal-3 {
    .modal-dialog {
      .modal-content {
        .modal-body {
          width: 100%;
          .modal-btn {
            // width: 100px;
          }
        }
      }
    }
  }
}
</style>
