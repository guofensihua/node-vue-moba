<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}分类</h1>
    <el-form @submit.native.prevent="save" label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async save() {
      if (this.id) {
        const res = await this.axios.put(`/categories/${this.id}`, this.model);
      } else {
        const res = await this.axios.post("/categories", this.model);
      }
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.axios.get(`/categories/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>

<style>
</style>