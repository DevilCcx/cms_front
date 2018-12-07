import Vue from 'vue';
import app from './components/App.vue';
import 'element-ui/lib/theme-chalk/reset.css';

//vue-router
import VueRouter from 'vue-router';

//vue-axios
import axios from 'axios';
import VueAxios from 'vue-axios';

//vuex
import store from './store/index.js'

import CreateRouter from './route/index.js';
const router = CreateRouter();

//markdown 编辑器
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

import {
    Pagination,
    Dialog,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Option,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    Button,
    Table,
    TableColumn,
    Alert,
    Row,
    Icon,
    Col,
    Collapse,
    Container,
    Header,
    Aside,
    Main,
    Loading
} from 'element-ui';

Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(Icon);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Option);
Vue.use(Input);
Vue.use(Loading);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Alert);
Vue.use(Row);
Vue.use(Col);
Vue.use(Collapse);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);

Vue.use(Loading.directive);
Vue.use(mavonEditor);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);


Vue.prototype.$loading = Loading.service;

import Api from './http/index.js'
Vue.use(Api);

const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
    router,
    store,
    render: (h) => h(app)
}).$mount(root);