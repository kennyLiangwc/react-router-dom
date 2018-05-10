let roleMap = {};
function check(path) {
    return !!roleMap[path]
}

export default (state = {},action) => {
	switch(action.type) {
		case "SET_AUTH":
			action.roleList.map(item => {
				roleMap[item] = true;
			});
			let obj = {};
			action.menuList.map(item => {
				obj[item.permissionName] = check(item.path)
			});
			return  obj
		default:
			return state
	}
}