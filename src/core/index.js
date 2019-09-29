

import proxy from './instance/proxy';
import initOptions from './instance/init';
import Compiler from './compile';
import { Watcher ,firstNotify}from './observer/Watcher';
import {callHook} from './instance/lifecycle';



export default class Wue {
    constructor (options) {
    
        let vm = this;
        vm.$options = options;
        vm.$watch = function (key, cb) {
            new Watcher(vm, key, cb);//cb是callback回调函数 这里解读为监控某个data里的key 发生变化就执行回调函数
        };
        initOptions(vm);//第一次把data上的数据变成响应式时 没有收集到任何依赖

        for (let key in vm._data) { //让this代理 data里的数据
            proxy(vm, '_data', key);
        }
        callHook(vm, 'created');//数据代理完成 响应式也实现后就开始触发created回调函数
        new Compiler(vm.$options.el, vm);
        callHook(vm, 'mounted');
      
       
    }
}