<template>
  <div>
    <el-radio-group v-model="radio3" size="small">
      <el-radio-button label="Male"></el-radio-button>
      <el-radio-button label="Female"></el-radio-button>
      <el-radio-button label="Other"></el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
export default {
      data () {
      return {
        radio3: '',
      };
    }
}
</script>