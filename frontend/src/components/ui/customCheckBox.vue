<template>
  <div class="box_container">
    <div class="ml-3 round">
      <input type="checkbox" :id="param" value="" v-model="model" />
      <label :for="param"></label>
    </div>
    <span class="box-text">{{ param }}</span>
  </div>
</template>

<script>
export default {
  name: "customCheckBox",
  props: {
    param: {
      type: String
    },
    boxKey: {
      type: String,
      required: true
    },
    status: {
      type: Boolean
    }
  },
  computed: {
    model: {
      get() {
        return this.status;
      },
      set() {
        this.$emit("input", this.boxKey);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.box_container {
  display: flex;
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
</style>
