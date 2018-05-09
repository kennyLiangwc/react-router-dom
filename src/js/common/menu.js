import { rule } from "postcss";

let MenuMap = {
    role: [
        {
            text: "用户管理",
            icon: "icon_role",
            id: "user",
            children: [
                {
                    id: "UserList",
                    text: "用户列表",
                    path: "/app/user/userList",
                    isMenu: true,
                    exact: true,
                    contain: [
                        {
                            path: "/app/role/userList",
                            name: "查询用户列表"
                        }
                    ]
                }
            ]
        },
        {
            text: "角色管理",
            icon: "icon_role",
            id: "role",
            children: [
                {
                    id: "RoleList",
                    text: "角色列表",
                    path: "/app/role/roleList",
                    isMenu: true,
                    exact: true,
                    contain: [
                        {
                            path: "/app/role/roleList",
                            name: "查询用户列表"
                        },
                        {
                            path: "/app/role/delRole",
                            name: "删除角色"
                        },
                        {
                            path: "/app/role/editRole",
                            name: "修改角色"
                        }
                    ]
                },
                {
                    id: "addRole",
                    text: "新增角色",
                    path: "/app/role/addRole",
                    isMenu: true,
                    exact: true,
                    contain: [
                        {
                            name: "新增角色",
                            path: "/app/role/addRole"
                        }
                    ]
                },
                {
                    id: "updateRole",
                    text: "修改角色",
                    path: "/app/role/editRole/:id",
                    isMenu: false,
                    exact: true,
                    contain: [
                        {
                            name: "新增角色",
                            path: "/app/role/editRole"
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
                    id: "InviteList",
                    text: "邀请码列表",
                    path: "/app/code/codeList",
                    isMenu: true,
                    exact: true,
                    contain: [
                        {
                            name: "查询邀请码",
                            path: "/app/role/codeList"
                        },
                        {
                            name: "删除邀请码",
                            path: "/app/role/delCode"
                        }
                    ]
                },
                {
                    id: "AddInvite",
                    text: "新增邀请码",
                    path: "/app/code/addCode",
                    isMenu: true,
                    exact: true,
                    contain: [
                        {
                            name: "新增邀请码",
                            path: "/app/role/addCode"
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
    if(window.location.hostname !== 'txent.qq.com') {
        return MenuMap[module]; // XXX 开发用
    }
    const roleList = rightList;
    let menuList = MenuMap[module]; // 此时为数组, role等;
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


function getRouteList() {
    let routeList = [], menuList = getMenuByRightList('role',arr);
    menuList.map(({children}) => {
        children.map(({id,path,exact}) => {
            routeList.push({
                id,
                path,
                exact
            })
        })
    })
    return routeList
}
function getRoleCheckList() {
    MenuMap.role.map(item => {
        item.children.map(v => {
            console.log(v)
        })
    })
}

let menuList = getMenuByRightList('role',arr);
export default {
    getMenuByRightList: getMenuByRightList,
    getRouteList: getRouteList,
    getRoleCheckList: getRoleCheckList
}