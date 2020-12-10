<template>
  <div class="admin-main">
    <button @click="toggleLeftNavBlock()" class="navbar-toggler" type="button">
      <span class="navbar-dark navbar-toggler-icon"></span>
    </button>
    <div v-if="leftNavBlock" class="left-nav-bar">
      <div class="_nav-header">
        <svg @click="toggleLeftNavBlock()" version="1.1" x="0px" y="0px"
                  viewBox="0 0 409.806 409.806" style="enable-background:new 0 0 409.806 409.806;" xml:space="preserve">
          <g>
              <g>
                  <path d="M228.929,205.01L404.596,29.343c6.78-6.548,6.968-17.352,0.42-24.132c-6.548-6.78-17.352-6.968-24.132-0.42
                      c-0.142,0.137-0.282,0.277-0.42,0.42L204.796,180.878L29.129,5.21c-6.78-6.548-17.584-6.36-24.132,0.42
                      c-6.388,6.614-6.388,17.099,0,23.713L180.664,205.01L4.997,380.677c-6.663,6.664-6.663,17.468,0,24.132
                      c6.664,6.662,17.468,6.662,24.132,0l175.667-175.667l175.667,175.667c6.78,6.548,17.584,6.36,24.132-0.42
                      c6.387-6.614,6.387-17.099,0-23.712L228.929,205.01z"/>
              </g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
        </svg>
      </div>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link 
            :to="{ name: 'mapControl' }" 
            :active-class="'active'"
            class="nav-link">
            Управление картой
          </router-link>
        </li>
        <li class="nav-item">
          <router-link 
            :to="{ name: 'documentLoad' }" 
            :active-class="'active'"
            class="nav-link">
            Загрузить документ
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      leftNavBlock: true
    }
  },
  methods: {
    toggleLeftNavBlock() {
      this.leftNavBlock = !this.leftNavBlock;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/style/variables";
.admin-main {
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - #{$footer-desctop-height + $header-desctop-height});
  .navbar-toggler {
    height: 50px;
    position: absolute;
    top: 40px;
    left: 20px;
    span {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.5%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
    }
  }

  & .left-nav-bar {
    width: 30%;
    background-color: #f2f3f7;
    position: relative;
    padding: 20px 0 0 20px;
    .router-link-exact-active {
      color: #004c9e;
    }
    ._nav-header {
      position: absolute;
      top: 10px;
      right: 10px;
      svg {
        width: 20px;
        cursor: pointer;
        fill: #7d8baf;
      }
    }
  }

  & .main-content {
    width: 100%;
  }
}
@media only screen and (max-width: 700px) {
  .admin-main {
    position: relative;
    .navbar-toggler {
      top: -80px;
      left: 20px;
    }
    & .left-nav-bar {
      position: absolute;
      width: 70%;
      height: 100%;
      z-index: 1;
    }
  }
}
</style>
