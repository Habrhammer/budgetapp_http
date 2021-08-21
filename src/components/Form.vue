<template>
  <ElCard class="form-card">
    <ElForm
      :model="formData"
      ref="addItemForm"
      :rules="rules"
      label-position="top"
    >
      <ElFormItem label="Type" prop="type">
        <ElSelect
          class="type-select"
          v-model="formData.type"
          placeholder="Choose type..."
        >
          <ElOption label="INCOME" value="INCOME" />
          <ElOption label="OUTCOME" value="OUTCOME" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="Comments" prop="comment">
        <ElInput v-model="formData.comment" />
      </ElFormItem>
      <ElFormItem label="Value" prop="value">
        <ElInput v-model.number="formData.value" />
      </ElFormItem>
      <ElButton type="primary" @click="addItem">Submit</ElButton>
    </ElForm>
  </ElCard>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Form",
  data() {
    let checkValue = (rule, value, callback) => {
      if (value === 0) {
        callback(new Error("Value must be greater or less than zero"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        type: "INCOME",
        comment: "",
        value: 0,
      },
      rules: {
        type: [
          { required: true, message: "Please select type", trigger: "change" },
        ],
        comment: [
          {
            required: true,
            message: "Please input comment",
            trigger: "change",
          },
        ],
        value: [
          { required: true, message: "Please input value", trigger: "blur" },
          {
            type: "number",
            message: "Value must be a number",
            trigger: "change",
          },
          { validator: checkValue, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapActions("list", ["addNewItem"]),
    addItem() {
      this.$refs.addItemForm.validate((valid) => {
        if (valid) {
          if (this.formData.type === "OUTCOME") {
            this.formData.value = 0 - this.formData.value;
          }
          const newItem = {
            type: this.formData.type,
            value: this.formData.value,
            comment: this.formData.comment,
          };
          this.addNewItem(newItem);
          this.$refs.addItemForm.resetFields();
        }
      });
    },
  },
};
</script>

<style scoped>
.form-card {
  max-width: 500px;
  margin: auto;
}
.type-select {
  width: 100%;
}
</style>
