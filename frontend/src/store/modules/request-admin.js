import { signInAdminPanelApi, setHeaderAuthorization, removeHeaderAuthorization } from "../../app/api-admin";

const mutations = {
  setToken(state, token ) {
    setHeaderAuthorization(token);
  },
  removeToken(state) {
    removeHeaderAuthorization();
  }
};

const actions = {
  signInAdminPanel({ getters }, data) {
    return new Promise((resolve, reject) => {
      signInAdminPanelApi(data)
        .then(res => {
          if (res.data.err) reject(res);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
export default {
  mutations,
  actions
};
