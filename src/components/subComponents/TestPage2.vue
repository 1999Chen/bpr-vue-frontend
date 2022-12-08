<template>
  <el-container class="content-container" direction="vertical">
    <div class="top">
      <!-- 表单输入框开始 -->
      <el-form ref="ruleFormRef" :model="queryParms" :rules="rules" label-width="120px" class="input-form"
               status-icon>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="queryParms.name" />
        </el-form-item>

        <el-form-item label="商品编号" prop="receiveUser">
          <el-input v-model="queryParms.receiveUser" />
        </el-form-item>

        <el-form-item label="商品分类" prop="payTime">
          <el-select v-model="queryParms.payTime" placeholder="请选择分类">
            <el-option key="2" label="全部" :value="2"></el-option>
            <el-option key="1" label="是" :value="1"></el-option>
            <el-option key="0" label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否上架" prop="payTime">
          <el-select v-model="queryParms.payTime" placeholder="请选择是否上架">
            <el-option key="2" label="全部" :value="2"></el-option>
            <el-option key="1" label="是" :value="1"></el-option>
            <el-option key="0" label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否过期" prop="payTime">
          <el-select v-model="queryParms.payTime" placeholder="请选择是否过期">
            <el-option key="2" label="全部" :value="2"></el-option>
            <el-option key="1" label="是" :value="1"></el-option>
            <el-option key="0" label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 表单输入框结束 -->

      <!-- 表单按钮组开始 -->
      <div class="btns">
        <el-button type="primary">筛选</el-button>
        <el-button type="primary">清空筛选</el-button>
        <el-button type="primary">导出</el-button>
        <el-button type="primary">新增商品</el-button>
      </div>
      <!-- 表单按钮组结束 -->
    </div>

    <!-- 表格开始 -->
    <div class="table">
      <!-- 表格 -->
      <el-table ref="multipleTableRef" :data="orderList" style="width: 100%"
                @selection-change="handleSelectionChange" tooltip-effect="dark">
        <!-- 多选框 -->
        <el-table-column type="selection" width="55" />
        <!-- 商品 -->
        <el-table-column label="商品" prop="name" width="100">
          <template #default="scope">
            <div style="text-align:center;">
              <el-image :src="scope.row.img" style="width:60px;height:100px;"></el-image>
            </div>
            <div style="text-align:center;">
              {{ scope.row.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="价格" prop="price" width="100"></el-table-column>
        <el-table-column label="销量" prop="saleCount" width="100"></el-table-column>
        <el-table-column label="库存" prop="count" width="100"></el-table-column>
        <el-table-column label="退款数量" prop="back" width="100"></el-table-column>
        <el-table-column label="退款金额" prop="backPrice" width="100"></el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button size="small" :type="scope.row.state?'success':'danger'">{{scope.row.state?"下架":"上架"}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="管理员" prop="owner" width="100"></el-table-column>
        <el-table-column label="更新时间" prop="time"></el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination background layout="prev, pager, next" :total="dataTotal" hide-on-single-page />
    </div>
    <!-- 表格结束 -->
  </el-container>
</template>

<script>
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
// import Mock from "@/tool/Mock"
export default {

  name: "TestPage2",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Delete, Edit, Search, Share, Upload
  },
  data() {
    return {
      // 查询表单
      queryParms: {
        name: "", // 商品名称
        username: "", // 用户名称
        receiveUser: "", // 收件人
        payTime: "", // 支付时间
        sendTime: "", // 发货时间
        phone: "", // 手机号
      },
      // 表单校验
      rules: {
        name: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ],
      },
      // tab选中的内容
      activeName: "all",
      // 数据总数
      dataTotal: 1000,
      // 订单数据
      orderList: [],
    }
  },
  // 页面挂载的时候
  mounted() {
    // 初始化商品数据
    let pageSize = window.innerHeight > 800 ? 5 : 3;
    console.log(pageSize);
    // this.orderList = Mock.getGoods(this.$route.params.type, pageSize)
    console.log(this.orderList)
  },

  // 路由更新时刷新数据
  beforeRouteUpdate(to) {
    let pageSize = window.innerHeight > 800 ? 5 : 3;
    // this.orderList = Mock.getGoods(to.params.type, pageSize)
  }
}
</script>

<style scoped lang="scss">
.content-container {
  width: 100%;

  .top {
    width: 100%;
    border: 1px solid #ccc;
    box-shadow: 3px 1px rgb(223, 217, 217);
    padding: 10px 0;
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    // 输入表单
    .input-form {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      vertical-align: middle;
    }

    // 按钮组
    .btns {
      display: flex;
      padding: 0 10px;
      margin-left: 40px;
    }
  }


  // 表格
  .table {
    width: 100%;
    flex: 8;
    border: 1px solid #ccc;
    box-shadow: 3px 1px rgb(223, 217, 217);
    padding: 10px 0;
    margin-top: 10px;

    // tab
    .demo-tabs {
      margin-left: 10px;

      .el-tabs__content {
        padding: 32px;
        color: #6b778c;
        font-size: 32px;
        font-weight: 600;
      }
    }

    // 表格
    .el-table {
      padding: 5px;
    }

    // 分页
    .el-pagination {
      margin-top: 20px;
    }
  }
}
</style>
