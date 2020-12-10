<template>
  <div class="sign-in">
    <div class="form-block">
      <form v-on:submit.prevent="signIn()">
        <div class="form-group">
          <label for="exampleInputEmail1">Введите Email</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <small v-if="errEmail" id="emailHelp" class="form-text text-muted">{{
            errEmail
          }}</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Введите пароль</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
          <small
            v-if="errPassword"
            id="passwordHelp"
            class="form-text text-muted"
            >{{ errPassword }}</small
          >
        </div>
        <button type="submit" class="btn btn-primary">Войти</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
      errEmail: "",
      errPassword: ""
    };
  },
  methods: {
    ...mapActions(["signInAdminPanel"]),
    signIn() {
      this.errEmail = "";
      this.errPassword = "";
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      }).then((response) => {
        this.$router.push({ path: "/admin-panel" });
      }).catch(e => {
        console.log("Err: ", e);
        if ( e ) {
          this._data[`err${e.data.type}`] = e.data.text;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/style/variables";
.sign-in {
  background-color: #b2b3b3;
  height: calc(100vh - #{$footer-desctop-height + $header-desctop-height});
  padding: 100px;
  & .form-block {
    background-color: #ffffff;
    width: 400px;
    height: 300px;
    margin: 0 auto;
    padding: 20px;
    & small {
      color: red;
    }
  }
}
@media only screen and (max-width: 700px) {
  .sign-in {
    padding: 20px;
    min-height: calc(100vh - #{$footer-mobile-height + $header-mobile-height});
    & .form-block {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
