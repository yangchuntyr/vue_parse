
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