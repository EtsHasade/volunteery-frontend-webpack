import { orgService } from '../../service/org-service.js'

export const orgStore = {
    state: {
        orgs: [],
    },
    getters: {
        orgsForDisplay(state) {
            return state.orgs
        },
        orgAllFilds(state) {
            try {
                const optionFields = {
                    keyList: [
                        'country',
                        'category',
                    ],
                    options: {
                        country: [],
                        category: [],
                        tags: []
                    }
                };

                if (!state.orgs?.length) return optionFields

                //get countries 
                optionFields.options.country = state.orgs?.map(org => {
                    if (!optionFields.options.country.includes(org.country)) return org.country
                });
                optionFields.options.country = optionFields.options.country.reduce((acc, currCountry) => {
                    if (!currCountry) return acc
                    if (!acc.includes(currCountry)) acc.push(currCountry);
                    return acc;
                }, []);

                // get categories and tags
                state.orgs.forEach(org => {
                    if (org.tags) {
                        optionFields.options.category.push(...org.tags);
                    }
                });
                optionFields.options.category = optionFields.options.category.reduce((acc, currTag) => {
                    if (!currTag) return acc
                    if (!acc.includes(currTag)) acc.push(currTag);
                    return acc;
                }, []);
                optionFields.options.tags = optionFields.options.category;

              
                console.log('Org Option Filds', optionFields);
                return optionFields

            } catch (error) {
                console.log(error);
            }

        },
    },
    mutations: {
        setOrgs(state, { orgs }) {
            state.orgs = orgs
        },
        addOrg(state, { org }) {
            state.orgs.push(org)
        },
        updateOrg(state, { org }) {
            const idx = state.orgs.findIndex(currOrg => {
                return currOrg._id === org._id
            })
            state.orgs.splice(idx, 1, org)
        },
        removeOrgById(state, { orgId }) {
            const idx = state.orgs.findIndex(currOrg => currOrg._id === orgId)
            state.orgs.splice(idx, 1)
        },
    },
    actions: {
        async saveOrg({ commit }, { org }) {
            try {
                console.log('saveStoreOrg', org);
                const actionType = (org._id) ? 'updateOrg' : 'addOrg';
                const savedOrg = await orgService.save(org)
                console.log('saved', savedOrg);
                commit({ type: actionType, org: savedOrg })
                return { type: true, org: savedOrg, err: null }
            } catch (err) {
                return { type: false, err }
            }

        },
        async setOrgs({ commit }) {
            try {
                const orgs = await orgService.query()
                commit({ type: 'setOrgs', orgs })
                return { type: true, err: null }
            } catch (err) {
                console.log('err', err);
                return { type: false, err }
            }
        },
        async removeOrgById({ commit, dispatch }, payload) {
            try {
                await orgService.remove(payload.orgId)
                commit(payload)
                payload.orgorgs.forEach(eventi => {
                    dispatch({ type: 'removeEventiById', eventiId: eventi._id }, { root: true })
                });
                return { type: true, err: null }
            } catch (err) {
                return { type: false, err }
            }
        },
        async setSortOrgs({ commit }, { sortBy }) {
            console.log(sortBy);
            const orgs = await orgService.getSortList(sortBy)
            commit({ type: 'setOrgs', orgs })
        },
        async getOrgById(context, { orgId }) {
            return await orgService.getById(orgId);
        }
    }
}