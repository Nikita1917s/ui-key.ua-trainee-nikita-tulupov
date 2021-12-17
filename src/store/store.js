import Vue from "vue";
import Vuex from "vuex"
import modules from "./modules/columnsModules"

Vue.use(Vuex); 

export default new Vuex.Store({
    modules: {
        modules
    }
})