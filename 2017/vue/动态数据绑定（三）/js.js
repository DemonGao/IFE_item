function Observer(data,parent,parentKey){
    this.data = data;
    this.parent = parent;
    this.parentKey = parentKey;

    this.watch = {};    //储存所有变量监听事件

    this.walk(data);
}
Observer.prototype = {
    // 此函数用于深层次遍历对象的各个属性
    // 采用的是递归的思路
    // 因为我们要为对象的每一个属性绑定getter和setter
    walk(obj){
        let val;
        for(let key in obj){
            // 这里为什么要用hasOwnProperty进行过滤呢？
            // 因为for...in 循环会把对象原型链上的所有可枚举属性都循环出来
            // 而我们想要的仅仅是这个对象本身拥有的属性，所以要这么做。
            if(obj.hasOwnProperty(key)){
                val = obj[key];
                //第一大难题:初始化深对象解决问题
                if(typeof val === 'object'){
                    new Observer(val,this,key);
                }
                this.convert(key,val);
            }
        }
    },
    convert(key,val){
        // 为每个值设置一个监听事件
        this.$watch(key,function(newVal){
            console.log(`你设置了 ${key},新的值为 ${newVal}`);
        })
        let self =this;
        Object.defineProperty(this.data,key,{
            enumerable:true, ////enumerable可枚举属性 true: for in 可以枚举 false: 不可枚举
            configurable:true,
            get : function(){
                console.log(`你访问了 ${key}`);
                return val;
            },
            set : function(newVal){
                if(self.parent!=null){
                    self.parent.watch[self.parentKey](newVal);//若有父类,则会调用父类的监听事件
                }

                self.watch[key](newVal);// 回调监听 取代下面那条语句
                //console.log(`你设置了 ${key}, 新的值为${newVal}`);
                if(newVal === val) return;

                if (typeof newVal === 'object'){
                    new Observer(newVal,this,key)
                }
                val = newVal;
            }
        })
    },
    $watch(key,callback){
        this.watch[key] = callback;
//           if(this.watch[key] in)
//           console.log(this.watch[key]);
    },

}

let app2 = new Observer({
    name: {
        firstName: 'shichao',
        lastName: 'gao'
    },
    age: 25
});

app2.$watch('name', function (newName) {
    console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
});

app2.data.name.firstName = 'hahaha';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
app2.data.name.lastName = 'blablabla';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。