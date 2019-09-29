
export default class Dep {
    constructor () {
        this.sub = [];
    }
    addDepend () {
    //这个target就是watch 收集依赖类的收集目标就是watch watch在这里把依赖收集器传递进去被自己使用
        Dep.target.addDep(this);
    
    }
    /**
     * sub 是一个watch
     * 
     * @param {any} sub 
     * 
     * @memberOf Dep
     */
    addSub (sub) {
        this.sub.push(sub);
    }
    notify () {
        for (let sub of this.sub) {
            sub.update();
        }
    }
}

/**当前监听对象 */
Dep.target = null;

//记录很多个监听者
Dep.targetStack = [];

export function pushTarget (_target) {

    // if (Dep.target) Dep.targetStack.push(Dep.target);
    Dep.target = _target;
}

export function popTarget () {
   
    //  Dep.target = Dep.targetStack.pop();
    Dep.target = null;
}



