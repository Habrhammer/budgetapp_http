import Vue from "vue";
import axios from "axios";
const listStore = {
  namespaced: true,
  state: {
    list: [],
   
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

  },
  actions: {
    async addNewItem({ state }, item) {
      const response = await fetch(
        "https://vue-with-http-b929f-default-rtdb.firebaseio.com/transactions.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: item.type,
            comment: item.comment,
            value: item.value,
          }),
        }
      );

      const firebaseData = await response.json();

      state.list.push({
        value: item.value,
        type: item.type,
        comment: item.comment,
        id: firebaseData.name,
      });
    },
    async loadRemoteList({ state }) {
      try {
        const { data } = await axios.get(
          "https://vue-with-http-b929f-default-rtdb.firebaseio.com/transactions.json"
        );
        if (!data) {
          throw new Error("Список пуст!");
        }

        state.list = Object.keys(data).map((key) => {
          return {
            id: key,
            ...data[key],
          };
        });
      } catch (e) {
        console.log(e.message);
      }
    },
    async deleteItem({state}, id) {
      try {
        console.log(id);
        await axios.delete(`https://vue-with-http-b929f-default-rtdb.firebaseio.com/transactions/${id}.json`)
        state.list = state.list.filter(item => item.id !== id)
      } catch (e) {

      }
    }
  },
};

export default listStore;
