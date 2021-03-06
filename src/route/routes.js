import Login from '../components/auth/Login.vue';
import Index from '../components/layouts/Index.vue';
import NewArticle from '../components/pages/NewArticle.vue';
import ArticleList from '../components/pages/ArticleList.vue';
import EditArticle from '../components/pages/EditArticle.vue';

//进入路由前勾子函数
const _beforeEnter = (to, from, redirect, next) => {
    let auth = localStorage.getItem('auth');
    //判断登录状态
    if (null === auth) {
        next('/login');
    } else {
        if (null === redirect) {
            next();
        } else {
            next(redirect)
        }
    }
};

export default [
    {
        path: '/',
        redirect: '/login',
        meta: [],
        beforeEnter: (to, from, next) => {
            _beforeEnter(to, from, '/article/list', next);
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: (to, from, next) => {
            let auth = localStorage.getItem('auth');
            //判断登录状态
            if (null === auth) {
                next();
            } else {
                //默认跳转到文章列表，如果有上一页则跳转到上一页
                if (from.fullPath !== '/' && from.fullPath !== '/login') {
                    next(from.fullPath);
                } else {
                    next('/article/list');
                }
            }
        }
    },
    {
        path: '/article',
        name: 'index',
        component: Index,
        children: [
            {
                path: 'list',
                name: '文章列表',
                component: ArticleList,
                beforeEnter: (to, from, next) => {
                    _beforeEnter(to, from, null, next);
                }
            },
            {
                path: 'new',
                name: '新建博文',
                component: NewArticle,
                beforeEnter: (to, from, next) => {
                    _beforeEnter(to, from, null, next);
                }
            },
            {
                path: 'edit',
                name: '编辑博文',
                component: EditArticle,
                beforeEnter: (to, from, next) => {
                    _beforeEnter(to, from, null, next);
                }
            }
        ]
    }

]
