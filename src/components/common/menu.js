import { rule } from "postcss";

let MenuMap = {
    role: [
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
                            path: "/app/role/roleList"
                        }
                    ]
                },
                {
                    id: "addRole",
                    text: "新增角色1",
                    path: "/app/role/addRole",
                    isMenu: true,
                    exact: true,
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
                    isMenu: true,
                    exact: true,
                    contain: [
                        {
                            "name": "新增角色",
                            "path": "/app/role/editRole"
                        }
                    ]
                },
                {
                    id: "updateRole",
                    text: "修改角色2",
                    path: "/app/role/editRole/:id",
                    isMenu: false,
                    exact: true,
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
                    path: "/app/role/delRole",
                    isMenu: true,
                    exact: true,
                    contain: [
                        {
                            "name": "新增角色",
                            "path": "/app/role/delRole"
                        }
                    ]
                },
                {
                    id: "testRole",
                    text: "测试角色3",
                    path: "/app/role/testRole",
                    isMenu: false,
                    exact: true,
                    contain: [
                        {
                            "name": "新增角色",
                            "path": "/app/role/testRole"
                        }
                    ]
                },
                {
                    id: "Test",
                    text: "测试",
                    path: "/app/test/test",
                    isMenu: false,
                    exact: true,
                    contain: [
                        {
                            
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
                            "name": "新增邀请码",
                            path: "add"
                        }
                    ]
                },
                {
                    id: "addInvite",
                    text: "新增邀请码",
                    path: "/app/code/addCode",
                    isMenu: true,
                    exact: true,
                    contain: [
                        {
                            "name": "新增邀请码",
                            path: "add"
                        }
                    ]
                },
                {
                    id: "updateInvite",
                    text: "修改邀请码",
                    path: "/app/code/updateCode",
                    isMenu: true,
                    exact: true,
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
                    path: "/app/code/delCode",
                    isMenu: true,
                    exact: true,
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

let menuList = getMenuByRightList('role',arr);
export default {
    getMenuByRightList: getMenuByRightList,
    getRouteList: getRouteList
}