<template>
<div class="user-navbar">
    <el-submenu index="2">
      <template slot="title"><i class="fas fa-bars"></i></template>
      <el-menu-item :index="`/user-details/${userId}`" :disabled="!loggedinUser"
      >User profile</el-menu-item>
    <el-menu-item index="/login">Login</el-menu-item>
    </el-submenu>
    <i class="fas fa-user-circle"></i>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>