<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template v-slot:default="scope">
          <el-button @click="$router.push(`/categories/edit/${scope.row._id}`)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async fetch() {
      const res = await this.axios.get("categories");
      this.items = res.data;
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style>
</style>