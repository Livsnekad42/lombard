<template>
  <header>
    <nav class="row">
      <div class="col-sm-4 col-12 d-flex justify-content-center align-items-center">
        <a class="navbar-brand logo" href="#">
          <img src="@/assets/images/Group5Copy.png" class="logo" />
        </a>
      </div>
      <div class="col-sm-4 col-12">
        <div id="navbarNav">
          <ul class="list-unstyled d-flex flex-column justify-content-center align-items-center text-left">
            <li><a class="nav-link" href="#">Тегін қоңырау шалу</a></li>
            <li><a class="nav-link number" href="#">8 800 080 7171</a></li>
            <li><a class="nav-link" href="#">Звонок бесплатный</a></li>
          </ul>
        </div>
      </div>
      <div class="col-sm-4 d-none">
            <ul v-if="!$store.getters.isLoggedIn" class="lang">
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
            <ul v-if="$store.getters.isLoggedIn" class="lang">
              <li class="nav-item">
                <a class="nav-link" href="#" @click="logout()">Выход</a>
              </li>
            </ul>
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
        // position: absolute;
        // width: 200px;
        .number {
          font-size: 24px;
        }
      }

    }
    #navbarNav > ul{
      display: flex;
      justify-content: space-around;
    }
  }
  .lang {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    padding-top: 33px;
  }
}
</style>
