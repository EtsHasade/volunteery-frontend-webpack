<template>
    <div class="edit-page-title title flex-column center-all">
      <h2>Need volunteers? join us!</h2>
      <h3>It's free, quick And simple</h3>
    </div>
</template>
 
<script>
export default {
  name: "orgApp",
  computed: {
    orgsToShow() {
      return this.$store.getters.orgsForDisplay;
    },
  },
  async created() {
    const resEventis = await this.$store.dispatch({ type: "setEventis" });
    // if(!resEventis.type) {
    //   this.$message({
    //     showClose: true,
    //     message: `Events cant set, err ${resEventis.err.code}`,
    //     type: 'warning',
    //     duration: 3000
    //   })
    // }
    const resOrgs = await this.$store.dispatch({ type: "setOrgs" });
    // if (resOrgs.type) {
    //   this.$message({
    //     showClose: true,
    //     message: `Organizations set sucessfully!`,
    //     type: 'success',
    //     duration: 3000
    //   })
    // } else {
    //   this.$message({
    //     showClose: true,
    //     message: `Organizations cant set, err ${resOrgs.err.code}`,
    //     type: 'warning',
    //     duration: 3000
    //   })
    // }
  },
  components: {
  
  },
};
</script>

<style>
</style>