<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert show-icon title="注意：只允许为第三级分类设置参数" type="warning" :closable="false"></el-alert>
      <el-row class="cat_option">
        <el-col>
          <span>
            选择商品分类：
            <el-cascader
              v-model="selectedParamsKeys"
              :options="paramsList"
              expand-trigger="hover"
              :props="paramsProps"
              @change="handleChange"
            ></el-cascader>
          </span>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleParamsClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button
            type="primary"
            size="mini"
            :disabled="isBtnDisabled"
            @click="addDialogVisible = true"
          >添加参数</el-button>
          <el-table :data="manyParamsData" border stripe>
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button
            type="primary"
            size="mini"
            :disabled="isBtnDisabled"
            @click="addDialogVisible = true"
          >添加属性</el-button>
          <el-table :data="onlyParamsData" border stripe>
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog
      :title="'添加' + titleText"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="paramsDialogClosed"
    >
      <!-- 添加动态参数和静态属性共用同一对话框 -->
      <el-form
        :model="addParamsForm"
        :rules="addParamsRules"
        ref="addParamsRef"
        label-width="100px"
      >
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addParamsForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParamsInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paramsList: [],
      paramsProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      selectedParamsKeys: [],
      activeName: 'many',
      manyParamsData: [],
      onlyParamsData: [],
      addDialogVisible: false,
      addParamsForm: {
        attr_name: ''
      },
      addParamsRules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getParamsList() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败')
      }
      this.paramsList = res.data
    },
    handleChange() {
      this.getParamsData()
    },
    handleParamsClick() {
      this.getParamsData()
    },
    async getParamsData() {
      if (this.selectedParamsKeys.length !== 3) {
        this.selectedParamsKeys = []
        return
      }
      const { data: res } = await this.$http.get(
        `categories/${this.paramsId}/attributes`,
        {
          params: { sel: this.activeName }
        }
      )
      if (res.meta.status !== 200) {
        return this.$message.error('获取参数列表失败')
      }
      if (this.activeName === 'many') {
        this.manyParamsData = res.data
      } else {
        this.onlyParamsData = res.data
      }
    },
    paramsDialogClosed() {
      this.$refs.addParamsRef.resetFields()
    },
    addParamsInfo() {
      this.$refs.addParamsRef.validate(async valid => {
        if (!valid) {
          return this.$message.error('请输入合法的参数')
        }
        const { data: res } = await this.$http.post(
          `categories/${this.paramsId}/attributes`,
          {
            attr_name: this.addParamsForm.attr_name,
            attr_sel: this.activeName
          }
        )
        if (res.meta.status !== 201) {
          return this.$message.error('添加参数失败')
        }
        this.$message.success('添加参数成功')
        this.addDialogVisible = false
        this.getParamsData()
      })
    }
  },
  created() {
    this.getParamsList()
  },
  computed: {
    isBtnDisabled() {
      if (this.selectedParamsKeys.length !== 3) {
        return true
      }
      return false
    },
    paramsId() {
      if (this.selectedParamsKeys.length === 3) {
        return this.selectedParamsKeys[2]
      }
      return null
    },
    titleText() {
      if (this.activeName === 'many') {
        return '动态参数'
      }
      return '静态属性'
    }
  }
}
</script>

<style lang="less" scoped>
.cat_option {
  margin: 15px 0;
}
</style>