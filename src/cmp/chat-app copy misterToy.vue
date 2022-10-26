<template>
  <div class="chat-app">
    <h2>System bot</h2>
    <form  @submit.prevent="sendMsg">
      <h5>{{loggedinUser._id}}</h5>
      <div ref="mainModal" class="main-modal">
      <h6 class="msg-line" v-for="(msg, idx) in msgs" :key="idx">{{msg.from}}: {{msg.txt}}</h6>
      </div>
      <input type="text" v-model="myMsg.txt" />
      <button>Send</button>
    </form>
  </div>
</template>

<script>
import {socketService} from '@/services/socket-service.js';


export default {
  data() {
    return {
      myMsg: {from: 'me', txt: ''},
      msgs: [],
      topic : null

    }
  },
  computed:{
    loggedinUser(){
      return this.$store.getters.loggedinUser || {userName: 'Guest', _id: 'guest' + parseInt(Math.random() * 100000000) }
    }
  },
  created() {
    socketService.setup();
    this.topic = {subject:'system', to: this.loggedinUser._id}
    socketService.emit('chat topic', this.topic)
    socketService.on('chat addMsg', this.addMsg)
    this.myMsg.from = this.loggedinUser.userName;

  },
  destroyed() {
    socketService.off('chat addMsg', this.addMsg)
    socketService.terminate();
  },
  methods: {
    addMsg(msg) {
      this.msgs.push(msg);
      setTimeout(() => {
        const mainModal = this.$refs.mainModal;
        mainModal.scrollTop = mainModal.scrollHeight;
        }, 0);
    },
    sendMsg() {
      console.log('Sending', this.myMsg);
      socketService.emit('chat newMsg', this.myMsg)
      this.myMsg = {from: this.loggedinUser.userName, txt: ''};
    },
    changeTopic() {
      socketService.emit('chat topic', this.topic)
    }
  },
  watch: {
    topic() {
      // console.log('Topic Changed', this.topic);
    },
    'msg.txt'() {
      // console.log('MSG CHANGED');
    },
    msgs: {
      handler() {
        // console.log('New msg arrival!');
      }
    }
  }
}
</script>
