import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

// import RoleList1 from "../components/role/roleList"
// import AddRole from "../components/role/addRole"
// import EditRole from "../components/role/editRole"
import Bundle from "../components/w/Bundle.js"




// const Chat = (props) => (
//     <Bundle load={() => import('../components/chat')}>
//         {(A) => <A {...props}/>}
//     </Bundle>
// );

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


const BundleRoute = ({...rest}) => {
	let path = rest.path;
	console.log("rest",rest)
	path = path.slice(5);
	console.log("path",path);
	// if()
	return <Route {...rest} render={({ID}) => <Bundle load={(ID) => import(`../components/${path}`)}>
		{(ID) => <ID {...rest} />}
	</Bundle>}/>
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
		exact: true,
		id: "RoleList"
	},
	{
		path: "/app/role/addRole",
		exact: true,
		id: "AddRole"
	},
	{
		path: "/app/role/editRole",
		exact: true,
		id: "EditRole"
	},
	{
		path: "/app/role/delRole",
		exact: true,
		id: "DelRole"
	},
	{
		path: "/app/role/testRole",
		exact: true,
		id: "TestRole"
	},
	{
		path: "/app/code/codeList",
		exact: true,
		id: "CodeList"
	},
	{
		path: "/app/code/addCode",
		exact: true,
		id: "AddCode"
	},
	{
		path: "/app/code/updateCode",
		exact: true,
		id: "updateCode"
	},
	{
		path: "/app/code/delCode",
		exact: true,
		id: "DelCode"
	}
]



// const home = (location, callback) => {
// 	require.ensure([], require => {
// 	  callback(null, require('modules/home'))
// 	}, 'home')  
//   }

// const ensureModule = (name,entry) => (loacation,callback) (
// 	require.ensure([],require => {
// 		callback(null,require(entry))
// 	},name)
// )



export default class Router extends Component {
	render() {
		return (<Switch>
			{/* <BundleRoute exact path="/app/role/roleList" ID="RoleList"></BundleRoute> */}
			{/* <AuthRoute exact path="/app/role/roleList" component={RoleList1} />
			<AuthRoute exact path="/app/role/addRole" component={AddRole} /> */}
			{/* <BundleRoute exact path="/app/role/addRole" ID="AddRole"></BundleRoute>
			<BundleRoute exact path="/app/role/editRole" ID="EditRole"></BundleRoute>
			<BundleRoute exact path="/app/role/delRole" ID="DelRole"></BundleRoute>
			<BundleRoute exact path="/app/role/testRole" ID="TestRole"></BundleRoute> */}
			{/* <AuthRoute exact path="/app/role/editRole" component={EditRole}></AuthRoute>
			 
			{/* <Route path="/app/test" component={testRoute}></Route> */}

			{
				routes.map(({...rest},i) => {
					// return <Route key={i} {...rest} render={(props) => <COM {...props} />}></Route>
					return <BundleRoute key={i} {...rest}/>
				})
			}
			<Route path="/app/test" component={testRoute}></Route>
			{/* <Route exact path="/app/chat" component={Chat}></Route> */}
			<BundleRoute exact path="/app/chat"/>
			<Route render={() => <Redirect to="/404" />} />
		</Switch>)
	}
}