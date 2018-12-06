// 导入所有接口
import apiList from './interface.js'

const install = Vue => {
    if (install.installed)
        return;
    install.installed = true;
    Vue.prototype.$api = apiList;
};

export default install
