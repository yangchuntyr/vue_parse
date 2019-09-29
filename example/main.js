/**
 * @author monkeywang
 * Date: 2018/4/8
 */
let app = new Wue({
    el: '#app',
    data: {
        msg: 'hello wue',
        deep: {
            a: 1,
            b: 2
        }
    },
    created: function() {
    
    },
    mounted () {
        // this.deep.a = '111';
        // this.deep.b=233;
    }
});