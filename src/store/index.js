import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'

import betblock from './modules/betblock'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        user,
        betblock
    },
    getters
})

export default store
