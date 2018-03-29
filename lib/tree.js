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
     * @param {String} sub_index 
     * @param {String} parent_index 
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
     * @param {String} sub_index 
     * @param {String} parent_index 
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
     * @param {*} sub_index 
     * @param {*} parent_index 
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
}

module.exports = Tree