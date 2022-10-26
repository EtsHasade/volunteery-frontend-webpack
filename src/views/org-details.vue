<template>
  <section v-if="org" class="org-details">
    <section class="top-page flex center space-between">
      <section class="top-details">
        <h2 class="mb10">{{ org.name }}</h2>
        <section class="flex">
          <section class="rate-section">
            <span v-if="org.reviews.length">
              <i class="star fas fa-star"></i> {{ org.rate }} ({{
                org.reviews.length
              }})
            </span>
            <span v-else><i class="star fas fa-star"></i>New</span>
          </section>
          <span>{{ org.country }}</span>
        </section>
      </section>
      <section
        v-if="isUserOrgAdmin"
        class="status-details flex align-center text-center"
      >
        <el-button class="delete-btn" type="warning" @click="removeOrg"
          >Delete Organization</el-button
        >
        <router-link
          type="success"
          class="el-button el-button--success"
          :to="'/org-edit/' + org._id"
          >Edit</router-link
        >
        <router-link
          v-if="isUserOrgAdmin"
          to="/eventi-edit"
          class="add-eventi el-button el-button--success"
          >Add Event</router-link
        >
      </section>
    </section>
    <section class="org-imgs">
      <img
        class="org-img"
        v-for="(img, idx) in org.imgUrls"
        :key="idx"
        :src="img"
      />
    </section>
    <main>
      <section class="details">
        <section class="top-details flex space-between align-center wrap">
          <section class="mini-user flex align-center mb10">
            <avatar style="background-position: center; background-size:cover;"
              class="mr10"
              :src="org.admin.imgUrl"
              :username="org.admin.fullName"/>
            <span>{{ org.admin.fullName }}</span>
          </section>
          <span class="facebook-btn">
            <div class="fb-like" data-href="https://www.facebook.com/HeroesforLifeIsrael" data-width="200" data-layout="standard" data-action="like" data-size="large" data-share="true"></div>
            <iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FHeroesforLifeIsrael&width=200&layout=standard&action=like&size=large&share=true&height=35&appId" width="350" height="35" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
          </span>
        </section> 
        <hr />
        <p class="org-goals">{{ org.goals }}</p>
        <hr />
        <section class="tags-section flex align-center wrap">
          <span class="bold mr16">Categories</span>
          <section class="tags">
            <span
              class="tag text-center mrg5"
              v-for="(tag, idx) in org.tags"
              :key="idx"
              ><i :class="tagsIcon[tag]"></i> {{ tag }}
            </span>
          </section>
        </section>
        <hr />
        <section class="org-desc">
          <p>{{ org.desc }}</p>
        </section>
        <hr />
        <section class="org-eventis">
          <span class="bold">Our Events</span>
          <eventi-list :eventis="orgEventis"></eventi-list>
        </section>
        <hr />
        <!-- <span class="text-center mrg5">Reviews</span>
        <form
          @submit.prevent="addReview"
          class="add-review flex center text-center"
        >
          <el-input type="text" v-model="reviewToEdit.txt" name="review" />
          <el-button type="success" @click="addReview">Add review</el-button>
          <rate-stars-enable v-model="reviewToEdit.rate" />
        </form>
        <section class="reviews flex column">
          <section
            class="review flex column mrg5"
            v-for="review in org.reviews"
            :key="review._id"
          >
            <section class="details-review flex">
              <avatar
                :src="review.author.imgUrl"
                :username="review.author.fullName"
              ></avatar>
              <rate-stars v-model="review.rate" class="review-rate" />
              <span class="time mrg5">{{
                moment(review.createdAt).startOf("minute").fromNow()
              }}</span>
            </section>
            <section class="content-review flex align-center text-center">
              <span class="name-review mrg5"
                >{{ review.author.fullName }}:
              </span>
              <span class="txt-review">{{ review.txt }}</span>
            </section>
          </section>
        </section> -->
        <section class="reviews-section flex column center">
          <section class="add-review flex align-center text-center mb10">
            <el-input type="text" placeholder="Enter your review" v-model="reviewToEdit.txt" name="review" />
            <el-button type="success" @click="addReview">Add review</el-button>
            <rate-stars-enable class="mb10" v-model="reviewToEdit.rate" />
          </section>
          <span class="text-center mrg5">Reviews</span>
          <section class="reviews flex wrap center">
            <section
              class="review flex column mrg5"
              v-for="review in org.reviews"
              :key="review._id"
            >
              <section class="details-review flex align-center">
                <avatar style="background-position: center; background-size:cover;"
                  :src="review.author.imgUrl"
                  :username="review.author.fullName"
                ></avatar>
                <!-- <rate-stars v-model="review.rate" class="review-rate" /> -->
                <span class="review-rate"
                  >{{ review.rate }}<i class="star fas fa-star"></i
                ></span>
                <span class="time mrg5">
                  {{ moment(review.createdAt).startOf("minute").fromNow() }}
                </span>
              </section>
              <section class="content-review flex align-center text-center">
                <span class="name-review mrg5"
                  >{{ review.author.fullName }}:
                </span>
                <span class="txt-review">{{ review.txt }}</span>
              </section>
            </section>
          </section>
        </section>
      </section>
    </main>
  </section>
