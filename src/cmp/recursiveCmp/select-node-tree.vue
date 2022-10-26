<template>
  <li class="filter-root-tree">
    <div class="flex">
      <h2 class="node-label hover-pointer" @click="setValue">
        {{ label }}
      </h2>
      <h2
        class="open-options hover-pointer"
        v-if="options && options.length"
        @click="isOpen = !isOpen"
      >
        ▼
      </h2>
      <h3>{{nodeValue}}</h3>
    </div>
    <ul
      class="tree-list"
      v-show="isOpen"
      v-if="options && options.length"
    >
      <node-tree
        v-for="(option, idx) in options"
        :key="idx"
        :idx="idx"
        :node="option"
        class="node-tree"
        :style="`background-color: #fd${idx}`"
        @setValue="getValue"
      ></node-tree>
    </ul>
  </li>
</template>

<script>
export default {
  name: "nodeTree",
  props: ['node', 'idx'],
  data() {
    return {
      isOpen: false,
      nodeValue: null,
    };
  },
  computed:{
    label(){
      if (typeof this.node !== 'object' ) return this.node;
      else if (Array.isArray(this.node)) return this.idx;
      else if (typeof this.node === 'object') return this.node.label;
      else return null
    },
    options(){
      if (typeof this.node !== 'object' ) return null;
      else if (Array.isArray(this.node)) return this.node.map((value, idx) => {
        const option = {};
        option.label = idx;
        option.options = [value];
        return option;
      });
      else if (typeof this.node === 'object') return this.node.options;
      else return null
    }
  },
  methods: {
    setValue() {
      let value = '';
      if (this.node.label) value = this.node.label;
      else value = this.idx;
      this.$emit("setValue", value);
    },
    getValue(value) {
      this.nodeValue = {};
      this.nodeValue[this.node.label] = value;
    },
  },
};
</script>

<style lang="scss">
</style>>

