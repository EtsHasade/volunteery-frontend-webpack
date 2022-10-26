<template>
  <section class="chat-app">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot>
        <h4>Hi! here you can talk about the event</h4>
      </slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </section>
</template>

<script>
export default {
  name: "chat-app",
  data() {
    return {
      msgs: [],
    };
  },
  methods: {
    closeChat() {
      this.$emit('closeChat')
    },
  },
  mounted() {
    document.body.addEventListener("keyup", (ev) => {
      if (ev.code === "Escape") {
        this.closeChat();
      }
    });
  },
  destroyed() {
    document.body.removeEventListener("keyup", (ev) => {
      if (ev.code === "Escape") {
        this.closeChat();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
h4 {
  margin: 0;
}
</style>
