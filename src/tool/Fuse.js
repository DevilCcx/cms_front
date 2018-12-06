const Fuse = require('fuse.js');
import {fuseConfig} from '../config/base.config.js'

//获取fuse配置
let option = fuseConfig;

let search = (origin, keys, input) => {
    option.keys = keys;
    let fuse = new Fuse(origin, option);
    return fuse.search(input);
};

export default search;