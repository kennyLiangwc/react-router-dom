import { combineReducers } from 'redux';
import AddTodo from "./AddTodo.js"
import AddUserInfo from "./AddUserInfo.js"

export default combineReducers({
	AddTodo,
	AddUserInfo
});