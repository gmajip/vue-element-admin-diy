<template>
  <ul class="menu">
    <li class="menu-item"  v-for="item in routes" :key="item.path">
      <div v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow"  @click="handleMenuClick(onlyOneChild)">
        <app-link v-if="onlyOneChild.meta" :to="resolvePath(item.path, onlyOneChild.path)" :class="{'active' : $route.path.startsWith(resolvePath(item.path, onlyOneChild.path))}">
          <i class="el-icon-folder-opened" />
          {{onlyOneChild.meta.title}}
        </app-link>
      </div>
      <div v-else @click="handleMenuClick(item)">
        <app-link :to="item.redirect && item.redirect !=='noRedirect' ? item.redirect : '' " :class="{'active' : $route.path.startsWith(item.path)}">
          <i class="el-icon-folder-opened" />
          {{ item.name }}
        </app-link>
      </div>
    </li>
  </ul>
</template>

<script>
import path from 'path'
import AppLink from './Sidebar/Link'
import { isExternal } from '@/utils/validate'
export default {
  name: 'Menu',
  components: { AppLink },
  computed: {
    routes() {
      return this.$router.options.routes.filter(item => !item.hidden)
    }
  },
  methods: {
    handleMenuClick(item) {
      this.$store.dispatch('sideMenu/setMenu', item)
    },
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(basePath, routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(basePath)) {
        return basePath
      }
      return path.resolve(basePath, routePath)
    }
  }
}
</script>

<style lang="scss" scoped>
.menu{
  float: left;
  list-style: none;
  height: 50px;
  padding: 0;
  margin: 0;
  &-item{
    float: left;
    line-height: 50px;
    height: 50px;
    cursor: pointer;
    border-right: solid 1px #eee;
    a{
      display: block;
      padding: 0 20px;
      width: 100%;
      height: 100%;
      color: mix($color-white, $color-black, 40%);
      &:hover{
        color: $color-primary;
      }
      &.active{
        background: $color-primary;
        color: $color-white;
      }
    }
  }
}
</style>
