<template>
  <header>
    <nav class="row align-items-center">
      <div class="col-sm-4 col-12 my-4 d-flex justify-content-center align-items-center">
        <a class="logo" href="/">
          <img src="@/assets/images/Group5Copy.png" class="logo" />
        </a>
      </div>
      <div class="col-sm-4 col-12">
        <div id="navbarNav">
          <ul class="list-unstyled d-flex flex-column justify-content-center align-items-center text-left" style="margin-bottom: 0;">
            <li><a class="nav-link" href="#">Тегін қоңырау шалу</a></li>
            <li><a class="nav-link number" href="tel:88000807171">8 800 080 7171</a></li>
            <li><a class="nav-link" href="#">Звонок бесплатный</a></li>
          </ul>
        </div>
      </div>
      <div class="col-sm-4 d-none d-sm-flex">
        <ul v-if="!$store.getters.isLoggedIn" class="lang" style="margin-bottom: 0;">
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
        <ul v-if="$store.getters.isLoggedIn && currentRouteName != 'Main'" class="lang">
          <li class="nav-item">
            <a class="nav-link" href="#" @click="logout()">Выход</a>
          </li>
        </ul>
        <a class="btn login-btn" href="http://app.tezlombard.kz" v-if="currentRouteName == 'Main'" target="_blank">Личный кабинет</a>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/sign-in-admin')
          });
    },
    login() {
      this.$router.push('/sign-in-admin')
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
  padding-bottom: 10px;
  padding-top: 10px;
  .logo {
    margin-left: 0 !important;
    max-width: 100%;
  }
  nav {
    padding-left: 20px;
    padding-right: 20px;
    .navbar-brand {

      .logo {
        width: 300px;
        height: 35px;
        object-fit: contain;
        margin-left: 0;
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
    // padding-top: 33px;
  }
}
.login-btn {
  background-color: #e51b56;
  color: #fff;
  font-size: 20px;
  padding: 2px 15px;
}
</style>
