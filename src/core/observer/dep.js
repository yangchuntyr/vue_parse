class Dep{
    constructor(){
        this.watchers=[];
    }

    addDepend(){
        this.watchers.push(Dep.target);
    }

    notify() {
        this.watchers.forEach(item => {
            item.update(); 
        }); 
    }


}
/**当前监听对象 */
Dep.target = null;

Dep.setCurrentTarget=function(watcher){
    Dep.target = watcher;  
};

Dep.clearTarget=function(){
    Dep.target =null;   
};
export default Dep;