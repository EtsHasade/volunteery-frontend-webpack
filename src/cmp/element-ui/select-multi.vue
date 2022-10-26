<template>
  <el-select
    v-model="value"
    multiple
    collapse-tags
    onfocus="this.placeholder = ''"
    :onblur="`this.placeholder = '${placeholder}'`"
    :placeholder="placeholder"
    style="text-align: center;"
    ref="select"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>

  <!-- <el-select
    v-model="value"
    multiple
    collapse-tags
    style="margin-left: 20px"
    placeholder="Select"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select> -->
</template>

<script>
export default {
  props: {
    items: Array,
    placeholder: {
      type: String,
      default: "Select",
    },
  },
  data() {
    return {
      // options: [],
      value: [],
    };
  },
  computed:{
    options() {
      return this.items.map((item) => {
        return { value: item, label: item };
      });
    },
  },
  created() {
    // this.options = this.items.map((item) => {
    //   return { value: item, label: item };
    // });
  },
  watch: {
    value: function (newValue) {
      this.$emit("input", newValue);
      this.$refs.select.blur()
    },
  },
};
</script>