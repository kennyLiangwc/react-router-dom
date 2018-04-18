let arr = [
	{
        path: "/app/role/roleList",
        name: "角色列表"
    },
    {
        path: "/app/role/addRole",
        name: "新增角色"
    }
];

let roleMap = {};
arr.map(v => {
    return roleMap[v.path] = true;
});


function check(path) {
    return !!roleMap[path]
};

module.exports = {
    queryRoleList: check(""),
    addRole: check("/app/role/addRole"),
    editRole: check("")
}