</template>

<script>
import { orgService } from "../service/org-service.js";
// import { userService } from "../service/user-service.js";
import avatar from "vue-avatar";
// import rateStars from "../cmp/element-ui/rate-stars";
import rateStarsEnable from "../cmp/element-ui/rate-stars-enable";
import eventiList from "../cmp/eventi-list";
import socketService from '../service/socket-service.js'

var moment = require('moment')

export default {
  name: "orgDetails",
  data() {
    return {
      moment,
      org: null,
      reviewToEdit: { author: {}, txt: "", rate: 5 },
      miniLoggedinUser: null,
      textBtn: "Join us!",
      msg: "no Rates",
      //   avgRate: null
      //   startDate: null,
      //   endDate: null
    };
  },
  computed: {
    tagsIcon() {
      return this.$store.getters.tagsIcon;
    },
    orgEventis() {
      const eventis = this.$store.getters.eventisForDisplay.filter((eventi) => {
        if (eventi.byOrg) {
          return eventi.byOrg._id === this.org._id;
        }
      });
      return eventis;
    },
    isUserOrgAdmin() {
      const loggedinUser = this.$store.getters.loggedinUser;
      if (loggedinUser && loggedinUser.isAdmin) return true; // not secured!!
      if (!loggedinUser || !loggedinUser.org || loggedinUser.org._id !== this.org._id) return false;
      else return true;
    }
  },
  methods: {
    avgRates() {
      // if (this.org.reviews.length === 1) {
      //   this.org.rate = this.org.reviews[0].rate;
      // } else {
      var sum = 0;
      this.org.reviews.forEach((review) => {
        sum += review.rate;
      });
      this.org.rate = sum / this.org.reviews.length;
      // }
    },
    addReview() {
      if (!this.$store.getters.loggedinUser) {
        this.$message({
          showClose: true,
          message: `You need login first`,
          type: 'warning',
          duration: 1500
        })
        this.reviewToEdit.txt = ''
        return
      }
      this.reviewToEdit.rate = Number(this.reviewToEdit.rate);
      this.reviewToEdit.createdAt = Date.now();
      this.reviewToEdit._id = orgService.makeId();
      this.reviewToEdit.author = JSON.parse(
        JSON.stringify(this.miniLoggedinUser)
      );
      this.org.reviews.push(this.reviewToEdit);
      this.avgRates();
      console.log(this.org);
      // orgService.save(JSON.parse(JSON.stringify(this.org)));
      this.$store.dispatch({ type: "saveOrg", org: JSON.parse(JSON.stringify(this.org)) });
      this.reviewToEdit = { author: {}, txt: "", rate: 5 };
    },
    async removeOrg() {
      const res = await this.$store.dispatch({ type: "removeOrgById", orgId: this.org._id });
      if (res.type) {
        this.$message({
          showClose: true,
          message: `${this.org.title} removed sucessfully!`,
          type: 'success',
          duration: 1500
        })
      } else {
        this.$message({
          showClose: true,
          message: `${this.org.title} cant removed, err ${res.err}`,
          type: 'warning',
          duration: 1500
        })
      }
      this.$router.go(-1);
    },
    // getAvgRate() {
    //     this.avgRate = [...this.org.reviews].reduce((a, b) => (a.rate + b.rate)) / this.org.reviews.length
    //     console.log(this.avgRate);
    // }
  },
  async created() {
    this.$store.dispatch({ type: "setEventis" });
    const id = this.$route.params.orgId;
    const org = await orgService.getById(id);
    this.org = JSON.parse(JSON.stringify(org)) || {};
    const user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser)) || { _id: '', fullName: 'Goust', imgUrl: '' }
    const { _id, fullName, imgUrl } = user;
    this.miniLoggedinUser = { _id, fullName, imgUrl };
    this.avgRates();
    socketService.on("updatesEventi", () => {
    //   // console.log(eventi);
    //   this.org.events.findIndex()
    //   this.eventi = eventi;
        this.$store.dispatch({ type: "setEventis" });
    });
  },

  components: {
    avatar,
    // rateStars,
    rateStarsEnable,
    eventiList,
  },
};
</script>

<style>
</style>