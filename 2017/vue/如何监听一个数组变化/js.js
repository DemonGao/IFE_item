/**
 * Created by demongao on 2017/3/2.
 */

//继承的方式监听数组变化

class FakeArray extends Array{
    push(...args){
        console.log(...args);
        console.log('我被改变啦');
        return super.push(...args);
    }
}

var list = [1, 2, 3];

var arr = new FakeArray(...list);

console.log(arr.length)

arr.push([3,4,5,6]);

console.log(arr)