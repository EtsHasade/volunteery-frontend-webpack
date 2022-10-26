<template>
<section>
  <ul v-if="eventis" class="eventi-list clean-list card-list">
    <eventi-preview v-for="(eventi, idx) in eventis" :key="idx"  :eventi="eventi"/>
    <li></li>
    <li></li>
  </ul> 
  <div v-else>LOADING...</div>
</section>
</template>

<script>
import eventiPreview from './eventi-preview';

export default {
  name: 'eventi-list',
  props:{
    eventis: Array
  },
  components:{
    eventiPreview
  }

}
</script>

<style>

</style>