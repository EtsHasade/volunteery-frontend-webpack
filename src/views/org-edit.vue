<template>
  <section class="edit-page">
    <div
      v-if="!loggedinUser || !loggedinUser.org"
      class="edit-page-title title flex-column center-all"
    >
      <h2>Need volunteers? join us!</h2>
      <h3>It's free, quick and simple</h3>
    </div>
    <div
      v-else
      class="edit-page-title title flex-column center-all"
    >
      <h2>Edit your organization</h2>
      <h3>It's free, quick and simple</h3>
    </div>

    <div class="side-tabs flex">
      <h2 v-if="!loggedinUser" class="title-tab active" to="/login">Login</h2>
      <h2 class="title-tab" :class="loggedinUser ? 'active' : ''">
        {{(loggedinUser && loggedinUser.org)? 'Edit your organization' : 'Add your orgaziation'}}
      </h2>
      <h2 class="title-tab" :class="{'hover-pointer': loggedinUser && loggedinUser.org}" @click="goToCreateEventi">Publish new event and invite volunteers</h2>
    </div>
    <keep-alive>
      <form
        v-if="loggedinUser"
        @submit.prevent="createOrg"
        class="edit-form flex column center"
      >
        <el-input
          onfocus="this.placeholder = ''"
          onblur="this.placeholder = 'orgaziation name'"
          placeholder="orgaziation name"
          v-model="orgCred.name"
          clearable
        ></el-input>
        <el-input
          onfocus="this.placeholder = ''"
          onblur="this.placeholder = 'orgaziation country'"
          placeholder="country"
          v-model="orgCred.country"
          clearable
        ></el-input>
        <el-input
          onblur="this.placeholder = 'tell us about your goals'"
          type="textarea"
          :rows="2"
          placeholder="tell us about your goals"
          onfocus="this.placeholder = ''"
          v-model="orgCred.goals"
        >
        </el-input>
        <el-input
          type="textarea"
          :rows="3"
          onfocus="this.placeholder = ''"
          onblur="this.placeholder = 'tell us about your organization'"
          placeholder="tell us about your organization"
          v-model="orgCred.desc"
        ></el-input>
        <span>Select tags</span>
        <select-multi v-model="orgCred.tags" :items="tags"></select-multi>

        <label class="img-list">
          Pictures:
          <section class="imgs flex center">
            <section
              class="img-edit flex column center mrg5"
              v-for="(imgUrl, idx) in orgCred.imgUrls"
              :key="idx"
            >
              <img class="border-radius mb10" :src="imgUrl" alt="img..." />
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                class="remove-img"
                @click.stop.prevent="removeImg(idx)"
              ></el-button>
            </section>
          </section>
        </label>
        <section class="upload-img flex column center">
          <template v-if="!isLoading">
            <label for="imgUploader">
              <!-- <img
                class="img-uploader"
                src="http://www.pngall.com/wp-content/uploads/2/Upload-PNG-Image-File.png"
                alt=""
              /> -->
              <i class="fas fa-cloud-upload-alt hover-pointer"></i>
            </label>
            <input
              type="file"
              name="img-uploader"
              id="imgUploader"
              @change="onUploadImg"
            />
          </template>
          <img
            class="loader"
            v-else
            src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif"
            alt=""
          />
          <div class="img-list">
            <section class="imgs flex center">
              <img
                class="border-radius mrg5"
                v-for="(imgUrl, idx) in imgUrls"
                :src="imgUrl"
                :key="idx"
                alt="img..."
              />
            </section>
          </div>
        </section>
        <el-button @click="createOrg">{{
          !loggedinUser || !loggedinUser.org ? "Next >" : "Save"
        }}</el-button>
      </form>
      <div v-else class="edit-form flex column center">
        <h3>Volunteer? Activist?</h3>
        <router-link
          class="el-button el-button--primary"
          to="/login"
          >Login or SignUp</router-link
        >
        <h3>
          We are here for you, and just want to help you doing good things
        </h3>
      </div>
    </keep-alive>
  </section>
</template>

<script>
import { orgService } from "../service/org-service.js";
import selectMulti from "../cmp/element-ui/select-multi";
import { uploadImg } from "../service/img-upload-service.js";

export default {
  name: "orgEdit",
  data() {
    return {
      orgCred: orgService.getEmptyOrg(),
      isLoading: false,
      imgUrls: [],
    };
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    tags() {
      return this.$store.getters.tags;
    },
  },
  methods: {
    async onUploadImg(ev) {
      this.isLoading = true;
      const res = await uploadImg(ev);
      this.imgUrls.push(res.url);
      this.isLoading = false;
    },
    removeImg(idx) {
      console.log(idx);
      this.orgCred.imgUrls.splice(idx, 1);
    },
    async createOrg() {
      if (!this.loggedinUser) this.$router.push("/login");
      console.log("create new org");
      if (!this.orgCred.imgUrls) this.orgCred.imgUrls = [];
      this.orgCred.imgUrls.push(...this.imgUrls);
      const user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser));
      this.orgCred.admin = {
        _id: user._id,
        fullName: user.fullName,
        imgUrl: user.imgUrl,
      };
      if (!this.orgCred.imgUrls.length) {
        this.orgCred.imgUrls.push(
          "https://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg"
        );
      }
      const res = await this.$store.dispatch({
        type: "saveOrg",
        org: JSON.parse(JSON.stringify(this.orgCred)),
      });

      user.org = {
        _id: res.org._id,
        name: res.org.name,
        imgUrl: res.org.imgUrls[0],
      };
      await this.$store.dispatch({ type: "updateUser", user });

      if (res.type) {
        this.$message({
          showClose: true,
          message: `${this.orgCred.name} added sucessfully!`,
          type: "success",
          duration: 1500,
        });
      } else {
        this.$message({
          showClose: true,
          message: `${this.orgCred.name} cant added, err ${res.err}`,
          type: "warning",
          duration: 1500,
        });
      }
      this.orgCred = orgService.getEmptyOrg();
      this.goToCreateEventi();
      this.$router.go(-1);
    },
    goToCreateEventi(){
      if (this.loggedinUser || this.loggedinUser.org){
        this.$router.push('/eventi-edit/');
      }
    }
  },
  async created() {
    const id = this.$route.params.orgId;
    if (id) {
      const org = await orgService.getById(id);
      this.orgCred = JSON.parse(JSON.stringify(org));
    }
  },
  components: {
    selectMulti,
  },
};
</script>