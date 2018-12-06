export default {
    namespaced: true,
    state: {
        //可以选择的页面大小
        pageSizes: [5, 10, 15, 20],
        //页面大小
        pageSize: 10,
        //当前页
        currentPage: 1,
        //总条数
        total: 100,
        //数据(含搜索)
        data: [],
        //页面数据
        pageData: [],
        //原始数据
        origin: []
    },
    getters: {
        pageData: state => state.pageData,
        origin: state => state.origin
    },
    mutations: {
        //翻页
        pageChange: (state, n) => {
            state.currentPage = n;
        },

        //改变每页条数
        pageSizeChange: (state, n) => {
            state.pageSize = n;
        },

        //数据
        getData: (state, data) => {
            state.data = data;
            state.total = data.length;
            let start = (state.currentPage - 1)*state.pageSize;
            state.pageData = state.data.slice(start, start + state.pageSize)
        },

        //重新获取页面数据
        resetPageData: (state) => {
            let start = (state.currentPage - 1)*state.pageSize;
            state.pageData = state.data.slice(start, start + state.pageSize);
        },

        //设置原始数据
        setOrigin: (state, origin) => {
            state.origin = origin;
        }
    },
    actions: {
        //翻页
        pageChange: ({commit}, {amount}) => {
            commit('pageChange', amount);
            commit('resetPageData')
        },

        //改变每页条数
        pageSizeChange: ({commit}, {amount}) => {
            commit('pageSizeChange', amount);
            commit('resetPageData')
        },

        //数据
        getData: ({commit}, {amount}) => {
            commit('getData', amount);
            commit('pageChange', 1);
            commit('resetPageData');
        },

        //设置原始数据
        setOrigin: ({commit}, {amount}) => {
            commit('setOrigin', amount)
        }
    }
}