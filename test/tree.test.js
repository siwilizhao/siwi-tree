const Tree = require('../index')
const expect = require('chai').expect
const tree = new Tree('id', 'pid', 'child')
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
describe('tree.js', () => {
    it('familyTree', async () => {

        const res = await tree.familyTree(data, 2)
        console.log(res)
        expect(res).to.be.an('array')
    })
    it('subTree', async () => {
        const res = await tree.subTree(data, 1)
        console.log(res)
        expect(res).to.be.an('array')
    })
    it('getTree', async () => {
        const res = await tree.getTree(data)
        console.log(JSON.stringify(res))
        expect(res).to.be.an('array')
    })
})