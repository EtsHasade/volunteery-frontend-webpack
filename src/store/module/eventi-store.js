import { eventiService } from '../../service/eventi-service.js'

export const eventiStore = {
    state: {
        eventis: [],
        tags: ['Animals', 'Children', 'Food', 'Needy', 'COVID-19', 'Fun', 'Baby'],
        neededs: ['Doctors', 'Managers', 'Chefs', 'Teachers', 'Workers'],
        accommodation: ['food', 'housing'],
        tagsIcon: {
            Animals: 'fas fa-paw',
            Children: 'fas fa-child',
            Food: 'fas fa-utensils',
            Needy: 'fas fa-hand-holding-heart',
            ["COVID-19"]: 'fas fa-biohazard',
            Fun: 'far fa-smile-beam',
            Baby: 'fas fa-baby'
        },
        neededsIcon: {
            Doctors: 'fas fa-user-md',
            Managers: 'fas fa-sitemap',
            Chefs: 'fas fa-bread-slice',
            Teachers: 'fas fa-graduation-cap',
            Workers: 'fas fa-tractor'
        },
        accommodationIcon: {
            food: 'fas fa-utensils',
            housing: 'fas fa-bed',
        },
    },
    getters: {
        eventisForDisplay(state) {
            console.log('eventisForDisplay', state.eventis);
            return state.eventis;
        },
        tags(state) {
            return state.tags;
        },
        neededs(state) {
            return state.neededs;
        },
        allFilds(state) {
            try {
                const optionFields = {
                    keyList: [
                        'country',
                        'category',
                        'organization',
                        'accommodation'
                    ],
                    options: {
                        country: [],
                        category: [],
                        organization: [],
                        accommodation: [],
                        tags: []
                    }
                };

                if (!state.eventis?.length) return optionFields

                //get countries 
                optionFields.options.country = state.eventis?.map(eventi => {
                    if (!optionFields.options.country.includes(eventi.location?.country)) return eventi.location?.country
                });
                optionFields.options.country = optionFields.options.country.reduce((acc, currCountry) => {
                    if (!currCountry) return acc
                    if (!acc.includes(currCountry)) acc.push(currCountry);
                    return acc;
                }, []);

                // get categories and tags
                state.eventis.forEach(eventi => {
                    if (eventi.tags) {
                        optionFields.options.category.push(...eventi.tags);
                    }
                });
                optionFields.options.category = optionFields.options.category.reduce((acc, currTag) => {
                    if (!acc.includes(currTag)) acc.push(currTag);
                    return acc;
                }, []);
                optionFields.options.tags = optionFields.options.category;

                // get organizations
                optionFields.options.organization = state.eventis.map(eventi => {
                    if (!optionFields.options.organization.includes(eventi.byOrg?.name)) return eventi.byOrg?.name;
                });
                optionFields.options.organization = optionFields.options.organization.reduce((acc, currOrg) => {
                    if (!currOrg) return acc
                    if (!acc.includes(currOrg)) acc.push(currOrg);
                    return acc;
                }, []);

                // get accommodations
                state.eventis.forEach(eventi => {
                    if (eventi.accommodation) {
                        optionFields.options.accommodation.push(...eventi.accommodation);
                    }
                });
                optionFields.options.accommodation = optionFields.options.accommodation.reduce((acc, currTag) => {
                    if (!acc.includes(currTag)) acc.push(currTag);
                    return acc;
                }, []);
                console.log('optionFilds', optionFields);
                return optionFields

            } catch (error) {
                console.log(error);
            }

        },
        tagsIcon(state) {
            return state.tagsIcon;
        },
        neededsIcon(state) {
            return state.neededsIcon;
        },
        accommodationIcon(state) {
            return state.accommodationIcon;
        }
    },
    mutations: {
        setEventis(state, { eventis }) {
            state.eventis = eventis;
        },
        addEventi(state, { eventi }) {
            state.eventis.push(eventi);
        },
        updateEventi(state, { eventi }) {
            const idx = state.eventis.findIndex(currEventi => {
                return currEventi._id === eventi._id;
            })
            state.eventis.splice(idx, 1, eventi);
        },
        removeEventiById(state, { eventId }) {
            const idx = state.eventis.findIndex(currEventi => currEventi._id === eventId);
            state.eventis.splice(idx, 1);
        },
    },
    actions: {
        async saveEventi({ commit }, { eventi }) {
            try {
                console.log('saveStoreEventi', eventi);
                const actionType = (eventi._id) ? 'updateEventi' : 'addEventi';
                const savedEventi = await eventiService.save(eventi);
                console.log('saved', savedEventi);
                commit({ type: actionType, eventi: savedEventi });
                return { type: true, err: null };
            } catch (err) {
                return { type: false, err };
            }

        },
        async setEventis({ commit }) {
            try {
                console.log('setEventi');
                const eventis = await eventiService.query();
                commit({ type: 'setEventis', eventis });
                return { type: true, err: null };
            } catch (err) {
                console.log('err', err);
                return { type: false, err };
            }
        },
        async removeEventiById({ commit }, payload) {
            try {
                await eventiService.remove(payload.eventiId);
                commit(payload);
                return { type: true, err: null };
            } catch (err) {
                return { type: false, err };
            }
        },
        async setSortEventis({ commit }, { sortBy }) {
            console.log(sortBy);
            const eventis = await eventiService.getSortList(sortBy);
            commit({ type: 'setEventis', eventis });
        },
        async getEventiById(context, { _id }) {
            return await eventiService.getById(_id);
        }
    }
}