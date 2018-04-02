
[![node](https://img.shields.io/node/v/siwi-tree.svg)](https://www.npmjs.com/package/siwi-tree)
[![Build Status](https://travis-ci.org/siwilizhao/siwi-tree.svg?branch=master)](https://travis-ci.org/siwilizhao/siwi-tree)
[![npm](https://img.shields.io/npm/v/siwi-tree.svg)](https://www.npmjs.com/package/siwi-tree)
[![npm](https://img.shields.io/npm/dt/siwi-tree.svg)](https://www.npmjs.com/package/siwi-tree)
[![Github file size](https://img.shields.io/github/size/siwilizhao/siwi-tree/lib/tree.js.svg)](https://github.com/siwilizhao/siwi-tree/lib/tree.js)

# siwi-tree
无限级分类 家谱树 子孙树 生成菜单 提供递归和迭代两种方式实现

# install

## use npm 

` npm install siwi-tree`

## use yarn

` yarn add siwi-tree`

# Example

## 实例化参数

<table>
    <tr>
        <th>参数</th>
        <th>类型</th>
        <th>是否必选</th>
        <th>默认值</th>
        <th>含义</th>
    </tr>
    <tr>
        <th>id_index</th>
        <th>String</th>
        <th>否</th>
        <th>id</th>
        <th>指定id下标</th>
    </tr>
    <tr>
        <th>parent_index</th>
        <th>String</th>
        <th>否</th>
        <th>parent_id</th>
        <th>指定parent_id下标</th>
    </tr>
    <tr>
        <th>sub_index</th>
        <th>String</th>
        <th>否</th>
        <th>children</th>
        <th>指定sub下标</th>
    </tr>
</table>

## 默认
> 默认情况下 数据如下
```js
const data = [{
        id: 1,
        name: '中国',
        parent_id: 0
    },
    {
        id: 2,
        name: '台湾',
        parent_id: 1
    },
    {
        id: 3,
        name: '台北',
        parent_id: 2
    },
    {
        id: 4,
        name: '钓鱼岛',
        parent_id: 3
    },
    {
        id: 5,
        name: '日本',
        parent_id: 0
    },
    {
        id: 6,
        name: '东京',
        parent_id: 5
    },
]
const Tree = require('siwi-tree')
const tree = new Tree() // 这里不用传入参数

class Example {
    constructor() {
        this.init()
    }
    async init() {
        const familyTree = await tree.familyTree(data, 4)
        console.log(familyTree)
        const subTree = await tree.subTree(data, 2)
        console.log(subTree)
        const res = await tree.getTree(data)
        console.log(JSON.stringify(res))
    }
}

module.exports = new Example()
```

## 自定义下标
> 通常情况下 树的数据源是多样的 可以通过传入 id_index  parent_index sub_index 指定数据源的对应下标


```js
const data = [{
        id: 1,
        name: '中国',
        pid: 0
    },
    {
        id: 2,
        name: '台湾',
        pid: 1
    },
    {
        id: 3,
        name: '台北',
        pid: 2
    },
    {
        id: 4,
        name: '钓鱼岛',
        pid: 3
    },
    {
        id: 5,
        name: '日本',
        pid: 0
    },
    {
        id: 6,
        name: '东京',
        pid: 5
    },
]
const Tree = require('siwi-tree')
const id_index = 'id'
const parent_index = 'pid'
const sub_index = 'sub'
const tree = new Tree(id_index, parent_index, sub_index)

class Example {
    constructor() {
        this.init()
    }
    async init() {
        const familyTree = await tree.familyTree(data, 4)
        console.log(familyTree)
        const subTree = await tree.subTree(data, 2)
        console.log(subTree)
        const res = await tree.getTree(data)
        console.log(JSON.stringify(res))
    }
}

module.exports = new Example()
```

## 迭代方式

> 目前迭代实现 家谱树 子孙树

```js
const data = [{
        id: 1,
        name: '中国',
        parent_id: 0
    },
    {
        id: 2,
        name: '台湾',
        parent_id: 1
    },
    {
        id: 3,
        name: '台北',
        parent_id: 2
    },
    {
        id: 4,
        name: '钓鱼岛',
        parent_id: 3
    },
    {
        id: 5,
        name: '日本',
        parent_id: 0
    },
    {
        id: 6,
        name: '东京',
        parent_id: 5
    },
]
const Tree = require('siwi-tree')
const tree = new Tree() // 这里不用传入参数

class Example {
    constructor() {
        this.init()
    }
    async init() {
        const familyTree = await tree.familyTreeIteration(data, 4)
        console.log(familyTree)
        const subTree = await tree.subTreeIteration(data, 2)
        console.log(subTree)
    }
}

module.exports = new Example()
```