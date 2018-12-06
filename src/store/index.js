import Vue from 'vue';
import vuex from 'vuex';
Vue.use(vuex);

//模块化引入
import paginator from './modules/paginator_store.js';
import other from './modules/other_store.js';
import mavon from './modules/mavon_store.js';

const store = new vuex.Store({
    modules: {
        paginator: paginator,
        mavon: mavon,
        other: other
    }
});

export default store;