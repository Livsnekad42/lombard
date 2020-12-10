const state = {
  type: ""
};
const getters = {
  getLoaderBase: state => type => state[type]
};
const mutations = {
  setLoaderBase(state, { type, data }) {
    state[type] = data;
  }
};
const actions = {};
export default { state, getters, mutations, actions };
