let menu = {
    role: [
        {
            text: "角色管理",
            icon: "icon_role",
            id: "role",
            children: [
                {
                    id: "queryRole",
                    text: "角色列表",
                    path: "/app/role/roleList",
                    contain: [
                        {
                            path: "/app/role/roleList"
                        }
                    ]
                },
                {
                    id: "addRole",
                    text: "新增角色1",
                    path: "/app/role/addRole",
                    contain: [
                        {
                            "name": "新增角色",
                            "path": "/app/role/addRole"
                        }
                    ]
                },
                {
                    id: "updateRole",
                    text: "修改角色2",
                    path: "/app/role/editRole",
                    contain: [
                        {
                            "name": "新增角色",
                            "path": "/app/role/editRole"
                        }
                    ]
                },
                {
                    id: "delRole",
                    text: "删除角色3",
                    path: "path/test",
                    contain: [
                        {
                            "name": "新增角色",
                            "path": "delRole"
                        }
                    ]
                }
            ]
        },
        {
            text: "邀请码管理",
            icon: "",
            id: "code",
            children: [
                {
                    id: "addInvite",
                    text: "新增邀请码1",
                    path: "1",
                    contain: [
                        {
                            "name": "新增邀请码",
                            path: "add"
                        }
                    ]
                },
                {
                    id: "addInvite2",
                    text: "新增邀请码2",
                    path: "2",
                    contain: [
                        {
                            "name": "新增邀请码",
                            path: "add"
                        }
                    ]
                },
                {
                    id: "updateInvite",
                    text: "修改邀请码3",
                    path: "3",
                    contain: [
                        {
                            "name": "新增邀请码",
                            path: "add"
                        }
                    ]
                },
                {
                    id: "delInvite",
                    text: "删除邀请码",
                    path: "4",
                    contain: [
                        {
                            "name": "新增邀请码4",
                            path: "add"
                        }
                    ]
                }
            ]
        }
    ],
    operation: [
        {
            text: "邀请码管理666",
            icon: "",
            children: [
                {
                    id: "addInvite",
                    text: "新增邀请码1",
                    path: "1",
                    contain: [
                        {
                            "name": "新增邀请码",
                            path: "add"
                        }
                    ]
                },
                {
                    id: "addInvite2",
                    text: "新增邀请码2",
                    path: "2",
                    contain: [
                        {
                            "name": "新增邀请码",
                            path: "add"
                        }
                    ]
                },
                {
                    id: "updateInvite",
                    text: "修改邀请码3",
                    path: "3",
                    contain: [
                        {
                            "name": "新增邀请码",
                            path: "add"
                        }
                    ]
                },
                {
                    id: "delInvite",
                    text: "删除邀请码",
                    path: "4",
                    contain: [
                        {
                            "name": "新增邀请码4",
                            path: "add"
                        }
                    ]
                }
            ]
        }
    ]
}



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


function getMenuByRightList(module, rightList) {
    
    const roleList = rightList;
    let menuList = menu[module]; // 此时为数组, role等;
    console.log()
    const tempRightList = roleList.map(function(v) {
        return v.path;
    }); // 把对象降维到数组
    if (!menuList) {
        console.error('错误模块', module);
        return
    }
    const resultList = []; // 接收新的menu
    menuList.forEach(function (menu1) {
        var menu2Arr = menu1.children.filter(function (menu2) {
            // 需要rightList判断一次
            // return true;
            for (var i = 0; i < menu2.contain.length; i++) {
                if (tempRightList.includes(menu2.contain[i].path)) {
                    return true
                }
            }
            return false
        });
        if (menu2Arr.length > 0) {
            resultList.push({
                text: menu1.text,
                icon:menu1.icon,
                children: menu2Arr
            })
        }
    });
    return resultList
}

let menuList = getMenuByRightList('role',arr);
export default menu.role