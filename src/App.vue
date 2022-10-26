<template>
  <div id="app" class="main-container">
    <app-header></app-header>
    <hero @scrollToList="scrollMeTo('appList')" ref="heroCmp" />
    <main ref="appList" class="mb10">
      <router-view />
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import "@/style/main.scss";
import appHeader from "@/cmp/app-header";
import appFooter from "@/cmp/app-footer";
import hero from "@/cmp/hero";
import socketService from "../src/service/socket-service.js";

export default {
  name: "eventiApp",
  components: {
    appHeader,
    appFooter,
    hero
  },
  methods: {
    scrollMeTo(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;
      window.scrollTo(0, top - 80);
    },
  },
  created() {
    socketService.setup();
    socketService.on("updatesEventi", (eventi) => {
      console.log('updatesEventi');
      if (this.$store.getters.loggedinUser && this.$store.getters.loggedinUser.org && this.$store.getters.loggedinUser.org._id === eventi.byOrg._id) {
        if(eventi.notifications > 0) {
          this.$message({
            showClose: true,
            message: `new notification in ${eventi.title}`,
            type: "success",
            duration: 3000,
          });
        }
      }
    })
  },
  destroyed() {
    socketService.terminate();
  }
};
</script>

<style lang="scss">
@font-face{
    font-family: regular;
    src: url(./assets/fonts/VarelaRound/VarelaRound-Regular.ttf);
}

// @font-face {
//   font-family: regular;
//   src: url(./assets/fonts/Hind/Hind-Light.ttf);
// }

.hero {
  background-image: url(./assets/img/hero.jpg);
}

@font-face {
  font-family: hindBold;
  src: url(./assets/fonts/Hind/Hind-Bold.ttf);
}
</style>
