import Dep, {popTarget, pushTarget } from './dep';

export  class Watcher {
    constructor (vm, expression, cb) {
        this.vm = vm;
        this.cb = cb;
        this.expression = expression;

        this.oldValue = this.getVal();
    }
    getVal () {
     
        let val = this.vm;
        let keys=  this.expression.split('.');
        keys.forEach((key) => {
            if(key==keys[keys.length-1]){//如deep.a这样的表达式中 只有key==a时才能推入监听者
                pushTarget(this);
            }
            val = val[key];
        });
        popTarget();
        return val;
    }
    /**
   * 添加依赖
   * 
   * @param {any} dep 
   * 
   * @memberOf Watcher
   */
    addDep (dep) {
        dep.addSub(this);
    }

    update () {
      
        let newVal = this.vm;
        this.expression.split('.').forEach((key) => {
            newVal = newVal[key];
        });
        this.cb.call(this.vm, newVal, this.oldValue);
    }
}

export function firstNotify(){
    let dep = new Dep();
  
    Dep.targetStack;
    dep.notify();
}