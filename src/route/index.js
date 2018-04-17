import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import RoleList1 from "../components/role/roleList"
import AddRole from "../components/role/addRole"
import EditRole from "bundle-loader?lazy!../components/role/editRole"
import Bundle from "../components/w/Bundle.js"

const EditBundle = (props) => (
    <Bundle load={EditRole}>
        {(Component) => <Component {...props} />}
    </Bundle>
);



let arr = [
	"/app/role/roleList",
	"/app/role/addRole"
]
console.log(arr)

const AuthRoute = ({component: COM, ...rest}) => {
	console.log('------------',rest);
	if(arr.includes(rest.path)) {
		return <Route {...rest} render={(props) => <COM {...props} />} />
	}else {
		// console.log("nnnn")
		alert("没有权限");
		window.history.back();
		return <div />
	}
	
}


export default class Router extends Component {
	render() {
		return <Switch>
			// <Route exact path="/app/role/roleList" component={RoleList1}></Route>
			<AuthRoute  path="/app/role/roleList" component={RoleList1} />
			<AuthRoute  path="/app/role/addRole" component={AddRole} />
			// <Route exact path="/app/role/addRole" component={AddRole}></Route>
			<AuthRoute exact path="/app/role/editRole" component={EditRole}></AuthRoute>
			<Route exact path="/app/role/editRole/:id" component={EditBundle}></Route>
			<Route render={() => <Redirect to="/404" />} />
		</Switch>
	}
}