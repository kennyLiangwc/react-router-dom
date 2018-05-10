import { rule } from "postcss";

let MenuMap = {
    role: [
        {
            text: "用户管理",
            icon: "idcard",
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
                            name: "查询用户列表",
                            permissionName: "queryUserList"
                        }
                    ]
                }
            ]
        },
        {
            text: "角色管理",
            icon: "user",
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
                            name: "查询用户列表",
                            permissionName: "queryUserList"
                        },
                        {
                            path: "/app/role/delRole",
                            name: "删除角色",
                            permissionName: "queryUserList"
                        },
                        {
                            path: "/app/role/editRole",
                            name: "修改角色",
                            permissionName: "queryUserList"
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
                            path: "/app/role/addRole",
                            permissionName: "queryUserList"
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
                        
                    ]
                }
            ]
        },
        {
            text: "邀请码管理",
            icon: "code",
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
                            path: "/app/role/codeList",
                            permissionName: "queryUserList"
                        },
                        {
                            name: "删除邀请码",
                            path: "/app/role/delCode",
                            permissionName: "queryUserList"
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
                            path: "/app/role/addCode",
                            permissionName: "queryUserList"
                        }
                    ]
                }
            ]
        }
    ]
}





function getMenuByRightList(module, rightList) {
    return MenuMap[module]
    const roleList = rightList;
    let menuList = MenuMap[module]; // 此时为数组, role等;
    const tempRightList = roleList.map(function(v) {
        return v;
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
                id: menu1.id,
                text: menu1.text,
                icon:menu1.icon,
                children: menu2Arr
            })
        }
    });
    return resultList
}


function getRouteList() {
    let routeList = [], menuList = MenuMap.role;
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
    return MenuMap.role;
}

export default {
    getMenuByRightList: getMenuByRightList,
    getRouteList: getRouteList,
    getRoleCheckList: getRoleCheckList,
    MenuMap
}