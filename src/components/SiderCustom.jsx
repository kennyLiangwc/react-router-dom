import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import menu from './common/menu';
import SiderMenu from './SiderMenu';

class SiderCustom extends Component {
	render() {
		return (
			<SiderMenu
				menus={menu.role}
				theme="dark"
                mode="inline"
			/>

		)
	}
}
export default SiderCustom