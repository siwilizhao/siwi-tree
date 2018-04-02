
/**
 * @author [siwi]
 * @email [siwilizhao@siwi.me]
 * @create date 2018-04-02 10:54:25
 * @modify date 2018-04-02 10:54:25
 * @desc [tree.js]
*/
let instance = null
class Tree {
    constructor(id_index = 'id', parent_index = 'parent_id', sub_index = 'children') {
        this.id_index = id_index
        this.sub_index = sub_index
        this.parent_index = parent_index

        if (!instance) {
            instance = this
        }

        return instance
    }
    /**
     * 根据最后一个找到整个家族
     * @param {Array} data 
     * @param {Int} parent_id  
     */
    async familyTree(data, parent_id) {

        const _familyTree = (data, parent_id) => {
            for (const item of data) {
                if (item[this.id_index] == parent_id) {
                    elements.push(item)
                    _familyTree(data, item[this.parent_index])
                }
            }
        }

        const elements = []
        _familyTree(data, parent_id)

        return elements
    }

    /**
     * 从顶级往下找到所有的子子孙孙
     * @param {Array} data 数据源
     * @param {Number} id 目标id
     */
    async subTree(data, id) {

        const _subTree = (data, id, level) => {
            for (const item of data) {
                if (item[this.parent_index] == id) {
                    item['level'] = level
                    elements.push(item)
                    _subTree(data, item[this.id_index], level + 1)
                }
            }
        }

        const elements = []
        let level = 0
        _subTree(data, id, level)

        return elements
    }

    /**
     * 获取树
     * @param {*} data  
     */
    async getTree(data) {

        const _getTree = (data, elements) => {
            for (const element of elements) {
                data.forEach(item => {
                    if (element[this.id_index] == item[this.parent_index]) {
                        element[this.sub_index].push(item)
                    }
                })
                if (element[this.sub_index].length > 0) {
                    _getTree(data, element[this.sub_index])
                } else {
                    delete element[this.sub_index]
                }
            }
        }

        const elements = []
        data.forEach(element => {
            element[this.sub_index] = []
            // 获取顶级节点
            if (!element[this.parent_index]) {
                elements.push(element)
            }
        })

        _getTree(data, elements)
        return elements
    }

    /**
     * 根据最后一个找到整个家族 非递归方式 迭代实现
     * @param {*} data 
     * @param {*} parent_id 
     */
    async familyTreeIteration (data, parent_id) {
        const elements = []
        let pid = parent_id
        while (pid > 0) {
            for (const item of data) {
                if (item[this.id_index] == pid) {
                    pid = item[this.parent_index]
                    elements.push(item)
                }
            }
        }
        return elements
    }

    /**
     * 从顶级往下找到所有的子子孙孙 非递归方式 迭代实现
     * @param {Array} data 数据源
     * @param {Number} id 目标id
     */
    async subTreeIteration(data, id) {
        const task = [id]
        const elements = []
        while (task.length > 0) {
            let flag = false

            for (const index in data) {
                if (data[index][this.parent_index] == id) {
                    elements.push(data[index])
                    task.push(data[index][this.id_index])
                    id = data[index][this.id_index]
                    delete data[index]
                    flag = true
                }
            }
            if (!flag) {
                task.pop()
                id = task[task.length -1]
            }
        }
        return elements
    }
}

module.exports = Tree