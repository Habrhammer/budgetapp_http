<template>
  <div class="home">
    <Form />
    <TotalBalance />
    <BudgetList />
  </div>
</template>

<script>
import BudgetList from "@/components/BudgetList";
import TotalBalance from "@/components/TotalBalance";
import Form from "@/components/Form";
import Navbar from "@/components/Navbar";
import { mapActions } from "vuex";

export default {
  name: 'Home',
  components: {
    BudgetList,
    TotalBalance,
    Form,
    Navbar,
  },
  mounted() {
    this.loadList();
  },
  methods: {
    ...mapActions("list", ["loadRemoteList"]),
    loadList() {
      this.loadRemoteList();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
