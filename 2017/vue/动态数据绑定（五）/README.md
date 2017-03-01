# 任务目的

* 综合应用本系列的所有知识点

# 任务描述
这是“动态数据绑定”的最后一题了，希望你能坚持到最后。在第四题的基础上，我们考虑如何做到："当数据发生改变时，重新渲染 DOM。" 此目标又可以分为两层难度。

1. 相对简单的目标：数据任意部分发生了变化，都重新渲染 DOM。
2. 相对困难的目标：数据的某一部分发生了变动，只重新渲染对应这部分数据的 DOM。

举个例子:
```js
let app = new Vue({
  el: '#app',
  data: {
    user: {
      name: 'youngwind',
      age: 25
    },
    school: 'bupt',
    major: 'computer'
  }
});
```

```html
<!-- 页面中原本的 html 模板片段 -->
<div id="app">
    <p>姓名：{{user.name}}</p>
    <p>年龄：{{user.age}}</p>
</div>
```
相对简单的目标是说：无论是修改数据的哪一部分（包括没有在页面中出现的 school 和 major 这两部分），DOM 都会重新渲染。（即便前后渲染结果一致）
相对困难的目标是说：只有当 user.name 和 user.age 发生改变的时候，DOM 才会重新渲染；而 school 和 major 的变化不会引发重新渲染。


# 任务注意事项

1. 不能使用任何第三方的库
2. 程序执行环境为浏览器

# 在线学习参考资料

* [vue早期源码学习系列之四：如何实现动态数据绑定](https://github.com/youngwind/blog/issues/87)