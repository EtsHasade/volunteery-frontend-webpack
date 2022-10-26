<template>
  <section class="filter-root-tree">
    <ul class="tree-list">
      <node-tree v-for="(node, idx) in treeData" :key="idx" class="node-tree" :node="node"></node-tree>
    </ul>
  </section>
</template>

<script>
import nodeTree from "./node-tree";

export default {
  name: "advancedFilter",
  data() {
    return {
        treeData: [
            { name: "moshe", children:[
                {name: 'puki', children:[]}
                ] },
             { name: "nadav" , children:[]}
             ]
    };
  },
  components: {
    nodeTree,
  },
};
</script>

<style>
</style>