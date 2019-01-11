<template>
<!-- active-name="0-1" :open-names="[0]"  -->
  <Menu  :open-names="[0]" style="width:100%" :class="noName?'nonetext':''">
        <Submenu v-for="(ul,index) in list" :name="index" :key="ul.index" >
            <template slot="title">
                <Icon type="ios-analytics"></Icon>
               <span v-if="!noName">
               {{ ul.text }}
               </span>
            </template>
              <MenuItem v-if="!noName" v-for="(cell,k) in ul.children" :key="cell.index" :name="index+'-'+k">
               <router-link  :to='"/"+cell.id'>
                 {{ cell.text }}</router-link>
              </MenuItem>
        </Submenu>
    </Menu>
</template>
<script>
import {mapState} from 'vuex'
export default {
 props:{
   // 数据
   noName:{},
   // 导航列表
   list:{},
   
 },
computed:{
  ...mapState(['nav']),
  now(){

  }
}

}
</script>
<style lang="scss">
.nonetext {
  .ivu-menu-submenu-title-icon {
    display: none;
  }
}
</style>

