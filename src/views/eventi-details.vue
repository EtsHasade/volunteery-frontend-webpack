<template>
  <section v-if="eventi" class="eventi-details">
    <section class="main-details">
      <section class="top-page flex center space-between">
        <div class="top-details">
          <h2 class="mb10">{{ eventi.title }}</h2>
          <section class="flex align-center">
            <section class="rate-section">
              <span v-if="eventi.reviews.length">
                <i class="star fas fa-star"></i>
                {{ eventi.rate }} ({{ eventi.reviews.length }})
              </span>
              <span v-else><i class="star fas fa-star"></i>New</span>
            </section>
            <span
              > {{ eventi.location.address }}, {{ eventi.location.country }}</span
            >
          </section>
        </div>
        <div v-if="isUserOrgAdmin" class="edit-btns flex">
          <el-button class="delete-btn" type="warning" @click="removeEventi"
            >Delete Event</el-button
          >
          <router-link
            type="success"
            class="el-button el-button--success"
            :to="'/eventi-edit/' + eventi._id"
            >Edit</router-link
          >
        </div>
      </section>
      <section class="eventi-imgs">
        <img
          class="eventi-img"
          v-for="(img, idx) in eventi.imgUrls"
          :key="idx"
          :src="img"
        />
      </section>
    </section>
    <section class="mini-org flex align-center" @click="openOrgDetails">
      <avatar
        class="mr16 hover-pointer"
        :src="eventi.byOrg.imgUrl"
        :username="eventi.byOrg.name"
      />
      <span>{{ eventi.byOrg.name }}</span>
    </section>
    <main class="flex justify-center">
      <section class="details flex column">
        <section class="details-ev">
          <hr />
          <section class="tags flex wrap align-center">
            <span class="bold mr16">Categories</span>
            <span
              class="tag text-center mrg5 mb10"
              v-for="(tag, idx) in eventi.tags"
              :key="idx"
              ><i :class="tagsIcon[tag]"></i> {{ tag }}
            </span>
          </section>
          <hr />
          <section class="tags-section align-center">
            <section class="">
              <section>
              <span><i class="fas fa-users"></i> {{ eventi.members.length }} /{{ eventi.capacity }} members</span>
              </section>

              <section class="dates flex">
                <span><i class="fas fa-calendar-alt"></i>
                  {{ moment(eventi.startAt).format("DD/MM/YYYY") }} -
                  {{ moment(eventi.endAt).format("DD/MM/YYYY") }}</span>
             </section>
            </section>
            <!-- <hr /> -->
            <section class="neededs">
              <span class="bold need-txt">We need for this volunteering</span>
              <section class="needed-content flex wrap">
                <!-- flex wrap column -->
                <span
                  class="needed text-center mrg5"
                  v-for="(needed, idx) in eventi.neededs"
                  :key="idx"
                >
                  <i :class="neededsIcon[needed]"></i> {{ needed }}
                </span>
              </section>
            </section>
          </section>
          <section class="accomodations">
                <span class="bold mr16">Accomodations</span>
            <section class="aco-content flex wrap">
                <!-- class="tag text-center mrg5 mb10" -->
                
              <span
                class="tag text-center mrg5"
                v-for="(tag, idx) in eventi.accommodation"
                :key="idx"
                ><i :class="accommodationIcon[tag]"></i> {{ tag }}
              </span>
            </section>
          </section>
          <hr />

        </section>
        <section class="desc-ev">
          <span>{{ eventi.desc }}</span>
        </section>
      </section>
      <section class="status-details text-center flex column center">
        <div class="join-section flex column align-center">
          <p>We need speicals volunteer, if you are please join us!</p>
          <el-button
            v-if="!isMember"
            type="success"
            class="join-btn"
            @click="updateMember"
            >Join us</el-button
          >
          <el-button
            v-else
            type="warning"
            class="join-btn"
            @click="updateMember"
            >Leave event</el-button
          >
        </div>
        <section class="share-button flex center">
          <section>
            <a
              href="https://api.whatsapp.com/send?text=https://world-volunteery.herokuapp.com/#/eventi-details/5fc3c2f8b939f9e519ca279a"
              target="_blank"
              ><i class="fab fa-whatsapp"></i
            ></a>
          </section>
          <iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fwww.facebook.com%2FHeroesforLifeIsrael&layout=button&size=large&width=77&height=28&appId" width="77" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
          <div class="fb-share-button" data-href="https://www.facebook.com/HeroesforLifeIsrael" data-layout="button" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.facebook.com%2FHeroesforLifeIsrael&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore"></a></div>         
        </section>
        <section class="section-status-details">
          <section class="members flex column text-center align-center">
            <h3 class="title-members">Members</h3>
            <section class="members-imgs flex center wrap">
              <avatar
                style="background-position: center; background-size: cover"
                class="member-img mrg5"
                v-for="member in eventi.members"
                :key="member._id"
                :username="member.fullName"
                :src="member.imgUrl"
                :title="member.fullName"
              />
            </section>
          </section>
          <chat-app class="chat-app">
            <h3 class="title-chat" slot="header">Members Chat</h3>
            <section v-for="(msg, idx) in msgs" class="mainChat" :key="idx">
              <span class="msg">{{ msg.from }}: {{ msg.txt }}</span>
            </section>
            <div slot="footer">
              <form @submit.prevent="sendMsg" class="flex">
                <el-input placeholder="Send Massage" v-model="msgChat.txt" />
                <i class="far fa-paper-plane fa-2x hover-pointer" @click="sendMsg"></i>
              </form>
            </div>
          </chat-app>
        </section>
      </section>
    </main>
    <section class="reviews-section flex column center">
      <section class="add-review flex align-center text-center mb10">
        <el-input type="text" placeholder="Enter your review" v-model="reviewToEdit.txt" name="review" />
        <section class="review-edit flex align-center">
          <el-button type="success" @click="addReview">Add review</el-button>
          <rate-stars-enable v-model="reviewToEdit.rate" />
        </section>
      </section>
      <span class="text-center mrg5">Reviews</span>
      <section class="reviews flex wrap align-center">
        <section
          class="review flex column mrg5"
          v-for="review in eventi.reviews"
          :key="review._id"
        >
          <section class="details-review flex align-center">
            <avatar
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
          <section class="content-review flex text-center">
            <span class="name-review mrg5">{{ review.author.fullName }}: </span>
            <span class="txt-review">{{ review.txt }}</span>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import chatApp from "../cmp/chat-app";
