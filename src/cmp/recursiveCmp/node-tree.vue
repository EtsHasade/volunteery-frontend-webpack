<template>
  <li class="filter-root-tree">
      <h2 class="name">{{ node.name }}</h2>
      <ul class="tree-list" v-if="node.children && node.children.length">
        <h3>children:</h3>
        <node-tree
          v-for="(child, idx) in node.children"
          :key="idx"
          :node="child"
          class="node-tree"
        ></node-tree>
      </ul>
  </li>
</template>

<script>
export default {
  name: "nodeTree",
  props: {
    node: {
      type: Object,
    },
  },
};
</script>

<style>
</style>