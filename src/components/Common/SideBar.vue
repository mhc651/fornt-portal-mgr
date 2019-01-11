<template>
  <div class="be-left-sidebar hx-sidebar" id="left-sidebar">
    <div class="left-sidebar-wrapper">
      <router-link to="/" class="left-sidebar-toggle">首页</router-link>
      <div class="left-sidebar-spacer">
        <div class="left-sidebar-scroll">
          <div class="left-sidebar-content" style="padding-top: 0">
            <div class="logo" v-show="!ifVisible">福建国药控股股份有限公司</div>
            <ul class="sidebar-elements">
              <li v-if="pageModel&&pageModel.menus" v-for="item in pageModel.menus" :key="item.id" class="parent"
                  :class="{open: activeIndex === 0}"
                  @click="handleClick($event, 0)">
                <a href="javascript:void(0);">
                  <svg-icon iconClass="dashboard"></svg-icon>
                  <span>{{ item.text }}</span>
                </a>
                <ul class="sub-menu" :class="{visible: ifShowNav}">
                  <li v-for="list in item.children" :key="list.id">
                    <router-link :to="'/'+item.id+'/'+list.id">
                      {{ list.text }}
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  export default {
    components: {},
    name: 'SideBar',
    data() {
      return {
        activeIndex: '',
        flag: true,
        // 显示导航
        ifShowNav: false
      };
    },
    computed: {
      ...mapState([
        'pageModel'
      ])
    },
    props: {
      // 侧边栏是否被缩放
      ifVisible: {
        type: Boolean
      }
    },
    methods: {
      handleIconClick() {
        this.ifShowNav = this.ifShowNav ? !this.ifVisible : this.ifVisible;
      },
      handleClick(e, index) {
        if (this.flag) {
          this.activeIndex = index;
          this.flag = false;
        } else {
          this.activeIndex = '';
          this.flag = true;
        }
      }
    }
  };
</script>

<style lang="scss">
  #left-sidebar {
    a {
      &:hover {
        text-decoration: none;
      }
    }
  }

  .hx-sidebar {
    .logo {
      width: 229px;
      height: 60px;
      background: url('../../assets/img/hx/bg.png');
      text-align: center;
      line-height: 60px;
      font-size: 16px;
    }
  }
</style>
