import http from "../../utils/http"
import menu from "../common/menu"

let roleMap = {};
let roleList = [];



let permissionArr = [];
let permissionObj = {};


if(roleList && roleList.length > 0) {
    roleList.forEach(function(item){
        roleMap[item.path] = true;
    });
}
function check(path) {
    return !!roleMap[path]
}

let MenuMap = menu.MenuMap;
Object.keys(MenuMap).map((key) => {
	MenuMap[key].map((item) => {
		item.children.map(c => {
			c.contain.map(v => {
				permissionArr.push({
					[v.permissionName]: check(v.path)
				})
				// permissionObj[key] = v.path
			})
		})
	})
})
let nextTodoId = 0;

export const addTodo = text => ({
	type: "ADD_TODO",
	nextTodoId: nextTodoId++,
	text
});


export const addUserInfo = info => ({
	type: "ADD_USER_INFO",
	info
});

// export const addMyMenus = myMenus => ({
// 	type: "ADD_MY_MENUS",
// 	myMenus
// })

export const addMyMenus = myMenus => {
	roleList = myMenus;
	return {
		type: "ADD_MY_MENUS",
		myMenus
	}
}

export const setAuth = (menuList,roleList) => ({
	type: "SET_AUTH",
	menuList,
	roleList
})

export function getRoleList() {
	return dispatch => {
		const query = `
			query QueryRoleList($input:RoleInput){
				queryRoleList(input:$input){
					name
					id
				}
			}
		`;
		const p = http.post(query,{
			input: {}
		}).then( data => data.queryRoleList);

		p.then(data => {
			dispatch({
				type: "GET_ROLELIST",
				payload: data
			})
		})
		return p
	}
}

