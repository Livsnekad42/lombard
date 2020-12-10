import Vue from "vue";
import Vuex, {mapActions} from "vuex";
import modal from "./modules/modal";
import request from "./modules/request";
import requestAdmin from "./modules/request-admin";
import prolongation from "./modules/prolongation";
import loader from "./modules/loader";
import loanCalc from "./modules/loanCalc";
import documents from "./modules/documentLoad";

import { signInAdminPanelApi, setHeaderAuthorization, removeHeaderAuthorization } from "./../app/api-admin";

Vue.use(Vuex);

export default new Vuex.Store({
  // methods:{
  //   ...mapActions(["signInAdminPanel"]),
  // },
  state: {
    status: '',
    user: JSON.parse(localStorage.getItem('user')) || {}
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, user){
      state.status = 'success'
      state.user = user;
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.user.token = ''
    },
  },
  actions: {
    login({commit}, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        signInAdminPanelApi(user)
        .then(res => {
          if (res.data.err) reject(res);
          else {
            const token = res.data.token;
            const login = res.data.login;
            localStorage.setItem('user', JSON.stringify({login, token}));
            commit('auth_success', { token, login });
            setHeaderAuthorization(token);
            resolve(res)
          };
        })
        .catch(err => {
          reject(err);
        });
      });
    },
    logout({commit}) {
      return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem('user');
        removeHeaderAuthorization();
        resolve();
      });
    }
  },
  getters : {
    isLoggedIn: state => {return !!state.user.token},
    authStatus: state => state.status,
  },
  modules: {
    modal,
    request,
    prolongation,
    loader,
    loanCalc,
    requestAdmin,
    documents
  }
});
