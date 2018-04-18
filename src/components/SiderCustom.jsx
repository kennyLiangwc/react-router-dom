import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import menu from './common/menu';
import SiderMenu from './SiderMenu';

class SiderCustom extends Component {
	handleClick(e) {
		console.log('ee',e);
		let m = require("bundle-loader./common/menu");
		console.log('mmmmm',m)
	}
	render() {
		return (
			<SiderMenu
				menus={menu}
				theme="dark"
				mode="inline"
				onClick={this.handleClick}
			/>

		)
	}
}
export default SiderCustom