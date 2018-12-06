import Router from 'vue-router'

import routes from './routes'

export default () => {
    let router = new Router({
        routes,
        // mode: 'history',
        base: '/',
        linkActiveClass: 'active-class',
        linkExactActiveClass: 'exact-active-class',
        scollBehavior (to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition
            } else {
                return {
                    x: 0,
                    y: 0
                }
            }
        },

        //参数处理
        // parseQuery (query) {},
        // stringifyQuery (obj) {},
        fallback: true
    });

    //路由导航
    // let routeList = [];
    // router.beforeEach((to, from, next) => {
    //     let index = -1;
    //     for(let i = 0; i < routeList.length; i++) {
    //         if(routeList[i].name === to.name) {
    //             index = i;
    //             break;
    //         }
    //     }
    //     if (index !== -1) {
    //         //如果存在路由列表，则把之后的路由都删掉
    //         routeList.splice(index + 1, routeList.length - index - 1);
    //     } else if(to.name !== '登录'){
    //         routeList.push({"name":to.name,"path":to.fullPath});
    //     }
    //     to.meta.routeList = routeList;
    //     console.log(1213);
    //     console.log(to.meta);
    //     next()
    // });

    //路由守卫
    // router.beforeEach((to, from, next) => {});

    return router;
}
