import Vue from "vue";
import axios from "axios";
import firebase from "firebase/app";
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
  mutations: {},
  actions: {
    async addNewItem({ state }, item) {
      let newItem = {
        value: item.value,
        type: item.type,
        comment: item.comment,
      };

      firebase
        .database()
        .ref("transactions")
        .push(newItem);

      const query_firebase = await firebase
        .database()
        .ref("transactions")
        .limitToLast(1)
        .once("value");

      const firebaseData = query_firebase.val();
      const [id] = Object.keys(firebaseData);

      state.list.push({
        value: item.value,
        type: item.type,
        comment: item.comment,
        id: id,
      });
    },
    async loadRemoteList({ state }) {
      try {
        const query_data = await firebase
          .database()
          .ref("transactions")
          .once("value");

        const data = query_data.val();

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
    async deleteItem({ state }, id) {
      try {
        await firebase
          .database()
          .ref(`transactions/${id}`)
          .remove();

        state.list = state.list.filter((item) => item.id !== id);
      } catch (e) {}
    },
  },
};

export default listStore;
