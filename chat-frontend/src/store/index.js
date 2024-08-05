import { createStore } from 'vuex'

export default createStore({
  state: {
    logged: localStorage.getItem("logged") || false,
  },
  getters: {
  },
  mutations: {
    setLocalStorageValue(state, value) {
      state.logged = value;
    }
  },
  actions: {
    updateLocalStorageValue({ commit }, value, ) {
      localStorage.setItem('logged', value);
      commit('setLocalStorageValue', value);
    }
  },
  modules: {
  }
})
