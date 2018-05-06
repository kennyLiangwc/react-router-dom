import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import NotFound from './js/components/pages/NotFound';
import Login from './js/components/pages/Login';
import App from './js/App';
import React, { Component } from "react";

export default () => (
	<HashRouter>
		<Switch>
			<Route exact path="/" render={() => <Redirect to="/app/role/roleList" />}></Route>
			<Route path="/app" component={App}></Route>
			<Route path="/login" component={Login}></Route>
			<Route path="/404" component={NotFound}></Route>
			<Route component={NotFound} />} />
		</Switch>
	</HashRouter>
)