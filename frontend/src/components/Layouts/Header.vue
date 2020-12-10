<template>
  <header>
    <nav class="navbar navbar-expand-lg">
      <div class="col-4">
        <a class="navbar-brand logo" href="#">
          <img src="@/assets/images/Group5Copy.png" class="logo" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="col-8">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <!--<li class="nav-item active">
                    <a class="nav-link" href="#">Logo</a>
                </li> -->
            <li class="nav-item list-header">
              <ul class="list-unstyled">
                <li><a class="nav-link" href="#">Тегін қоңырау шалу</a></li>
                <li><a class="nav-link number" href="#">8 800 080 7171</a></li>
                <li><a class="nav-link" href="#">Звонок бесплатный</a></li>
              </ul>
            </li>

            <ul v-if="!$store.getters.isLoggedIn" class="navbar-nav lang text-right">
              <li class="nav-item">
                <a class="nav-link" href="#">ҚАЗ</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Рус</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Eng</a>
              </li>
            </ul>
            <ul v-if="$store.getters.isLoggedIn" class="navbar-nav lang text-right">
              <li class="nav-item">
                <a class="nav-link" href="#" @click="logout()">Выход</a>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logout() {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push('/sign-in-admin')
      });
    }
  }
};
</script>
<style scoped lang="scss">
@import "../../assets/style/variables";
header {
  background-color: #002e90;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
  z-index: 9999;
  nav {
    height: $header-desctop-height;
    .navbar-brand {
      margin-left: 100px;
      .logo {
        width: 300px;
        height: 35px;
        object-fit: contain;
      }
    }
    ul {
      // text-align: center;
      li {
        a {
          color: #fff;
          padding-top: 0px !important;
          padding-bottom: 0px !important;
        }
      }
      .list-header {
        font-size: 16px;
        margin-left: 10vw;
        // position: absolute;
        // width: 200px;
        .number {
          font-size: 24px;
        }
      }
      .lang {
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
        margin-left: 30vw;
        padding-top: 33px;
      }
    }
  }
}
</style>
