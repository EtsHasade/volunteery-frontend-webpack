import Vue from 'vue'
import Vuex from 'vuex'
import { eventiStore } from './module/eventi-store.js'
import { orgStore } from './module/org-store.js'
import { userStore } from './module/user-store.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        eventiStore,
        userStore,
        orgStore
    }
})