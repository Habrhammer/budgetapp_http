import Vue from "vue";
const listStore = {
  namespaced: true,
  state: {
    list: {
      1: {
        type: "INCOME",
        value: 100,
        comment: "Some comment",
        id: 1,
      },
      2: {
        type: "OUTCOME",
        value: -50,
        comment: "Some outcome comment",
        id: 2,
      },
    },
    filteredList: [],
  },
  getters: {
    budgetList: ({ list }) => {
      return function(n) {
        if (n === 1) {
          return Object.values(Object.values(list)).filter(
            (item) => item.value > 0
          );
        } else if (n === -1) {
          return Object.values(Object.values(list)).filter(
            (item) => item.value < 0
          );
        } else {
          return Object.values(list);
        }
      };
    },
    totalBalance: ({ list }) => {
      return Object.values(list).reduce((acc, item) => acc + item.value, 0);
    },
    balanceColor(state, getters) {
      let color = "";
      if (getters.totalBalance > 0) {
        color = "#42B983";
      }
      if (getters.totalBalance === 0) {
        color = "#303133";
      }
      if (getters.totalBalance < 0) {
        color = "#F56C6C";
      }
      return `color: ${color}`;
    },
  },
  mutations: {
    ADD_ITEM(state, item) {
      Vue.set(state.list, item.id, item);
    },
    DEL_ITEM(state, id) {
      Vue.delete(state.list, id);
    },
  },
  actions: {
    addNewItem({ commit }, item) {
      const newItem = { ...item, id: String(Math.random()) };

      commit("ADD_ITEM", newItem);
    },
    deleteItem({ commit }, id) {
      commit("DEL_ITEM", id);
    },
  },
};

export default listStore;
