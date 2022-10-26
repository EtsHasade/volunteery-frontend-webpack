<template>
  <section class="filter-root-tree">
    <ul class="tree-list">
      <select-node-tree v-for="(node, idx) in treeData" :key="idx" class="select-node-tree" :node="node"></select-node-tree>
    </ul>
  </section>
</template>

<script>
import selectNodeTree from "./select-node-tree";

export default {
  name: "advancedFilter",
  data() {
    return {
        treeData: [
            { label: "moshe", options:[
                {label: 'puki', options:[]},
                {label: 'bgy', options:[{label: 'aa', options:[]},{label: 'bb', options:[]},]},
                {label: 'popo', options:[[1,2],[5,6]]},
                {label: 'lory', options:[]},
                {label: 'mony', options:[]},
                {label: 'david', options:[]},
                ] },
             { label: "nadav" , options:[]}
             ]
    };
  },
  components: {
    selectNodeTree,
  },
};
</script>

<style>
</style>