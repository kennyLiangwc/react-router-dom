let menu = {
    role: [
        {
            text: "角色管理",
            icon: "icon_role",
            children: [
                {
                    id: "queryRole",
                    text: "角色列表",
                    path: "/app/role/roleList",
                    contain: [

                    ]
                },
                {
                    id: "addRole",
                    text: "新增角色1",
                    path: "/app/role/addRole",
                    contain: [
                        {
                            "name": "新增角色",
                            "path": "addRole"
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
                            "path": "updateRole"
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
export default menu