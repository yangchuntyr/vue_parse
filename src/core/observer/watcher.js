import Dep from './dep';

class Watcher{
    constructor(vm,express,callBack){
        this.vm=vm;
        this.express=express;
        this.callBack=callBack;
    
        this.oldValue=this.getinitValue();
        console.log('555555');
    }

    // addDep(dep){
    //     dep.addDep(this);
    // }
    getinitValue(){
    
        let val=this.vm;
        let arry=  this.express.split('.');
        arry.forEach((item,index)=>{
            if(index==arry.length-1){
                //setCurrentTarget
                Dep.setCurrentTarget(this);
            }
            val=val[item];
        });
        Dep.clearTarget();
        return val;   
    }

    _getVal(){
        let val=this.vm;
        this.express.split('.').forEach(item=>{
            val=val[item];
        });

        return val;
    }

    update(){
        let newValue=   this._getVal();
        this.callBack.call(this.vm,newValue,this.oldValue);
        this.oldValue=newValue;
      
    }
}

export default Watcher;