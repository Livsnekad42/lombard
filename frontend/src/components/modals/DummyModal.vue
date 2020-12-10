<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body mx-auto mt-5 text-center">
          <h2 class="mx-auto mt-5">Услуга продление скоро будет доступна</h2>

          <button type="button" class="btn modal-btn mx-auto my-5">
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DummyModal"
};
</script>

<style scoped lang="scss">
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
