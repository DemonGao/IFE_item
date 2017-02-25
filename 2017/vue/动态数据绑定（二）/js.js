function Observer(data) {
    this.data = data;
    this.watch = {}; // 所有变化监听事件
    this.walk(data);
}
let p = Observer.prototype;
// 此函数用于深层次遍历对象的各个属性
// 采用的是递归的思路
// 因为我们要为对象的每一个属性绑定getter和setter
p.walk = function (obj) {
    let val;
    for (let key in obj) {
        // 这里为什么要用hasOwnProperty进行过滤呢？
        // 因为for...in 循环会把对象原型链上的所有可枚举属性都循环出来
        // 而我们想要的仅仅是这个对象本身拥有的属性，所以要这么做。
        if (obj.hasOwnProperty(key)) {
            val = obj[key];
            // 这里进行判断，如果还没有遍历到最底层，继续new Observer
            if (typeof val === 'object') {
                new Observer(val)
            }
            this.convert(key, val);
        }
    }
};
p.convert = function (key, val) {
    this.$watch(key, function (newVal) { // 为每个值设置一个监听事件
        console.log(`你设置了 ${key}, 新的值为${newVal}`);
    })
    var self = this;
    Object.defineProperty(this.data, key, {
        enumerable: true,//enumerable可枚举属性 true: for in 可以枚举 false: 不可枚举
        configurable: true,
        get: function () {
            console.log(`你访问了 ${key}`);
            return val;
        },
        set: function (newVal) {
            self.watch[key](newVal) // 回调监听 取代下面那条语句
            //console.log(`你设置了 ${key}, 新的值为${newVal}`);
            if (typeof newVal === 'object') {
                new Observer(newVal)
            }
            if (newVal === val) return;
            val = newVal

        }
    })
}
p.$watch = function (key, callback) {
    this.watch[key] = callback
}

let app = new Observer({
    name: 'DemonGao',
    location: {
        provinces: ' 山东省省',
        city: '济南市'
    },
    age: 22
});
console.log(app)

/**
 * 测试代码 难点二
 */
app.data.name = {
    lastName: 'gao',
    firstName: 'shichao'
}
app.data.name.lastName;
// 这里还需要输出 '你访问了 lastName '
app.data.name.firstName = 'lalala';
// 这里还需要输出 '你设置了firstName, 新的值为 lalala'
console.log(app)

/**
 * 测试代码 难点三
 */
app.data.age = 23;