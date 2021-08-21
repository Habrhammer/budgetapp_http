<template>
  <div class="budget-list-wrap">
    <el-card>
      <div class="header" slot="header">
        <span>{{ header }}</span>
        <div>
          <el-button type="success" @click="filterValue = 'INCOME'" plain>Income</el-button>
          <el-button type="danger" @click="filterValue = 'OUTCOME'" plain>Outcome</el-button>
          <el-button type="primary" @click="filterValue = 'ALL'" plain>All</el-button>
        </div>
      </div>
      <template v-if="!isEmpty">
        <BudgetListItem v-for="itemList in filterItems()" :item="itemList" />
      </template>
      <ElAlert v-else type="info" :title="emptyTitle" :closable="false" />
    </el-card>
  </div>
</template>

<script>
import BudgetListItem from "@/components/BudgetListItem";
import { mapGetters } from "vuex";
export default {
  components: { BudgetListItem },
  name: "BudgetList",

  data() {
    return {
      header: "Budget List",
      emptyTitle: "Empty List",
      filterValue: "ALL",
    };
  },
  computed: {
    ...mapGetters("list", ["budgetList"]),
    isEmpty() {
      return !Object.keys(this.budgetList).length;
    },
  },
  methods: {
        filterItems() {
      if(this.filterValue === "INCOME"){
        return Object.values(this.budgetList).filter((item) => item.value > 0);
      }
      if(this.filterValue === "OUTCOME"){
        return Object.values(this.budgetList).filter((item) => item.value < 0);
      }
      if(this.filterValue === "ALL"){
        return Object.values(this.budgetList)
      }
      
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.budget-list-wrap {
  max-width: 500px;
  margin: auto;
}
</style>
