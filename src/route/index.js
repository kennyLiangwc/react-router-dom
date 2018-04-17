import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import RoleList from "../components/role/roleList"
import AddRole from "../components/role/addRole"
import EditRole from "../components/role/editRole"

export default class Router extends Component {
	render() {
		return <Switch>
			<Route exact path="/app/role/roleList" component={RoleList}></Route>
			<Route exact path="/app/role/addRole" component={AddRole}></Route>
			<Route path="/app/role/editRole" component={EditRole}></Route>
			<Route path="/app/role/editRole/:id" component={EditRole}></Route>
		</Switch>
	}
}