

<template>
  <li
    class="eventi-preview card-preview flex-column"
    v-if="eventi"
    @click="openDetails"
  >
    <div class="img-squer-container">
      <img v-show="imgLoad" @load="imgLoad = true" :src="imgUrl" alt="" />
      <div v-if="!imgLoad" class="loading flex center">LOADING...</div>
      <p v-if="eventi.location" class="country preview-card-country">{{ eventi.location.country}}</p>
      <button class="btn-img-nav next" @click.stop="nextImgUrl">
        <i class="fas fa-arrow-circle-right"></i>
      </button>
      <button class="btn-img-nav prev" @click.stop="nextImgUrl">
        <i class="fas fa-arrow-circle-left"></i>
      </button>
    </div>
    <section v-if="org" class="details-org-section flex align-center">
      <!-- <avatar
        style="background-position: center; background-size: cover"
        class="org-logo hover-pointer mr10"
        :username="org.name"
        :src="org.logo"
        :title="org.name"
        @click.stop="openOrgDetails"
      /> -->
      <!-- <h3 class="mrg0 card-title">{{ eventi.title }}</h3> -->
      <h4 v-if="eventi.notifications > 0 && isEventiAdmin">
        <i style="color: red" class="fas fa-circle"></i
        >{{ eventi.notifications }} notifications
      </h4>
    </section>
    <section class="mini-details-top flex space-between">
      <h5 v-if="eventi.reviews && eventi.reviews.length">
        <i class="star fas fa-star"></i>
        {{ eventi.rate }}
        <span class="reviews-counter">({{ eventi.reviews.length }})</span>
      </h5>
      <h5 v-else><i class="star fas fa-star"></i>New</h5>
      <h5 class="time">{{ moment(eventi.startAt).format("DD/MM/YYYY") }}</h5>
    </section>
    <!-- <section class="mini-details-main flex space-between">
      <p>Age +{{ eventi.fromAge }}</p>
    </section> -->
    <!-- <section class="text-center">
      <p>{{duration}}</p>
    </section> -->
    <div class="preview-details flex-column">
      <p class="card-desc flex-g1">
        <span class="card-title">{{ eventi.title }}</span> <br />
        {{ eventi.desc }}
      </p>
      <!-- <div class="eventi-floor card-footer flex space-around">
        <section
          class="tag flex column center"
          v-for="(tag, idx) in eventi.tags"
          :key="idx"
        >
          <i :class="tagsIcon[tag]"></i>
          <p>{{ tag }}</p>
        </section>
      </div> -->
    </div>
    <section class="price mr16">
      <p v-if="eventi.price > 0">
        <span class="bold">${{ eventi.price }}</span> / week
      </p>
      <p v-else>Free, just come!</p>
    </section>
  </li>
</template>

<script>
// import avatar from "vue-avatar";
var moment = require("moment");

export default {
  name: "eventiPreview",
  props: {
    eventi: Object,
  },
  data() {
    return {
      org: null,
      orgRate: 2,
      imgLoad: false,
      moment,
      idx: 0,
    };
  },
  created() {
    this.getOrg();
  },
  components: {
    // avatar,
  },
  computed: {
    imgUrl() {
      if (!this.eventi.imgUrls) return "";
      return this.eventi.imgUrls[this.idx];
    },
    tagsIcon() {
      return this.$store.getters.tagsIcon;
    },
    duration() {
      const date1 = this.eventi.startAt;
      const date2 = this.eventi.endAt;
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      var msg = `${(diffDays / 7).toFixed(0)} weeks`;
      if (diffDays % 7) msg += ` and ${diffDays % 7} days`;
      return msg;
    },
    isEventiAdmin() {
      if (
        this.$store.getters.loggedinUser &&
        this.$store.getters.loggedinUser.org &&
        this.$store.getters.loggedinUser.org._id === this.eventi.byOrg._id
      ) {
        return true;
      }
      return false;
    },
  },
  methods: {
    nextImgUrl() {
      if (this.idx === this.eventi.imgUrls?.length - 1) this.idx = 0;
      else this.idx++;
    },
    prevImgUrl() {
      if (this.idx === 0) this.idx = this.eventi.imgUrls?.length - 1;
      else this.idx--;
    },
    async getOrg() {
      const orgId = this.eventi.byOrg?._id;
      this.org = await this.$store.dispatch({ type: "getOrgById", orgId });
    },
    openDetails() {
      // if(this.$store.getters.loggedinUser && this.$store.getters.loggedinUser.org && this.$store.getters.loggedinUser.org._id === this.eventi.byOrg._id) {
      //   const eventi = JSON.parse(JSON.stringify(this.eventi))
      //   eventi.notifications = 0
      //   this.$store.dispatch({ type: "saveEventi", eventi })
      // }
      this.$router.push(`/eventi-details/${this.eventi._id}`);
    },
    openOrgDetails() {
      this.$router.push(`/org-details/${this.eventi.byOrg._id}`);
    },
  },
};
</script>

<style>
</style>