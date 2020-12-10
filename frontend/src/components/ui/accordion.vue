<template>
  <div class="">
    <div v-if="showBlock" class="tab__header">
      <a href="#" class="segment" @click.prevent="clickEvent">
        <strong
          :class="[
            'title',
            { 'title--weight-font': active.type && active.id === data.id }
          ]"
          >{{ title }}</strong
        >
        <span class="down-Arrow" v-if="active.type && active.id === data.id"
          >&#9660;</span
        >
        <span class="up-Arrow" v-else>&#9650;</span>
      </a>
    </div>
    <div class="tab__content" v-show="active.type && active.id === data.id">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "accordion",
  props: {
    title: {
      type: String
    },
    data: {
      type: Object
    },
    active: {
      type: Object
    },
    type: {
      type: String
    }
  },
  data() {
    return {};
  },
  computed: {
    showBlock() {
      const showAll = this.type === "city";
      const selectedCity = this.active.id;

      if (showAll) {
        return true;
      } else return selectedCity === this.data.id;
    }
  },
  methods: {
    clickEvent() {
      this.$emit("selectCity", this.data);
    }
  }
};
</script>

<style scoped lang="scss">
.tab__header {
  .segment {
    text-decoration: none;
    font-weight: 300;
    width: 100%;
    display: flex;
    text-align: left;
    padding: 5px 20px 5px 20px;
    justify-content: space-between;
    color: #ffffff;
    background-color: #002e90;

    border-color: #00236e;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    & .title {
      font-size: 18px;

      &--weight-font {
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
}
</style>
