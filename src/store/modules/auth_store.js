export default {
    namespaced: true,
    state: {
        //姓名
        name: '',
        //token
        accessToken: ''
    },
    getters: {
        getName: state => {
            let name = state.name;
            if (!name) {
                let auth = localStorage.getItem('auth');
                if (auth) {
                    name = JSON.parse(auth).name
                }
            }
            return name;
        },
        getAccessToken: state => {
            let accessToken = state.accessToken;
            if (!accessToken) {
                let auth = localStorage.getItem('auth');
                if (auth) {
                    accessToken = JSON.parse(auth).accessToken
                }
            }
            return accessToken;
        }
    },
    mutations: {
        //设置姓名
        setName: (state, auth) => {
            localStorage.setItem('auth', JSON.stringify(auth));
            state.name = auth.name;
        },
        //设置token
        setAccessToken: (state, auth) => {
            localStorage.setItem('auth', JSON.stringify(auth));
            state.accessToken = auth.accessToken;
        },
        //设置登陆状态
        setAuth: (state, auth) => {
            state.accessToken = auth.accessToken;
            state.name = auth.name;
            localStorage.setItem('auth', JSON.stringify(auth));
        },
        //清除登陆状态
        clearAuth: (state, auth) => {
            localStorage.removeItem('auth');
            state.accessToken = '';
            state.name = '';
        }
    },
    actions: {
        //设置姓名
        setName: ({commit}, {amount}) => {
            commit('setName', amount);
        },
        //设置token
        setAccessToken: ({commit}, {amount}) => {
            commit('setAccessToken', amount);
        },
        //设置登陆状态
        setAuth: ({commit}, {amount}) => {
            commit('setAuth', amount);
        },
        //清除登陆状态
        clearAuth: ({commit}) => {
            commit('clearAuth')
        }
    }
}