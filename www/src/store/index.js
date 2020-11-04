import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const global = {
  state: {
    loading: false,
  },
  mutations: {
    loadingSwitch(state) {
      state.loading = !state.loading;
    },
  },
};

const attendance = {
  state: {
    data: [],
    select: undefined,
  },
  mutations: {
    setAttendance(state, data) {
      state.data = data;
    },
    setAttendanceSelect(state, data) {
      state.select = data;
    },
  },
};

const store = new Vuex.Store({
  modules: {
    global,
    attendance,
  },
});

export default store;
