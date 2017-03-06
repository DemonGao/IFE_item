/**
 * Created by demongao on 2017/3/2.
 * 定义一个对象,它的属性中有push等经过改写的数组方法
 */

const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
const arrayAugmentations = [];

arrMethods.forEach((method) =>{
    let original = Array.prototype[method];

    Object.defineProperty(arrayAugmentations,method,{
        enumerable: true,
        configurable: true,
        writable: true,
        value: function(){
            let result = original.apply(this,arguments);
            let  ob = this.observer;

            ob.trigger.call(ob,'set');

            console.log('我改变了');

            return result;
        }
    });
});

module.exports = arrayAugmentations;