
import Dep from './dep';
class Observer {
    constructor (value) {
        this.walk(value);
    }

    /**
     * 把data下的数据都弄成get set的形式
     * 
     * @param {any} obj  data
     * 
     * @memberOf Observer
     */
    walk (obj) {
        Object.keys(obj).forEach((key) => {
            if (typeof obj[key] === 'object') {
                this.walk(obj[key]);
            }
            defineReactive(obj, key, obj[key]);
        });
    }
}
/**全局的依赖收集器 */
const gDepAll = new Dep();

/**
 * 
 * @param {*} obj data
 * @param {*} key 
 * @param {*} value 
 */
let defineReactive = (obj, key, value) => {
 
    Object.defineProperty(obj, key, {
        set (newVal) {
            if (newVal === value) {
                return;
            }
            value = newVal;
            console.log(gDepAll);
            gDepAll.notify();
        },
        get () {
            if (Dep.target) {
                //收集依赖
                gDepAll.addDepend();
            }
            return value;
        }
    });
};

//传递进来的是data
export default function observer(value) {
    return new Observer(value);
}





