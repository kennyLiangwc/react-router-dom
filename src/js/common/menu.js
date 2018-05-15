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
                            permissionName: "queryRoleList"
                        },
                        {
                            path: "/app/role/delRole",
                            name: "删除角色",
                            permissionName: "delRole"
                        },
                        {
                            path: "/app/role/editRole",
                            name: "修改角色",
                            permissionName: "updateRole"
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
                            permissionName: "addRole"
                        }
                    ]
                },
                {
                    id: "updateRole",
                    text: "修改角色",
                    path: "/app/role/editRole/:id",
                    isMenu: false,
                    exact: true,
                    contain: []
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
                            permissionName: "queryCodeList"
                        },
                        {
                            name: "删除邀请码",
                            path: "/app/role/delCode",
                            permissionName: "delCode"
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
                            permissionName: "addCode"
                        }
                    ]
                }
            ]
        }
    ]
}





function getMenuByRightList(module, rightList) {
    // return MenuMap[module]
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


let containList = [];
(function(){    //获取MenuMap里的contain,用于权限控制
    Object.keys(MenuMap).map((key) => {
        MenuMap[key].map((item) => {
            item.children.map(c => {
                c.contain.map(v => {
                    containList.push(v)
                })
            })
        })
    })
})();

function getRouteList() {   //获取路由列表
    let routeList = [], menuList = MenuMap.role;
    Object.keys(MenuMap).map(key => {
        MenuMap[key].map(({children}) => {
            children.map(({id,path,exact}) => {
                routeList.push({
                    id,
                    path,
                    exact
                })
            })
        })
    })
    return routeList
}

export default {
    getMenuByRightList: getMenuByRightList,
    getRouteList: getRouteList,
    MenuMap,
    containList
}