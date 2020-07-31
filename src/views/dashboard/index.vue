<template>
  <div class="dashboard-container page">
    <div class="page-header">
      审批人：<el-input  placeholder="审批人" style="width: 150px;margin-right: 10px" size="mini"></el-input>
      活动区域：
      <el-select  placeholder="活动区域" v-model="active"  style="width: 150px;margin-right: 10px" size="mini">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
      <el-button type="primary" size="mini" icon="el-icon-search">查询</el-button>
      <div class="page-header-right">
        <el-button type="primary" icon="el-icon-edit" size="mini">添加</el-button>
      </div>
    </div>
    <div class="page-main">
      <div class="body">
        <div class="body-inner">
          <div class="body-content">
            <el-table
              v-loading="listLoading"
              :data="list"
              element-loading-text="Loading"
              size="mini"
              fit
              highlight-current-row
            >
              <el-table-column align="center" label="ID" width="95">
                <template slot-scope="scope">
                  {{ scope.$index }}
                </template>
              </el-table-column>
              <el-table-column label="Title">
                <template slot-scope="scope">
                  {{ scope.row.title }}
                </template>
              </el-table-column>
              <el-table-column label="Author" width="110" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.author }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Pageviews" width="110" align="center">
                <template slot-scope="scope">
                  {{ scope.row.pageviews }}
                </template>
              </el-table-column>
              <el-table-column class-name="status-col" label="Status" width="110" align="center">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="created_at" label="Display_time" width="200">
                <template slot-scope="scope">
                  <i class="el-icon-time" />
                  <span>{{ scope.row.display_time }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <el-button-group >
        <el-button type="info" icon="el-icon-setting" size="mini"></el-button>
        <el-button type="info" icon="el-icon-link" size="mini"></el-button>
        <el-button type="info" icon="el-icon-delete" size="mini"></el-button>
      </el-button-group>
      <div class="page-footer-right">
        <el-button type="primary" icon="el-icon-edit" size="mini">保存</el-button>
        <el-button type="warning" icon="el-icon-delete" size="mini">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getList } from '@/api/table'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      active: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
  &-container {}
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
