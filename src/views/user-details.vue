<template>
  <section v-if="user" class="user-details">
    <h2>user details</h2>
    <avatar v-if="user.imgUrl" :src="user.imgUrl"   :username="user.fullName"/>
    <h3>Name: {{ user.fullName }}</h3>
    <div class="skills clean-list mb10">
      <h3 class="mrg0">Skills:</h3>
      <section v-for="(skill, idx) in user.skills" :key="idx">
        {{ skill }}
      </section>
    </div>
    <div class="favs clean-list mb10">
      <h3 class="mrg0">Favorites:</h3>
      <section v-for="(fav, idx) in user.favs" :key="idx">
        {{ fav }}
      </section>
    </div>
    <h3>My Events</h3>
    <eventi-list v-if="user.events.length"  :eventis="eventis" />
    <h4 v-else>Join Events!</h4>
    <h3>My Organization</h3>
    <!-- <org-preview v-if="user.org" :org="user.org" /> -->
    <org-list v-if="user.org" :orgs="org" />
    <h4 v-else>Make your own Organization</h4>
  </section>
</template>

<script>
// import orgPreview from '../cmp/org-preview'
import eventiList from '../cmp/eventi-list'
import orgList from '../cmp/org-list'
import avatar from 'vue-avatar'
// import { userService } from '../service/user-service.js'

export default {
  name: 'user-details',
  // data() {
  //   return {
  //     user: null
  //   }
  // },
  computed: {
    user() {
      return this.$store.getters.loggedinUser
    },
    eventis() {
      return this.user.events.map(miniEventi => {
        return this.$store.getters.eventisForDisplay.find(
          (eventi) => {
            return eventi._id === miniEventi._id;
          })
      })
    },
    org() {
      console.log(this.$store.getters.orgsForDisplay);
      const org = this.$store.getters.orgsForDisplay.find(
        (org) => {
          return org._id === this.user.org._id;
        })
      console.log('org', org)
      const orgs = []
      orgs.push(org)
      return orgs
    }
  },
  async created() {
    this.$store.dispatch({ type: 'setEventis' })
    this.$store.dispatch({ type: 'setOrgs' })
    // const id = this.$route.params.userId
    // const user = await userService.getById(id)
    // this.user = JSON.parse(JSON.stringify(user))
  },
  components: {
    avatar,
    eventiList,
    orgList,
    // orgPreview,
  }
}
</script>

<style>
</style>