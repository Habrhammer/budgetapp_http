<template>
  <div class="list-item">
    <i :class="setIcon(item)" :style="setColor(item)"></i>
    <span class="budget-comment">{{ item.comment }} </span>
    <span class="budget-value" :style="setColor(item)">{{ item.value }}</span>
    <ElButton @click="dialogVisible = true" type="danger" size="mini"
      >Delete</ElButton
    >
    <ElDialog
      title="Внимание!!!"
      :visible.sync="dialogVisible"
      width="30%"
      center
    >
      <span>Вы уверены, что хотите удалить {{ item.comment }}?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Нет</el-button>
        <el-button
          type="primary"
          @click="onDelete(item.id), (dialogVisible = false)"
          >Да</el-button
        >
      </span>
    </ElDialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "BudgetListItem",

  data() {
    return {
      dialogVisible: false,
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions("list", ["deleteItem"]),
    onDelete(id) {
      this.deleteItem(id);
    },
    setIcon(item) {
      return item.value > 0 ? "el-icon-top" : "el-icon-bottom";
    },
    setColor(item) {
      return item.value > 0 ? "color: #42B983" : "color: #F56C6C";
    },
  },
  computed: {
    ...mapGetters("list", ["budgetList"]),
  },
};
</script>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
}
.budget-value {
  font-weight: bold;
  margin-left: auto;
  margin-right: 20px;
}
</style>
