
<template>
  <li
    v-if="org"
    class="eventi-preview card-preview flex-column"
    @click="openDetails"
  >
    <div class="img-squer-container">
      <img v-show="imgLoad" @load="imgLoad = true" :src="imgUrl" alt="" />
      <div v-if="!imgLoad" class="loading flex center">LOADING...</div>
      <button class="btn-img-nav next" @click.stop="nextImgUrl">
        <i class="fas fa-arrow-circle-right"></i>
      </button>
      <button class="btn-img-nav prev" @click.stop="nextImgUrl">
        <i class="fas fa-arrow-circle-left"></i>
      </button>
    </div>
    <section class="mini-details-top flex space-between">
      <h5 v-if="org.reviews && org.reviews.length">
        <i class="star fas fa-star"></i>
        {{ org.rate }} ({{ org.reviews.length }})
      </h5>
      <h5 v-else><i class="star fas fa-star"></i>New</h5>
      <h5 class="org-eventis">{{ orgEventis.length }} Events</h5>
    </section>
    <div class="preview-details flex column flex-g1">
      <p class="org-goals card-desc flex-g1">
        <span class="mrg0 card-title">{{ org.name }}</span> <br />{{
          org.goals
        }}
      </p>
    </div>
    <h5 class="org-mini-details country bold">{{ org.country }}</h5>
  </li>
</template>

<script>
export default {
  name: "orgPreview",
  props: {
    org: Object,
  },
  data() {
    return {
      rate: 2,
      imgLoad: false,
      idx: 0,
    };
  },
  computed: {
    imgUrl() {
      if (!this.org.imgUrls) return "";
      return this.org.imgUrls[this.idx];
    },
    orgEventis() {
      const eventis = this.$store.getters.eventisForDisplay.filter((eventi) => {
        if (eventi.byOrg) {
          return eventi.byOrg._id === this.org._id;
        }
      });
      return eventis;
    },
    tagsIcon() {
      return this.$store.getters.tagsIcon;
    },
  },
  created() {
    // this.orgRate = JSON.parse(JSON.stringify(this.org.rate));
    // console.log("org", this.org);
  },
  methods: {
    nextImgUrl() {
      if (this.idx === this.org.imgUrls?.length - 1) this.idx = 0;
      else this.idx++;
    },
    prevImgUrl() {
      if (this.idx === 0) this.idx = this.org.imgUrls?.length - 1;
      else this.idx--;
    },
    openDetails() {
      this.$router.push(`/org-details/${this.org._id}`);
    },
  },
};
</script>

<style>
</style>