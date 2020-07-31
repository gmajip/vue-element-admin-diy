<template>
  <div class="navbar">
    <menus />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <div class="right-menu-item">
        <i class="el-icon-info" />
      </div>
      <div class="right-menu-item">
        <el-badge is-dot>
          <i class="el-icon-message-solid" />
        </el-badge>
      </div>
      <div class="right-menu-item">
        <el-dropdown>
          <span class="el-dropdown-link">
            <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
            系统管理员<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/">
              <el-dropdown-item>Home</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
              <el-dropdown-item>Docs</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Menus from './Menu'
export default {
  components: {
    Breadcrumb,
    Menus
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    routes() {
      return this.$router.options.routes
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 50px;
    &-item {
      display: inline-block;
      padding: 13px 15px;
      height: 50px;
      line-height: 24px;
      font-size: 16px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        background: #f5f5f5;
        color: $color-primary;
      }
    }
    .user-avatar{
      width: 24px;
      height: 24px;
      border-radius: 100%;
      vertical-align: middle;
    }
    .el-dropdown-link{
      &:hover {
        color: $color-primary;
      }
    }
  }
}
</style>
