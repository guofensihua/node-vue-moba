<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form @submit.native.prevent="save" label-width="120px">
      <el-tabs type="border-card" value="skills">
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="category in categories"
                :key="category._id"
                :label="category.name"
                :value="category._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图标">
            <el-upload
              class="avatar-uploader"
              :action="axios.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              v-model="model.scores.difficult"
              :max="9"
              show-score
              text-color="#ff9900"
              score-template="{value}"
              style="margin-top: 0.6rem"
            >
            </el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              v-model="model.scores.skills"
              :max="9"
              show-score
              text-color="#ff9900"
              score-template="{value}"
              style="margin-top: 0.6rem"
            >
            </el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              v-model="model.scores.attack"
              :max="9"
              show-score
              text-color="#ff9900"
              score-template="{value}"
              style="margin-top: 0.6rem"
            >
            </el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              v-model="model.scores.survive"
              :max="9"
              show-score
              text-color="#ff9900"
              score-template="{value}"
              style="margin-top: 0.6rem"
            >
            </el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option
                v-for="category in items"
                :key="category._id"
                :label="category.name"
                :value="category._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option
                v-for="category in items"
                :key="category._id"
                :label="category.name"
                :value="category._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input
              type="textarea"
              v-model="model.teamTips"
            ></el-input> </el-form-item
        ></el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button type="text" size="small" @click="model.skills.push({})"
            ><i class="el-icon-plus"></i>添加技能</el-button
          >
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :span="12" v-for="(item, i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="axios.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="(res) => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="danger"
                  size="small"
                  @click="model.skills.splice(i, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button style="margin-top: 2rem" type="primary" native-type="submit"
          >保存</el-button
        >
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
      model: {
        name: "",
        avatar: "",
        categories: [],
        scores: {
          skills: null,
        },
        skills: [],
        items1: [],
        items2: [],
        usageTips: "",
        battleTips: "",
        teamTips: "",
      },
      categories: [],
      items: [],
    };
  },
  methods: {
    async save() {
      if (this.id) {
        const res = await this.axios.put(`/rest/heros/${this.id}`, this.model);
      } else {
        const res = await this.axios.post("/rest/heros", this.model);
      }
      this.$router.push("/heros/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.axios.get(`/rest/heros/${this.id}`);
      Object.assign(this.model, res.data);
      // this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.axios.get(`/rest/categories`);
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.axios.get(`/rest/items`);
      this.items = res.data;
    },
    afterUpload(res) {
      this.model.avatar = res.url;
    },
  },
  created() {
    this.fetchItems();
    this.fetchCategories();
    this.id && this.fetch();
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px !important;
  text-align: center;
}
.avatar {
  width: 6rem;
  height: 6rem;
  display: block;
}
</style>
