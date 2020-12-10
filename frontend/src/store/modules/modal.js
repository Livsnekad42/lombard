const state = {
  type: "",
  title: "",
  validateError: ""
};
const getters = {
  getModalBase: state => type => state[type]
};
const mutations = {
  setModalBase(state, { type, data }) {
    state[type] = data;
  }
};
const actions = {};
export default { state, getters, mutations, actions };
