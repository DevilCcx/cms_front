export default {
    namespaced: true,
    state: {
        //标题
        title: '',
        //内容
        content: '',
        //路径
        path: '',
    },
    getters: {
        title: state => state.title,
        content: state => state.content,
        path: state => state.path
    },
    mutations: {
        //设置标题
        setTitle: (state, title) => {
            state.title = title;
        },
        //设置内容
        setContent: (state, content) => {
            state.content = content;
        },
        //设置路径
        setPath: (state, path) => {
            state.path = path;
        },
        //清空文章
        reset: state => {
            state.title = '';
            state.content = '';
        }
    },
    actions: {
        //设置标题
        setTitle: ({commit}, {amount}) => {
            commit('setTitle', amount);
        },
        //设置内容
        setContent: ({commit}, {amount}) => {
            commit('setContent', amount);
        },
        //设置路径
        setPath: ({commit}, {amount}) => {
            commit('setPath', amount);
        },
        //清空文章
        reset: ({commit}) => {
            commit('reset');
        }
    }
}