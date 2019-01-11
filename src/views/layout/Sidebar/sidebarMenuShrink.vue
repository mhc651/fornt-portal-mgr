<template>
  <div>
    <template v-for="(item, index) in menuList">
      <div style="text-align: center;" :key="index">
        <Dropdown
          transfer
          v-if="item.children.length !== 1"
          placement="right-start"
          :key="index"
        >
          <Button style="width: 70px;margin-left: -5px;padding:10px 0;font-size: 20px" type="text">
            <svg-icon :iconClass="icon"></svg-icon>
          </Button>
          <DropdownMenu
            style="width: 200px;" slot="list"
          >
            <template v-for="(child, i) in item.children">
              <DropdownItem :name="child.text" :key="i">
                <template>
                  <router-link :to="'/'+item.id+'/'+child.id">
                    <span style="padding-left:10px;">{{ child.text }}</span>
                  </router-link>
                </template>
              </DropdownItem>
            </template>
          </DropdownMenu>
        </Dropdown>
        <Dropdown transfer v-else placement="right-start" :key="index">
          <Button style="width: 70px;margin-left: -5px;padding:10px 0;font-size: 20px" type="text">
            <svg-icon :iconClass="icon"></svg-icon>
          </Button>
          <DropdownMenu style="width: 200px;" slot="list">
            <DropdownItem :name="item.children[0].text" :key="'d' + index">
              <template>
                <router-link :to="'/'+item.id+'/'+child.id">
                  <span style="padding-left:10px;">{{ child.text }}</span>
                </router-link>
              </template>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'sidebarMenuShrink',
    props: {
      menuList: {
        type: Array
      },
      icon: {
        type: String,
        default: 'application'
      },
      menuTheme: {
        type: String,
        default: 'darck'
      }
    },
    methods: {
      changeMenu(active) {
        this.$emit('on-change', active);
      }
    }
  };
</script>
<style>
  .ivu-dropdown-menu a{
    color: #495060;
  }

</style>
