<template>
  <section class="login flex column center text-center small-container">
    <el-button v-if="loggedinUser" @click="logout">Logout</el-button>
    <section v-else>
      <section class="login">
        <h3>Login</h3>
        <form @submit.prevent="login">
          <el-input
            v-model="loginCred.fullName"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = 'Username'"
            placeholder="Username"
            clearable
          ></el-input>
          <el-input
            v-model="loginCred.password"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = 'Password'"
            show-password
            placeholder="Password"
            clearable
          ></el-input>
          <!-- <br><input type="text" class="in username" name="username" v-model="loginCred.fullName" onfocus="this.placeholder = ''" placeholder="Username" /><br>
                      <br><input type="password" class="in password" name="password" v-model="loginCred.password" onfocus="this.placeholder = ''" placeholder="Password" /><br> -->
          <el-button @click="login">Login</el-button>
        </form>
      </section>
      <section class="signup">
        <h3>Sign-up</h3>
        <form @submit.prevent="signup" class="flex column center">
          <el-input
            v-model="signupCred.fullName"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = 'Username'"
            placeholder="Username"
            clearable
          ></el-input>
          <el-input
            v-model="signupCred.password"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = 'Password'"
            show-password
            placeholder="Password"
            clearable
          ></el-input>
          <el-input
            v-model="signupCred.email"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = 'baba@gmail.com'"
            placeholder="baba@gmail.com"
            clearable
          ></el-input>
          <el-input
            v-model="signupCred.tel"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = '012-345-6789'"
            placeholder="012-345-6789"
            clearable
          ></el-input>
          <span>Select skills</span>
          <select-multi
            v-model="signupCred.skills"
            :items="neededs"
          ></select-multi>
          <span>Select favorites</span>
          <select-multi v-model="signupCred.favs" :items="tags"></select-multi>
          <!-- <gender-selector class="in"></gender-selector> -->

          <label class="img-list">
            Picture:
            <section v-if="signupCred.imgUrl" class="img flex center">
                <img class="border-radius mb10" :src="signupCred.imgUrl" alt="img...">
                <el-button type="danger" icon="el-icon-delete" circle class="remove-img" @click.stop.prevent="removeImg()"></el-button> 
            </section>
          </label>

          <section class="upload-img flex column center">
            <template v-if="!isLoading">
              <label for="imgUploader"> 
                <!-- <img class="img-uploader" src="http://www.pngall.com/wp-content/uploads/2/Upload-PNG-Image-File.png" alt="">  -->
                <i class="fas fa-cloud-upload-alt hover-pointer"></i>
              </label>
              <input type="file" name="img-uploader" id="imgUploader" @change="onUploadImg">  
            </template>
            <img class="loader" v-else src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif" alt="">
            <div v-if="imgUrl" class="img-list">
              <section class="imgs flex center">
                <img class="border-radius mrg5 " :src="imgUrl" alt="img...">
              </section>
            </div>
          </section>
          <el-button @click="signup">Sign</el-button>
        </form>
      </section>
    </section>
  </section>
</template>

<script>
import selectMulti from '@/cmp/element-ui/select-multi';
// import genderSelector from '@/cmp/element-ui/gender-selector';
import { uploadImg } from '../service/img-upload-service.js'

// import { userService } from '../service/user-service.js';
export default {
  name: 'Login',
  data() {
    return {
      // loggedinUser: this.$store.getters.loggedinUser,
      loginCred: {},
      signupCred: {events: [], imgUrl: null, org: null},
      msg: '',
      isLoading: false,
      imgUrl: null
      // tags: this.$store.getters.tags,
      // neededs: this.$store.getters.neededs
    }
  },
  components: {
    selectMulti,
    // genderSelector,
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
    tags() {
      return this.$store.getters.tags
    },
    neededs() {
      return this.$store.getters.neededs
    }
  },
  methods: {
    async onUploadImg(ev) {
      this.isLoading = true;
      const res = await uploadImg(ev);
      this.imgUrl= res.url
      this.isLoading = false;
    },
    removeImg() {
      this.signupCred.imgUrl = null
    },

    async login() {
      if (this.loginCred.fullName && this.loginCred.password) {
        console.table('this.loginCred', this.loginCred);
        try {
          await this.$store.dispatch({ type: 'login', userCred: this.loginCred })
          this.$message({
            showClose: true,
            message: `${this.loginCred.fullName} loginned sucessfully!`,
            type: 'success',
            duration: 1500
          })
          this.loginCred = {};
        } catch (err) {
          this.$message({
            showClose: true,
            message: `Your user/password wrong, please try again.`,
            type: 'warning',
            duration: 1500
          })
        }
      } else {
        this.$message({
          showClose: true,
          message: `Username/Password must be present`,
          type: 'warning',
          duration: 1500
        })
        console.table('this.loginCred', this.loginCred);
      }

      this.$router.go(-1);
    },
    signup() {
      this.signupCred.imgUrl = this.imgUrl;
      if (this.signupCred.fullName && this.signupCred.password && this.signupCred.email) {
        this.$store.dispatch({ type: 'signup', userCred: this.signupCred });
        this.signupCred = {};
        this.$message({
          showClose: true,
          message: `${this.signupCred.fullName} signup sucessfully!`,
          type: 'success',
          duration: 1500
        })
      } else {
        console.table('this.signupCred', this.signupCred);
        this.$message({
          showClose: true,
          message: `Some input is incorrect`,
          type: 'warning',
          duration: 1500
        })
      }
      this.$router.go(-1);
    },
    logout() {
     this.$store.dispatch({ type: 'logout' })
        this.$message({
          showClose: true,
          message: `${this.loggedinUser.fullName} logout sucessfully!`,
          type: 'success',
          duration: 1500
        })
    },
  }
}
</script>

<style scoped>
.login .singup {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 20px;
  padding: 20px;
}
/* h2 {
  margin-top: 10px;
  padding: 5px;
  border: solid 2px black;
  background-color: #69bd42;
  width: 300px;
} */
</style>