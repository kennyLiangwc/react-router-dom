import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import RoleList from "../components/role/roleList"
import addRole from "../components/role/addRole"

export default class Router extends Component {
	render() {
		return <Switch>
			<Route exact path="/app/roleList" component={RoleList}></Route>
			<Route exact path="/app/addRole" component={addRole}></Route>
		</Switch>
	}
}