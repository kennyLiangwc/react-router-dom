import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import App from './App';
import React, { Component } from "react";

export default () => (
	<BrowserRouter>
		<Switch>
			{/* <Route exact path="/" render={() => <Redirect to="/app/role/roleList" />}></Route> */}
			<Route path="/app" component={App}></Route>
			<Route path="/login" component={Login}></Route>
			<Route path="/404" component={NotFound}></Route>
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
)