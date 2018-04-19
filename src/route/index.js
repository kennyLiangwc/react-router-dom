import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import RoleList1 from "../components/role/roleList"
import AddRole from "../components/role/addRole"
import EditRole from "../components/role/editRole"
// import EditRole from "bundle-loader?lazy!../components/role/editRole"
import Bundle from "../components/w/Bundle.js"

// const EditBundle = (props) => (
//     <Bundle load={EditRole}>
//         {(Component) => <Component {...props} />}
//     </Bundle>
// );

const Chat = (props) => (
    <Bundle load={() => import('../components/chat')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);

let arr = [
	"/app/role/roleList",
	"/app/role/addRole"
];

const AuthRoute = ({component: COM, ...rest}) => {
	if(arr.includes(rest.path)) {
		return <Route {...rest} render={(props) => <COM {...props} />} />
	}else {
		alert("没有权限");
		window.history.back();
		return <div />
	}
	
}

const A = () => (
	<div>This is A</div>
)


const B = () => (
	<div>This is B</div>
)

const testRoute = () => (<div>
	<Route path="/app/test" component={A}></Route>
	<Route path="/app/test/b" component={B}></Route>
</div>)


const routes = [
	{
		path: "/app/role/roleList",
		component: RoleList1,
		exact: true,
		id: "roleList"
	},
	{
		path: "/app/role/addRole",
		component: AddRole,
		exact: true,
		id: "addRole"
	},
	{
		path: "/app/role/editRole",
		component: EditRole,
		exact: true,
		id: "editRole"
	},
	{
		path: "/app/role/editRole/:id",
		component: EditRole,
		exact: true,
		id: "editRole"
	}
]
// const B = ({component:COM,id,...rest}) => (
// 	<Bundle load={() => import(`../component/role/${id}`)}>
// 		return {<Route {...rest} render={(props) => <COM {...props} />}></Route>}
// 	</Bundle>
// );
// console.log("BBBBBB",B);







export default class Router extends Component {
	render() {
		return (<Switch>
			{/* // <Route exact path="/app/role/roleList" component={RoleList1}></Route> */}
			{/* <AuthRoute exact path="/app/role/roleList" component={RoleList1} />
			<AuthRoute exact path="/app/role/addRole" component={AddRole} /> */}
			{/* <Route exact path="/app/role/addRole" component={AddRole}></Route> */}
			{/* <AuthRoute exact path="/app/role/editRole" component={EditRole}></AuthRoute>
			<Route exact path="/app/role/editRole/:id" component={EditRole}></Route> */}
			{/* <Route path="/app/test" component={testRoute}></Route> */}

			{
				routes.map(({component: COM,...rest},i) => {
					return <Route key={i} {...rest} render={(props) => <COM {...props} />}></Route>
				})
			}
			{/* <B path="/app/role/addRole" compnent={EditRole}/> */}
			<Route path="/app/test" component={testRoute}></Route>
			<Route exact path="/app/chat" component={Chat}></Route>
			<Route render={() => <Redirect to="/404" />} />
		</Switch>)
	}
}