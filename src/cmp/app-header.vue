<template>
  <header class="app-header full main-container" :class="{scrolly:(scrollYposition > 20)}">
    <div class="hedear-container flex space-between">
      <div class="logo">
        <img
          src="@/assets/logo2.svg"
          alt=""
          class="logo-img hover-pointer"
          @click="$router.push('/')"
        />
      </div>
      <navbar class="nav-bar-horizontal"></navbar>
      <nav-bar-vertical class="nav-bar-vertical"></nav-bar-vertical>
    </div>
  </header>
</template>

<script>
import navbar from "./element-ui/nav-bar";
import navBarVertical from './element-ui/nav-bar-vertical.vue';

export default {
  name: "app-header",
  data(){
    return{
      scrollYposition: 0
    }
  },
  components: {
    navbar,
    navBarVertical,
  },
  created() {
   document.addEventListener("scroll", this.getScroll);
  },
  destroyed(){
    Document.removeEventListener("scroll", this.getScroll);
  },
  methods:{
    getScroll(){
      this.scrollYposition = window.scrollY;
    }
  }
};
</script>

<style>
</style>
