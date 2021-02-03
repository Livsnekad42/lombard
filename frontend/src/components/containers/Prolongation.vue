<template>
  <section id="online">
    <div class="row online-box mx-auto">
   <!--   <div class="col-12 col-md-6"> -->
         <img src="../../assets/images/15740.png" class="col-12 col-md-6 card-img">
      <!-- </div> -->
      <div class="col-12 col-md-6 loan-button-group">
        <h1><span>Online</span> <br />продление</h1>
        <p>Быстрое продление займа без регистрации.</p>
        <button @click="showModal = ''"
                type="button"
          class="btn mt-3 open-btn">
          Продлить заем
        </button>
      </div>
    </div>
  </section>
</template>

<script>
// startRefinance
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Prolongation",
  computed: {
    ...mapGetters(["getModalBase"]),
    showModal: {
      get() {
        return this.getModalBase("type");
      },
      set(value) {
        this.setModalBase({ type: "type", data: value });
      }
    }
  },
  methods: {
    ...mapMutations(["setModalBase"])
  }
};
// @click="showModal = 'startRefinance'"
</script>

<style scoped lang="scss">
#online {
  height: 677px;
  .online-box {
    // width: 1440px;
    // max-width: 1700px;
  }
  .triangle {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0px 56px 20vw;
    border-color: transparent transparent #002e90 transparent;
    transform: rotate(180deg);
    // border-color: #002e90;
    // border-top: 200px;
    // border-bottom: 100px solid #002e90;
    // border-left: 500px solid transparent;
    top: 108px;
    // left: 39%;
    z-index: 999;
  }
  .card-img {
    // margin-top:-10px;
 //   background: url("../../assets/images/15740.png") no-repeat;
    background-size: 1000px;
    box-shadow: inset -200px 0px 165px -28px rgba(255, 255, 255, 1);
    border: none;
    height: 677px;
  }
  h1 {
    margin-top: 180px;
    font-size: 64px;
    font-weight: bold;
    span {
      color: #0001ea;
    }
  }
  p {
    color: #2b2a29;
    font-size: 20px;
  }
  .open-btn {
    background-color: #e51b56;
    color: #fff;
    border-radius: 11px;
    width: 353px;
    height: 48px;
  }
}
@media only screen and (max-width: 700px) {
  #online {
    width: 100%;
    // height: 50vh;
    height: auto;
    .online-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    h1 {
      font-size: 30px;
      margin-top: 50px;
    }
    p {
      font-size: 10px;
    }
    button {
      // height: 30px!important;
      width: 100% !important;
      font-size: 12px;
    }
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
  .loan-button-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
      h1 {
        text-align: center;
      }
  }
  .loan-button-group {
    margin-bottom: 130px;
  }
}
@media (max-width: 425px) {
  .loan-button-group {
      margin-bottom: 0;
    }
}
@media (max-width: 1000px) {
  #online button {
    height: auto !important;
    font-size: 24px !important;
  }
}
</style>
