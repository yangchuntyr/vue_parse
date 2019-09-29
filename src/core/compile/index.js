
export default class compiler {
    constructor (el, vm) {
        vm.$el = document.querySelector(el);
        let fragment = document.createDocumentFragment();
        this.replace(vm.$el, vm);
    }
    replace (frag, vm) {
        Array.from(frag.childNodes).forEach(node => {
            let txt = node.textContent;
            let reg = /\{\{(.*?)\}\}/g;   // 正则匹配{{}}
        
            if (node.nodeType === 3 && reg.test(txt)) { // 即是文本节点又有大括号的情况{{}}
                
                let val = getPropertyValue(vm, RegExp.$1);
                // 用trim方法去除一下首尾空格
                node.textContent = txt.replace(reg, val).trim();//第一次赋值渲染
                vm.$watch(RegExp.$1, function (newVal) { //以后每次通过这个回调函数渲染
                    node.textContent = txt.replace(reg, newVal).trim();
                });
            }
            if (node.nodeType === 1) {  // 元素节点
                let nodeAttr = node.attributes; // 获取dom上的所有属性,是个类数组
                Array.from(nodeAttr).forEach(attr => {
                    let name = attr.name;
                    let exp = attr.value;
                  
                    if (name.includes('v-')){
                    
                        node.value = getPropertyValue(vm,exp);
                    }
                    // 监听变化
                   
                    vm.$watch(exp, function(newVal) {
                        node.value = newVal;
                    });

                    node.addEventListener('input', e => {
                        let newVal = e.target.value;
                        let arr = exp.split('.');
                        let val = vm;
                        arr.forEach((key, i)=> {
                            if (i === arr.length - 1) {
                                val[key] = newVal; //赋值触发 notify更新
                                return;
                            }
                            val = val[key];
                        });
                    });
                });
            }

            // 如果还有子节点，继续递归replace
            if (node.childNodes && node.childNodes.length) {
                this.replace(node, vm);
            }
        });
    }
}

var gcount=0;

function getPropertyValue(vm,express){
    let arr = express.split('.');
    let val = vm;
    arr.forEach(key => {
        val = val[key];
    });

    return val;
}

