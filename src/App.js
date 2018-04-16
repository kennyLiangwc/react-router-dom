import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom'

// import Sider from "./components/common/sider"
import SiderCustom from "./components/SiderCustom"
import Routes from "./route"


class App extends Component {
  render() {
    return (
    	<div>
        <SiderCustom />
        <Routes />
      </div>
      // <div className="App">
      //   <Link to="/demo">Demo</Link>
      //   <Link to="/demo2">Demo2</Link>
      // </div>
    );
  }
}

export default App;
