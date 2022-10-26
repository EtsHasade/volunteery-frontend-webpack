<template>
  <el-select v-model="value">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :placeholder="placeholder"
      onfocus="this.placeholder = ''"
      :onblur="`this.placeholder = '${placeholder}'`"
    >
    </el-option>
  </el-select>
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
      value: "",
    };
  },
  computed: {
    options() {
      return this.items.map((item) => {
        return { value: item, label: item };
      });
    },
  },
  created() {
    console.log("el-select this.items", this.items);
  },
  watch: {
    value: function (newValue) {
      this.$emit("input", newValue);
    },
  },
};
</script>