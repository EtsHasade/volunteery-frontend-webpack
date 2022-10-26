<template>
    <div class="img-squer-container">
      <img @click="moveImg"
        v-show="imgLoad"
        @load="imgLoad = true"
        :src="eventi.imgUrls[0]"
        alt=""
      />
</template>

<script>
export default {
    name:"Imgscroll",
    props: {
        eventi:Object
    },
    data(){},
    computed: {},
    methods: {
        moveImg(){
            

        }
    }



}
</script>

<style>

</style>