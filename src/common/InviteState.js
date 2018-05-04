import EnumBase from './EnumBase.js'
var map = {
    0: {
        label: '初始化',
        show: true
    },
    1: {
        label: '未绑定',
        show: true
    },
    2: {
        label: '已绑定',
        show: true
    }
};
export default new EnumBase(map)