import socketService from "../service/socket-service.js";
import { eventiService } from "../service/eventi-service.js";
// import { userService } from '../service/user-service.js';
import avatar from "vue-avatar";
// import rateStars from '../cmp/element-ui/rate-stars';
import rateStarsEnable from "../cmp/element-ui/rate-stars-enable";
var moment = require("moment");
export default {
  name: "eventi-details",
  data() {
    return {
      moment,
      eventi: null,
      reviewToEdit: { author: {}, txt: "", rate: 5 },
      miniLoggedinUser: null,
      miniEventi: null,
      textBtn: "Join us!",
      msg: "no Rates",
      msgChat: { from: "", txt: "" },
      msgs: [],
      topic: "love",
      // showChat: false,
      debounce: null,
    };
  },
  computed: {
    tagsIcon() {
      return this.$store.getters.tagsIcon;
    },
    neededsIcon() {
      return this.$store.getters.neededsIcon;
    },
    accommodationIcon(){
      return this.$store.getters.accommodationIcon;
    },
    isUserOrgAdmin() {
      const loggedinUser = this.$store.getters.loggedinUser;
      if (loggedinUser && loggedinUser.isAdmin) return true; // not secured!!
      if (
        !loggedinUser ||
        !loggedinUser.org ||
        loggedinUser.org._id !== this.eventi.byOrg._id
      )
        return false;
      else return true;
    },
    isMember() {
      const idx = this.eventi.members.findIndex((member) => {
        return member._id === this.miniLoggedinUser._id;
      });
      if (idx != -1) {
        return true
      }
      return false
    }
  },
  methods: {
    avgRates() {
      if (this.eventi.reviews.length === 1) {
        this.eventi.rate = this.eventi.reviews[0].rate;
      }
      var sum = 0;
      this.eventi.reviews.forEach((review) => {
        sum += review.rate;
      });
      this.eventi.rate = (sum / this.eventi.reviews.length).toFixed(2);

      // return sum / this.eventi.reviews.length
    },
    removeMember(member = this.miniLoggedinUser) {
      console.log('member', member);
      const idx = this.eventi.members.findIndex((miniMember) => {
        return miniMember._id === member._id;
      });
      this.eventi.members.splice(idx, 1);
      const idxEvent = this.$store.getters.loggedinUser.events.findIndex(
        (event) => {
          return event._id === this.eventi._id;
        })
      const user = this.$store.getters.loggedinUser;
      user.events.splice(idxEvent, 1);
      this.$store.dispatch({
        type: "updateUser",
        user: JSON.parse(JSON.stringify(user)),
      });
      this.$store.dispatch({
        type: "saveEventi",
        eventi: JSON.parse(JSON.stringify(this.eventi)),
      });
    },
    updateMember() {
      if(!this.$store.getters.loggedinUser) {
        this.$message({
            showClose: true,
            message: `You need login first`,
            type: "warning",
            duration: 1500,
          });
        return
      }
      socketService.emit('changeMember', this.miniLoggedinUser);
    },
    async changesMember(member) {
      console.log(member);
      const idx = this.eventi.members.findIndex((miniMember) => {
        return miniMember._id === member._id;
      });
      if (idx != -1) {
      this.eventi.members.splice(idx, 1);
      const idxEvent = this.$store.getters.loggedinUser.events.findIndex(
        (event) => {
          return event._id === this.eventi._id;
        })
      const user = this.$store.getters.loggedinUser;
      user.events.splice(idxEvent, 1);
      this.$store.dispatch({
        type: "updateUser",
        user: JSON.parse(JSON.stringify(user)),
      });
      this.$store.dispatch({
        type: "saveEventi",
        eventi: JSON.parse(JSON.stringify(this.eventi)),
      });
      } else {
        console.log('member', member);
        const user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser));
        this.eventi.members.push(member);
        this.$store.dispatch({
          type: "saveEventi",
          eventi: JSON.parse(JSON.stringify(this.eventi)),
        });
        user.events.push(JSON.parse(JSON.stringify(this.miniEventi)));
        const res = await this.$store.dispatch({
          type: "updateUser",
          user,
        });
        if (res.type) {
          this.$message({
            showClose: true,
            message: `member just joined!`,
            type: "success",
            duration: 1500,
          });
        }
        this.textBtn = "leave event";
      }
      if (!this.eventi.notifications) {
        this.eventi.notifications = 0;
      }
      this.eventi.notifications = this.eventi.notifications + 1;
      this.$store.dispatch({ type: "saveEventi", eventi: this.eventi })
      socketService.emit('updateEventi', this.eventi);

    },
    async addReview() {
      if(!this.$store.getters.loggedinUser) {
        this.$message({
            showClose: true,
            message: `You need login first`,
            type: "warning",
            duration: 1500,
          });
        this.reviewToEdit.txt = ''
        return
      }
      this.reviewToEdit.rate = Number(this.reviewToEdit.rate);
      this.reviewToEdit.createdAt = Date.now();
      this.reviewToEdit._id = eventiService.makeId();
      this.reviewToEdit.author = JSON.parse(JSON.stringify(this.miniLoggedinUser));
      this.eventi.reviews.push(this.reviewToEdit);
      if (!this.eventi.notifications) {
        this.eventi.notifications = 0;
      }
      this.eventi.notifications = this.eventi.notifications + 1;
      this.avgRates();
      this.$store.dispatch({
        type: "saveEventi",
        eventi: this.eventi,
      });
      console.log(this.eventi);
      socketService.emit('updateEventi', this.eventi);
      this.$message({
        showClose: true,
        message: `Your review added sucessfully!`,
        type: "success",
        duration: 1500,
      });
      this.reviewToEdit = { author: {}, txt: "", rate: 5 };
    },
    async removeEventi() {
      const res = await this.$store.dispatch({
        type: "removeEventiById",
        eventiId: this.eventi._id,
      });
      if (res.type) {
        this.$message({
          showClose: true,
          message: `${this.eventi.title} removed sucessfully!`,
          type: "success",
          duration: 1500,
        });
      } else {
        this.$message({
          showClose: true,
          message: `${this.eventi.title} cant remove, err ${res.err.code}`,
          type: "warning",
          duration: 1500,
        });
      }
      this.$router.go(-1);
    },
    addMsg(msgChat) {
      this.msgs.push(msgChat);
    },
    sendMsg() {
      if (!this.$store.getters.loggedinUser) {
        this.$message({
            showClose: true,
            message: `You need login first`,
            type: "warning",
            duration: 1500,
          });
        this.msgChat.txt = ''
        return;
      }
      this.msgChat.from = this.$store.getters.loggedinUser.fullName;
      console.log("Sending", this.msgChat);
      socketService.emit("chat newMsg", this.msgChat);
      this.msgChat = {
        from: this.$store.getters.loggedinUser.fullName,
        txt: "",
      };
    },
    openOrgDetails() {
      this.$router.push(`/org-details/${this.eventi.byOrg._id}`);
    },
  },
  async created() {
    const id = this.$route.params.eventiId;
    const eventi = await eventiService.getById(id);
    this.eventi = JSON.parse(JSON.stringify(eventi));
    this.miniEventi = {
      _id: eventi._id,
      title: eventi.title,
      imgUrl: eventi.imgUrls[0],
    };
    const user = JSON.parse(
      JSON.stringify(this.$store.getters.loggedinUser)
    ) || { fullName: "Goust" };
    const { _id, fullName, imgUrl } = user;
    this.miniLoggedinUser = { _id, fullName, imgUrl };
    this.avgRates();
    if (this.eventi.members.find((member) => member._id === this.miniLoggedinUser._id)) {
      this.textBtn = "leave event";
    }
    this.topic = this.eventi._id;
    socketService.emit("chat topic", this.topic);
    socketService.on("chat addMsg", this.addMsg);
    socketService.on("changesMember", this.changesMember);
    socketService.on("updatesEventi", (eventi) => {
      this.eventi = eventi;
    });
    if(this.$store.getters.loggedinUser && this.$store.getters.loggedinUser.org && this.$store.getters.loggedinUser.org._id === this.eventi.byOrg._id) {
        this.eventi.notifications = 0
        this.$store.dispatch({ type: "saveEventi", eventi: this.eventi })
        socketService.emit('updateEventi', this.eventi);
        console.log('admin 0 notification',this.eventi);
    }

  },
  destroyed() {
    this.msgs = [];
    this.msgChat = "";
    socketService.off("chat addMsg", this.addMsg);
    socketService.off("changesMember", this.changesMember);
    // socketService.terminate();
  },
  components: {
    avatar,
    // rateStars,
    rateStarsEnable,
    chatApp,
  },
};
</script>

<style>
</style>