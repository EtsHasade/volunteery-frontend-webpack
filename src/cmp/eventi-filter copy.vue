
<template>
  <section class="eventi-filter">
    <form class="search-container flex wrap" @click.prevent="emitFilter">
      <el-input
        ref="searchFild"
        onfocus="this.placeholder = ''"
        onblur="this.placeholder = 'Free Search'"
        placeholder="Free Search"
        suffix-icon="el-icon-search"
        v-model="filterBy.byText"
        @input="emitFilter"
      />
    </form>
    <el-button
      v-for="tag in showtags"
      :key="tag"
      @click="changeFilter({ byText: '', byTags: [tag], byKey: [], byNeededs: [] })"
      :class="{ active: filterBy.byTags.includes(tag) }"
      ><i class="small-icon" :class="$store.getters.tagsIcon[tag]"></i
      >{{ tag }}</el-button
    >
    <select-multi
      class="select-input"
      v-model="filterBy.byTags"
      @input="emitFilter"
      :items="tags"
      placeholder="More categories..."
    />

    <el-button @click="changeFilter" class="see-all"
      >See All</el-button
    >
    <!-- <div class="advanced-filter flex" v-if="$store.getters.eventisForDisplay && allFildsKeys"> -->
      <select-multi
        class="select-input"
        v-model="filterBy.byNeededs"
        @input="emitFilter"
        :items="neededs"
        placeholder="They neededs"
      />
      <!-- <select-multi v-if="allFilds.keyList[0] && "
        class="select-input"
        v-model="filterBy.byKey"
        @input="emitFilter"
        :items="allFilds.KeyList"
        placeholder="All filds"
      /> -->

      <!-- {{allFildsKeys}} -->
      
      <!-- <select-multi v-for="(keyWord, idx) in filterBy.byKey"
      :key="idx"
      class="select-input"
      v-model="filterBy.byKey[keyWord]"
      @input="emitFilter"
      :items="allFilds[keyWord]"
      :placeholder="keyWord"
      /> -->
    <!-- </div> -->
    <!-- <advanced-filter></advanced-filter> -->
  </section>
</template>

<script>
// import advancedFilter from './recursiveCmp/advanced-filter';

import selectMulti from "../cmp/element-ui/select-multi";
export default {
  name: "eventi-filter",
  props: {
    initfilterBy: {
      type: Object,
      default: function () {
        return { byText: "", byTags: [], byKey: [], byNeededs: []};
      },
    },
    tags: {
      type: Array,
      default: function () {
        return this.$store.getters.tags;
      }
    },
    neededs: {
      type: Array,
      default: function () {
        return this.$store.getters.neededs;
      }
    },
    countries: {
      type: Array,
      default: function () {
        return this.$store.getters.countries;
      }
    },
    categorysNum: {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {
      filterBy: { byText: "", byTags: [], byKey: [], byNeededs: [] },
      debounce: null,
    };
  },
  computed: {
    showtags() {
      return this.tags.filter((tag, idx) => idx < this.categorysNum);
    },
    // allFildsKeys(){
    //   const allFilds = JSON.parse(JSON.stringify(this.$store.getters.allFilds)) ;
    //   return allFilds.keyList
    // },
    allFilds(){
      const allFilds = this.$store.getters.allFilds;
      return allFilds
    }
  },
  created() {
    this.filterBy = this.initfilterBy || { byText: "", byTags: [], byKey: [], byNeededs: [] };
    if (this.$route.query.term || this.$route.query.tag) {
      this.filterBy.byText = this.$route.query.term;
      this.filterBy.byTags = this.$route.query.tag.split(",");
    }
    
  },
  methods: {
    changeFilter(filterBy) {
      this.filterBy = JSON.parse(JSON.stringify(filterBy));
      this.emitFilter();
    },
    emitFilter() {
      if (this.debounce) clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.$emit("doFilter", JSON.parse(JSON.stringify(this.filterBy)));
      }, 1000);
    },
  },
  components: {
    selectMulti
    // advancedFilter
  }
}
</script>

<style>
</style>