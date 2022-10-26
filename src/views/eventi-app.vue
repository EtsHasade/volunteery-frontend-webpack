<template>
  <main>
    <eventi-filter
      @doFilter="setFilter"
      ref="thefilter"
      :initfilterBy="filterBy"
    ></eventi-filter>
    <eventi-list :eventis="eventisToShow"></eventi-list>
  </main>
</template>
 
<script>
import eventiFilter from "@/cmp/eventi-filter";
import eventiList from "@/cmp/eventi-list";
import socketService from "@/service/socket-service.js";


export default {
  name: "voluteerApp",
  data() {
    return {
      filterBy: null,
    };
  },
  computed: {
    eventisToShow() {
      const eventis = this.$store.getters.eventisForDisplay;
      console.log("filterBy", this.filterBy);
      if (!this.filterBy) return eventis;
      let eventisFilter = eventis;

      if (this.filterBy.byText) {
        const txt = this.filterBy.byText.toLowerCase();

        eventisFilter = eventis.filter((eventi) => {
          return (
            eventi.title.toLowerCase().includes(txt) ||
            eventi.desc.toLowerCase().includes(txt) ||
            eventi.byOrg.name.toLowerCase().includes(txt) ||
            eventi.location?.country.toLowerCase().includes(txt) ||
            eventi.location?.address.toLowerCase().includes(txt)
          );
        });

        const terms = txt.split(" ");
        const splitTermEventis = eventis.filter((currEventi) => {
          const match = terms.filter((term) => {
            return (
              currEventi.title.toLowerCase().includes(term) ||
              currEventi.desc.toLowerCase().includes(term) ||
              currEventi.byOrg.name.toLowerCase().includes(txt) ||
              currEventi.location?.country.toLowerCase().includes(txt) ||
              currEventi.location?.address.toLowerCase().includes(txt)
            );
          });
          return match.length === terms.length;
        });

        eventisFilter = eventisFilter.concat(splitTermEventis);
        eventisFilter = eventisFilter.reduce((acc, currEventi) => {
          if (!acc.includes(currEventi)) acc.push(currEventi);
          return acc;
        }, []);

        eventisFilter = JSON.parse(JSON.stringify(eventisFilter));
      }
       
        if (this.filterBy.byKey?.values.length && !this.filterBy.byKey?.values.includes('') && !this.filterBy.byKey?.values.includes('all')) {
          
          const eventisfilterKeys = eventisFilter.filter((eventi) => {
            if (eventi[this.filterBy.byKey.key]) {
              
              const eventiValues = eventi[this.filterBy.byKey.key];
              return this.filterBy.byKey.values.filter(value =>{
                return eventiValues.includes(value)
              }).length;
            } else {
              let eventiValue = ''
              const translateFilter = {country: 'location', name: 'byOrg', food: 'accommodation', lodging: 'accommodation'}
              if (typeof (eventi[translateFilter[this.filterBy.byKey.key]]) === 'object') {
                eventiValue = eventi[translateFilter[this.filterBy.byKey.key]][this.filterBy.byKey.key];
              }
              if(typeof eventiValue === 'string') return this.filterBy.byKey.values.includes(eventiValue);
              else if(typeof eventiValue === 'boolean') return this.filterBy.byKey.values.includes(JSON.stringify(eventiValue));
            }
          });

        eventisFilter = JSON.parse(JSON.stringify(eventisfilterKeys));
        }
 
      return eventisFilter;
    },
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy;
      console.log('set filter', filterBy);
      
    },
  },
  async mounted() {
    this.$store.dispatch({ type: "setEventis" });
    this.$refs.thefilter.$refs.searchFild.focus();
    
    socketService.on("updatesEventi", (eventi) => {
      this.$store.dispatch({ type: "saveEventi", eventi});
      this.$store.dispatch({ type: "setEventis" });
    });
  },
  components: {
    eventiFilter,
    eventiList,
  },
};
</script>

<style>
</style>