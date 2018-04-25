import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import Page from "./Page"


// class Demo extends React.Component  {
//   render() {
//     return <div>11</div>
//   }
// }

// class Demo2 extends React.Component {
//   render() {
//     return <div>22</div>
//   }
// }

// const isAuth = '/demo';
// const isAuth2 = true;

// const SiderRoute = <Route path="/" component={Sider} />;

// const roleList = <Route path="/roleList" component={RoleList}></Route>

// const AuthRoute = ({ component: COM, ...rest }) => {
//   console.log(window.location, rest);
//   // debugger;
//   if(isAuth === rest.path) {
//     return <Route {...rest} render={(props) => <COM {...props} />} />  
//   }
//   else {
//     window.history.back();
//     return <div />
//     // return <div>not found</div>
//   }
// }

// const routes = <BrowserRouter>
//   <Switch>
//     {SiderRoute}
//     {roleList}
//     <AuthRoute  path="/demo" component={Demo} />
//     <AuthRoute  path="/demo2" component={Demo2} />
//   </Switch>
// </BrowserRouter>





ReactDOM.render(<Page />, document.getElementById('root'));
registerServiceWorker();
