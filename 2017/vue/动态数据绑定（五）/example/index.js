/**
 * Created by demongao on 2017/3/2.
 */
// import Bue from '../src/index';





function Bue(options) {
    this._init(options);
}

Bue.prototype = {
    constructor: Bue,
    _init: function (options) {
        // 其他初始化

        this.$data = options.data;
        this.$el = document.querySelector(options.el);
        this.$template = this.$el.cloneNode(true);

        // 创建观察对象
        this.observer = this.observer.create(this.$data);

        this.observer.on('set',this.$mount.bind(this));

        // 渲染挂载
        this.$mount();
    },
    _compile : function () {
        this.fragment = document.createDocumentFragment();
        this._compileNode(this.$template);
        this.$el.innerHTML = "";
        this.fragment.childNodes.forEach((child) => {
            this.$el.appendChild(child.cloneNode(true));
        });
    },

    _compileElement : function (node) {
        this.currentNode = document.createElement(node.tagName);
        this.fragment.appendChild(this.currentNode);

        if (node.hasChildNodes()) {
            Array.from(node.childNodes).forEach(this._compileNode, this);
        }
    },
    _compileText : function (node) {
        let nodeValue = node.nodeValue;

        if (nodeValue === '') return;


        let patt = /{{\w+}}/g;
        let ret = nodeValue.match(patt);

        if (!ret) return;

        ret.forEach((value) => {
            let property = value.replace(/[{}]/g, '');
            nodeValue = nodeValue.replace(value, this.$data[property]);
        }, this);

        this.currentNode.appendChild(document.createTextNode(nodeValue));
    },
    _compileNode : function (node) {
        switch (node.nodeType) {
            // text
            case 1:
                this._compileElement(node);
                break;
            // node
            case 3 :
                this._compileText(node);
                break;
            default:
                return;
        }
    },
    $mount : function () {
        console.log('我要开始重新渲染啦');
        this._compile();
    },
    $watch : function (key, fn) {
        let _fn = function () {
            fn(arguments[2]);
        };
        this.$data.$observer.on(`set:${key}`, _fn.bind(this))
    },
    observer: Observer
};


const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
const arrayAugmentations = [];

aryMethods.forEach((method) =>{
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




const ARRAY = 0;
const OBJECT = 1;

/**
 * 观察者构造函数
 * @param value {Object} 数据对象
 * @param type {Int} 数据对象的类型(分为对象和数组)
 * @constructor
 */

function Observer(value,type){
    this.value = value;

    // TODO 这里enumerable一定要为false,否则会触发死循环, 原因未明
    // 将当前对象存储到当前对象的$observer属性中

    Object.defineProperty(value,'$observer',{
        value: this,
        enumerable: false,
        writable: true,
        configurable: true
    });

    if(type === ARRAY){
        value.__proto__ = arrayAugmentations;
        this.link(value);
    }else if(type === OBJECT){
        // value.__proto__ = objectAugmentations;

        this.walk(value)
    }
}

/**
 * 遍历数据对象
 * @param obj {Object} 待遍历的数据对象
 */
Observer.prototype.walk = function (obj) {
    let val;
    for (let key in obj) {
        if (!obj.hasOwnProperty(key)) return;

        val = obj[key];

        // 递归
        this.observe(key, val);

        this.convert(key, val);

    }
};

/**
 * 定义对象属性
 * @param key {string} 属性键名
 * @param val {Any} 属性值
 */
Observer.prototype.convert = function(key,val){
    let ob =this;
    Object.defineProperty(this.value,key,{
        enumerable:true,
        configurable:true,
        get: function(){
            console.log('你访问了'+key);
            return val
        },
        set: function(newVal){
            if(newVal === val) return ;

            val = newVal;
            console.log('你设置了' + key + ',新的'+ key + '=' + newVal);

            ob.notify('set',key ,newVal);
            ob.notify(`set:${key}`, key, newVal)
        }
    })
}
/**
 * 调用创建observer函数
 * 并且判断是否有父节点,如果有,则存储父节点到自身,
 * 目的是为了方便后面事件传播使用
 * @param key {string} 键值
 * @param val {Any} 属性值
 */
Observer.prototype.observe = function(key,val){
    let ob = Observer.create(val);
    if(!ob) return;
    ob.parent = {
        key,
        ob:this
    }
}


/**
 * 这个方法是用来处理如下情况: var ary = [1,{name:liangshaofeng}]
 * 也就是说,当数组的某些项是一个对象的时候,
 * 那么需要给这个对象创建observer监听它
 * @param items {Array} 待处理数组
 */
Observer.prototype.link = function (items) {
    items.forEach((value, index) => {
        this.observe(index, value);
    });
};


/**
 * 订阅事件
 * @param event {string} 事件类型
 * @param fn {Function} 对调函数
 * @returns {Observer} 观察者对象
 */
Observer.prototype.on = function (event, fn) {
    this._cbs = this._cbs || {};
    if (!this._cbs[event]) {
        this._cbs[event] = [];
    }
    this._cbs[event].push(fn);

    // 这里return this是为了实现.on(...).on(...)这样的级联调用
    return this;
};


/**
 * 触发消息, 并且将消息逐层往上传播
 */
Observer.prototype.notify = function (event, path, val) {
    this.emit(event, path, val);
    let parent = this.parent;
    if (!parent) return;
    let ob = parent.ob;
    ob.notify(event, path, val);
};

/**
 * 触发执行回调函数
 * @param event {string} 事件类型
 * @param event {path} 事件触发路径
 *
 */
Observer.prototype.emit = function (event, path, val){
    this._cbs = this._cbs || {};
    console.log(this._cbs);
    console.log(event)
    let  callbacks = this.cbs[event];

    if(!callbacks) return;

    callbacks = callbacks.slice(0);

    callbacks.forEach((cb, i) =>{
        callbacks[i].apply(this,arguments)
    });
}

/**
 * 根据不同的数据类型,调用observer构造函数
 * @param value {Any} 数据
 * @returns {Observer}
 */
Observer.create = function (value,options){
    if(Array.isArray(value)){
        return new Observer(value,ARRAY);
    }else if(typeof value === 'object'){
        return new Observer(value,OBJECT);
    }
}


const app = new Bue({
    el: '#app',
    data: {
        name: 'youngwind',
        age: 24,
        address: {
            info: {
                city: "beijing"
            }
        },
        message: ['a', 'b', 'c']
    }
});


app.$watch('name', function (val) {
    console.log('我watch住了name');
    console.log(`新的name为${val}`)
});

window.app = app;