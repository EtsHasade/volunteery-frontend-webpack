<template>
  <div class="rate-stars">
    <el-rate
      v-model="value"  
      disabled
      text-color="#ff9900"

    >
    </el-rate>
  </div>
</template>
<script>
      // show-score
// disabled
      // score-template="{value}"
export default {
  props:{
    value: Number,
  },
  watch:{
    value: function(newValue){
      this.$emit('input', newValue)     
    }
  }
};
</script>