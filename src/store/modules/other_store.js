export default {
    namespaced: true,
    state: {
        //可以选择的页面大小
        pageSizes: [10, 20, 30, 40],
        //页面大小
        pageSize: 10,
        //当前页
        currentPage: 1,
        //总条数
        total: 100,
        //数据源
        data: [],
        //页面数据
        pageData: []
    },
    mutations: {
        //翻页
        pageChange: state => {
            let start = (state.currentPage - 1)*state.pageSize;
            state.pageData = state.data.slice(start, start + state.pageSize)
        },
        //改变每页条数
        pageSizeChange: (state, n) => {
            console.log(345);
            state.pageSize = n;
        }
    },
    actions: {

    }
}