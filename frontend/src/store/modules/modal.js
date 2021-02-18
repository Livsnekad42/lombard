const state = {
  type: "",
  title: "",
  validateError: "",
  context: null
};
const getters = {
  getModalBase: state => type => state[type],
  getContext: state => state.context
};
const mutations = {
  setModalBase(state, { type, data, context = null }) {
    state[type] = data;
    state.context = context;
  },
  freeContext(state) {
    state.context = null;
  }
};
const actions = {};
export default { state, getters, mutations, actions };
