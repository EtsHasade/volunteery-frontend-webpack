<template>
<section>
  <ul v-if="orgs" class="org-list clean-list card-list">
    <org-preview v-for="(org, idx) in orgs" :key="idx"  :org="org"/>
    <li></li>
    <li></li>
  </ul> 
  <div v-else>LOADING...</div>
</section>
</template>

<script>
import orgPreview from './org-preview';

export default {
  name: 'orgList',
  props:{
    orgs: Array
  },
  components:{
    orgPreview
  }

}
</script>

<style>

</style>