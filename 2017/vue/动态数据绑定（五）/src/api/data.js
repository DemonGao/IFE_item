/**
 * Created by demongao on 2017/3/2.
 */


exports.$watch = function (key, fn) {
    let _fn = function () {
        fn(arguments[2]);
    };
    this.$data.$observer.on(`set:${key}`, _fn.bind(this))
};