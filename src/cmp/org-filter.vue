<template>
  <section class="eventi-filter">
    <!-- free search -->
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
    <el-select
      v-if="filterBy.byKey.key && allFilds.keyList"
      class="select-input"
      v-model="filterBy.byKey.key"
      :value="allFilds.keyList[0]"
      @input="emitFilter"
      :items="allFilds.keyList"
      placeholder="filter by..."
    />
    <select-multi
      v-if="filterBy.byKey.key && options"
      class="select-input"
      v-model="filterBy.byKey.values"
      :value="['']"
      @input="emitFilter"
      :items="options"
      placeholder="Options"
    />

    <el-button @click="changeFilter(emptyFilter)" class="see-all"
      >Show All</el-button
    >
  </section>
</template>

<script>
import elSelect from "../cmp/element-ui/select";
import selectMulti from "../cmp/element-ui/select-multi";

export default {
  name: "org-filter",
  props: {
    initfilterBy: {
      type: Object,
    },
    tags: {
      type: Array,
      default: function () {
        return this.$store.getters.tags;
      },
    },
    neededs: {
      type: Array,
      default: function () {
        return this.$store.getters.neededs;
      },
    },
  },
  data() {
    return {
      emptyFilter: { byText: "", byKey: { key: "country", values: [] } },
      filterBy: null,
      debounce: null,
    };
  },
  computed: {
    allFilds() {
      const allFilds = this.$store.getters.orgAllFilds;
      return allFilds;
    },
    options() {
      return this.allFilds.options[this.filterBy.byKey.key];
    },
  },
  created() {
    this.filterBy = this.initfilterBy
      ? this.initfilterBy
      : JSON.parse(JSON.stringify(this.emptyFilter));
    if (this.$route.query.term || this.$route.query.values) {
      this.filterBy.byText = this.$route.query.term;
      this.filterBy.byKey.key = this.$route.query.key;
      this.filterBy.byKey.values = this.$route.query.values.split(",");
      this.$emit("doFilter", this.filterToExport());
      // this.filterBy.byKey.values = this.$route.query.tag;
    }
  },
  methods: {
    changeFilter(filterBy) {
      this.filterBy = JSON.parse(JSON.stringify(filterBy));
      this.emitFilter();
      if (this.$router.history.current.name === "Home")
        this.$router.push("/eventi-app/");
    },
    filterToExport() {
      if (!this.filterBy) {
        return JSON.parse(JSON.stringify(this.emptyFilter));
        // return this.filterBy;
      }
      const filter = JSON.parse(JSON.stringify(this.filterBy));

      if (filter.byKey.key === "category") filter.byKey.key = "tags";

      filter.byKey.values.forEach((value, idx) => {
        if (value.includes("including")) filter.byKey.values[idx] = "true";
      });
      filter.byKey.values.forEach((value, idx) => {
        if (value.includes("excluding")) filter.byKey.values[idx] = "false";
      });

      return filter;
    },
    emitFilter() {     
      if (this.debounce) clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.$emit("doFilter", this.filterToExport());
      }, 1000);
    },
  },
  components: {
    elSelect,
    selectMulti,
  },
};
</script>

<style>
</style>