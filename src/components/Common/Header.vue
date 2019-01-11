<template>
  <div class="hx-navbar">
    <nav class="navbar navbar-expand fixed-top be-top-header">
      <div class="container-fluid">
        <div class="be-navbar-header">
          <router-link to="/" append class="logo">
            <img src="../../assets/images/logo.png" alt="">
          </router-link>
          <a href="javascript:;" class="be-toggle-left-sidebar">
            <span class="icon mdi mdi-menu" @click="toggleSidebar">
              <Icon type="navicon"></Icon>
            </span>
          </a>
        </div>
        <div class="be-right-navbar">
          <ul class="nav navbar-nav float-right be-user-nav">
            <li class="nav-item dropdown">
              <a href="javascript:;"
                 @click="handleAvatar"
                 data-toggle="dropdown"
                 role="button"
                 aria-expanded="false"
                 class="nav-link
dropdown-toggle">
                <img
              src="../../assets/img/avatar.png" alt="Avatar">
                <span class="user-name">Túpac Amaru</span></a>
              <div role="menu" class="dropdown-menu" :class="{show: popout}">
                <div v-if="pageModel.tools" v-for="tool in pageModel.tools">
                  <div class="user-info" v-if="tool.type==='user'">
                    <div class="user-name" v-text="tool.props.username"></div>
                    <div class="online" v-text="tool.props.realName"></div>
                  </div>
                </div>

                <a href="javascript:void(0)" class="dropdown-item" @click="handleLogout">
                  <span class="icon mdi mdi-power"></span> 退出
                </a>
              </div>
            </li>
          </ul>
          <div class="page-title"><span>{{ pageModel.title }}</span></div>
          <ul class="nav navbar-nav float-right be-icons-nav">
            <!--<li class="nav-item dropdown"><a href="#" role="button" aria-expanded="false" class="nav-link be-toggle-right-sidebar"><span class="icon mdi mdi-settings"></span></a></li>-->
            <!--<li class="nav-item dropdown"><a href="#" data-toggle="dropdown" role="button" aria-expanded="false" class="nav-link dropdown-toggle"><span class="icon mdi mdi-notifications"></span><span class="indicator"></span></a>-->
            <!--<ul class="dropdown-menu be-notifications">-->
            <!--<li>-->
            <!--<div class="title">Notifications<span class="badge badge-pill">3</span></div>-->
            <!--<div class="list">-->
            <!--<div class="be-scroller">-->
            <!--<div class="content">-->
            <!--<ul>-->
            <!--<li class="notification notification-unread"><a href="#">-->
            <!--<div class="image"><img src="../../assets/img/avatar2.png" alt="Avatar"></div>-->
            <!--<div class="notification-info">-->
            <!--<div class="text"><span class="user-name">Jessica Caruso</span> accepted your invitation to join the team.</div><span class="date">2 min ago</span>-->
            <!--</div></a></li>-->
            <!--<li class="notification"><a href="#">-->
            <!--<div class="image"><img src="../../assets/img/avatar3.png" alt="Avatar"></div>-->
            <!--<div class="notification-info">-->
            <!--<div class="text"><span class="user-name">Joel King</span> is now following you</div><span class="date">2 days ago</span>-->
            <!--</div></a></li>-->
            <!--<li class="notification"><a href="#">-->
            <!--<div class="image"><img src="../../assets/img/avatar4.png" alt="Avatar"></div>-->
            <!--<div class="notification-info">-->
            <!--<div class="text"><span class="user-name">John Doe</span> is watching your main repository</div><span class="date">2 days ago</span>-->
            <!--</div></a></li>-->
            <!--<li class="notification"><a href="#">-->
            <!--<div class="image"><img src="../../assets/img/avatar5.png" alt="Avatar"></div>-->
            <!--<div class="notification-info"><span class="text"><span class="user-name">Emily Carter</span> is now following you</span><span class="date">5 days ago</span></div></a></li>-->
            <!--</ul>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="footer"> <a href="#">View all notifications</a></div>-->
            <!--</li>-->
            <!--</ul>-->
            <!--</li>-->
            <!--<li class="nav-item dropdown"><a href="#" data-toggle="dropdown" role="button" aria-expanded="false" class="nav-link dropdown-toggle"><span class="icon mdi mdi-apps"></span></a>-->
            <!--<ul class="dropdown-menu be-connections">-->
            <!--<li>-->
            <!--<div class="list">-->
            <!--<div class="content">-->
            <!--<div class="row">-->
            <!--<div class="col"><a href="#" class="connection-item"><img src="../../assets/img/github.png" alt="Github"><span>GitHub</span></a></div>-->
            <!--<div class="col"><a href="#" class="connection-item"><img src="../../assets/img/bitbucket.png" alt="Bitbucket"><span>Bitbucket</span></a></div>-->
            <!--<div class="col"><a href="#" class="connection-item"><img src="../../assets/img/slack.png" alt="Slack"><span>Slack</span></a></div>-->
            <!--</div>-->
            <!--<div class="row">-->
            <!--<div class="col"><a href="#" class="connection-item"><img src="../../assets/img/dribbble.png" alt="Dribbble"><span>Dribbble</span></a></div>-->
            <!--<div class="col"><a href="#" class="connection-item"><img src="../../assets/img/mail_chimp.png" alt="Mail Chimp"><span>Mail Chimp</span></a></div>-->
            <!--<div class="col"><a href="#" class="connection-item"><img src="../../assets/img/dropbox.png" alt="Dropbox"><span>Dropbox</span></a></div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="footer"> <a href="#">More</a></div>-->
            <!--</li>-->
            <!--</ul>-->
            <!--</li>-->
          </ul>
        </div>
      </div>
    </nav>
  </div>

</template>

<script>
  import {
    mapState
  } from 'vuex';
  export default {
    name: 'Header',
    props: {
      toggle: Function
    },
    data() {
      return {
        popout: false
      };
    },
    computed: {
      ...mapState([
        'pageModel'
      ])
    },
    mounted() {
      document.body.onclick = function() {
        this.popout = !this.popout;
      };
    },
    methods: {
      toggleSidebar() {
        this.$emit('toggle');
      },
      handleAvatar() {
        this.popout = !this.popout;
      },
      handleLogout() {
        this.$store.dispatch('logout', {});
      }
    }
  };
</script>

<style lang="scss">
  .hx-navbar {
    .logo {
      img {
        width: 142px;
        height: 60px;
      }
    }
  }

  .navbar {
    padding: 0 1rem;
  }

</style>
