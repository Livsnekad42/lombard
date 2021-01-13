import Vue from "vue";
import Vuex, {mapActions} from "vuex";
import modal from "./modules/modal";
import request from "./modules/request";
import requestAdmin from "./modules/request-admin";
import prolongation from "./modules/prolongation";
import loader from "./modules/loader";
import loanCalc from "./modules/loanCalc";
import documents from "./modules/documentLoad";
import comments from "./modules/comments";
import settings from "./modules/commonSettings";
import percent from "./modules/percent";

import { signInAdminPanelApi, setHeaderAuthorization, removeHeaderAuthorization } from "./../app/api-admin";
import axios from "axios";

const TOASTER_TIME = 4000;

Vue.use(Vuex);

export default new Vuex.Store({
  // methods:{
  //   ...mapActions(["signInAdminPanel"]),
  // },
  state: {
    status: '',
    user: JSON.parse(localStorage.getItem('user')) || {},
    modalError: false,
    modalSuccess: false,
    modalWarning: false,
    modalMessage: ""
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
    toaster(state, modalObj){
      switch (modalObj.type) {
        case "error":
          state.modalError = true;
          break;
        case "success":
          state.modalSuccess = true;
          break;
        case "warning":
          state.modalWarning = true;
          break;
      }
      state.modalMessage = modalObj.message;

      setTimeout(() => {
        state.modalError = false;
        state.modalSuccess = false;
        state.modalWarning = false;
      }, TOASTER_TIME);
    },
    closeToaster(state) {
      state.modalError = false;
      state.modalSuccess = false;
      state.modalWarning = false;
    }
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
    },
    controlsResponse({commit}, response) {
      if ( !response.data ) return;
      const respData = response.data;
      if ( !!respData && respData.err ) {
        if ( respData.code === 1 ) {
          this.dispatch("logout");
          return;
        }
        return false;
      }
      return true;
    },
    toaster({commit}, data) {
      if ( data.hide ) {
        commit("closeToaster");
        return;
      }
      commit("toaster", data);
    }
  },
  getters : {
    isLoggedIn: state => {return !!state.user.token},
    authStatus: state => state.status,
    toasterError: state => state.modalError,
    toasterSuccess: state => state.modalSuccess,
    toasterWarning: state => state.modalWarning,
    toasterMessage: state => state.modalMessage,

  },
  modules: {
    modal,
    request,
    prolongation,
    loader,
    loanCalc,
    requestAdmin,
    documents,
    comments,
    settings,
    percent
  }
});
