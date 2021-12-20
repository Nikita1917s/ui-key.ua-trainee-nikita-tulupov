import Vue from "vue";
import Vuex from "vuex"
import columnModules from "./modules/columnsModules"

Vue.use(Vuex); 

export default new Vuex.Store({
    modules: {
        columnModules
    }
})