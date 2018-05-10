import { combineReducers } from 'redux';
import AddTodo from "./AddTodo.js"
import AddUserInfo from "./AddUserInfo.js"
import GetRoleList from "./GetRoleList"
import AddMyMenus from "./AddMyMenus"
import SetAuth from "./SetAuth.js"

export default combineReducers({
	AddTodo,
	AddUserInfo,
	GetRoleList,
	AddMyMenus,
	SetAuth
});