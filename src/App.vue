<template>
  <div class="layout">
    <!-- <Loading :loading="appLoading"></Loading> -->
    <!-- header -->
    <Header :style="{padding: 0}" class="layout-header-bar">
      <Row type="flex" justify="start">
        <Col span="16">
        <router-link to="/" class="logo">
          <Icon @click.native.prevent="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round"
                size="24"></Icon>
          <span class="page-title"><span>{{ pageModel.title }}</span></span>
        </router-link>
        </Col>
        <Col span="8" style="text-align: right;padding-right: 25px">
          <Dropdown @on-click="handleLogout" style="text-align: left">
            <a href="javascript:void(0)">
               <span v-if="pageModel.tools" v-for="tool in pageModel.tools">
                  <span class="user-info" v-if="tool.type==='user'" v-text="tool.props.realName">
                  </span>
                </span>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem v-if="pageModel.tools" v-for="tool in pageModel.tools">
                  <span class="user-info" v-if="tool.type==='user'" v-text="tool.props.realName">
                  </span>
              </DropdownItem>
              <DropdownItem divided @click="handleLogout" name="logout">退出</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Avatar icon="person"/>
        </Col>
      </Row>
    </Header>
    <!-- header end-->
    <Layout>
      <Layout>
        <!-- side -->
        <Sider class="sider" ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
          <!-- 机构名称 -->
          <div class="company" v-show="!isCollapsed">
            {{ pageModel.orgName }}
          </div>
          <!-- 机构名称 end-->
          <side-nav :noName='isCollapsed' :list='pageModel.menus' />
        </Sider>
        <!-- side end-->
        
           <!-- content -->
        <Content :style="{padding:'10px',background: '#fff', minHeight: 'calc(100vh - 84px)'}">
          <router-view/>
        </Content>
           <!-- content end-->
      </Layout>
    </Layout>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Loading from '@/components/Common/Loading.vue'

import sideNav from './components/sideNav.vue'
import sidebarMenuShrink from './views/layout/Sidebar/sidebarMenuShrink.vue'
export default {
  data() {
    return {
      // 收起
      isCollapsed: false
    }
  },
  components: { sidebarMenuShrink, sideNav, Loading },
  computed: {
    // pageModel: this.$store.state.pageModel
    ...mapState(['pageModel','appLoading']),
    rotateIcon() {
      return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
    },
    menuitemClasses() {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
    }
  },
  created() {
    this.getPageModel()
    // this.getInitIntoData()
  },
  methods: {
    getPageModel() {
      this.$store.dispatch('getPageModel', {})
    },
    getInitIntoData() {
      this.$store.dispatch('getInitIntoData', {})
    },
    collapsedSider() {
      this.$refs.side1.toggleCollapse()
    },
    handleLogout(name) {
      if (name === 'logout') {
        this.$store.dispatch('logout', {})
      }
    }
  }
}
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100vh;
}

.ivu-menu-light {
  background: #f5f5f5;
}

.sider {
  min-height: calc(100vh - 64px);
  background: #f5f5f5;
}

.sider a {
  color: #495060;
  display: block;
}

.sider .ivu-menu-item-selected > a {
  color: #2d8cf0;
  display: block;
}

.submenu-title {
  font-size: 16px;
}

.layout-header-bar {
  background: #fff;
  border-bottom: 1px solid #e6e5e5;
  /* overflow: hidden; 导致退出无法显示 */
}

.company {
  width: 200px;
  height: 60px;
  background: url('./assets/img/hx/bg.png');
  text-align: center;
  line-height: 60px;
  font-size: 16px;
}

.logo {
  background: url('./assets/images/logo.png') no-repeat left center;
  width: 100%;
  height: 60px;
  background-size: 142px 60px;
  display: inline-block;
  padding-left: 150px;
  color: #000;
}

.page-title {
  font-size: 20px;
}

.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}

.menu-icon {
  transition: all 0.3s;
}

.rotate-icon {
  transform: rotate(-90deg);
}

.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}

.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}

.collapsed-menu span {
  width: 0;
  transition: width 0.2s ease;
}

.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>

