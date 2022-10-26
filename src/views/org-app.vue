<template>
  <main>
    <org-filter @doFilter="setFilter"></org-filter>
    <org-list :orgs="orgsToShow"></org-list>
  </main>
</template>
 
<script>
import orgFilter from "@/cmp/org-filter";
import orgList from "@/cmp/org-list";

export default {
  name: "orgApp",
  data() {
    return {
      filterBy: null,
    };
  },
  computed: {
    // orgsToShow() {
    //   return this.$store.getters.orgsForDisplay;
    // },
    orgsToShow() {
      const orgs = this.$store.getters.orgsForDisplay;

      if (!this.filterBy) return orgs;
      let orgsFilter = orgs;
      if (this.filterBy.byText != "") {
        const txt = this.filterBy.byText.toLowerCase();

        orgsFilter = orgs.filter((org) => {
          return (
            org.name?.toLowerCase().includes(txt) ||
            org.desc?.toLowerCase().includes(txt)
          );
        });

        const terms = txt.split(" ");
        const splitTermOrgs = orgs.filter((currOrg) => {
          const match = terms.filter((term) => {
            return (
              currOrg.name?.toLowerCase().includes(term) ||
              currOrg.desc?.toLowerCase().includes(term)
            );
          });
          return match.length === terms.length;
        });

        orgsFilter = orgsFilter.concat(splitTermOrgs);
        orgsFilter = orgsFilter.reduce((acc, currOrg) => {
          if (!acc.includes(currOrg)) acc.push(currOrg);
          return acc;
        }, []);
        orgsFilter = JSON.parse(JSON.stringify(orgsFilter));
      }

      // if (this.filterBy?.byTags?.length) {
      //   console.log("by tags");

      //   var orgsfilterTags = [];
      //   this.filterBy.byTags.forEach((tag) => {
      //     var orgsfilterTag = [];
      //     orgsFilter.forEach((org) => {
      //       if (org.tags.includes(tag)) {
      //         orgsfilterTag.push(org);
      //       }
      //     });
      //     orgsfilterTags = orgsfilterTags.concat(orgsfilterTag);
      //   });
      //   orgsFilter = JSON.parse(JSON.stringify(orgsfilterTags));
      // }

      if (
        this.filterBy.byKey?.values.length &&
        !this.filterBy.byKey?.values.includes("") &&
        !this.filterBy.byKey?.values.includes("all")
      ) {
        const orgsfilterKeys = orgsFilter.filter((org) => {
          if (org[this.filterBy.byKey.key]) {
            const orgValues = org[this.filterBy.byKey.key];
            return this.filterBy.byKey.values.filter((value) => {
              return orgValues.includes(value);
            }).length;
          }
        });

        orgsFilter = JSON.parse(JSON.stringify(orgsfilterKeys));
      }

      return orgsFilter;
    },
  },
  async created() {
    this.$store.dispatch({ type: "setOrgs" });
    this.$store.dispatch({ type: "setOrgs" });
  },
  methods: {
    setFilter(filterBy) {
      console.log("filter", filterBy);

      this.filterBy = filterBy;
    },
  },
  components: {
    orgFilter,
    orgList,
  },
};
</script>

<style>
</style>