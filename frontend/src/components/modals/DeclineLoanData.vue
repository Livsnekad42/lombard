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
            <span class="header-text">{{ errorText }}</span>
            <div class="logo-box">
              <DeclineImg class="ok-logo" />
            </div>
            <div class="info-block">
              <button
                type="button"
                class="btn modal-btn"
                @click="$emit('close')"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeclineImg from "../../assets/images/decline-img";
export default {
  name: "DeclineLoanData",
  components: { DeclineImg },
  props: {
    errorText: {
      type: String
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
      & .logo-box {
        width: 100%;
        margin: 0 auto;
        & .ok-logo {
          width: 144px;
          height: 144px;
          fill: #e51b56;
          margin: 38px auto 40px auto;
          display: block;
        }
      }

      & .header-text {
        font-size: 20px;
        font-weight: bold;
        color: #2b2a29;
        text-align: center;
        display: block;
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
