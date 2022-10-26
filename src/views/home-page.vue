<template>
  <div class="home-page">
    <eventi-filter @doFilter="routeToEventiFilter" />
    <section v-if="loggedinUser && loggedinUser.favs" class="suggested">
      <section class="flex space-between">
        <h3>Suggested for you</h3>
        <h3 class="hover-pointer" @click="$router.push('/eventi-app')">
          Show All
        </h3>
      </section>
      <eventi-list :eventis="suggestEventis" />
    </section>
    <section class="flex space-between">
      <h3>Newest</h3>
      <h3 class="hover-pointer" @click="$router.push('/eventi-app')">
        Show All
      </h3>
    </section>
    <eventi-list :eventis="newestEventis" />
    <section class="flex space-between">
      <h3>Populars</h3>
      <h3 class="hover-pointer" @click="$router.push('/eventi-app')">
        Show All
      </h3>
    </section>
    <eventi-list :eventis="popularestEventis" />
    <section>
      <div class="articles-row main-a">
        <a class="article a" href="#/eventi-app/?term=&key=tags&values=Children">
          <div>
            <h2 class="title">Children</h2>
          </div>
        </a>
        <a class="article b" href="#/eventi-app/?term=&key=tags&values=Animals">
          <div>
            <h2 class="title">Animals</h2>
          </div>
        </a>
      </div>
      <div class="articles-row main-b">
        <a class="article c" href="#/eventi-app/?term=&key=tags&values=Fun">
          <div>
            <h2 class="title">Fun</h2>
          </div>
        </a>
        <a class="article d" href="#/eventi-app/?term=&key=tags&values=Needy">
          <div>
            <h2 class="title">Needy</h2>
          </div>
        </a>
      </div>
    </section>
    <global-info />
  </div>
</template>

<script>
import eventiFilter from "../cmp/eventi-filter.vue";
// @ is an alias to /src

import eventiList from "../cmp/eventi-list";
// import eventiPreview from '../cmp/eventi-preview';
import globalInfo from "../cmp/global-info";
// import socketService from '../service/socket-service.js'

// import orgPreview from '../cmp/org-preview'
// import { eventiService } from '../service/eventi-service.js'
// import { orgService } from '../service/org-service.js'
// import { userService } from '../service/user-service.js'
export default {
  name: "homePage",
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    newestEventis() {
      var eventis = JSON.parse(
        JSON.stringify(this.$store.getters.eventisForDisplay)
      );
      eventis.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
      return eventis.splice(0, 4);
    },
    popularestEventis() {
      var eventis = JSON.parse(
        JSON.stringify(this.$store.getters.eventisForDisplay)
      );
      eventis.sort((a, b) => (a.rate > b.rate ? -1 : b.rate > a.rate ? 1 : 0));
      return eventis.splice(0, 4);
    },
    suggestEventis() {
      // if(!this.loggedinUser || !this.loggedinUser.favs) return
      var suggestEventis = [];
      var suggestEventisArrays = [];
      const favs = this.$store.getters.loggedinUser.favs;
      var eventis = JSON.parse(
        JSON.stringify(this.$store.getters.eventisForDisplay)
      );
      eventis.sort((a, b) => (a.rate > b.rate ? -1 : b.rate > a.rate ? 1 : 0));
      [...favs].forEach((fav) => {
        let favEventis = [];
        [...eventis].forEach((eventi) => {
          eventi.tags.forEach((eventTag) => {
            if (eventTag === fav) {
              favEventis.push(eventi);
            }
          });
        });
        suggestEventisArrays.push(JSON.parse(JSON.stringify(favEventis)));
      });

      const arr = [0, 1, 2, 3];
      arr.forEach((num) => {
        var myIdx = num;
        if (myIdx === suggestEventisArrays.length) myIdx = 0;
        if (myIdx - 1 === suggestEventisArrays.length) myIdx = 1;
        suggestEventis.push(suggestEventisArrays[myIdx].shift());
      });
      return suggestEventis;
    },
  },
  methods: {
    routeToEventiFilter(filterBy) {
      if (filterBy.byKey.values.length) {
        this.$router.push(
          `/eventi-app/?term=${filterBy.byText}&key=${filterBy.byKey.key}&values=${filterBy.byKey.values}`
        );
      }
    },
  },
  created() {
    this.$store.dispatch({ type: "setEventis" });
    document.body.classList.add("hero-page");
    // socketService.on("updatesEventi", (eventi) => {
    //   console.log('check');
    //   if(this.$store.getters.loggedinUser.org._id === eventi.byOrg._id) {
    //     this.$message({
    //       showClose: true,
    //       message: `someone review on ${eventi.title}`,
    //       type: "success",
    //       duration: 3000,
    //     });
    //   }
    // })
  },
  destroyed() {
    document.body.classList.remove("hero-page");
  },
  components: {
    eventiList,
    globalInfo,
    eventiFilter,
    // orgPreview
  },
};
</script>
