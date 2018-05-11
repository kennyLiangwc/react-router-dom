import { combineReducers } from 'redux';
import AddUserInfo from "./AddUserInfo.js"
import GetRoleList from "./GetRoleList"
import SetAuth from "./SetAuth.js"

export default combineReducers({
	AddUserInfo,
	GetRoleList,
	SetAuth
});